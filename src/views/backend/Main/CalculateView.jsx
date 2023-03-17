import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, ListGroup, Tab, Nav } from 'react-bootstrap'
import Card from '../../../components/Card'
import { Link } from 'react-router-dom'
import Chart from "react-apexcharts";
import { CALCULATE_URL } from '../../../API';
import { useParams } from 'react-router-dom';
import './CalculateView.css'

import axios from 'axios';

//img
import BreadImage from '../../../assets/images/bread/logoBread.png'


const CalculateView = () => {
    const [calculate, setCalculate] = useState({});
    const [reqItems, setReqItems] = useState([]);
    const [otherItems, setOtherItems] = useState([]);

    const { id } = useParams();


    useEffect(() => {
        axios.get(`http://localhost:4000/calculation/${id}`)
            .then(res => {
                setCalculate(res.data)
                setReqItems(res.data.requiredItems)
                setOtherItems(res.data.others)
            })
            .catch(err => console.log(err))
    }, [id])

    



    return (
        <>
            <Container fluid>
                <Row>
                    <Col lg="12" className='mt-1'>
                        <div className="d-flex flex-wrap align-items-center justify-content-between">
                            <div className="d-flex align-items-center justify-content-between">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb p-0 mb-0">
                                        <li className="breadcrumb-item"><Link to="/calculate">Kalkulyatsiya</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">Non haqidagi ma'lumotni ko'rish</li>
                                    </ol>
                                </nav>
                            </div>

                        </div>
                    </Col>
                    <Col lg="12" className="mb-3 d-flex justify-content-between">
                        <h4 className="font-weight-bold d-flex align-items-center calculateViewHeadStyle">Non haqidagi ma'lumotni ko'rish</h4>
                    </Col>
                    <Col lg="12" className="mb-3 d-flex justify-content-between">
                        <Link to="/calculate" className="btn btn-primary btn-sm d-flex align-items-center justify-content-between ml-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                            <span className="ml-2">Orqaga</span>
                        </Link>
                    </Col>
                </Row>

                <Row>
                    <Col lg="4">
                        <Card>
                            <ListGroup as="ul" className="list-group-flush">
                                <ListGroup.Item as="li">
                                    <div>
                                        <ListGroup as="ul" className="list-style-1 mb-0">
                                            <ListGroup.Item as="li" className="d-flex justify-content-start align-items-center">
                                                <div className="avatar">
                                                    <img className="avatar myStaffAvatar" alt="user-icon" src={calculate.productImage === 'none' ? BreadImage : `http://localhost:4000/${calculate.productImage}`} style={{ width: "75px" }} />
                                                </div>

                                                <div className="list-style-detail ml-4 mr-2">
                                                    <h5 className="font-weight-bold">{calculate.productName} </h5>
                                                </div>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item as="li">
                                    <table className="table table-borderless mb-0 calculateViewStP">
                                        <tbody>
                                            <tr>
                                                <td className="p-0">
                                                    <p className="mb-0 text-muted">{calculate.productName} narxi: </p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">{calculate.productPrice} so'm</p>
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                    <Col lg="8">
                        <Card>
                            <Card.Body className="p-0">
                                <div className="d-flex justify-content-between align-items-center p-3">
                                    <h5> {calculate.productName} uchun 1-qopda ishlatiladigan maxsulotlar</h5>
                                </div>
                                <div className="container-fluid mt-2 myContainerStyleProduct">
                                    <div className="d-grid gapStyleProduct">
                                        <div className="p-2">
                                            <div className="container">
                                                <div className="row align-items-center myHeaderProductStyle">
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">№</div>
                                                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">Nomi</div>
                                                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">Miqdori</div>

                                                </div>
                                            </div>
                                        </div>
                                        {/* Required Items */}

                                        {
                                            reqItems.map((item, index) => {
                                                return (

                                                    <div className="p-2 border myStyleProduct ownStylePro" key={index}>
                                                        <div className="container">
                                                            <div className="row align-items-center">
                                                                <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">{index + 1}</div>
                                                                <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">{item.itemName}</div>
                                                                <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">{item.itemQuantity}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }

                                        {/* Other Items */}
                                        {
                                            otherItems.map((item, index) => {
                                                return (

                                                    <div className="p-2 border myStyleProduct ownStylePro" key={index}>
                                                        <div className="container">
                                                            <div className="row align-items-center">
                                                                <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">{index + 1}</div>
                                                                <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">{item.name}</div>
                                                                <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">{item.spent} - so'm</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default CalculateView;