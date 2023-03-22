import React, { useState } from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { doc, setDoc } from 'firebase/firestore'
import { usersCol } from '../models/collections'

const LoginPage = () => {
  const auth = getAuth()
  const navigate = useNavigate()
  const [authing, setAuthing] = useState(false)

  const signInWithGoogle = async () => {
    setAuthing(true)

    signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
        console.log(response.user.uid)
        setDoc(doc(usersCol, response.user.uid), {
          fcmToken: '234rdfshf',
          hasEnabledNotification: false,
        })
        console.log('doc set')

        navigate('/')
      })
      .catch((error) => {
        console.log(error)
        setAuthing(false)
      })
  }

  return (
    <div>
      <p>Login Page</p>
      <button onClick={() => signInWithGoogle()} disabled={authing}>
        Sign in with Google
      </button>
    </div>
  )
}

export default LoginPage
