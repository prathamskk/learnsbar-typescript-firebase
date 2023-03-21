import {
  collection,
  CollectionReference,
  DocumentData,
  PartialWithFieldValue,
  QueryDocumentSnapshot,
  Timestamp,
} from 'firebase/firestore'
import { db } from '../config/firebase'

// This is just a helper to add the type to the db responses
const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(db, collectionName).withConverter(
    converter<Scenario>(),
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
  scenario_name: string
  scenario_video_link: string
  exemplar_video_link: string
  short_description: string
  scenario_description: string
}

export interface User {
  id?: string | null
  fcm_token: string | null
  has_enabled_notification: boolean
  roles: object
}

export interface Attempt {
  id?: string | null
  scenario_id: string
  submission_timestamp: Timestamp
  has_graded: boolean
  grade: object
  before_assessment_recording_link: string
  after_assessment_recording_link: string
  self_assessment_answers: {
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
  self_reflective_answers: {
    question1: boolean
    question2: string
  }
}

export interface Notification {
  receiver_id: string
  notification_sent_timestamp: Timestamp
  is_notification_read: boolean
  notification_title: string
  notification_body: string
  attempt_url: string
}

// export all your collections
export const scenariosCol = createCollection<Scenario>('scenarios')
export const notificationsCol = createCollection<Notification>('notifications')
export const attemptsCol = createCollection<Attempt>('attempts')
export const usersCol = createCollection<User>('users')
