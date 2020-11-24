import React from 'react';
import { Formik, Field  } from 'formik';
import * as Yup from 'yup';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/css/bootstrap-reboot.min.css';
import '../../node_modules/bootstrap/dist/css/bootstrap-grid.min.css';
import { Button, Modal } from 'react-bootstrap';

class EditEmployeeModal extends React.Component {
	constructor(props) {
		super(props);
		this.mode=props.mode;
		this.state = {
			name: '',
			email: '',
			color: '',
			firstName: '',
			lastName: '',
			address: '',
			city: '',
			zipCode: '',
			phone: '',
			country: '',
			hobbies: [],
			projects: [],
			notes: '',
			info: '',
			avatar: '',
			modalShow: false
		};
	}

	isUserNamePresent = (userNameToCheck)=>{
		return this.props.employeeList.filter((empObj) => { return  empObj.loginName.toLowerCase() === userNameToCheck.toLowerCase() } ).length > 0;
	};

	isEmpIDPresent = (empIDToCheck)=>{
		var num = parseInt(empIDToCheck);
		return this.props.employeeList.filter((empObj) => { return  empObj.empId === num } ).length > 0;
	};

	render() {
		const empAddEditValidation = Yup.object().shape({
			firstName: Yup.string()
			.min(3, 'Too Short!')
			.max(40, 'Please enter no more than 40 characters')
			.required( 'Please enter first name' ),
			empId: Yup.number().positive().integer()
			.required( 'Please enter emp ID' ),
			lastName: Yup.string()
			.min(3, 'Too Short!')
			.max(40, 'Please enter no more than 40 characters')
			.required('Please enter last name'),
			email: Yup.string()
			.min(5, 'Too Short!')
			.email('Please enter a valid email')
			.required('Please enter an email'),
			name: Yup.string()
			.min(5, 'Too Short!')
			.max(40, 'Please enter no more than 40 characters')
			.required('Please enter an user name'),
			address: Yup.string()
			.min(10, 'Too Short!')
			.max(100, 'Please enter no more than 100 characters')
			.required('Please enter an address'),
			city: Yup.string()
			.min(5, 'Too Short!')
			.max(50, 'Please enter no more than 50 characters')
			.required('Please enter an city'),
			zipCode: Yup.string()
			.min(3, 'Too Short!')
			.max(20, 'Please enter no more than 20 characters')
			.required('Please enter an zipCode'),
			phone: Yup.string()
			.min(5, 'Too Short!')
			.max(20, 'Please enter no more than 20 characters')
			.required('Please enter an phone'),
			notes: Yup.string()
			.max(100, 'Please enter no more than 100 characters')
			.required('Please enter an notes'),
			info: Yup.string()
			.max(100, 'Please enter no more than 40 characters')
			.required('Please enter an info'),
			avatar: Yup.string().url()
			.max(500, 'Please enter no more than 500 characters')
			});
		return (
			<React.Fragment>
				<a href="#!" onClick={() => this.setState({ ...this.state, modalShow: true })}>
					{this.props.empObj === null ? "Add": "Edit"}
				</a>
				<Modal
					show={this.state.modalShow}
					onHide={() => this.setState({ ...this.state, modalShow: false })}
					size="lg"
					aria-labelledby="contained-modal-title-vcenter"
					centered>
					<Formik
						initialValues={{ ...this.props.empObj }}
						onSubmit={(values) => {
							var hobbiesA = values.hobbies;
							var projectsA = values.projects;
							hobbiesA = typeof hobbiesA !== 'object' && hobbiesA.split(',');
							projectsA = typeof projectsA !== 'object' && projectsA.split(',');
							if(hobbiesA) values.hobbies = hobbiesA
							if(projectsA) values.projects = projectsA
							this.props.onSubmit(values);
						}}
                        onChange={(evt) =>{
                            console.log(evt.target.value)
                        }}
						validationSchema={empAddEditValidation}
						validateOnBlur={false}	
						validateOnChange={false}	>
						{(props) => {
							const {
								values,
								touched,
								errors,
								dirty,
								isSubmitting,
								handleChange,
								handleBlur,
								handleSubmit,
								handleReset
							} = props;
							return (
								<form onSubmit={handleSubmit}>
									<Modal.Dialog scrollable size="lg">
										{
											this.props.empObj !== null ? 
											<Modal.Header>
												<Modal.Title id="contained-modal-title-vcenter">
													Edit information for{' ' + this.props.empObj?.firstName + ' ' + this.props.empObj?.lastName + ' (' + this.props.empObj?.empId + ')'}
												</Modal.Title>
											</Modal.Header> : 
											<Modal.Title id="contained-modal-title-vcenter">Add New Employee Details</Modal.Title>
										}
										
										<Modal.Body>
										{ this.props.empObj === null ? 
											<div className="form-Row">
												<div className="Form-Group" >
													<label>First Name: </label>
													<Field
                                                        id="firstName"
														placeholder="Enter first name"
														value={values.firstName|| ''}
														onChange={handleChange}
														onBlur={handleBlur}
														className={
															errors.firstName && touched.firstName ? (
																'form-control text-input error'
															) : (
																'form-control text-input'
															)
														}
													/>
													{errors.firstName &&
													touched.firstName && <div className="input-feedback error">{errors.firstName}</div>}
												</div>
												<div className="Form-Group" >
													<label>Last Name: </label>
													<Field
                                                        id="lastName"
														type="input"
														placeholder="Enter last name"
														value={values.lastName|| ''}
														onChange={handleChange}
														onBlur={handleBlur}
														className={
															errors.lastName && touched.lastName ? (
																'form-control text-input error'
															) : (
																'form-control text-input'
															)
														}
													/>
													{errors.lastName &&
													touched.lastName && (
														<div className="input-feedback">{errors.lastName}</div>
													)}
												</div>
												<div className="Form-Group" >
													<label>Employee ID: </label>
													<Field
                                                    id="empId"
														type="input"
														placeholder="Enter employee Id"
														value={values.empId|| ''}
														onChange={handleChange}
														onBlur={e => {
															// call the built-in handleBur
															handleBlur(e)
															let parsedNum = parseInt(e.currentTarget.value)
															if( isNaN(parsedNum) || parsedNum < 0) {
																errors.empId= 'Employee ID should be non-zero positive number';
																return errors;
															}
															errors.empId='';
															// and do something about e
															let alreadyPresent = this.isEmpIDPresent(parsedNum);
															if(alreadyPresent){
																errors.empId= 'Employee ID already present! Add another';
																return errors;
															}
														}}
														className={
															errors.empId && touched.empId ? (
																'form-control text-input error'
															) : (
																'form-control text-input'
															)
														}
													/>
													{errors.empId &&
													touched.empId && (
														<div className="input-feedback">{errors.empId}</div>
													)}
												</div>
											</div> : 
											<span>&nbsp;</span>
										}

											<div className="form-Row">
												<div className="Form-Group" >
													<label>UserName: </label>
													<Field
                                                        id="loginName"
														placeholder="Enter loginName"
														value={values.loginName|| ''}
														onChange={handleChange}
														onBlur={e => {
															// call the built-in handleBur
															handleBlur(e)
															let username = (e.currentTarget.value)
															errors.loginName='';
															// and do something about e
															let alreadyPresent = this.isUserNamePresent(username);
															if(alreadyPresent){
																errors.loginName= 'UserName already present! Add another';
																return errors;
															}
														}}
														className={
															errors.loginName && touched.loginName ? (
																'form-control text-input error'
															) : (
																'form-control text-input'
															)
														}
													/>
													{errors.loginName &&
													touched.loginName && <div className="input-feedback">{errors.loginName}</div>}
												</div>
												<div className="Form-Group" >
													<label>Email: </label>
													<Field
                                                        id="email"
														type="input"
														placeholder="Enter email"
														value={values.email|| ''}
														onChange={handleChange}
														onBlur={handleBlur}
														className={
															errors.email && touched.email ? (
																'form-control text-input error'
															) : (
																'form-control text-input'
															)
														}
													/>
													{errors.email &&
													touched.email && (
														<div className="input-feedback">{errors.email}</div>
													)}
												</div>
												<div className="Form-Group" >
													<label>Phone: </label>
													<Field
                                                    id="phone"
														type="input"
														placeholder="Enter phone"
														value={values.phone|| ''}
														onChange={handleChange}
														onBlur={handleBlur}
														className={
															errors.phone && touched.phone ? (
																'form-control text-input error'
															) : (
																'form-control text-input'
															)
														}
													/>
													{errors.phone &&
													touched.phone && (
														<div className="input-feedback">{errors.phone}</div>
													)}
												</div>
											</div>

											<div className="Form-Row">
												<div className="Form-Group" >
													<label>Address: </label>
													<Field
                                                    id="address"
														placeholder="1234 Main St"
														value={values.address|| ''}
														onChange={handleChange}
														onBlur={handleBlur}
														className={
															errors.address && touched.address ? (
																'form-control text-input error'
															) : (
																'form-control text-input'
															)
														}
													/>
													{errors.address &&
													touched.address && (
														<div className="input-feedback">{errors.address}</div>
													)}
												</div>

												<div className="Form-Group" >
													<label>City: </label>
													<Field
                                                    id="city"
														value={values.city|| ''}
														onChange={handleChange}
														onBlur={handleBlur}
														className={
															errors.city && touched.city ? (
																'form-control text-input error'
															) : (
																'form-control text-input'
															)
														}
													/>
													{errors.city &&
													touched.city && <div className="input-feedback">{errors.city}</div>}
												</div>

												<div className="Form-Group" >
													<label>Country: </label>
													<Field component="select" id="country" value={values.country|| ''} className="form-control">
														<option>Choose...</option>
														<option>USA</option>
													</Field>
												</div>

												<div className="Form-Group" >
													<label>Zip: </label>
													<Field
                                                    id="zipCode"
														value={values.zipCode|| ''}
														onChange={handleChange}
														onBlur={handleBlur}
														className={
															errors.zipCode && touched.zipCode ? (
																'form-control text-input error'
															) : (
																'form-control text-input'
															)
														}
													/>
													{errors.zipCode &&
													touched.zipCode && (
														<div className="input-feedback">{errors.zipCode}</div>
													)}
												</div>
											</div>

											<div className="Form-Row">
												<div className="Form-Group" >
													<label>Hobbies: </label>
													<Field
                                                    id="hobbies"
														placeholder="hobbies"
														value={values.hobbies|| ''}
														onChange={handleChange}
														onBlur={handleBlur}
														className={
															errors.hobbies && touched.hobbies ? (
																'form-control text-input error'
															) : (
																'form-control text-input'
															)
														}
													/>
													{errors.hobbies &&
													touched.hobbies && (
														<div className="input-feedback">{errors.hobbies}</div>
													)}
												</div>
												<div className="Form-Group" >
													<label>Avatar url: </label>
													<Field
                                                    id="avatar"
														placeholder="photo URL"
														value={values.avatar|| ''}
														onChange={handleChange}
														onBlur={handleBlur}
														className={
															errors.avatar && touched.avatar ? (
																'form-control text-input error'
															) : (
																'form-control text-input'
															)
														}
													/>
													{errors.avatar &&
													touched.avatar && (
														<div className="input-feedback">{errors.avatar}</div>
													)}
												</div>
											</div>
											<div className="Form-Row">
												<div className="Form-Group" >
													<label>Projects: </label>
													<Field
                                                    id="projects"
														rows={5}
														columns={10}
														value={values.projects|| ''}
														onChange={handleChange}
														onBlur={handleBlur}
														className={
															errors.projects && touched.projects ? (
																'form-control text-input error'
															) : (
																'form-control text-input'
															)
														}
													/>
													{errors.projects &&
													touched.projects && (
														<div className="input-feedback">{errors.projects}</div>
													)}
												</div>
												<div className="Form-Group" >
													<label>Notes: </label>
													<Field
                                                    id="notes"
														rows={5}
														columns={10}
														value={values.notes|| ''}
														onChange={handleChange}
														onBlur={handleBlur}
														className={
															errors.notes && touched.notes ? (
																'form-control text-input error'
															) : (
																'form-control text-input'
															)
														}
													/>
													{errors.notes &&
													touched.notes && (
														<div className="input-feedback">{errors.notes}</div>
													)}
												</div>
											</div>
										</Modal.Body>
										<Modal.Footer>
											<Button
												type="submit"
												onClick={() => {
													this.setState({ ...this.state, modalShow: false });
												}}
											>
												Save and Close
											</Button>{' '}
											<Button
												onClick={() => {
													this.setState({ ...this.state, modalShow: false });
												}}
											>
												Cancel
											</Button>
										</Modal.Footer>
									</Modal.Dialog>
								</form>
							);
						}}
					</Formik>
				</Modal>
			</React.Fragment>
		);
	}
}

export default EditEmployeeModal;
