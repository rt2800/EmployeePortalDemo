import {
	ADD_EMPLOYEE,
	EDIT_EMPLOYEE,
	FETCH_EMPLOYEE,
	FETCH_ALL_EMPLOYEES,
	DELETE_EMPLOYEE,
	SEARCH_EMPLOYEE
} from '../constants.js';

// var initialState = {
//     employees: [],
//     employeeObj:{},
//     searchResults:[]
//   };

//function rootReducer(state = initialState, action) {
function rootReducer(state, action) {
	switch (action.type) {
		case ADD_EMPLOYEE:
			return Object.assign({}, state, {
				employees: [...state.employees, Object.assign({}, action.payload)]
			});
		case EDIT_EMPLOYEE:
			var listWithoutEditedObj = state.employees.filter((empSearched) => {
				return empSearched.empId !== parseInt(action.payload.empId);
			});
			return  Object.assign({},state,
				{
					employees: [...listWithoutEditedObj, Object.assign({}, action.payload)],
					employeeObj: Object.assign({}, action.payload)
				});
			break;
		case FETCH_EMPLOYEE:
			var found = state.employees.filter((empSearched) => {
				return empSearched.empId === parseInt(action.payload);
			});
			if (found && found.length > 0) {
				return Object.assign(
					{},
					{
						employees: state.employees.concat(state.employees),
						employeeObj: Object.assign({}, found[0])
					}
				);
			}
			break;
		case FETCH_ALL_EMPLOYEES:
			return Object.assign({}, state);
			break;
		case DELETE_EMPLOYEE:
			if (action.payload && action.payload === '') return { ...state, searchResults: [] };
			var NotDeletedObjects = state.employees.filter((empSearched) => {
				return(empSearched.empId !== action.payload);
			});

			return Object.assign({}, state, {
				employees: [...NotDeletedObjects]
			});
		case SEARCH_EMPLOYEE:
			if (action.payload && action.payload === '') return { ...state, searchResults: [] };
			var foundAfterSearch = state.employees.filter((empSearched) => {
				return (
					('' + empSearched.empId).toLowerCase().indexOf(action.payload) >= 0 ||
					empSearched.firstName.toLowerCase().indexOf(action.payload) >= 0 ||
					empSearched.lastName.toLowerCase().indexOf(action.payload) >= 0
				);
			});
			if (foundAfterSearch && foundAfterSearch.length > 0) {
				return {
					...state,
					searchResults: [ ...foundAfterSearch ]
				};
			}
			break;
		default:
			break;
	}
	//if(initialState.employees.length === 0 ) initialState = Object.assign({}, state, { employees : state.employees.concat(state.employees)});
	return state;
}
export default rootReducer;
