import React, { Component, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/header/header.component';
import Loading from './components/loading/loading.component';
import './App.scss';

const IssuePage = React.lazy(() => import('./pages/issue/issue.component'));
const IssuesPage = React.lazy(() => import('./pages/issues/issues.component'));
const SignUpPage = React.lazy(() => import('./pages/sign-up/sign-up.component'));
const SignInPage = React.lazy(() => import('./pages/sign-in/sign-in.component'));
const KanbanBoardPage = React.lazy(() => import('./pages/kanban-board/kanban-board'));
const ProjectsPage = React.lazy(() => import('./pages/projects/projects.component'));

class App extends Component {
	render() {
		return (
			<div className="App">
				<BrowserRouter>
					<Header />
					<Suspense fallback={<Loading />}>
						<Switch>
							<Route exact path="/" component={() => <div />} />
							<Route exact path="/user/issue" component={() => <IssuePage />} />
							<Route exact path="/user/issues" component={() => <IssuesPage />} />
							<Route exact path="/sign-up" component={() => <SignUpPage />} />
							<Route exact path="/sign-in" component={() => <SignInPage />} />
							<Route exact path="/kanban" component={() => <KanbanBoardPage />} />
							<Route exact path="/projects" component={() => <ProjectsPage />} />
						</Switch>
					</Suspense>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
