import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/css/bootstrap-reboot.min.css';
import '../../node_modules/bootstrap/dist/css/bootstrap-grid.min.css';
import { Button, Tabs, Tab, Jumbotron,Card } from 'react-bootstrap';
import { listEmployee } from '../actions/index';
import PageHeader from './PageHeader'

class _EmployeeEditResume extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			employeeObj: {}
		};
	}
	componentWillReceiveProps(nextProps) {
		this.setState({ employeeObj: nextProps.employeeObj });
	}
	componentDidMount = (props) => {
		this.getEmployeeDataFaker(this.props.match.params.id);
	};

	getEmployeeDataFaker = (empId) => {
		this.props.getEmployeeById(empId);
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

	render = () => {
		const hdr = `Resume of ${this.state.employeeObj.firstName} ${this.state.employeeObj.lastName}`;
		return (
				<React.Fragment>
					<PageHeader text={hdr} allowBackNavigation={true}/>
					
					<div className="container">
					<div className="row-fluid">
						<Tabs defaultActiveKey="info">
							<Tab eventKey="info" title="Info">
								<Card><Card.Body><Card.Title>Info:</Card.Title><Card.Text>{this.state.employeeObj.info}</Card.Text></Card.Body></Card>
							</Tab>
							<Tab eventKey="projects" title="Projects">
								<Card><Card.Body><Card.Title>Projects:</Card.Title><Card.Text>{this.state.employeeObj.projects}</Card.Text></Card.Body></Card>
							</Tab>
							<Tab eventKey="hobbies" title="Hobbies">
								<Card><Card.Body><Card.Title>Hobbies:</Card.Title><Card.Text>{this.state.employeeObj.hobbies}</Card.Text></Card.Body></Card>
							</Tab>
							<Tab eventKey="notes" title="Notes">
								<Card><Card.Body><Card.Title>Notes:</Card.Title><Card.Text>{this.state.employeeObj.notes}</Card.Text></Card.Body></Card>
							</Tab>
						</Tabs>
					</div></div>
				</React.Fragment>
		);
	};
}

const mapStateToProps = (state) => {
	return {
		employeeObj: state.employeeObj
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getEmployeeById: (id) => dispatch(listEmployee(id))
	};
};

const EmployeeEditResume = connect(mapStateToProps, mapDispatchToProps)(_EmployeeEditResume);
export default EmployeeEditResume;
