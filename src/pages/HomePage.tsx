import { signOut } from 'firebase/auth'
import { Link } from 'react-router-dom'
import { auth } from '../config/firebase'
const HomePage = () => {
  signOut
  return (
    <div>
      <Link to='/scenarios'>
        <button>Scenarios Page</button>
      </Link>
      <Link to='/attempts'>
        <button>All Attempts Page</button>
      </Link>
      HomePage
      <button
        className='mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2  text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        onClick={() => signOut(auth)}
      >
        Log Out
      </button>
    </div>
  )
}

export default HomePage
