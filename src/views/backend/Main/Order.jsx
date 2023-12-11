import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import Card from '../../../components/Card'
import { Link } from 'react-router-dom'
import Datepickers from '../../../components/Datepicker';
import OrderTable from './OrderTable';
import OrderCard from './OrderCard';
import axios from 'axios';
import "./Order.css"
import cardIcon from '../../../assets/images/icon/card.png'
import tableIcon from '../../../assets/images/icon/table.png'





const Order = () => {
const [isTable, setIsTable] = useState(true)

console.log(isTable);
    return (
        <>
        {
            isTable ? <OrderTable setIsTable={setIsTable} isTable={isTable}/> : <OrderCard setIsTable={setIsTable} isTable={isTable}/>
        }
        </>
    )
}
export default Order;
