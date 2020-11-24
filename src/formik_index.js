import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Formik, Form, Field } from 'formik';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { NavLink, Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap-reboot.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap-grid.min.css';
import { Nav } from 'react-bootstrap/dist/react-bootstrap';

import './index.css';
//import App from './App';
import employeeStore from './store/index';
import rootReducer from './reducers/index';

import employeeList from './Employees';
import EmployeeEdit from './EmployeeEdit';
import Contact from './contacts';
import NotFound404 from './notfound404';
import EmployeeResume from './EmployeeEditResume';
import ParentChild from './children';
import Style from './style';
import * as serviceWorker from './serviceWorker';

function App() {
	const [ result, setResult ] = useState('');

	function CustomInputTxt({ field, form, ...props }) {
		return <input {...field} {...props} />;
    }
    function CustomInputChk({ field, form, ...props }) {
		return <input type="checkbox" {...field} {...props} />;
	}
    function CaptureTextArea(event){
        console.log(event.target.value);
    }
	return (
		// Formik is the main component that handles all the logic
		// Form is just a regular html <form> wrapper
		<Formik
			initialValues={{
				email: '',
				name: '',
				color: '',
                chk:''
			}}
			onSubmit={(values, actions) => {
				setResult(JSON.stringify(values));
			}}>
			{() => (
				<Form>
					<Field as="select" name="color">
						<option value="none">Pick a color</option>
						<option value="red">Red</option>
						<option value="green">Green</option>
						<option value="blue">Blue</option>
					</Field>
					<br />
					<Field as="textarea" value={result} name="txtBulk" rows={5} onChange={CaptureTextArea} />
					<br />
					<Field name="email">
						{({ field }) => (
							<React.Fragment>
								<label htmlFor="txtEmail">email:</label>
								<input name="txtEmail" type="email" required placeholder="Email" {...field} />
							</React.Fragment>
						)}
					</Field>
					<br />
					<Field name="name" required placeholder="Name" component={CustomInputTxt} /><br/>
                    <Field name="chk" as="checkbox" component={CustomInputChk} /><br/>
					<button type="submit">Submit</button>
				</Form>
			)}
		</Formik>
	);
}

ReactDOM.render(<App />, document.getElementById('root'));
