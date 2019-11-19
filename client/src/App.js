import React, { Component, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CreateIssue from './pages/create-issue/create-issue.component';
import Header from './components/header/header.component';
import './App.css';

const Issues = React.lazy(() => import('./pages/issues/issues.component'));
const SignUp = React.lazy(() => import('./pages/sign-up/sign-up.component'));
const SignIn = React.lazy(() => import('./pages/sign-in/sign-in.component'));
const KanbanBoard = React.lazy(() => import('./pages/kanban-board/kanban-board'));

class App extends Component {
	checkAuthAndGoToHomepage() {}

	render() {
		return (
			<div className="App">
				<BrowserRouter>
					<Header />
					<Suspense fallback={<div>..loading</div>}>
						<Switch>
							<Route exact path="/" component={() => <CreateIssue />} />

							<Route exact path="/user/issues" component={() => <Issues />} />

							<Route
								exact
								path="/sign-up"
								component={() => <SignUp checkAuthAndGoToHomepage={this.checkAuthAndGoToHomepage} />}
							/>
							<Route
								exact
								path="/sign-in"
								component={() => <SignIn checkAuthAndGoToHomepage={this.checkAuthAndGoToHomepage} />}
							/>
							<Route exact path="/kanban" component={() => <KanbanBoard />} />
						</Switch>
					</Suspense>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
