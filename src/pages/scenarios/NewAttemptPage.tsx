import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { uploadBytes, getDownloadURL } from 'firebase/storage'
import { useState, FormEvent } from 'react'
import { useParams } from 'react-router-dom'
import { useUser } from '../../components/AuthRoute'
import { Attempt, createSubCollection } from '../../models/collections'
import { useForm } from 'react-hook-form'
import Recorder from '../../components/Recorder'
import { storage } from '../../config/firebase'
import { ref } from '@firebase/storage'
import { Button, Checkbox, Paper, Stack, Typography } from '@mui/material'
import { useMultistepForm } from '../../hooks/useMultistepForm'
import Box from '@mui/material/Box'

import selfAssessmentQuestions from '../../models/selfAssessmentQuestions.json'
import selfReflectiveQuestions from '../../models/selfReflectiveQuestions.json'

const NewAttemptPage = () => {
  const { scenarioId } = useParams()
  const { user } = useUser()
  const [beforeRecording, setBeforeRecording] = useState<Blob>()
  const [afterRecording, setAfterRecording] = useState<Blob>()
  const { register, handleSubmit } = useForm<Attempt>()

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } = useMultistepForm([
    'BeforeAssessment',
    'SelfAssessment',
    'SelfReflective',
    'AfterAssessment',
  ])

  function onSubmitForm(e: FormEvent) {
    e.preventDefault()
    if (!isLastStep) return next()
    alert('Successful Account Creation')
    onSubmit()
  }
  const onSubmit = handleSubmit(async (data) => {
    if (scenarioId) {
      console.log('borefoe recording', beforeRecording)
      if (beforeRecording) {
        if (afterRecording) {
          console.log('before after scenario are defined')

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
          console.log(data)
        }
      }
    }
  })

  return (
    <div>
      <form onSubmit={onSubmitForm}>
        <div>{step}</div>
        <Box display={currentStepIndex == 0 ? 'block' : 'none'}>
          <Stack direction='column' justifyContent='center' alignItems='center' spacing={2}>
            <Recorder setRecording={setBeforeRecording} />
            <Typography variant='h5' align='center'>
              Record SBAR Briefing
            </Typography>
          </Stack>
        </Box>
        <Box display={currentStepIndex == 1 ? 'block' : 'none'}>
          <div>
            <label>self assessment questions</label>
            <input {...register('selfAssessmentAnswers.question1')} type='checkbox' />
            <input {...register('selfAssessmentAnswers.question2')} type='checkbox' />
            <input {...register('selfAssessmentAnswers.question3')} type='checkbox' />
            <input {...register('selfAssessmentAnswers.question4')} type='checkbox' />
            <input {...register('selfAssessmentAnswers.question5')} type='checkbox' />
            <input {...register('selfAssessmentAnswers.question6')} type='checkbox' />
            <input {...register('selfAssessmentAnswers.question7')} type='checkbox' />
            <input {...register('selfAssessmentAnswers.question8')} type='checkbox' />
            <input {...register('selfAssessmentAnswers.question9')} type='checkbox' />
            <input {...register('selfAssessmentAnswers.question10')} type='checkbox' />
            <input {...register('selfAssessmentAnswers.question11')} type='checkbox' />
            <input {...register('selfAssessmentAnswers.question12')} type='checkbox' />
            <input {...register('selfAssessmentAnswers.question13')} type='checkbox' />
            <input {...register('selfAssessmentAnswers.question14')} type='checkbox' />
            <input {...register('selfAssessmentAnswers.question15')} type='checkbox' />
          </div>
          <Typography variant='h6'>Identify</Typography>
          <Stack direction='row' justifyContent='flex-start' alignItems='center'>
            <Checkbox {...register('selfAssessmentAnswers.question1')} />
            <Typography>{selfAssessmentQuestions.question1}</Typography>
          </Stack>
          {/* <Stack direction='row' justifyContent='flex-start' alignItems='center'>
            <Checkbox checked={attempt.selfAssessmentAnswers.question2} />
            <Typography>{selfAssessmentQuestions.question2}</Typography>
          </Stack>
          <Stack direction='row' justifyContent='flex-start' alignItems='center'>
            <Checkbox checked={attempt.selfAssessmentAnswers.question3} />
            <Typography>{selfAssessmentQuestions.question3}</Typography>
          </Stack>
          <Typography variant='h6'>Situation</Typography>

          <Stack direction='row' justifyContent='flex-start' alignItems='center'>
            <Checkbox checked={attempt.selfAssessmentAnswers.question4} />
            <Typography>{selfAssessmentQuestions.question4}</Typography>
          </Stack>
          <Stack direction='row' justifyContent='flex-start' alignItems='center'>
            <Checkbox checked={attempt.selfAssessmentAnswers.question5} />
            <Typography>{selfAssessmentQuestions.question5}</Typography>
          </Stack>
          <Stack direction='row' justifyContent='flex-start' alignItems='center'>
            <Checkbox checked={attempt.selfAssessmentAnswers.question6} />
            <Typography>{selfAssessmentQuestions.question6}</Typography>
          </Stack>
          <Typography variant='h6'>Background & Assessment</Typography>

          <Stack direction='row' justifyContent='flex-start' alignItems='center'>
            <Checkbox checked={attempt.selfAssessmentAnswers.question7} />
            <Typography>{selfAssessmentQuestions.question7}</Typography>
          </Stack>
          <Stack direction='row' justifyContent='flex-start' alignItems='center'>
            <Checkbox checked={attempt.selfAssessmentAnswers.question8} />
            <Typography>{selfAssessmentQuestions.question8}</Typography>
          </Stack>
          <Stack direction='row' justifyContent='flex-start' alignItems='center'>
            <Checkbox checked={attempt.selfAssessmentAnswers.question9} />
            <Typography>{selfAssessmentQuestions.question9}</Typography>
          </Stack>
          <Typography variant='h6'>Recommendation & Repeat</Typography>

          <Stack direction='row' justifyContent='flex-start' alignItems='center'>
            <Checkbox checked={attempt.selfAssessmentAnswers.question10} />
            <Typography>{selfAssessmentQuestions.question10}</Typography>
          </Stack>
          <Stack direction='row' justifyContent='flex-start' alignItems='center'>
            <Checkbox checked={attempt.selfAssessmentAnswers.question11} />
            <Typography>{selfAssessmentQuestions.question11}</Typography>
          </Stack>
          <Stack direction='row' justifyContent='flex-start' alignItems='center'>
            <Checkbox checked={attempt.selfAssessmentAnswers.question12} />
            <Typography>{selfAssessmentQuestions.question12}</Typography>
          </Stack>
          <Typography variant='h6'>Order & Accuracy</Typography>

          <Stack direction='row' justifyContent='flex-start' alignItems='center'>
            <Checkbox checked={attempt.selfAssessmentAnswers.question13} />
            <Typography>{selfAssessmentQuestions.question13}</Typography>
          </Stack>
          <Stack direction='row' justifyContent='flex-start' alignItems='center'>
            <Checkbox checked={attempt.selfAssessmentAnswers.question14} />
            <Typography>{selfAssessmentQuestions.question14}</Typography>
          </Stack>
          <Stack direction='row' justifyContent='flex-start' alignItems='center'>
            <Checkbox checked={attempt.selfAssessmentAnswers.question15} />
            <Typography>{selfAssessmentQuestions.question15}</Typography>
          </Stack> */}
        </Box>
        <Box display={currentStepIndex == 2 ? 'block' : 'none'}>
          <div>
            <label>self reflective questions</label>
            <input {...register('selfReflectiveAnswers.question1')} type='checkbox' />
            <input {...register('selfReflectiveAnswers.question2')} type='checkbox' />
            <input {...register('selfReflectiveAnswers.question3')} type='checkbox' />
            <input {...register('selfReflectiveAnswers.question4')} type='checkbox' />
            <input {...register('selfReflectiveAnswers.question5')} type='checkbox' />
            <input {...register('selfReflectiveAnswers.question6')} type='text' />
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
        {currentStepIndex + 1} / {steps.length}
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
          <Stack direction={'row'} m={1} gap={1}>
            {!isFirstStep && (
              <Button size='large' fullWidth={true} variant='contained' onClick={back}>
                Back
              </Button>
            )}
            <Button
              color='secondary'
              size='large'
              fullWidth={true}
              variant='contained'
              type='submit'
            >
              {isLastStep ? 'Finish' : 'Next'}
            </Button>
          </Stack>
        </Paper>
      </form>
    </div>
  )
}

export default NewAttemptPage
