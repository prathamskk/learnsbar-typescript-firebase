import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'
import AuthRoute from './components/AuthRoute'
import LoginPage from './pages/LoginPage'
import ScenariosPage from './pages/scenarios/ScenariosPage'
import ScenarioDetailPage from './pages/scenarios/ScenarioDetailPage'
import AttemptsPage from './pages/AllAttemptsPage'
import NewAttemptPage from './pages/scenarios/NewAttemptPage'
import ScenarioAttemptsPage from './pages/scenarios/ScenarioAttemptsPage'

function App() {
  return (
    <Routes>
      <Route path='*' element={<NotFound />} />
      <Route element={<AuthRoute />}>
        <Route path='/' element={<HomePage />} />
        <Route path='attempts' element={<AttemptsPage />} />
        <Route path='scenarios' element={<ScenariosPage />}>
          <Route path=':scenarioId' element={<ScenarioDetailPage />}>
            <Route path='new' element={<NewAttemptPage />} />
            <Route path='attempts' element={<ScenarioAttemptsPage />} />
          </Route>
        </Route>
      </Route>
      <Route path='login' element={<LoginPage />} />
    </Routes>
  )
}

export default App
