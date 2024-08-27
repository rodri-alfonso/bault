import HomePage from './pages/Home'
import CreatorPage from './pages/Creator'
import { Route, Switch, Redirect } from 'wouter'
import LoginPage from './pages/Login'
import { authStore } from './stores/auth'
import RecordPage from './pages/Record'
import { timestampStore } from './stores/timestamp'
import SecurityPage from './pages/Security'
import { registerStore } from './stores/security'
import RegisterPage from './pages/Register'
import useAuthState from './hooks/useAuthState'
import LoaderPage from './pages/Loader'

function PrivateRouter() {
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
  const { isProtected } = timestampStore()
  const { isInRegisterCode } = registerStore()

  const { loading } = useAuthState()

  // const isTimestampPassedAfterTwoMinutes = new Date().getTime() - timestamp > 120000
  // console.log('🚀 ~ App ~ isTimestampPassedAfterTwoMinutes:', isTimestampPassedAfterTwoMinutes)

  if (loading) return <LoaderPage />

  if (isInRegisterCode) return <RegisterPage />
  if (isProtected) return <SecurityPage />
  if (user) return <PrivateRouter />

  return (
    <Switch>
      <Route path='/' component={LoginPage} />
      <Redirect to='/' />
    </Switch>
  )
}

export default App
