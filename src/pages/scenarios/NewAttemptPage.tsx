import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { uploadBytes, getDownloadURL } from 'firebase/storage'
import { useState, FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useUser } from '../../components/AuthRoute'
import { Attempt, createSubCollection } from '../../models/collections'
import { useForm } from 'react-hook-form'
import Recorder from '../../components/Recorder'
import { storage } from '../../config/firebase'
import { ref } from '@firebase/storage'
import { Button, Paper, Stack, TextField, Typography, Alert } from '@mui/material'
import { useMultistepForm } from '../../hooks/useMultistepForm'
import Box from '@mui/material/Box'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import selfAssessmentQuestions from '../../models/selfAssessmentQuestions.json'
import selfReflectiveQuestions from '../../models/selfReflectiveQuestions.json'

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

const NewAttemptPage = () => {
  const navigate = useNavigate()
  const { scenarioId } = useParams()
  const { user } = useUser()
  const [beforeRecording, setBeforeRecording] = useState<Blob>()
  const [afterRecording, setAfterRecording] = useState<Blob>()
  const { register, handleSubmit } = useForm<Attempt>()
  const { currentStepIndex, isFirstStep, isLastStep, back, next } = useMultistepForm([
    'BeforeAssessment',
    'SelfAssessment',
    'SelfReflective',
    'AfterAssessment',
  ])

  function onSubmitForm(e: FormEvent) {
    e.preventDefault()
    if (!isLastStep) {
      return next()
    }
    onSubmit()
  }
  const onSubmit = handleSubmit(async (data) => {
    if (scenarioId) {
      if (beforeRecording) {
        if (afterRecording) {
          handleToggle()

          data.scenarioId = scenarioId
          data.hasGraded = false
          data.submissionTimestamp = serverTimestamp()

          const attemptsCol = createSubCollection<Attempt>('users', user.uid, 'attempts')
          const attemptRef = doc(attemptsCol)
          const attemptId = attemptRef.id
          const folderRef = ref(storage, 'user_attempts/' + user.uid + '/' + attemptId)
          const beforeAssessmentRef = ref(folderRef, 'before_assessment.webm')
          const afterAssessmentRef = ref(folderRef, 'after_assessment.webm')
          await uploadBytes(beforeAssessmentRef, beforeRecording).then(() => {
            console.log('Uploaded before_assessment.webm')
          })
          await uploadBytes(afterAssessmentRef, afterRecording).then(() => {
            console.log('Uploaded after_assessment.webm')
          })
          data.afterAssessmentRecordingLink = await getDownloadURL(beforeAssessmentRef)
          data.beforeAssessmentRecordingLink = await getDownloadURL(afterAssessmentRef)
          await setDoc(attemptRef, data)
          setSuccess(true)
          console.log(data)
        }
      }
    }
  })

  const [open, setOpen] = useState(false)
  const [success, setSuccess] = useState(false)
  const handleToggle = () => {
    setOpen(!open)
  }

  return (
    <Box m={2}>
      <form onSubmit={onSubmitForm}>
        {/* <div>{step}</div> */}
        <Box display={currentStepIndex == 0 ? 'block' : 'none'}>
          <Stack direction='column' justifyContent='center' alignItems='center' spacing={2}>
            <Recorder setRecording={setBeforeRecording} />
            <Typography variant='h5' align='center'>
              Record SBAR Briefing
            </Typography>
          </Stack>
        </Box>
        <Box display={currentStepIndex == 1 ? 'block' : 'none'}>
          <Typography variant='h6'>Identify</Typography>
          <Stack direction='row' justifyContent='flex-start' alignItems='center'>
            <label className='pure-material-checkbox'>
              <input {...register('selfAssessmentAnswers.question1')} type='checkbox' />
              <span>{selfAssessmentQuestions.question1}</span>
            </label>
          </Stack>
          <Stack direction='row' justifyContent='flex-start' alignItems='center'>
            <label className='pure-material-checkbox'>
              <input {...register('selfAssessmentAnswers.question2')} type='checkbox' />
              <span>{selfAssessmentQuestions.question2}</span>
            </label>
          </Stack>
          <Stack direction='row' justifyContent='flex-start' alignItems='center'>
            <label className='pure-material-checkbox'>
              <input {...register('selfAssessmentAnswers.question3')} type='checkbox' />
              <span>{selfAssessmentQuestions.question3}</span>
            </label>
          </Stack>
          <Typography variant='h6'>Situation</Typography>

          <Stack direction='row' justifyContent='flex-start' alignItems='center'>
            <label className='pure-material-checkbox'>
              <input {...register('selfAssessmentAnswers.question4')} type='checkbox' />
              <span>{selfAssessmentQuestions.question4}</span>
            </label>
          </Stack>
          <Stack direction='row' justifyContent='flex-start' alignItems='center'>
            <label className='pure-material-checkbox'>
              <input {...register('selfAssessmentAnswers.question5')} type='checkbox' />
              <span>{selfAssessmentQuestions.question5}</span>
            </label>
          </Stack>
          <Stack direction='row' justifyContent='flex-start' alignItems='center'>
            <label className='pure-material-checkbox'>
              <input {...register('selfAssessmentAnswers.question6')} type='checkbox' />
              <span>{selfAssessmentQuestions.question6}</span>
            </label>
          </Stack>
          <Typography variant='h6'>Background & Assessment</Typography>

          <Stack direction='row' justifyContent='flex-start' alignItems='center'>
            <label className='pure-material-checkbox'>
              <input {...register('selfAssessmentAnswers.question7')} type='checkbox' />
              <span>{selfAssessmentQuestions.question7}</span>
            </label>
          </Stack>
          <Stack direction='row' justifyContent='flex-start' alignItems='center'>
            <label className='pure-material-checkbox'>
              <input {...register('selfAssessmentAnswers.question8')} type='checkbox' />
              <span>{selfAssessmentQuestions.question8}</span>
            </label>
          </Stack>
          <Stack direction='row' justifyContent='flex-start' alignItems='center'>
            <label className='pure-material-checkbox'>
              <input {...register('selfAssessmentAnswers.question9')} type='checkbox' />
              <span>{selfAssessmentQuestions.question9}</span>
            </label>
          </Stack>
          <Typography variant='h6'>Recommendation & Repeat</Typography>

          <Stack direction='row' justifyContent='flex-start' alignItems='center'>
            <label className='pure-material-checkbox'>
              <input {...register('selfAssessmentAnswers.question10')} type='checkbox' />
              <span>{selfAssessmentQuestions.question10}</span>
            </label>
          </Stack>
          <Stack direction='row' justifyContent='flex-start' alignItems='center'>
            <label className='pure-material-checkbox'>
              <input {...register('selfAssessmentAnswers.question11')} type='checkbox' />
              <span>{selfAssessmentQuestions.question11}</span>
            </label>
          </Stack>
          <Stack direction='row' justifyContent='flex-start' alignItems='center'>
            <label className='pure-material-checkbox'>
              <input {...register('selfAssessmentAnswers.question12')} type='checkbox' />
              <span>{selfAssessmentQuestions.question12}</span>
            </label>
          </Stack>
          <Typography variant='h6'>Order & Accuracy</Typography>

          <Stack direction='row' justifyContent='flex-start' alignItems='center'>
            <label className='pure-material-checkbox'>
              <input {...register('selfAssessmentAnswers.question13')} type='checkbox' />
              <span>{selfAssessmentQuestions.question13}</span>
            </label>
          </Stack>
          <Stack direction='row' justifyContent='flex-start' alignItems='center'>
            <label className='pure-material-checkbox'>
              <input {...register('selfAssessmentAnswers.question14')} type='checkbox' />
              <span>{selfAssessmentQuestions.question14}</span>
            </label>
          </Stack>
          <Stack direction='row' justifyContent='flex-start' alignItems='center'>
            <label className='pure-material-checkbox'>
              <input {...register('selfAssessmentAnswers.question15')} type='checkbox' />
              <span>{selfAssessmentQuestions.question15}</span>
            </label>
          </Stack>
        </Box>
        <Box display={currentStepIndex == 2 ? 'block' : 'none'}>
          <div>
            <Typography variant='h6'>What you did well?</Typography>
            <Stack direction='row' justifyContent='flex-start' alignItems='center'>
              <label className='pure-material-checkbox'>
                <input {...register('selfReflectiveAnswers.question1')} type='checkbox' />
                <span>{selfReflectiveQuestions.question1}</span>
              </label>
            </Stack>
            <Stack direction='row' justifyContent='flex-start' alignItems='center'>
              <label className='pure-material-checkbox'>
                <input {...register('selfReflectiveAnswers.question2')} type='checkbox' />
                <span>{selfReflectiveQuestions.question2}</span>
              </label>
            </Stack>
            <Stack direction='row' justifyContent='flex-start' alignItems='center'>
              <label className='pure-material-checkbox'>
                <input {...register('selfReflectiveAnswers.question3')} type='checkbox' />
                <span>{selfReflectiveQuestions.question3}</span>
              </label>
            </Stack>
            <Stack direction='row' justifyContent='flex-start' alignItems='center'>
              <label className='pure-material-checkbox'>
                <input {...register('selfReflectiveAnswers.question4')} type='checkbox' />
                <span>{selfReflectiveQuestions.question4}</span>
              </label>
            </Stack>
            <Stack direction='row' justifyContent='flex-start' alignItems='center'>
              <label className='pure-material-checkbox'>
                <input {...register('selfReflectiveAnswers.question5')} type='checkbox' />
                <span>{selfReflectiveQuestions.question5}</span>
              </label>
            </Stack>
            <Stack direction='column' justifyContent='flex-start' alignItems='center'>
              <Typography variant='h6'>{selfReflectiveQuestions.question6}</Typography>
              <TextField {...register('selfReflectiveAnswers.question6')} variant='outlined' />
            </Stack>
          </div>
        </Box>
        <Box display={currentStepIndex == 3 ? 'block' : 'none'}>
          <Stack direction='column' justifyContent='center' alignItems='center' spacing={2}>
            <Recorder setRecording={setAfterRecording} />
            <Typography variant='h5' align='center'>
              Record SBAR Briefing for the second time with the improvements
            </Typography>
          </Stack>
        </Box>
        {/* {currentStepIndex + 1} / {steps.length} */}
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
          <Stack direction={'row'} m={1} gap={1}>
            {!isFirstStep && (
              <Button size='large' fullWidth={true} variant='contained' onClick={back}>
                Back
              </Button>
            )}
            {!isLastStep && (
              <Button
                color='secondary'
                size='large'
                fullWidth={true}
                variant='contained'
                type='submit'
                disabled={!beforeRecording}
              >
                Next
              </Button>
            )}
            {isLastStep && (
              <Button
                color='secondary'
                size='large'
                fullWidth={true}
                variant='contained'
                type='submit'
                disabled={!afterRecording}
              >
                Finish
              </Button>
            )}
          </Stack>
        </Paper>
      </form>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
        {!success && <CircularProgress color='inherit' />}
        {success && (
          <Box>
            <Alert
              iconMapping={{
                success: <CheckCircleOutlineIcon fontSize='inherit' />,
              }}
            >
              Successfully Submitted Your Attempt
            </Alert>
            <Button variant='contained' onClick={() => navigate('/')}>
              Go Back to Home
            </Button>
          </Box>
        )}
      </Backdrop>
    </Box>
  )
}

export default NewAttemptPage
