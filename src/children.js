import React, { Component } from "react";
import ReactDOM from "react-dom";

const Child = props => {
  return (
    <div>
      <h1>Child {props.index}</h1>
      <button onClick={() => props.logMe()}>Log</button>
    </div>
  );
};

class ParentChild extends Component {
  logMe = () => {
    console.log("Hii child");
  };

  render() {
    const updateChildrenWithProps = React.Children.map(
      this.props.children,
      (child, i) => {
        return React.cloneElement(child, {
        //this properties are available as a props in child components
          logMe: this.logMe,
          index: i
        });
      }
    );

    return <div className="App">{updateChildrenWithProps}</div>;
  }
}

export default ParentChild;