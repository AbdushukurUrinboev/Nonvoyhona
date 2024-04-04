import React, { useState, useEffect, useContext } from 'react'
import { Container, Row, Col, Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import Card from '../../../components/Card'
import { Link } from 'react-router-dom'
import Datepickers from '../../../components/Datepicker';
import SaleTable from './SaleTable';
import SaleCard from './SaleCard';
import axios from 'axios';
import "./Order.css"
import cardIcon from '../../../assets/images/icon/card.png'
import tableIcon from '../../../assets/images/icon/table.png'
import { AuthContext } from './ContextProvider/DataProvider';


// WithAuthGuard
import { withAllRouterGuard } from "../App/guards/with-auth-guard";


const Sail = withAllRouterGuard(() => {

const { currentUser, logout } = useContext(AuthContext);

    return (
        <>
        {
            currentUser.role === "sotuvchi" ? <SaleCard /> : <SaleTable />
        }
        </>
    )
})
export default Sail;
