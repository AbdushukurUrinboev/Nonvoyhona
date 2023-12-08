import React, { useEffect, useState } from 'react'
import { Container, Tab, Nav, Row, Col, Card } from 'react-bootstrap'
import axios from 'axios';
import { FilterStaff, FilterStaffSmena } from './FilterProduct/FilterStaff';
import { useHistory } from "react-router";
import Datepickers from '../../../components/Datepicker';
import { Link } from 'react-router-dom'
import './Staff.css'
import { base_URL } from '../../../API';
import { CUSTOMERS_URL } from '../../../API';



// Loading
import { FallingLines } from 'react-loader-spinner';




const Xisobot = () => {

    const [qoplarSoni, setQoplarSoni] = useState({})
    const [qoplarSoniJami, setQoplarSoniJami] = useState(0)






    const [loading, setLoading] = useState(true)

    const getData = (st, ed) => {



        axios.post(`${base_URL}/report/work`, {
            startDate: st,
            endDate: ed
        })
            .then(({ data: receivedDT }) => {

                const mergedData = {};
                receivedDT.forEach(item => {
                    item.qoplarSoni = item.qoplarSoni * 1;
                    const bread = item.bread;
                    const qoplarSoni = parseInt(item.qoplarSoni);

                    if (mergedData[bread]) {
                        mergedData[bread].qoplarSoni += qoplarSoni;
                    } else {
                        mergedData[bread] = { ...item };
                    }
                });

                setQoplarSoni(mergedData);
                const totalSum = Object.values(mergedData).reduce((acc, item) => {
                    return acc + parseFloat(item.qoplarSoni);
                }, 0);

                setQoplarSoniJami(totalSum);


            })
    }

    useEffect(() => {

        const startDate = new Date(); // Current date and time
        startDate.setHours(0, 0, 0, 0); // Set time to midnight

        const endDate = new Date(startDate);
        endDate.setHours(23, 59, 59, 999); // Set time to 23:59:59:999

        axios.post(`${base_URL}/report/work`, {
            startDate: startDate,
            endDate: endDate

        })
            .then(({ data: receivedDT }) => {

                setLoading(false);

                const mergedData = {};

                receivedDT.forEach(item => {
                    item.qoplarSoni = item.qoplarSoni * 1;
                    const bread = item.bread;
                    const qoplarSoni = parseInt(item.qoplarSoni);

                    if (mergedData[bread]) {
                        mergedData[bread].qoplarSoni += qoplarSoni;
                    } else {
                        mergedData[bread] = { ...item };
                    }
                });

                setQoplarSoni(mergedData);


                const totalSum = Object.values(mergedData).reduce((acc, item) => {
                    return acc + parseFloat(item.qoplarSoni);
                }, 0);

                setQoplarSoniJami(totalSum);



            })
    }, [])













    return (
        <>

            {
                loading ?
                    <div style={{ textAlign: 'center', paddingTop: '15%' }}>
                        <div>
                            <FallingLines
                                color="#4fa94d"
                                width="10%"
                                visible={true}
                                ariaLabel='falling-lines-loading'
                            />
                        </div>
                    </div>
                    :

                    <Container fluid>
                        <Tab.Container defaultActiveKey="yopilgan-qoplar">
                            <Row>
                                <Col lg="12" className='mt-5'>
                                    <div className="d-flex flex-wrap align-items-center justify-content-between my-schedule mb-4 customerSt">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <h4 className="font-weight-bold">Xisobot</h4>
                                        </div>


                                        <div className="create-workform">
                                            <div className="d-flex flex-wrap align-items-center justify-content-between">
                                                <div className="d-flex">
                                                    <div className="form-group mb-0 vanila-daterangepicker d-flex flex-row">
                                                        <div className="date-icon-set">
                                                            <Datepickers className="vanila-datepicker" givenID="dateStart" names="start" placeholder="...dan" />
                                                            <span className="search-link">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                </svg>
                                                            </span>
                                                        </div>
                                                        <span className="flex-grow-0">
                                                            <span className="btn">to</span>
                                                        </span>
                                                        <div className="date-icon-set">
                                                            <Datepickers names="end" givenID="dateEnd" placeholder="...gacha" />
                                                            <span className="search-link">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                </svg>
                                                            </span>
                                                        </div>


                                                    </div>

                                                    <button className='btn btn-primary myButtonOutput position-relative d-flex align-items-center justify-content-between' onClick={() => {
                                                        const startDate = document.getElementById("dateStart").value
                                                        const endDate = document.getElementById("dateEnd").value
                                                        const [smonth, sday, syear] = startDate.split('/');
                                                        const [emonth, eday, eyear] = endDate.split('/');
                                                        const modifiedStart = new Date(`${syear}-${smonth}-${sday}`)
                                                        modifiedStart.setHours(0, 0, 0, 0);
                                                        const modifiedEnd = new Date(`${eyear}-${emonth}-${eday}`)
                                                        modifiedEnd.setHours(23, 59, 59, 999); // Set time to 23:59:59:999
                                                        getData(modifiedStart, modifiedEnd)
                                                    }}>Saralash</button>


                                                </div>
                                            </div>

                                        </div>
                                    </div>



                                    <Card>
                                        <Card.Body className="p-0">
                                            <div className="mm-edit-list usr-edit">
                                                <Nav variant="pills" className="mm-edit-profile d-flex">
                                                    <li className="col-md-3 p-0">
                                                        <Nav.Link eventKey="yopilgan-qoplar">Yopilgan qoplar</Nav.Link>
                                                    </li>
                                                    <li className="col-md-3 p-0">
                                                        <Nav.Link eventKey="boshqa">Boshqa</Nav.Link>
                                                    </li>

                                                </Nav>
                                            </div>
                                        </Card.Body>
                                    </Card>

                                    <Col lg="12">
                                        <div className="mm-edit-list-data">
                                            <Tab.Content>
                                                <Tab.Pane eventKey="yopilgan-qoplar" role='tabpanel'>
                                                    <Card>
                                                        <div className="container-fluid mt-5 myContainerStyleCustomer">
                                                            <div className="d-grid gapStyleCustomer mb-5">
                                                                <div className="p-2">
                                                                    <div className="container">
                                                                        <div className="row align-items-center myHeaderCustomerStyle">
                                                                            <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">№</div>
                                                                            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">Non Nomi</div>
                                                                            <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">Qoplar soni</div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {
                                                                    Object.keys(qoplarSoni).map((customer, index) => (
                                                                        <div key={index} className="p-2 border myStyleCustomer ownStyleCustomer">
                                                                            <div className="container">
                                                                                <div className="row align-items-center">
                                                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">{index + 1}</div>
                                                                                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6" style={{ fontWeight: "500" }}>{customer}</div>
                                                                                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">{qoplarSoni[customer].qoplarSoni}</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))
                                                                }
                                                            </div>
                                                            <h5 style={{ color: "blue", fontWeight: "800" }}>Jami qoplar soni: {qoplarSoniJami}</h5>
                                                        </div>
                                                    </Card>
                                                </Tab.Pane>

                                                {/* Qarzdor mijozlar */}
                                                <Tab.Pane eventKey="boshqa" role='tabpanel'>
                                                    <Card>

                                                        <div className="container-fluid mt-5 myContainerStyleCustomer">
                                                            <div className="d-grid gapStyleCustomer mb-5">
                                                                <div className="p-2">
                                                                    <div className="container">
                                                                        <div className="row align-items-center myHeaderCustomerStyle">
                                                                            <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">№</div>
                                                                            <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">Familiya Ismi</div>
                                                                            <div className="col-sm-12 col-md-8 col-lg-8 col-xl-8">Boshqa</div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <h4>Tez Kunda</h4>

                                                            </div>

                                                        </div>
                                                    </Card>
                                                </Tab.Pane>
                                            </Tab.Content>
                                        </div>
                                    </Col>
                                </Col>
                            </Row>
                        </Tab.Container>
                        <div className='container text-center mt-5'>
                            {qoplarSoni && qoplarSoni.length ? '' : "Xozirda ma'lumotlar kiritilmagan"}
                        </div>
                    </Container>
            }

        </>

    )
}
export default Xisobot;