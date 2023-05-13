import React, { useEffect, useState } from 'react'
import axios from 'axios';
// import { Link } from 'react-router-dom'
import Chart from "react-apexcharts";

//leaflet
import Leaflet from '../../../components/leaflet';

//datepicker
import Datepickers from '../../../components/Datepicker';

//circularpro
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Card, Container, Row, Col, Dropdown } from 'react-bootstrap';

// img

import user1 from '../../../assets/images/user/1.jpg'
import user5 from '../../../assets/images/user/5.jpg'
import user2 from '../../../assets/images/user/2.jpg'
import user3 from '../../../assets/images/user/3.jpg'
import logoBread from '../../../assets/images/bread/logoBread.png'
import { color } from 'highcharts';
import { base_URL } from '../../../API';



const Dashbord = () => {
    const [nasiya, setNasiya] = useState('');
    const [foyda, setFoyda] = useState('');
    const [xarajat, setXarajat] = useState('');
    const [ommabopNon, setOmmabopNon] = useState([]);
    const [currentFoyda, setCurrentFoyda] = useState(0);



    useEffect(() => {
        axios.get(`${base_URL}/report/nasiya`)
            .then(res => {
                setNasiya(res.data.reduce((a, b) => a = a + b.overall, 0));
                // res.data.reduce((a,b) => a = a + b.overall, 0)
            })
            .catch(err => console.log(err));

        axios.get(`${base_URL}/report/daromat`)
            .then(res => {
                setCurrentFoyda(res.data.reduce((a, b) => a = a + b.overallPrice, 0));
                setFoyda(res.data);
                
               
                // res.data.reduce((a,b) => a = a + b.overall, 0)
                setOmmabopNon(res.data)
            })
            .catch(err => console.log(err))

        axios.get(`${base_URL}/report/expenses`)
            .then(res => {
                setXarajat(res.data.reduce((a, b) => a = a + b.overallPrice, 0));
                // res.data.reduce((a,b) => a = a + b.overall, 0)
            })
            .catch(err => console.log(err))


            



    }, [])

    const getData = (st, ed) => {

        axios.get(`${base_URL}/report/expenses?startDate=${st}&endDate=${ed}`)
            .then(({ data: receivedDT }) => {
                let currentXarajat = receivedDT.reduce((acc, a) => a.overallPrice + acc, 0)
                setXarajat(currentXarajat);
            })

        axios.get(`${base_URL}/report/nasiya?startDate=${st}&endDate=${ed}`)
            .then(({ data: receivedDT }) => {
                let currentNasiya = receivedDT.reduce((acc, a) => a.overall + acc, 0)
                setNasiya(currentNasiya);
            })

        axios.get(`${base_URL}/report/daromat?startDate=${st}&endDate=${ed}`)
            .then(({ data: receivedDT }) => {
                setCurrentFoyda(receivedDT.reduce((acc, a) => a.overallPrice + acc, 0))                
                setFoyda(receivedDT);
            })

    }

    let nonArray = [15,24,78,96,32,45,68,74,11,12,369,85,11,45,20,32];
    let sumNonArray = nonArray.reduce((acc, a) => acc + a, 0)
    
    // console.log(sumNonArray); // 6


    const chart1 = {
        options: {

            colors: ['#1f1f7a', '#2e2eb8'],
            chart: {
                fontFamily: 'DM Sans',
                toolbar: {
                    show: false,
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'light',
                    type: "vertical",
                    shadeIntensity: 0.5,
                    // gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
                    inverseColors: false,
                    opacityFrom: .8,
                    opacityTo: .2,
                    stops: [0, 50, 100],
                    colorStops: []
                }
            },
            grid: {
                xaxis: {
                    lines: {
                        show: false
                    }
                },
                yaxis: {
                    lines: {
                        show: false
                    }
                }
            },
            yaxis: {
                labels: {
                    offsetY: 0,
                    minWidth: 20,
                    maxWidth: 20
                },
            },
            xaxis: {
                type: 'datetime',
                labels: {
                    minHeight: 20,
                    maxHeight: 20
                },
                categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm'
                },
            },
        },
        series: [{
            name: 'Incomes',
            data: [90, 105, 72, 90, 65, 109, 130]  // kirim datasi 
        }, {
            name: 'Expenses',
            data: [115, 93, 75, 102, 144, 52, 71] // chiqim datasi
        }]
    }


    const chart2 = {
        options: {

            colors: ['#b3cccc', '#04237D', '#4d4dff'],
            chart: {

                toolbar: {
                    show: false,
                },
                sparkline: {
                    enabled: true,
                },
                events: {
                    click: function (chart, w, e) {
                        // console.log(chart, w, e)
                    }
                }
            },
            plotOptions: {
                bar: {
                    columnWidth: '40%',
                    distributed: true,
                    borderRadius: 5,
                }
            },
            dataLabels: {
                enabled: false
            },
            legend: {
                show: false
            },
            grid: {
                xaxis: {
                    lines: {
                        show: false
                    }
                },
                yaxis: {
                    lines: {
                        show: false
                    }
                }
            },

            xaxis: {
                categories: [
                    '30 Jan',
                    '25 Feb',
                    '28 Mar',
                ],
                labels: {
                    minHeight: 20,
                    maxHeight: 20,
                    style: {
                        fontSize: '12px'
                    }
                }
            }
        },
        series: [{
            data: [55, 42, 19, 30, 20, 65, 21, 23, 45, 60, 30, 20]
        }]

    }
    const chart3 = {
        options: {

            chart: {
                height: 330,
                type: 'donut',

            },

            labels: ["Kulcha", "Chimyon Patir", "Patir", "Boshqalar"],
            colors: ['#ffbb33', '#04237D', '#e60000', '#8080ff'],
            plotOptions: {
                pie: {
                    startAngle: -90,
                    endAngle: 270,
                    donut: {
                        size: '80%',
                        labels: {
                            show: true,
                            total: {
                                show: true,
                                color: '#BCC1C8',
                                fontSize: '18px',
                                fontFamily: 'DM Sans',
                                fontWeight: 600,
                            },
                            value: {
                                show: true,
                                fontSize: '25px',
                                fontFamily: 'DM Sans',
                                fontWeight: 700,
                                color: '#8F9FBC',
                            },
                        }
                    }
                }
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                lineCap: 'round'
            },
            grid: {
                padding: {

                    bottom: 0,
                }
            },
            legend: {
                position: 'bottom',
                offsetY: 8,
                show: true,
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        height: 268
                    }
                }
            }]
        },
        series: [43, 58, 20, 35] // Total Sum of circled diagram
    }
    return (
        <Container fluid>
            <Row>
                <Col md="12" className="mb-4 mt-5">
                    <div className="d-flex flex-wrap justify-content-between align-items-center">
                        <div>
                            <Row>
                                <Col md="3" className=''>
                                    <img src={logoBread} alt="" />
                                </Col>
                                <Col md="9" className=''>
                                    <h4 className='font-weight-bold' style={{ fontSize: "28px", color: "#C37500" }}>Non Markazi</h4>
                                    <h4 className="font-weight-bold" style={{ fontSize: "40px" }}>Haftalik Xisoboti</h4>
                                </Col>
                            </Row>


                        </div>
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
                        <button className='btn btn-primary myButtonOutput position-relative d-flex align-items-center justify-content-between' onClick={() => {
                            const startDate = document.getElementById("dateStart").value
                            const endDate = document.getElementById("dateEnd").value
                            const [smonth, sday, syear] = startDate.split('/');
                            const [emonth, eday, eyear] = endDate.split('/');
                            const modifiedStart = `${syear}-${smonth}-${sday}`
                            const modifiedEnd = `${eyear}-${emonth}-${eday}`
                            getData(modifiedStart, modifiedEnd)
                        }}>Saralash</button>
                        </div>
                    </div>
                </Col>
                <Col lg="8" md="12">
                    <Row>
                        <Col md="4">
                            <Card>
                                <Card.Body>
                                    <div className="align-items-center">
                                        <div className="align-items-center" >
                                            <p className="mb-2 text-secondary" style={{ fontSize: '18px', fontWeight: '600', lineHeight: '21px', color: '#52BA00', textAlign: 'center' }}>Umumiy Foyda</p>
                                            <div className="flex-wrap justify-content-start align-items-center">
                                                <h5 className="mb-0 font-weight-bold" style={{ fontSize: '22px', fontWeight: '700', textAlign: 'center' }}>{currentFoyda} so'm</h5>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md="4">
                            <Card>
                                <Card.Body>
                                    <div className="align-items-center justify-content-center">
                                        <div className="align-items-center justify-content-center">
                                            <p className="mb-2 text-secondary" style={{ color: '#C37500', fontSize: '18px', fontWeight: '600', lineHeight: '21px', textAlign: 'center' }}>Nasiya</p>
                                            <div className="justify-content-center align-items-center">
                                                <h5 className="mb-0 font-weight-bold" style={{ fontSize: '22px', fontWeight: '600', lineHeight: '21px', textAlign: 'center' }}>{nasiya} so'm</h5>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md="4">
                            <Card>
                                <Card.Body>
                                    <div className="align-items-center">
                                        <div className="">
                                            <p className="mb-2 text-secondary" style={{ color: '#EC0000', fontSize: '18px', fontWeight: '600', lineHeight: '21px', textAlign: 'center' }}>Xarajatlar</p>
                                            <div className="justify-content-center align-items-center">
                                                <h5 className="mb-0 font-weight-bold" style={{ fontSize: '22px', fontWeight: '600', lineHeight: '21px', textAlign: 'center' }}>{xarajat} so'm</h5>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md="12">
                            <Card>
                                <Card.Body>
                                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                                        <h4 className="font-weight-bold">Sotuv Xisoboti</h4>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div><svg width="24" height="24" viewBox="0 0 24 24" fill="primary" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="3" y="3" width="18" height="18" rx="2" fill="#3378FF" />
                                            </svg>
                                                <span>Daromadlar</span>
                                            </div>
                                            <div className="ml-3"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="3" y="3" width="18" height="18" rx="2" fill="#19b3b3" />
                                            </svg>
                                                <span>Xarajatlar</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Chart className="custom-chart" options={chart1.options} series={chart1.series} type="area" height="265" />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col lg="4" md="8">
                    <Card>
                        <Card.Body>
                            <h4 className="font-weight-bold mb-3">Ommabop Sotilgan Maxsulotlar</h4>
                            <Chart className="custom-chart" options={chart3.options} series={chart3.series} type="donut" height="330" />
                            <div className="d-flex justify-content-around align-items-center">
                                <div><svg width="24" height="24" viewBox="0 0 24 24" fill="#ffbb33" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="3" y="3" width="18" height="18" rx="2" fill="#ffbb33" />
                                </svg>

                                    <span>Kulcha</span>
                                </div>
                                <div>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#e60000" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="3" y="3" width="18" height="18" rx="2" fill="#e60000" />
                                    </svg>

                                    <span>Patir</span>
                                </div>
                            </div>
                            <div className="d-flex justify-content-around align-items-center mt-3">
                                <div>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="primary" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="3" y="3" width="18" height="18" rx="2" fill="#04237D" />
                                    </svg>

                                    <span>Chimyon Patir</span>
                                </div>
                                <div>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="primary" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="3" y="3" width="18" height="18" rx="2" fill="#8080ff" />
                                    </svg>

                                    <span>Boshqalar</span>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Dashbord;