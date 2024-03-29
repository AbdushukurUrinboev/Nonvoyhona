import React, { useState, useEffect } from 'react'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'
import Card from '../../../components/Card'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import './Staff.css'
import { base_URL } from '../../../API';

//img
import Avatar from '../../../assets/images/avatar.png'

// WithAuthGuard
import { withAllRouterGuard } from "../App/guards/with-auth-guard";

const Staffview = withAllRouterGuard(() => {

    const [currentStaff, setCurrentStaff] = useState({});
    const [staffWorkHistory, setStaffWorkHistory] = useState([])   


    const { id } = useParams();
    // console.log(id);

    useEffect(() => {
        axios.get(`${base_URL}/staff/${id}`)
            .then(res => {
                setCurrentStaff(res.data)
                setStaffWorkHistory(res.data.workHistory)

            })
            .catch(err => console.log(err))
    }, [id])



    const renderTextLines = () => {
        const lines = currentStaff.responsibility.split('\n');

        return lines.map((line, index) => (
            <p key={index}>{line}</p>
        ));
    };


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
                                                    <img className="avatar myStaffAvatar" alt="user-icon" src={currentStaff.image === 'none' ? Avatar : currentStaff.image ? `${base_URL}/${currentStaff.image}` : ''} style={{ width: "75px" }} />
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
                                            <tr>
                                                <td className="p-0">
                                                    <p className="mb-0 text-muted">Qarzdorligi:</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0 ">{currentStaff.remainingDepts === 0 ? "Yo'q" : currentStaff.remainingDepts}</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <p className="mb-0 ">{currentStaff.responsibility === undefined ? (<h4 className="mb-0 text-muted"> Vazifalari: Yo'q</h4>) : (
                                        <>
                                            <h4 className="mb-0 text-muted">Vazifalari: </h4>
                                            <p className="mb-0 ">{renderTextLines()}</p>
                                        </>

                                    )}</p>
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
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">Non nomi</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">Guruh</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">Smena</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">Olgan puli</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-right">Sana</div>

                                                </div>
                                            </div>
                                        </div>

                                        {
                                            staffWorkHistory.map((elem, ind) => {
                                                return <div key={ind} className="p-2 border myStyleProduct ownStylePro">
                                                    <div className="container">
                                                        <div className="row align-items-center">
                                                            <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">{ind + 1}</div>
                                                            <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1">{elem.qoplarSoni}</div>
                                                            <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">{elem.nonTuri}</div>
                                                            <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">{currentStaff.group}</div>
                                                            <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">{currentStaff.smena}</div>
                                                            <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">{elem.tulov}</div>
                                                            <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-right">{elem.date}</div>

                                                        </div>
                                                    </div>
                                                </div>
                                            })
                                        }







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
})
export default Staffview;