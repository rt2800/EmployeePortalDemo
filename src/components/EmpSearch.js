import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Button, Control, Form, FormControl, FormGroup } from 'react-bootstrap';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/css/bootstrap-reboot.min.css';
import '../../node_modules/bootstrap/dist/css/bootstrap-grid.min.css';
import { searchEmployee } from '../actions';
import NotFound404 from '../notfound404';

class _EmployeeSearch extends React.Component {
	constructor(props) {
        super(props);
        this.bShowSuggestions=false;
		this.state = {
            searchResults: []
		};
	}
	componentWillReceiveProps(nextProps) {}
	componentDidMount = (props) => {};

	onSearchTermChanged = (evt) => {
        this.bShowSuggestions=true;
            this.props.searchEmployee(evt.target.value); 
            if(!evt.target.value || evt.target.value.length===0) this.bShowSuggestions=false;
	};
    renderResults = () => { 
        return this.props.searchResults.map((found) => {
			const { empId, firstName, lastName } = found; //destructuring
			return (
                <li><a href={ '/EmployeeEdit/' + empId}>{firstName + ' ' + lastName} - {empId}</a></li>
            )});
    }
    render = () => {
		return (
				<div style={{float:"right", marginRight:"2%"}}>
					<Form.Control {...this.props} placeholder="Enter text or number..." onChange={this.onSearchTermChanged} />
                    {
                        (this.bShowSuggestions === true) ? <ul style={{listStyleType: "none", paddingInlineStart: "5%", border: "2px solid #90bade"}}>{this.renderResults()}</ul> : ''
                    }
				</div>
		);
	};
}

const mapStateToProps = (state) => {
	return {
        searchResults: state.searchResults
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		searchEmployee: (searchTerm) => dispatch(searchEmployee(searchTerm))
	};
};

const EmployeeSearch = connect(mapStateToProps, mapDispatchToProps)(_EmployeeSearch);
export default EmployeeSearch;
