import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, ListGroup, Tab, Nav } from 'react-bootstrap'
import Card from '../../../components/Card'
import { Link } from 'react-router-dom'
import Chart from "react-apexcharts";
import { useParams } from 'react-router-dom';
import './CustomerView.css'

import axios from 'axios';


const ProductView = () => {
    const [product, setProduct] = useState({});

    const { id } = useParams();
    console.log(id);

    useEffect(() => {
        axios.get(`http://localhost:4000/products/${id}`)
            .then(res => {
                setProduct(res.data)
                // console.log(res.data);
            })
            .catch(err => console.log(err))
    }, [id])




    const chart1 = {
        series: [{
            data: [91, 82, 90, 88, 105, 99, 62]
        }],
        options: {
            chart: {
                //   height: 265,
                //   type: 'bar',
                toolbar: {
                    show: false,
                },
                events: {
                    click: function (chart, w, e) {
                        // console.log(chart, w, e)
                    }
                }
            },
            plotOptions: {
                bar: {
                    columnWidth: '35%',
                    distributed: true,
                }
            },
            dataLabels: {
                enabled: false
            },
            grid: {
                xaxis: {
                    lines: {
                        show: false
                    }
                },
                yaxis: {
                    lines: {
                        show: true
                    }
                }
            },
            legend: {
                show: false
            },
            yaxis: {
                labels: {
                    offsetY: 0,
                    minWidth: 20,
                    maxWidth: 20
                },
            },
            xaxis: {
                categories: [
                    'Dush',
                    'Sesh',
                    'Chor',
                    'Pay',
                    'Juma',
                    'Shan',
                    'Yak'
                ],
                labels: {
                    minHeight: 22,
                    maxHeight: 22,
                    style: {
                        fontSize: '12px'
                    }
                }
            }
        }

    }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col lg="12" className='mt-1'>
                        <div className="d-flex flex-wrap align-items-center justify-content-between">
                            <div className="d-flex align-items-center justify-content-between">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb p-0 mb-0">
                                        <li className="breadcrumb-item"><Link to="/products">Maxsulotlar</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">Maxsulotni ko'rish</li>
                                    </ol>
                                </nav>
                            </div>

                        </div>
                    </Col>
                    <Col lg="12" className="mb-3 d-flex justify-content-between">
                        <h4 className="font-weight-bold d-flex align-items-center customerViewHeadStyle">Maxsulotni ko'rish</h4>
                    </Col>
                    <Col lg="12" className="mb-3 d-flex justify-content-between">
                        <Link to="/products" className="btn btn-primary btn-sm d-flex align-items-center justify-content-between ml-2">
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
                                                    <h5 className="font-weight-bold"> 
                                                    <img src={product.productImage} alt="rasm bor" /> &nbsp; &nbsp; &nbsp; {product.productName}</h5>
                                                    <p className="mb-0 mt-1 text-muted">{product.productDes}</p>
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
                                                    <p className="mb-0 text-muted">Narxi: </p>
                                                </td>
                                                <td>
                                                    <p className="mb-0 ">{product.productPrice} so'm</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-0">
                                                    <p className="mb-0 text-muted">Maxsulot soni: </p>
                                                </td>
                                                <td>
                                                    <p className="mb-0 ">{product.poductQuantity}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-0">
                                                    <p className="mb-0 text-muted">Olingan sana: </p>
                                                </td>
                                                <td>
                                                    <p className="mb-0 ">{product.olinganSana}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-0">
                                                    <p className="mb-0 text-muted">Olingan soat:</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0 ">{product.olinganSoat}</p>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="p-0">
                                                    <p className="mb-0 text-muted">Xamkor ismi sharifi:</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0 ">{product.xamkor}</p>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="p-0">
                                                    <p className="mb-0 text-muted">Xamkor lavozimi soat:</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0 ">{product.lavozimi}</p>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="p-0">
                                                    <p className="mb-0 text-muted">Xamkor tel raqami:</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0 ">{product.xamkorTel}</p>
                                                </td>
                                            </tr>                                           
                                        </tbody>
                                    </table>
                                </ListGroup.Item>
                                
                            </ListGroup>
                        </Card>
                    </Col>
                    {/* <Col lg="8">
                        <Card>
                            <Card.Body className="p-0">
                                <div className="d-flex justify-content-between align-items-center p-3">
                                    <h5>Mijoz haqida qo'shimcha ma'lumot</h5>
                                </div>
                              


                                <div className="container-fluid mt-2 myContainerStyleProduct">
                                    <div className="d-grid gapStyleProduct">
                                        <div className="p-2">
                                            <div className="container">
                                                <div className="row align-items-center myHeaderProductStyle">
                                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">№</div>
                                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">Non turi</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">Sana</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">Avans</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">Umumiy</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">Status</div>

                                                </div>
                                            </div>
                                        </div>


                                        <div className="p-2 border myStyleProduct ownStylePro">
                                            <div className="container">
                                                <div className="row align-items-center">
                                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">1</div>
                                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">Patir</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">12/02/2023</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">1.000.000</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">1.000.000</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-left">
                                                        <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24" fill="none">
                                                            <circle cx="12" cy="12" r="8" fill="#3cb72c"></circle>
                                                        </svg> To'landi
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-2 border myStyleProduct ownStylePro">
                                            <div className="container">
                                                <div className="row align-items-center">
                                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">2</div>
                                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">Kulcha</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">14/02/2023</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">100.000</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">1.500.000</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-left">
                                                    <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24" fill="none">
                                                            <circle cx="12" cy="12" r="8" fill="#db7e06"></circle>
                                                        </svg>Chala
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-2 border myStyleProduct ownStylePro">
                                            <div className="container">
                                                <div className="row align-items-center">
                                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">3</div>
                                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">Katta Patir</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">19/02/2023</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">50.000</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">3.000.000</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-left">
                                                        <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24" fill="none">
                                                            <circle cx="12" cy="12" r="8" fill="#db7e06"></circle>
                                                        </svg>Chala
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-2 border myStyleProduct ownStylePro">
                                            <div className="container">
                                                <div className="row align-items-center">
                                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">4</div>
                                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">Gijda</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">19/02/2023</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">0</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">1.000.000</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-left">
                                                        <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24" fill="none">
                                                            <circle cx="12" cy="12" r="8" fill="#F42B3D"></circle>
                                                        </svg>To'lanmadi
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-2 border myStyleProduct ownStylePro">
                                            <div className="container">
                                                <div className="row align-items-center">
                                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">5</div>
                                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">Yog'li Patir</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">12/02/2023</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">0</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">1.000.000</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-left">
                                                        <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24" fill="none">
                                                            <circle cx="12" cy="12" r="8" fill="#F42B3D"></circle>
                                                        </svg>To'lanmadi
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-2 border myStyleProduct ownStylePro">
                                            <div className="container">
                                                <div className="row align-items-center">
                                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">6</div>
                                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">Kunjutli Patir</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">12/02/2023</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">500.000</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">1.000.000</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-left">
                                                        <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24" fill="none">
                                                            <circle cx="12" cy="12" r="8" fill="#db7e06"></circle>
                                                        </svg>Chala
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-2 border myStyleProduct ownStylePro">
                                            <div className="container">
                                                <div className="row align-items-center">
                                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">7</div>
                                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">O'rtacha Patir</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">12/02/2023</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">0</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">1.000.000</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-left">
                                                        <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24" fill="none">
                                                            <circle cx="12" cy="12" r="8" fill="#F42B3D"></circle>
                                                        </svg>To'lanmadi
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-2 border myStyleProduct ownStylePro">
                                            <div className="container">
                                                <div className="row align-items-center">
                                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">8</div>
                                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">Patir</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">12/02/2023</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">1.000.000</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">1.000.000</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-left">
                                                        <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24" fill="none">
                                                            <circle cx="12" cy="12" r="8" fill="#3cb72c"></circle>
                                                        </svg> To'landi
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-2 border myStyleProduct ownStylePro">
                                            <div className="container">
                                                <div className="row align-items-center">
                                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">9</div>
                                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">Patir</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">12/02/2023</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">1.000.000</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">1.000.000</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-left">
                                                        <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24" fill="none">
                                                            <circle cx="12" cy="12" r="8" fill="#3cb72c"></circle>
                                                        </svg> To'landi
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-2 border myStyleProduct ownStylePro">
                                            <div className="container">
                                                <div className="row align-items-center">
                                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">10</div>
                                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">Kunjutli Patir</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">12/02/2023</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">500.000</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">1.000.000</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-left">
                                                        <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24" fill="none">
                                                            <circle cx="12" cy="12" r="8" fill="#db7e06"></circle>
                                                        </svg>Chala
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-2 border myStyleProduct ownStylePro">
                                            <div className="container">
                                                <div className="row align-items-center">
                                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">11</div>
                                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">Gijda</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">19/02/2023</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">0</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">1.000.000</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-left">
                                                        <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24" fill="none">
                                                            <circle cx="12" cy="12" r="8" fill="#F42B3D"></circle>
                                                        </svg>To'lanmadi
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>


                            </Card.Body>
                        </Card>
                    </Col> */}
                </Row>
            </Container>
        </>
    )
}
export default ProductView;