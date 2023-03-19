import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { collection, CollectionReference, DocumentData, getFirestore } from 'firebase/firestore'
import { firebaseConfig } from './config'
// Firebase Default App initialized before using any service
export const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const db = getFirestore()

// This is just a helper to add the type to the db responses
const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(db, collectionName) as CollectionReference<T>
}

export interface Scenario {
  id: string
  scenario_name: string
}

// export all your collections
export const scenariosCol = createCollection<Scenario>('scenarios')
