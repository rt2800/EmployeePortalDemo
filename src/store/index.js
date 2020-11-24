import { createStore } from "redux";
import rootReducer from "../reducers/index";
import faker from 'faker';

function buildFakeUser(){
  let fn = faker.name.firstName();
  let ln=faker.name.lastName();
    return {
      loginName: faker.internet.userName(),
      email: faker.internet.email(),
      color: faker.internet.color(),
      firstName: fn,
      lastName: ln,
      address: faker.address.streetAddress(),
      city: faker.address.city(),
      zipCode: faker.address.zipCode(),
      phone: faker.phone.phoneNumber(),
      country: faker.address.country(),
      empId: faker.random.number(),
      hobbies: [ faker.hacker.ingverb(), faker.hacker.ingverb(), faker.hacker.ingverb()],
      projects: [ faker.hacker.adjective() + " " + faker.hacker.noun()],
      notes: faker.lorem.sentence(),
      info: faker.lorem.sentence(),
      avatar: 'https://fakeimg.pl/200x200/?text='+fn+'%0A'+ln,
      isDeleted: false
    };
  }
  
  
  function getEmployeeDataFaker(){
    let INITIAL_EMPLOYEE_DATA=[];
      if( localStorage.getItem('__empdata') )
      {
           INITIAL_EMPLOYEE_DATA = JSON.parse(localStorage.getItem('__empdata'));
      }
      else{
        for(var i = 0; i < 50; i++) {
            INITIAL_EMPLOYEE_DATA.push(buildFakeUser())
        }
        localStorage.setItem('__empdata', JSON.stringify(INITIAL_EMPLOYEE_DATA));
      }
    
    return INITIAL_EMPLOYEE_DATA;
  }


const employeeStore = createStore(rootReducer, { employees : getEmployeeDataFaker(), employeeObj:{}, searchResults:[]});
export default employeeStore;