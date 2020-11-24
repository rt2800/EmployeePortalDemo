import React , { Suspense } from 'react';
import { connect } from "react-redux";
import axios from 'axios';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/css/bootstrap-reboot.min.css';
import '../../node_modules/bootstrap/dist/css/bootstrap-grid.min.css';
import { listEmployee } from '../actions/index';
import PageHeader from './PageHeader';

class _EmployeeEdit extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			employeeObj: {}
		};
	}
	componentWillReceiveProps(nextProps) {
		this.setState({ employeeObj : nextProps.employeeObj });
	  }
	componentDidMount = (props) => {
		this.getEmployeeDataFaker(this.props.match.params.id);
	};

	getEmployeeDataFaker = (empId) => {
		let self = this;
		this.props.getEmployeeById(empId)
	};

	getEmployeeData = (empId) => {
		let self = this;
		axios
			.get('http://fake-evercheck-api-gwwotgcoww.now.sh/employees/' + empId, {
				responseType: 'json'
			})
			.then(function(response) {
				self.setState({
					employeeObj: response.data || {}
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

	onBackBtnClicked = () => {
		this.props.history.goBack();
	};

	onFlipToResume = (evt) =>{evt.preventDefault();
		this.props.history.push('/EmployeeEditResume/' + this.props.match.params.id );
	};

	render() {
		const hdr =  `Employee Details of ${this.state.employeeObj.firstName} ${this.state.employeeObj.lastName}`;
		return (
			<React.Fragment>
			<PageHeader text={hdr} allowBackNavigation={true}/>
			<div className="container">
			<div className="row">
				<div className="col-3">Employee ID: {this.state.employeeObj.empId}</div>
				<div className="col-9"><a href="#!" className="float-right" onClick={this.onFlipToResume}>Flip to Resume</a></div>
				</div>
				<hr className="hr-primary" />
			<div className="row">
				<div className="col-4"><img src={this.state.employeeObj.avatar} alt={this.state.employeeObj.firstName + ' ' + this.state.employeeObj.lastName}/></div>
			<div className="col-4">
				<dl style={{display:"grid", gridTemplateColumns: "max-content auto"}}>
                    <dd>First Name:</dd><dt>{this.state.employeeObj.firstName}</dt>
                    <dd>Last Name:</dd><dt >{this.state.employeeObj.lastName}</dt>
					<dd>Login name:</dd><dt >{this.state.employeeObj.loginName}</dt>
                    <dd>Email:</dd><dt >{this.state.employeeObj.email}</dt>
					<dd>Phone (Office):</dd><dt>{this.state.employeeObj.phone}</dt>
				</dl>
			</div>
			<div className="col-4">
			<div style={{marginLeft:"2%", float:"left"}}>
				<dl style={{display:"grid", gridTemplateColumns: "max-content auto"}}>
					<dd>Address:</dd><dt>{this.state.employeeObj.address}</dt>
                    <dd>City:</dd><dt>{this.state.employeeObj.city}</dt>
                    <dd>Postal Code:</dd><dt>{this.state.employeeObj.zipCode}</dt>
                    <dd>Country:</dd><dt>{this.state.employeeObj.country}</dt>
				</dl>
				</div>
			</div>
			</div>
			</div>
			</React.Fragment>
		);
	}
}


const mapStateToProps = (state) => {
	return {
	  employeeObj : state.employeeObj
	};
  }


  const  mapDispatchToProps = (dispatch) => {
	return {
		getEmployeeById: id => dispatch(listEmployee(id))
	};
  }

  
const EmployeeEdit = connect(mapStateToProps,mapDispatchToProps)(_EmployeeEdit);
export default EmployeeEdit;
