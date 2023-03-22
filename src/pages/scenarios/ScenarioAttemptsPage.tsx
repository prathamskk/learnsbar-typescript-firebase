import {
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
  where,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useUser } from '../../components/AuthRoute'
import { Attempt, createSubCollection } from '../../models/collections'

const ScenarioAttemptsPage = () => {
  const [attempts, setAttempts] = useState<Attempt[]>([])
  const [lastAttempt, setLastAttempt] = useState<QueryDocumentSnapshot<Attempt>>()
  const [disabled, setDisabled] = useState(false)
  const { user } = useUser()
  const { scenarioId } = useParams()
  useEffect(() => {
    // Query the first page of docs
    const fetchFirst = async () => {
      if (scenarioId) {
        const attemptsCol = createSubCollection<Attempt>('users', user.uid, 'attempts')
        const first = query(
          attemptsCol,
          where('scenarioId', '==', scenarioId),
          orderBy('submissionTimestamp', 'desc'),
          limit(2),
        )
        const documentSnapshots = await getDocs(first)
        const attemptsList = documentSnapshots.docs.map((doc) => {
          return doc.data()
        })
        if (documentSnapshots.empty) {
          setDisabled(true)
        }
        setAttempts(attemptsList)
        setLastAttempt(documentSnapshots.docs[documentSnapshots.docs.length - 1])
      }
    }

    // addDoc(scenariosCol, {
    //   scenarioName: 'bruh2',
    //   scenarioVideoLink: 'bruh2',
    //   exemplarVideoLink: 'asdad2',
    //   shortDescription: 'asdasd2',
    //   description: 'asdasd2',
    // })
    fetchFirst()
  }, [])

  const fetchNext = async () => {
    const attemptsCol = createSubCollection<Attempt>('users', user.uid, 'attempts')
    const next = query(
      attemptsCol,
      where('scenarioId', '==', scenarioId),
      orderBy('submissionTimestamp', 'desc'),
      startAfter(lastAttempt),
      limit(2),
    )
    const documentSnapshots = await getDocs(next)
    const attemptsList = documentSnapshots.docs.map((doc) => {
      return doc.data()
    })
    setAttempts((prev) => [...prev, ...attemptsList])
    setLastAttempt(documentSnapshots.docs[documentSnapshots.docs.length - 1])
    if (documentSnapshots.empty) {
      setDisabled(true)
    }
  }

  return (
    <div>
      {attempts.map((attempt) => {
        return (
          <div key={attempt.id}>
            <div>{attempt.scenarioId}</div>
            <div>{attempt.submissionTimestamp.toString()}</div>
          </div>
        )
      })}

      <button onClick={fetchNext} disabled={disabled}>
        FETCH MORE
      </button>
    </div>
  )
}

export default ScenarioAttemptsPage
