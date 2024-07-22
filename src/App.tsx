import HomePage from './pages/Home'
import CreatorPage from './pages/Creator'
import { Route, Switch, Redirect } from 'wouter'

function App() {
	return (
		<Switch>
			<Route path='/' component={HomePage} />
			<Route path='/create' component={CreatorPage} />
			<Redirect to='/' />
		</Switch>
	)
}

export default App
