import { getDoc, doc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Scenario, scenariosCol } from '../../models/collections'

const ScenarioDetailPage = () => {
  const { scenarioId } = useParams()

  const [scenario, setScenario] = useState<Scenario>()

  useEffect(() => {
    // Query the first page of docs
    const fetchDoc = async () => {
      const docRef = doc(scenariosCol, scenarioId)
      const documentSnapshot = await getDoc(docRef)
      setScenario(documentSnapshot.data())
    }

    fetchDoc()
  }, [])

  return (
    <div>
      <h1>ScenarioDetailPage</h1>
      {scenario ? (
        <>
          <div>{scenario.id}</div>
          <div>{scenario.scenarioName}</div>
          <div>{scenario.shortDescription}</div>
          <div>{scenario.description}</div>
          <div>{scenario.scenarioVideoLink}</div>
          <div>{scenario.exemplarVideoLink}</div>
          <Link to='new'>
            <div>New Attempt</div>
          </Link>
          <Link to='attempts'>
            <div>Previous Submissions</div>
          </Link>
        </>
      ) : (
        <div>Loading Scenario Details...</div>
      )}
    </div>
  )
}

export default ScenarioDetailPage
