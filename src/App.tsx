import HomePage from './pages/Home'
import CreatorPage from './pages/Creator'
import { Route, Switch, Redirect } from 'wouter'
import LoginPage from './pages/Login'
import { authStore } from './stores/auth'
import RecordPage from './pages/Record'
import useAuthState from './hooks/useAuthState'
import LoaderPage from './pages/Loader'
import SecurityPage from './pages/Security'
import { timestampStore } from './stores/timestamp'
import { useSecure } from './hooks/useSecure'
import SecurePage from './pages/Secure'
import Splash from './pages/Splash'

function PrivateRouter() {
  const { timestamp } = timestampStore()
  const { isLoading, hasCode } = useSecure()

  const isTimestampPassedAfterThreeHours = new Date().getTime() - timestamp > 10800000

  if (isLoading) return <LoaderPage />
  if (!hasCode) return <SecurePage />
  if (isTimestampPassedAfterThreeHours) return <SecurityPage />

  return (
    <Switch>
      <Route path='/' component={HomePage} />
      <Route path='/create' component={CreatorPage} />
      <Route path='/record/:id' component={RecordPage} />
      <Redirect to='/' />
    </Switch>
  )
}

function App() {
  const { user } = authStore()
  const { loading } = useAuthState()

  if (loading) return <LoaderPage />
  if (user) return <PrivateRouter />

  return (
    <Switch>
      <Route path='/' component={Splash} />
      <Route path='/login' component={LoginPage} />
      <Redirect to='/' />
    </Switch>
  )
}

export default App
