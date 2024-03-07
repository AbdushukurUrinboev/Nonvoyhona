import React, { useState, useEffect } from 'react'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'
import Card from '../../../components/Card'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import './Staff.css'
import { base_URL } from '../../../API';


// WithAuthGuard
import { withAllRouterGuard } from "../App/guards/with-auth-guard";

const XamkorView = withAllRouterGuard(() => {

    const [currentXamkor, setCurrentXamkor] = useState({});
 

    const { id } = useParams();
    // console.log(id);

    useEffect(() => {
        axios.get(`${base_URL}/xamkor/${id}`)
            .then(res => {
                setCurrentXamkor(res.data)
                console.log(res.data);
               
            })
            .catch(err => console.log(err))
    }, [id])

//   console.log(currentXamkor);

    return (
        <>

            <Container fluid>                
                <Row>
                    <Col lg="12" className='mt-1'>
                        <div className="d-flex flex-wrap align-items-center justify-content-between">
                            <div className="d-flex align-items-center justify-content-between">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb p-0 mb-0">
                                        <li className="breadcrumb-item"><Link to="/xamkorlar">Xamkorlar</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">Xamkorni ko'rish</li>
                                    </ol>
                                </nav>
                            </div>

                        </div>
                    </Col>
                    <Col lg="12" className="mb-3 d-flex justify-content-between">
                        <h4 className="font-weight-bold d-flex align-items-center customerViewHeadStyle">Xamkorni ko'rish</h4>
                    </Col>
                    <Col lg="12" className="mb-3 d-flex justify-content-between">
                        <Link to="/xamkorlar" className="btn btn-primary btn-sm d-flex align-items-center justify-content-between ml-2">
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
                                                <div className="list-style-detail ml-4 mr-2">
                                                    <h5 className="font-weight-bold">{currentXamkor.firstName}   {currentXamkor.lastName}</h5>
                                                    <p className="mb-0 mt-1 text-muted">{currentXamkor.position}</p>
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
                                                    <p className="mb-0 text-muted">Manzil: </p>
                                                </td>
                                                <td>
                                                    <p className="mb-0 ">{currentXamkor.address}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-0">
                                                    <p className="mb-0 text-muted">Telefon raqami: </p>
                                                </td>
                                                <td>
                                                    <p className="mb-0 ">{currentXamkor.phone}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-0">
                                                    <p className="mb-0 text-muted">Telefon raqami (uy):</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0 ">{currentXamkor.phone2}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-0">
                                                    <p className="mb-0 text-muted">Ish joyi:</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0 ">{currentXamkor.workPlace}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-0">
                                                    <p className="mb-0 text-muted">Lavozimi:</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0 ">{currentXamkor.position}</p>
                                                </td>
                                            </tr>                                            
                                            <tr>
                                                <td className="p-0">
                                                    <p className="mb-0 text-muted">Qarzimiz:</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0 ">{currentXamkor.paymentRequired}</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </ListGroup.Item>
                                {/* <ListGroup.Item as="li" >
                                    <h6 className="font-weight-bold mt-2">Umumiy Statistika</h6>
                                    <Chart options={chart1.options} series={chart1.series} type="bar" height="250px" />
                                </ListGroup.Item> */}
                            </ListGroup>
                        </Card>
                    </Col>
                    <Col lg="8">
                        <Card>
                            <Card.Body className="p-0">
                                <div className="d-flex justify-content-between align-items-center p-3">
                                    <h5>To'lov haqidagi ma'lumotlar</h5>
                                </div>
                                <div className="container-fluid mt-2 myContainerStyleProduct">
                                    <div className="d-grid gapStyleProduct">
                                        <div className="p-2">
                                            <div className="container">
                                                <div className="row align-items-center myHeaderProductStyle">
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">№</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">Sana</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">Vaqti</div>
                                                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">Puli</div>                                                  

                                                </div>
                                            </div>
                                        </div>

                                        {
                                           currentXamkor.paymentHistory && currentXamkor.paymentHistory.map((elem, ind) => {
                                                return <div key={ind} className="p-2 border myStyleProduct ownStylePro">
                                                <div className="container">
                                                    <div className="row align-items-center">
                                                        <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">{ind + 1}</div>
                                                        <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">{elem.date}</div>
                                                        <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">{elem.time}</div>
                                                        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">{elem.amount}</div>
                                                       
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
export default XamkorView;