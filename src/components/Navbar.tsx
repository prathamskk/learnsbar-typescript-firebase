import { User } from 'firebase/auth'
import React from 'react'
import NotificationDrawer from './NotificationDrawer'

const Navbar = (props: { user: User }) => {
  return (
    <div className='bg-slate-700'>
      Navbar {props.user.displayName}
      {props.user.uid}
      <NotificationDrawer user={props.user} />
    </div>
  )
}

export default Navbar
