import HomePage from './pages/Home'
import CreatorPage from './pages/Creator'
import { Route, Switch, Redirect } from 'wouter'
import LoginPage from './pages/Login'
import { authStore } from './stores/auth'

function PrivateRouter() {
	return (
		<Switch>
			<Route path='/' component={HomePage} />
			<Route path='/create' component={CreatorPage} />
			<Redirect to='/' />
		</Switch>
	)
}

function App() {
	const { user } = authStore()

	if (user) return <PrivateRouter />

	return (
		<Switch>
			<Route path='/' component={LoginPage} />
			<Redirect to='/' />
		</Switch>
	)
}

export default App
