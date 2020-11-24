import React from 'react';
import { connect } from "react-redux";
import axios from 'axios';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/css/bootstrap-reboot.min.css';
import '../../node_modules/bootstrap/dist/css/bootstrap-grid.min.css';
import { Pagination } from 'react-bootstrap';

const EmployeeListPagination = (props) => {
    let totalPageCount = props.list.length / 10;
    let items = [];
    for (let number = 1; number <= totalPageCount; number++) {
    items.push(
        <Pagination.Item key={number} onClick={()=> props.onActivePageChanged(number)} active={number === props.activePageNum}>{number}</Pagination.Item>,
    );
    }
    return (
        <Pagination><Pagination.First  onClick={()=> props.onActivePageChanged(1)}  /><Pagination.Prev  onClick={()=> props.onActivePageChanged(props.activePageNum > 0 ? -1 : 1)} />{items}<Pagination.Next  onClick={()=> props.onActivePageChanged(props.activePageNum < totalPageCount ? -2 : totalPageCount)} /><Pagination.Last  onClick={()=> props.onActivePageChanged(totalPageCount)} /></Pagination>
    )
}
export default EmployeeListPagination;