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
import TestPage from './pages/Test'
import { useHeight } from './hooks/useHeight'
import { useState } from 'react'

function PrivateRouter() {
  const [isSecurePass, setIsSecurePass] = useState(false)
  // const { timestamp } = timestampStore()
  const { isLoading, hasCode } = useSecure()

  // const isTimestampPassedAfterThreeHours = new Date().getTime() - timestamp > 10800000

  if (isLoading) return <LoaderPage />
  if (!hasCode) return <SecurePage />
  if (!isSecurePass) return <SecurityPage onChangePass={() => setIsSecurePass(true)} />

  return (
    <Switch>
      <Route path='/' component={HomePage} />
      <Route path='/create' component={CreatorPage} />
      <Route path='/record/:id' component={RecordPage} />
      <Route path='/test' component={TestPage} />

      <Redirect to='/' />
    </Switch>
  )
}

function App() {
  useHeight()
  const { user } = authStore()
  const { loading } = useAuthState()
  // const [isSecurePass, setIsSecurePass] = useState(false)

  // return <SecurityPage onChangePass={() => setIsSecurePass(true)} />
  if (loading) return <LoaderPage />
  if (user) return <PrivateRouter />

  return (
    <Switch>
      <Route path='/' component={Splash} />
      <Route path='/login' component={LoginPage} />
      <Route path='/test' component={TestPage} />
      <Redirect to='/' />
    </Switch>
  )
}

export default App
