import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CreateIssue from './pages/create-issue/create-issue.component';
import Issues from './pages/issues/issues.component';
import Header from './components/header/header.component';
import './App.css';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Header />
				<Switch>
					<Route exact path="/" component={() => <CreateIssue />} />
					<Route exact path="/user/issues" component={() => <Issues />} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
