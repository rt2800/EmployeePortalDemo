import React, { Suspense } from 'react';
import { connect } from "react-redux";
import axios from 'axios';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/css/bootstrap-reboot.min.css';
import '../../node_modules/bootstrap/dist/css/bootstrap-grid.min.css';
import { Button, Table, Modal, ModalBody, ModalTitle, ModalFooter } from 'react-bootstrap';


import { listAllEmployees, deleteEmployeeById, editEmployee } from '../actions/index'
import EditEmployeeModal from './EmployeeEditModal'
import PageHeader from './PageHeader';
import EmployeeListPagination from '../components/EmployeeListPagination'

const Employee = ({ match }) => <p>{match.params.id}</p>;



class _EmployeeList extends React.Component {
	
	constructor(props) {
		super(props);
		this.PAGE_SIZE = 10;
		this.activePageNum = 1;
		this.showEditModal=false;
		this.startRecIndex=0;
		this.endRecIndex=1*this.PAGE_SIZE;
		this.state = {
			employees: []
		};
	}
	
	componentDidMount = (props) => {
		this.props.listAllEmployees();
  };
	getEmployeeData = () => {
		let self = this;
		axios
			.get('http://fake-evercheck-api-gwwotgcoww.now.sh/employees', {
				responseType: 'json'
			})
			.then(function(response) {
				self.setState({
					employees: response.data
				});
				//self.createTable();
			})
			.catch(function(error) {
				// handle error
				console.log(error);
			})
			.finally(function() {
				// always executed
			});
	};
	onDeleteEmp = (empIdToRemove) =>{
		if(window.confirm('Do you want to delete this employee record?') === false) return false;
		this.props.deleteEmployeeById(empIdToRemove);
	};

	onEditEmp =(evt) =>{
		evt.preventDefault();
		this.showEditModal=true;
	};

	onEmpEditCompleted = (obj)=>{
		this.props.editEmployee(obj);
	};



	createTable = () => {
		return this.props.employees.sort((a,b) => a.empId - b.empId).slice(this.startRecIndex, this.endRecIndex).map((emp, index) => {
			const { empId, firstName, lastName } = emp; //destructuring
			return (
				<tr key={empId}>
					<td>{empId}</td>
					<td>
						<a href={'/EmployeeEdit/' + empId }>{firstName + " " + lastName}</a>
					</td>
					{/* <td>
						<a href={'mailto:' + email}>{email}</a>
					</td> */}
					<td><EditEmployeeModal empObj={emp} onSubmit={this.onEmpEditCompleted} mode="Edit" /> | <a href="#!" onClick={(evt)=> { this.onDeleteEmp(emp.empId); evt.preventDefault();}}>Delete</a></td>
				</tr>
			);
		});
	};

	onSubmit = () => {
		this.props.history.push('/');
	};

	onActivePageChanged = (activePageNumber)=>{
		if(activePageNumber === -1) this.activePageNum = this.activePageNum-1 > 0 ? this.activePageNum-1 : 1;
		else if(activePageNumber === -2) this.activePageNum = this.activePageNum+1;
		else if(activePageNumber < 0) this.activePageNum = 1;
		else this.activePageNum=activePageNumber;
		this.startRecIndex = (this.activePageNum-1)*this.PAGE_SIZE;
		this.endRecIndex = this.activePageNum*10;
		this.forceUpdate()
	};

	render() {
		return (
			<React.Fragment>
			<PageHeader text="Employee List" allowBackNavigation={true} />
			
			<div className="container">
				<div className="row">
				<EditEmployeeModal
					empObj={null} 
					onSubmit={this.onEmpEditCompleted} 
					employeeList={this.props.employees}/>
					<Table bordered hover size="sm">
						<thead>
							<tr>
								<th>Emp Id</th>
								<th>Full Name</th>
								{/* <th>Email</th> */}
								<th>&nbsp;</th>
							</tr>
						</thead>
						<tbody>{this.createTable()}</tbody>
					</Table>
					<EmployeeListPagination 
						list={this.props.employees} 
						onActivePageChanged={this.onActivePageChanged} 
						activePageNum={this.activePageNum} />
				</div>
	  		</div>
			</React.Fragment>
		);
	}
}

function mapStateToProps(state, ownProp) {
	return {
		employees : state.employees
	  };
}


function mapDispatchToProps(dispatch) {
	return {
		deleteEmployeeById : (id) => dispatch(deleteEmployeeById(id)),
		editEmployee : (obj) => dispatch(editEmployee(obj)),
		listAllEmployees
	  };
}


const employeeList = connect(mapStateToProps,mapDispatchToProps)(_EmployeeList);
export default employeeList;