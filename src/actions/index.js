import { ADD_EMPLOYEE, EDIT_EMPLOYEE, FETCH_EMPLOYEE,FETCH_ALL_EMPLOYEES,DELETE_EMPLOYEE, SEARCH_EMPLOYEE } from "../constants.js";

export function addEmployee(payload) {
    return { type: ADD_EMPLOYEE, payload }
  };
  export function editEmployee(payload) {
    return { type: EDIT_EMPLOYEE, payload }
  };
  export function listEmployee(payload) {
    return { type: FETCH_EMPLOYEE, payload }
  };
  export function listAllEmployees(payload) {
    return { type: FETCH_ALL_EMPLOYEES, payload }
  };
  export function deleteEmployeeById(payload) {
    return { type: DELETE_EMPLOYEE, payload }
  };
  export function searchEmployee(payload) {
    return { type: SEARCH_EMPLOYEE, payload }
  };