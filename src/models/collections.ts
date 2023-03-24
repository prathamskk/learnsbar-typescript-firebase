import {
  collection,
  CollectionReference,
  DocumentData,
  FieldValue,
  PartialWithFieldValue,
  QueryDocumentSnapshot,
  Timestamp,
} from 'firebase/firestore'
import { db } from '../config/firebase'

// This is just a helper to add the type to the db responses
export const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(db, collectionName).withConverter(converter()) as CollectionReference<T>
}

export const createSubCollection = <T = DocumentData>(
  collectionName: string,
  documentId: string,
  subCollectionName: string,
) => {
  return collection(db, collectionName, documentId, subCollectionName).withConverter(
    converter(),
  ) as CollectionReference<T>
}

const converter = <T>() => ({
  toFirestore: (data: PartialWithFieldValue<T>) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => {
    return { id: snap.id, ...snap.data() } as T
  },
})

export interface Scenario {
  id?: string | null
  scenarioName: string
  scenarioVideoLink: string
  exemplarVideoLink: string
  shortDescription: string
  description: string
}

export interface User {
  id?: string | null
  fcmToken: string | null
  hasEnabledNotification: boolean
  roles?: object
}

export interface Attempt {
  id?: string | null
  scenarioId: string
  submissionTimestamp: Timestamp | FieldValue
  hasGraded: boolean
  grade?: object
  beforeAssessmentRecordingLink: string
  afterAssessmentRecordingLink: string
  selfAssessmentAnswers: {
    question1: boolean
    question2: boolean
    question3: boolean
    question4: boolean
    question5: boolean
    question6: boolean
    question7: boolean
    question8: boolean
    question9: boolean
    question10: boolean
  }
  selfReflectiveAnswers: {
    question1: boolean
    question2: string
  }
}

export interface Notification {
  id?: string | null
  notificationSentTimestamp: Timestamp
  isNotificationRead: boolean
  notificationTitle: string
  notificationBody: string
  attemptUrl: string
}

// export all your collections
export const scenariosCol = createCollection<Scenario>('scenarios')
export const usersCol = createCollection<User>('users')
