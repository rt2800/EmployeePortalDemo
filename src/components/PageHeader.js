import React from 'react';
import {useState} from 'react-dom';
import { Button} from 'react-bootstrap';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/css/bootstrap-reboot.min.css';
import '../../node_modules/bootstrap/dist/css/bootstrap-grid.min.css';


const PageHeader =(props) => {
    return (
        <React.Fragment>
        <div className="container">
        <div className="row">
            <Button style={{ display: (props.allowBackNavigation === false) ? "none" : "block" }} onClick={()=> window.history.go(-1)}>&lt;</Button>
            <div id="lblTopHeader" className="h3" style={{margin:"auto"}}>{props.text}</div>
        </div>
        <hr className="hr-primary" />
        </div>
        </React.Fragment>
    );
};

export default PageHeader;