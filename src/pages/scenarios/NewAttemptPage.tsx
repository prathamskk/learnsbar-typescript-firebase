import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { uploadBytes, getDownloadURL } from 'firebase/storage'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useUser } from '../../components/AuthRoute'
import { Attempt, createSubCollection } from '../../models/collections'
import { useForm } from 'react-hook-form'
import Recorder from '../../components/Recorder'
import { storage } from '../../config/firebase'
import { ref } from '@firebase/storage'

const NewAttemptPage = () => {
  const { scenarioId } = useParams()
  const { user } = useUser()
  const [beforeRecording, setBeforeRecording] = useState<Blob>()
  const [afterRecording, setAfterRecording] = useState<Blob>()
  const { register, handleSubmit } = useForm<Attempt>()

  const onSubmit = handleSubmit(async (data) => {
    if (scenarioId) {
      if (beforeRecording) {
        if (afterRecording) {
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
      <form onSubmit={onSubmit}>
        <div>
          <label>Scenario Video</label>
        </div>
        <div>
          <label>Before Assessment Recording</label>
          <Recorder setRecording={setBeforeRecording} />
        </div>
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
        </div>
        <div>
          <label>self reflective questions</label>
          <input {...register('selfReflectiveAnswers.question1')} type='checkbox' />
          <input {...register('selfReflectiveAnswers.question2')} type='text' />
        </div>
        <div>
          <label>after assessment recording</label>
          <Recorder setRecording={setAfterRecording} />
        </div>
        <input type='submit' value='submit' />
      </form>
    </div>
  )
}

export default NewAttemptPage
