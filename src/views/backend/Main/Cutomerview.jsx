import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, ListGroup, Tab, Nav } from 'react-bootstrap'
import Card from '../../../components/Card'
import { Link } from 'react-router-dom'
import Chart from "react-apexcharts";
import { CUSTOMERS_URL } from '../../../API';
import { useParams } from 'react-router-dom';
import './CustomerView.css'

import axios from 'axios';
import { base_URL } from '../../../API';

// WithAuthGuard
import { withAllRouterGuard } from "../App/guards/with-auth-guard";


const Customerview = withAllRouterGuard(() => {
    const [customer, setCustomer] = useState({});
    const [customerHistory, setCustomerHistory] = useState([]);


    const { id } = useParams();


    useEffect(() => {
        axios.get(`${base_URL}/customer/${id}`)
            .then(res => {
                setCustomer(res.data)
                setCustomerHistory(res.data.history)
                // console.log(res.data.history);
            })
            .catch(err => console.log(err))
    }, [id])



    // const chart1 = {
    //     series: [{
    //         data: [91, 82, 90, 88, 105, 99, 62]
    //     }],
    //     options: {
    //         chart: {
    //             //   height: 265,
    //             //   type: 'bar',
    //             toolbar: {
    //                 show: false,
    //             },
    //             events: {
    //                 click: function (chart, w, e) {
    //                     // console.log(chart, w, e)
    //                 }
    //             }
    //         },
    //         plotOptions: {
    //             bar: {
    //                 columnWidth: '35%',
    //                 distributed: true,
    //             }
    //         },
    //         dataLabels: {
    //             enabled: false
    //         },
    //         grid: {
    //             xaxis: {
    //                 lines: {
    //                     show: false
    //                 }
    //             },
    //             yaxis: {
    //                 lines: {
    //                     show: true
    //                 }
    //             }
    //         },
    //         legend: {
    //             show: false
    //         },
    //         yaxis: {
    //             labels: {
    //                 offsetY: 0,
    //                 minWidth: 20,
    //                 maxWidth: 20
    //             },
    //         },
    //         xaxis: {
    //             categories: [
    //                 'Dush',
    //                 'Sesh',
    //                 'Chor',
    //                 'Pay',
    //                 'Juma',
    //                 'Shan',
    //                 'Yak'
    //             ],
    //             labels: {
    //                 minHeight: 22,
    //                 maxHeight: 22,
    //                 style: {
    //                     fontSize: '12px'
    //                 }
    //             }
    //         }
    //     }

    // }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col lg="12" className='mt-1'>
                        <div className="d-flex flex-wrap align-items-center justify-content-between">
                            <div className="d-flex align-items-center justify-content-between">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb p-0 mb-0">
                                        <li className="breadcrumb-item"><Link to="/customers">Mijozlar</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">Mijozni ko'rish</li>
                                    </ol>
                                </nav>
                            </div>

                        </div>
                    </Col>
                    <Col lg="12" className="mb-3 d-flex justify-content-between">
                        <h4 className="font-weight-bold d-flex align-items-center customerViewHeadStyle">Mijozni ko'rish</h4>
                    </Col>
                    <Col lg="12" className="mb-3 d-flex justify-content-between">
                        <Link to="/customers" className="btn btn-primary btn-sm d-flex align-items-center justify-content-between ml-2">
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
                                                {/* <div className="avatar">
                                                    <img className="avatar avatar-img avatar-60 rounded-circle" src={user1} alt="01.jpg" />
                                                </div> */}
                                                <div className="list-style-detail ml-4 mr-2">
                                                    <h5 className="font-weight-bold">{customer.firstName}  {customer.lastName}</h5>
                                                    <p className="mb-0 mt-1 text-muted">{customer.status}</p>
                                                </div>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item as="li">
                                    <table className="table table-borderless mb-0 customerViewStP">
                                        <tbody>
                                            <tr>
                                                <td className="p-0">
                                                    <p className="mb-0 text-muted">Tur: </p>
                                                </td>
                                                <td>
                                                    <p className="mb-0 " style={{ color: customer.customerType === "daily" ? '#149100' : "#EC0000", fontWeight: '500' }}>{customer.customerType === 'daily' ? 'Doimiy' : "Vaqtincha"}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-0">
                                                    <p className="mb-0 text-muted">Manzil: </p>
                                                </td>
                                                <td>
                                                    <p className="mb-0 ">{customer.address}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-0">
                                                    <p className="mb-0 text-muted">Telefon raqami: </p>
                                                </td>
                                                <td>
                                                    <p className="mb-0 ">{customer.phone}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-0">
                                                    <p className="mb-0 text-muted">Telefon raqami:</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0 ">{customer.phone2}</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </ListGroup.Item>
                                {/* <ListGroup.Item as="li" >
                                    <h6 className="font-weight-bold mt-5 mb-4">Umumiy Statistika</h6>
                                    <Chart options={chart1.options} series={chart1.series} type="bar" height="250px" />
                                </ListGroup.Item> */}
                            </ListGroup>
                        </Card>
                    </Col>
                    <Col lg="8">
                        <Card>
                            <Card.Body className="p-0">
                                <div className="d-flex justify-content-between align-items-center p-3">
                                    <h5>Mijoz haqida qo'shimcha ma'lumot</h5>
                                </div>
                                {/* New version */}


                                <div className="myContainerStyleCustomer container-fluid mt-2">
                                    <div className="d-grid gapStyleCustomer">
                                        <div className="p-2">
                                            <div className="container">
                                                <div className="row align-items-center myHeaderProductStyle">
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">№</div>
                                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">Non nomi</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">Soni</div>
                                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">Sana</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">Olgan puli</div>

                                                </div>
                                            </div>
                                        </div>

                                        {
                                            customerHistory && customerHistory.map((elem, id) => {
                                                return <div className="p-2 border myStyleProduct ownStylePro" key={id}>
                                                    <div className="container">
                                                        <div className="row align-items-center">
                                                            <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">{id + 1}</div>
                                                            <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">{elem.product}</div>
                                                            <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">{elem.productQuantity}</div>
                                                            <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">{elem.date}</div>
                                                            <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">{elem.overall}</div>

                                                        </div>
                                                    </div>
                                                </div>
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
})
export default Customerview;