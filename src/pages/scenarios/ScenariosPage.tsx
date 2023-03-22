import {
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Scenario, scenariosCol } from '../../models/collections'

const ScenariosPage = () => {
  const [scenarios, setScenarios] = useState<Scenario[]>([])
  const [lastScenario, setLastScenario] = useState<QueryDocumentSnapshot<Scenario>>()
  const [disabled, setDisabled] = useState(false)
  useEffect(() => {
    // Query the first page of docs
    const fetchFirst = async () => {
      const first = query(scenariosCol, orderBy('scenarioName'), limit(2))
      const documentSnapshots = await getDocs(first)
      const scenariosList = documentSnapshots.docs.map((doc) => {
        return doc.data()
      })
      if (documentSnapshots.empty) {
        setDisabled(true)
      }
      setScenarios(scenariosList)
      setLastScenario(documentSnapshots.docs[documentSnapshots.docs.length - 1])
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
    const next = query(scenariosCol, orderBy('scenarioName'), startAfter(lastScenario), limit(2))
    const documentSnapshots = await getDocs(next)
    const scenariosList = documentSnapshots.docs.map((doc) => {
      return doc.data()
    })
    setScenarios((prev) => [...prev, ...scenariosList])
    setLastScenario(documentSnapshots.docs[documentSnapshots.docs.length - 1])
    if (documentSnapshots.empty) {
      setDisabled(true)
    }
  }

  return (
    <div>
      {scenarios.map((scenario) => {
        return (
          <Link to={scenario.id || ''} key={scenario.id}>
            <div>{scenario.scenarioName}</div>
          </Link>
        )
      })}

      <button onClick={fetchNext} disabled={disabled}>
        FETCH MORE
      </button>
    </div>
  )
}

export default ScenariosPage
