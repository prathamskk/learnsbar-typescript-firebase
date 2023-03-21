import {
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Scenario, scenariosCol } from '../../models/collections'

const ScenariosPage = () => {
  const [scenarios, setScenarios] = useState<Scenario[]>([])
  const [lastScenario, setLastScenario] = useState<QueryDocumentSnapshot<Scenario>>()
  const [disabled, setDisabled] = useState(false)
  useEffect(() => {
    // Query the first page of docs
    const fetchFirst = async () => {
      const first = query(scenariosCol, orderBy('scenario_name'), limit(2))
      const documentSnapshots = await getDocs(first)
      const scenariosList = documentSnapshots.docs.map((doc) => {
        return doc.data()
      })
      setScenarios(scenariosList)
      setLastScenario(documentSnapshots.docs[documentSnapshots.docs.length - 1])
    }

    fetchFirst()
  }, [])

  const fetchNext = async () => {
    const next = query(scenariosCol, orderBy('scenario_name'), startAfter(lastScenario), limit(2))
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
      {scenarios.map((scenario) => (
        <div key={scenario.id}>{scenario.scenario_name}</div>
      ))}

      <button onClick={fetchNext} disabled={disabled}>
        FETCH MORE
      </button>
    </div>
  )
}

export default ScenariosPage
