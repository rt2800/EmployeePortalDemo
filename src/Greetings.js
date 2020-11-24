import React from "react";
import PropTypes from 'prop-types';

let Greetings = ({ firstName, lastName }) => (
    <div>
        Hey you! {firstName} {lastName}!
    </div>
);
Greetings.defaultProps = { 
    firstName: 'abc',
    lastName: 'pqr'
};
Greetings.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired 
  };
/*
Person.propTypes = {
  email: PropTypes.string,
  age: PropTypes.number,
  worksRemote: PropTypes.bool,
  updateCallback: PropTypes.func
}
PropTypes.array,
PropTypes.arrayOf(PropTypes.string),
PropTypes.object,
PropTypes.objectOf(PropTypes.number)
Person.propTypes = {
  gender: PropTypes.oneOf([
    'female', 'male'
  ])
}
PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number
])

*/
export default Greetings;