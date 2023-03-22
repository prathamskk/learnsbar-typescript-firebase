import { addDoc, Timestamp } from 'firebase/firestore'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useUser } from '../../components/AuthRoute'
import { Attempt, createSubCollection } from '../../models/collections'

const NewAttemptPage = () => {
  const { scenarioId } = useParams()
  const { user } = useUser()

  useEffect(() => {
    if (scenarioId) {
      const attemptsCol = createSubCollection<Attempt>('users', user.uid, 'attempts')
      addDoc(attemptsCol, {
        afterAssessmentRecordingLink: 'sdada',
        scenarioId: scenarioId,
        submissionTimestamp: Timestamp.fromDate(new Date()),
        hasGraded: false,
        grade: { bruh: 'bruh' },
        beforeAssessmentRecordingLink: 'niccerecordinglink',
        selfAssessmentAnswers: {
          question1: true,
          question2: true,
          question3: true,
          question4: true,
          question5: true,
          question6: true,
          question7: true,
          question8: true,
          question9: true,
          question10: true,
        },
        selfReflectiveAnswers: { question1: true, question2: 'long' },
      })
    }
  }, [])

  return <div>NewAttemptPage</div>
}

export default NewAttemptPage
