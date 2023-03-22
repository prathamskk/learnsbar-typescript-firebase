import { User } from 'firebase/auth'
import {
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { createSubCollection, Notification } from '../models/collections'

const NotificationDrawer = (props: { user: User }) => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [lastNotification, setLastNotification] = useState<QueryDocumentSnapshot<Notification>>()
  const [disabled, setDisabled] = useState(false)
  useEffect(() => {
    // Query the first page of docs
    const fetchFirst = async () => {
      const notificationsCol = createSubCollection<Notification>(
        'users',
        props.user.uid,
        'notifications',
      )
      const first = query(notificationsCol, orderBy('notificationSentTimestamp', 'desc'), limit(2))
      const documentSnapshots = await getDocs(first)
      const notificationsList = documentSnapshots.docs.map((doc) => {
        return doc.data()
      })
      if (documentSnapshots.empty) {
        setDisabled(true)
      }
      setNotifications(notificationsList)
      setLastNotification(documentSnapshots.docs[documentSnapshots.docs.length - 1])
    }

    fetchFirst()
  }, [])

  const fetchNext = async () => {
    const notificationsCol = createSubCollection<Notification>('users', props.user.uid, 'attempts')
    const next = query(
      notificationsCol,
      orderBy('submissionTimestamp', 'desc'),
      startAfter(lastNotification),
      limit(2),
    )
    const documentSnapshots = await getDocs(next)
    const attemptsList = documentSnapshots.docs.map((doc) => {
      return doc.data()
    })
    setNotifications((prev) => [...prev, ...attemptsList])
    setLastNotification(documentSnapshots.docs[documentSnapshots.docs.length - 1])
    if (documentSnapshots.empty) {
      setDisabled(true)
    }
  }

  return (
    <div>
      {notifications.map((notification) => {
        return (
          <div key={notification.id}>
            <div>{notification.notificationTitle}</div>
            <div>{notification.notificationBody}</div>
            <div>{notification.attemptUrl}</div>
            <div>{notification.notificationSentTimestamp.toDate().toString()}</div>
          </div>
        )
      })}

      <button onClick={fetchNext} disabled={disabled}>
        FETCH MORE
      </button>
    </div>
  )
}

export default NotificationDrawer
