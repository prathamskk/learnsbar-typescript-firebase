import { signOut } from 'firebase/auth'
import { Link } from 'react-router-dom'
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
    </div>
  )
}

export default HomePage
