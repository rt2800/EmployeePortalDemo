import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap-reboot.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap-grid.min.css';
import { Button, Control, Form, FormControl, FormGroup } from 'react-bootstrap';
import EmployeeSearch from './components/EmpSearch';
import PageHeader from './components/PageHeader'

import './App.css';
import {searchEmployee} from './actions/index'
import SimpleForm from './SimpleForm';
import Timer from './Timer';

// const App = ({name}) => (
//   <div className="App">
//     <div className="form">
//     <SimpleForm />
//     <Timer />
//   </div>
//   </div>

// );
export default class App extends React.Component {
	onSubmit = (evt) => {
		alert(evt.target.innerText);
	};
	handleEmployeeList = () => {
		this.props.history.push('/Employees');
	};
	onEmployeeSearch = (evt) => {
		console.log(evt.target.value);
		this.props.searchEmployee(evt.target.value);
	};
	render() {
		return (
			<React.Fragment>
			<PageHeader text="Home" allowBackNavigation={false}/>
			<div className="container">
			<div className="row">
				{/* <div className="col-4"><Button onClick={this.onSubmit}>Display Not Found</Button></div> */}
				<div className="col-4"><Button onClick={this.handleEmployeeList}>Show Employee List</Button></div>
				<div className="col-4"><EmployeeSearch width="300px" /></div>
			</div>
			</div></React.Fragment>
		);
	}
}
