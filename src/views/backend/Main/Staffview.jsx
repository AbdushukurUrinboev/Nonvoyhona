import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button, ListGroup, Tab, Nav } from 'react-bootstrap'
import Card from '../../../components/Card'
import { Link, useParams } from 'react-router-dom'
import Chart from "react-apexcharts";
import axios from 'axios';
import './Staff.css'

//img
import Avatar from '../../../assets/images/avatar.png'


const Staffview = () => {

    const [currentStaff, setCurrentStaff] = useState({});

    const { id } = useParams();
    // console.log(id);

    useEffect(() => {
        axios.get(`http://localhost:4000/staff/${id}`)
            .then(res => {
                setCurrentStaff(res.data)
                // console.log(res.data);
            })
            .catch(err => console.log(err))
    }, [id])



    const chart1 = {
        series: [{
            data: [91, 82, 90, 88, 105, 99]
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
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'June',
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
                                        <li className="breadcrumb-item"><Link to="/staff">Xodimlar</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">Xodimni ko'rish</li>
                                    </ol>
                                </nav>
                            </div>

                        </div>
                    </Col>
                    <Col lg="12" className="mb-3 d-flex justify-content-between">
                        <h4 className="font-weight-bold d-flex align-items-center customerViewHeadStyle">Xodimni ko'rish</h4>
                    </Col>
                    <Col lg="12" className="mb-3 d-flex justify-content-between">
                        <Link to="/staff" className="btn btn-primary btn-sm d-flex align-items-center justify-content-between ml-2">
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
                                                <div className="h-avatar is-medium">
                                                    {/* <img className="avatar myStaffAvatar" alt="staff-icon" src={user1} /> */}
                                                    <img className="avatar myStaffAvatar" alt="user-icon" src={currentStaff.image === 'none' ? Avatar : `http://localhost:4000/${currentStaff.image}`} style={{ width: "75px" }} />
                                                </div>
                                                <div className="list-style-detail ml-4 mr-2">
                                                    <h5 className="font-weight-bold">{currentStaff.firstName}   {currentStaff.lastName}</h5>
                                                    <p className="mb-0 mt-1 text-muted">{currentStaff.typeOfWorker}</p>
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
                                                    <p className="mb-0 text-muted">Tug'ilgan sanasi: </p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">{currentStaff.birthday}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-0">
                                                    <p className="mb-0 text-muted">Manzil: </p>
                                                </td>
                                                <td>
                                                    <p className="mb-0 ">{currentStaff.adress}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-0">
                                                    <p className="mb-0 text-muted">Telefon raqami: </p>
                                                </td>
                                                <td>
                                                    <p className="mb-0 ">{currentStaff.phone}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-0">
                                                    <p className="mb-0 text-muted">Telefon raqami (uy):</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0 ">{currentStaff.phone2}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-0">
                                                    <p className="mb-0 text-muted">Guruhi:</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0 ">{currentStaff.group == "No" ? "Yo'q" : currentStaff.group}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-0">
                                                    <p className="mb-0 text-muted">Smenasi:</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0 ">{currentStaff.smena == "No" ? "Yo'q" : currentStaff.smena}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-0">
                                                    <p className="mb-0 text-muted">Oyligi:</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0 ">{currentStaff.salary}</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </ListGroup.Item>
                                <ListGroup.Item as="li" >
                                    <h6 className="font-weight-bold mt-2">Umumiy Statistika</h6>
                                    <Chart options={chart1.options} series={chart1.series} type="bar" height="250px" />
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                    <Col lg="8">
                        <Card>
                            <Card.Body className="p-0">
                                <div className="d-flex justify-content-between align-items-center p-3">
                                    <h5>Xodim haqida qo'shimcha ma'lumot</h5>
                                </div>
                                {/* New version */}


                                <div className="container-fluid mt-2 myContainerStyleProduct">
                                    <div className="d-grid gapStyleProduct">
                                        <div className="p-2">
                                            <div className="container">
                                                <div className="row align-items-center myHeaderProductStyle">
                                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">№</div>
                                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1">Qopi</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">Sana</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">Guruh</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">Smena</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">Umumiy</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">Status</div>

                                                </div>
                                            </div>
                                        </div>


                                        <div className="p-2 border myStyleProduct ownStylePro">
                                            <div className="container">
                                                <div className="row align-items-center">
                                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">1</div>
                                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1">2</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">12/02/2023</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">B-Guruh</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">1-smena</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">500.000</div>
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
                                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1">5</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">15/02/2023</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">C-Guruh</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">2-smena</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">500.000</div>
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
                                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">3</div>
                                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1">10</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">15/02/2023</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">D-Guruh</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">1-smena</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">500.000</div>
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
                                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1">1</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">17/02/2023</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">A-Guruh</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">1-smena</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">500.000</div>
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
                                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1">5</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">15/02/2023</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">C-Guruh</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">2-smena</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">500.000</div>
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
                                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1">5</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">15/02/2023</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">C-Guruh</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">2-smena</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">500.000</div>
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
                                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1">15</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">15/02/2023</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">C-Guruh</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">2-smena</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">500.000</div>
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
                                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">8</div>
                                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1">2</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">12/02/2023</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">B-Guruh</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">1-smena</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">500.000</div>
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
                                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1">12</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">15/02/2023</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">C-Guruh</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">2-smena</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">500.000</div>
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
                                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1">5</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">15/02/2023</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">C-Guruh</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">2-smena</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">500.000</div>
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
                                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1">7</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">15/02/2023</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">C-Guruh</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">2-smena</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">500.000</div>
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
                                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">12</div>
                                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1">5</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">15/02/2023</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">C-Guruh</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">2-smena</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">500.000</div>
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
                                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">13</div>
                                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1">3</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">15/02/2023</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">C-Guruh</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">2-smena</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">500.000</div>
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
                                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">14</div>
                                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1">9</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">15/02/2023</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">C-Guruh</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">2-smena</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">500.000</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-left">
                                                        <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24" fill="none">
                                                            <circle cx="12" cy="12" r="8" fill="#db7e06"></circle>
                                                        </svg>Chala
                                                    </div>
                                                </div>
                                            </div>
                                        </div>




                                    </div>
                                </div>




                                {/* Eski versiyasi */}
                                {/* <div className="table-responsive">
                                    <table className="table data-table mb-0">
                                        <thead className="table-color-heading myHeadStyleCustomerView">
                                            <tr className="text-muted">
                                                <th scope="col">№</th>
                                                <th scope="col">Non turi </th>
                                                <th scope="col">Sana</th>
                                                <th scope="col">Avans</th>
                                                <th scope="col">Status</th>
                                                <th scope="col" className="text-right">Umumiy</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>Patir</td>
                                                <td>12 Jan 2020</td>
                                                <td>50.000</td>
                                                <td>
                                                    <p className="mb-0 text-success d-flex justify-content-start align-items-center">
                                                        <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24" fill="none">
                                                            <circle cx="12" cy="12" r="8" fill="#3cb72c"></circle></svg>
                                                        To'landi
                                                    </p>
                                                </td>
                                                <td className="text-right">$104.98</td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>Kulcha</td>
                                                <td>15 Jan 2020</td>
                                                <td>0</td>
                                                <td>
                                                    <p className="mb-0 text-warning d-flex justify-content-start align-items-center">
                                                        <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24" fill="none">
                                                            <circle cx="12" cy="12" r="8" fill="#db7e06"></circle></svg>
                                                        Chala
                                                    </p>
                                                </td>
                                                <td className="text-right">$99.98</td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>Yog'li patir</td>
                                                <td>12 Jan 2020</td>
                                                <td>100.000</td>
                                                <td>
                                                    <p className="mb-0 text-success d-flex justify-content-start align-items-center">
                                                        <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24" fill="none">
                                                            <circle cx="12" cy="12" r="8" fill="#3cb72c"></circle></svg>
                                                        To'landi
                                                    </p>
                                                </td>
                                                <td className="text-right">$966.12</td>
                                            </tr>
                                            <tr>
                                                <td>4</td>
                                                <td>Sedanali Patir</td>
                                                <td>16 Jan 2020</td>
                                                <td>500.000</td>
                                                <td>
                                                    <p className="mb-0 text-success d-flex justify-content-start align-items-center">
                                                        <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24" fill="none">
                                                            <circle cx="12" cy="12" r="8" fill="#3cb72c"></circle></svg>
                                                        To'landi
                                                    </p>
                                                </td>
                                                <td className="text-right">$65.00</td>
                                            </tr>
                                            <tr>
                                                <td>5</td>
                                                <td>Kichik Patir</td>
                                                <td>18 Jan 2020</td>
                                                <td>200.000</td>
                                                <td>
                                                    <p className="mb-0 text-danger d-flex justify-content-start align-items-center">
                                                        <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24" fill="none">
                                                            <circle cx="12" cy="12" r="8" fill="#F42B3D"></circle></svg>To'lanmadi
                                                    </p>
                                                </td>
                                                <td className="text-right">$108.99</td>
                                            </tr>
                                            <tr>
                                                <td>6</td>
                                                <td>Do'ltali patir</td>
                                                <td>19 Jan 2020</td>
                                                <td>0</td>
                                                <td>
                                                    <p className="mb-0 text-success d-flex justify-content-start align-items-center">
                                                        <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24" fill="none">
                                                            <circle cx="12" cy="12" r="8" fill="#3cb72c"></circle></svg>
                                                        To'landi
                                                    </p>
                                                </td>
                                                <td className="text-right">$199.99</td>
                                            </tr>
                                            <tr>
                                                <td>7</td>
                                                <td>Ko'kat patir</td>
                                                <td>20 Jan 2020</td>
                                                <td>0</td>
                                                <td>
                                                    <p className="mb-0 text-warning d-flex justify-content-start align-items-center">
                                                        <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24" fill="none">
                                                            <circle cx="12" cy="12" r="8" fill="#db7e06"></circle></svg>
                                                        Chala
                                                    </p>
                                                </td>
                                                <td className="text-right">$99.99</td>
                                            </tr>
                                            <tr>
                                                <td>8</td>
                                                <td>Katta patir</td>
                                                <td>22 Jan 2020</td>
                                                <td>150.000</td>
                                                <td>
                                                    <p className="mb-0 text-success d-flex justify-content-start align-items-center">
                                                        <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24" fill="none">
                                                            <circle cx="12" cy="12" r="8" fill="#3cb72c"></circle></svg>
                                                        To'landi
                                                    </p>
                                                </td>
                                                <td className="text-right">$449.00</td>
                                            </tr>
                                            <tr>
                                                <td>9</td>
                                                <td>Xonqiz Patir</td>
                                                <td>22 Jan 2020</td>
                                                <td>100.000</td>
                                                <td>
                                                    <p className="mb-0 text-danger d-flex justify-content-start align-items-center">
                                                        <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24" fill="none">
                                                            <circle cx="12" cy="12" r="8" fill="#F42B3D"></circle></svg>To'lanmadi
                                                    </p>
                                                </td>
                                                <td className="text-right">$1,299.05</td>
                                            </tr>
                                            <tr>
                                                <td>10</td>
                                                <td>Kulcha</td>
                                                <td>23 Jan 2020</td>
                                                <td>
                                                    Order OR-965508
                                                </td>
                                                <td>
                                                    <p className="mb-0 text-success d-flex justify-content-start align-items-center">
                                                        <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24" fill="none">
                                                            <circle cx="12" cy="12" r="8" fill="#3cb72c"></circle></svg>
                                                        To'landi
                                                    </p>
                                                </td>
                                                <td className="text-right">$6,325.99</td>
                                            </tr>
                                            <tr>
                                                <td>11</td>
                                                <td>Gijda</td>
                                                <td>15 Jan 2020</td>
                                                <td>50.000</td>
                                                <td>
                                                    <p className="mb-0 text-success d-flex justify-content-start align-items-center">
                                                        <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24" fill="none">
                                                            <circle cx="12" cy="12" r="8" fill="#3cb72c"></circle></svg>
                                                        To'landi
                                                    </p>
                                                </td>
                                                <td className="text-right">$699.00</td>
                                            </tr>
                                            <tr>
                                                <td>12</td>
                                                <td>O'rtacha Patir</td>
                                                <td>26 Jan 2020</td>
                                                <td>0</td>
                                                <td>
                                                    <p className="mb-0 text-danger d-flex justify-content-start align-items-center">
                                                        <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24" fill="none">
                                                            <circle cx="12" cy="12" r="8" fill="#F42B3D"></circle></svg>To'lanmadi
                                                    </p>
                                                </td>
                                                <td className="text-right">$150.03</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div> */}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default Staffview;