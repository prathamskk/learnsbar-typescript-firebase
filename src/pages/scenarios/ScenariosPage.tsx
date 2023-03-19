import { collection, getDocs, limit, orderBy, query, startAfter } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db, Scenario, scenariosCol } from '../../config/firebase'

const ScenariosPage = () => {
  const [scenarios, setScenarios] = useState<Scenario[]>([])
  const [lastScenario, setLastScenario] = useState<any>()

  useEffect(() => {
    // Query the first page of docs
    const fetchFirst = async () => {
      const first = query(scenariosCol, limit(25))
      const documentSnapshots = await getDocs(first)
      const scenariosList: React.SetStateAction<Scenario[]> = []
      documentSnapshots.forEach((singleElement) => {
        scenariosList.push(singleElement.data())
      })
      setLastScenario(documentSnapshots.docs[documentSnapshots.docs.length - 1])
      setScenarios(scenariosList)
    }

    fetchFirst()
  }, [])

  const fetchNext = async () => {
    const next = query(scenariosCol, startAfter(lastScenario), limit(25))
    const documentSnapshots = await getDocs(next)
    const scenariosList: React.SetStateAction<Scenario[]> = []
    documentSnapshots.forEach((singleElement) => {
      scenariosList.push(singleElement.data())
    })
    setLastScenario(documentSnapshots.docs[documentSnapshots.docs.length - 1])
    setScenarios((prev) => [...prev, ...scenariosList])
  }

  return (
    <div>
      {scenarios.map((scenario) => (
        <div key={scenario.id}>{scenario.scenario_name}</div>
      ))}
    </div>
  )
}

export default ScenariosPage
