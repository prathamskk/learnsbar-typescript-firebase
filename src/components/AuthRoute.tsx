import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../config/firebase'
import { Outlet, useNavigate } from 'react-router-dom'

const AuthRoute = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const AuthCheck = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false)
      } else {
        console.log('unauthorized')
        navigate('/login')
      }
    })

    return () => AuthCheck()
  }, [auth])

  if (loading) return <p>loading ...</p>

  return <>{<Outlet />}</>
}

export default AuthRoute
