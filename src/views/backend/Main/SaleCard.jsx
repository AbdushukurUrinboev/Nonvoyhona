import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import Card from '../../../components/Card'
import { Link } from 'react-router-dom'
import Datepickers from '../../../components/Datepicker';
import SaleTable from './SaleTable';
import axios from 'axios';
import './Sail.css'


// WithAuthGuard
import { withAllRouterGuard } from "../App/guards/with-auth-guard";


const SaleCard = withAllRouterGuard(() => {

    return (
        <>
            <h1>Hello world</h1>
        </>
    )
})
export default SaleCard;
