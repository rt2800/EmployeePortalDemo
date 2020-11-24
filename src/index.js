import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { NavLink, Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap-reboot.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap-grid.min.css';

import './index.css';
import App from './App';
import employeeStore from './store/index';

import employeeList from './components/EmployeeList';
import EmployeeEdit from './components/EmployeeEdit';
import EmployeeResume from './components/EmployeeEditResume'


import Contact from './contacts';
import NotFound404 from './notfound404';



export default class Routing extends React.Component {
	render = () => {
		return (
			<Router>
				<React.Fragment>
					{/* <Nav onSelect={(selectedKey) => (document.getElementById('lblTopHeader').innerText = selectedKey)}>
						<Nav.Item>
							<Nav.Link eventKey="Home" href="/">
								Home
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey="Employees" href="/Employees">
								Employees
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey="Contact" href="/Contact">
								Contact
							</Nav.Link>
						</Nav.Item>
					</Nav> */}
					<Switch>
						<Route exact path="/" component={App} />
						<Route path="/Employees" component={employeeList} />
						<Route path="/Contact" component={Contact} />
						<Route path="/EmployeeEdit/:id" component={EmployeeEdit} />
						<Route path="/EmployeeEditResume/:id" component={EmployeeResume} />
						<Route component={NotFound404} />
					</Switch>
				</React.Fragment>
			</Router>
		);
	}
}

ReactDOM.render(
	<Provider store={employeeStore}>
		<Routing />
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
