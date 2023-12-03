import React, { useEffect, useState } from 'react'
import { Container, Tab, Nav, Row, Col, Form, OverlayTrigger, Tooltip, Card, Accordion, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { STAFF_URL } from '../../../API';
import { FilterStaff, FilterStaffSmena } from './FilterProduct/FilterStaff';
import { useHistory } from "react-router";
import './Staff.css'
import { base_URL } from '../../../API';

//img
import Avatar from '../../../assets/images/avatar.png'


// Delete Icon
import deleteIcon from '../../../assets/images/delete.png'

// Loading
import { FallingLines } from 'react-loader-spinner';

// Pagination
import ReactPaginate from 'react-paginate';

import StaffBonusAdd from './StaffBonusAdd';


const Xisobot = () => {
    



    return (
        <>
        <h1>Tez Kunda</h1>
           
            

        </>

    )
}
export default Xisobot;