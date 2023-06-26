
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Tab, Nav, Row, Col, Form, OverlayTrigger, Tooltip, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';
//datepicker
import Datepickers from '../../../components/Datepicker';

import { ATTANDANCE_URL } from '../../../API';



const Attendance = () => {
    const [attendance, setAttendance] = useState([]);
    const [filterVal, setFilterVal] = useState('');
    const [activeClass, setActiveClass] = useState({});
    const [attended, setAttended] = useState(false);
    const [searchData, setSearchData] = useState([]);
    const [soat, setSoat] = useState([]);
    const [minut, setMinut] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:3004/staff')
            .then(res => {
                setAttendance(res.data)
                setSearchData(res.data)
            })
            .catch(err => console.log(err))


    }, [])

    // Search
    function handleFilter(e) {
        if (e.target.value == '') {
            setAttendance(searchData)
        } else {
            const filterResult = searchData.filter(item => item.firstName.toLowerCase().includes(e.target.value.toLowerCase()) || item.lastName.toLowerCase().includes(e.target.value.toLowerCase()))
            setAttendance(filterResult)
        }
        setFilterVal(e.target.value)
    }

    const handleButtonClick = (id) => {
        attendance.map(elem => {
            if (elem._id === id) {
                setAttended(!attended)
                if (attended) {
                    elem.attendance.keldi = true;
                } else {
                    elem.attendance.keldi = false;
                }
            }
            console.log(attendance);
        })
        setActiveClass((prevActiveClass) => ({
            ...prevActiveClass,
            [id]: !prevActiveClass[id], // toggle the class
        }));
    };

    // getting different values from hour
    const handleInputChangeHour = (valueHour, index) => {
        const updatedInputs = [...soat]; // Create a copy of the inputs array
        updatedInputs[index] = valueHour; // Update the value at the specific index
        setSoat(updatedInputs); // Update the state with the modified array
    };

    // getting different values from minut
    const handleInputChangeMinut = (valueMinut, ind) => {
        const updatedInputs = [...minut]; // Create a copy of the inputs array
        updatedInputs[ind] = valueMinut; // Update the value at the specific index
        setMinut(updatedInputs); // Update the state with the modified array
    };

    const handleChange = () => {
        axios.post(ATTANDANCE_URL, {
            present: true,
            staffId: 23,// hodim ID
            timeOfArrival: "23:23" // string
            
        })
        
    }


    

    return (
        <Container fluid>
            <Tab.Container defaultActiveKey="staff-attendance">
                <Row>
                    <Col lg="12">
                        <div className="d-flex flex-wrap align-items-center justify-content-between my-schedule mb-4">
                            <div className="d-flex align-items-center justify-content-between">
                                <h4 className="font-weight-bold"></h4>
                            </div>
                            <div className="create-workform">
                                <div className="d-flex flex-wrap align-items-center justify-content-between">
                                    <div className="modal-product-search d-flex">
                                        <Form className="mr-3 position-relative">
                                            <Form.Group className="mb-0">
                                                <Form.Control type="text"
                                                    className="form-control"
                                                    id="exampleInputText"
                                                    placeholder="Qidirish..."
                                                    value={filterVal}
                                                    onInput={e => handleFilter(e)}
                                                />

                                                <Link to="#" className="search-link">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                    </svg>
                                                </Link>
                                            </Form.Group>
                                        </Form>
                                        <Link to="/staff-add" className="btn myButtonStaff qushishStaff position-relative d-flex align-items-center justify-content-between">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>Qo'shish
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Card>
                            <Card.Body className="p-0">
                                <div className="mm-edit-list usr-edit">
                                    <Nav variant="pills" className="mm-edit-profile d-flex">
                                        <li className="col-md-3 p-0">
                                            <Nav.Link eventKey="staff-attendance">Xodimlar Davomatini olish</Nav.Link>
                                        </li>
                                        <li className="col-md-3 p-0">
                                            <Nav.Link eventKey="staff-attendance-view">Xodimlar davomatini ko'rish</Nav.Link>
                                        </li>
                                        {/* <li className="col-md-3 p-0">
                                                <Nav.Link eventKey="emailandsms">Email and SMS</Nav.Link>
                                            </li>
                                            <li className="col-md-3 p-0">
                                                <Nav.Link eventKey="manage-contact">Manage Contact</Nav.Link>
                                            </li> */}
                                    </Nav>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg="12" className=''>
                        {/* New Version */}
                        <div className="mm-edit-list-data">
                            <Tab.Content>
                                <Tab.Pane eventKey="staff-attendance" role="tabpanel">
                                    <Card>
                                        <div className="container-fluid mt-5 myContainerStyleStaff">
                                            <div className="date-icon-set" style={{ width: "15%", marginLeft: "auto" }}>
                                                <Datepickers
                                                    className="vanila-datepicker"
                                                    givenID="dateStart"
                                                    names="start"
                                                    placeholder="sana"


                                                />

                                                <span className="search-link">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className=""
                                                        width="20"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                        />
                                                    </svg>
                                                </span>
                                            </div>
                                            <div className="d-grid gapStyleStaff">
                                                <div className="p-2">
                                                    <div className="container">
                                                        <div className="row align-items-center myHeaderStaffStyle">
                                                            <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 text-center">№</div>
                                                            <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 text-left">Familiya Ismi</div>
                                                            <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">Ishga kelgani</div>
                                                            <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 text-center">Ishga kelgan vaqti</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {
                                                    attendance.map((elem, ind) => (
                                                        <div key={ind} className="p-2 border myStyleStaff ownStyleStaff">
                                                            <div className="container">
                                                                <div className="row align-items-center">
                                                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 text-center">{ind + 1}</div>
                                                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 text-left" style={{ fontWeight: "500" }}>{elem.firstName} {elem.lastName}</div>
                                                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                                                                        <button
                                                                            key={elem._id}
                                                                            className={activeClass[elem._id] ? 'btn btn-success' : 'btn btn-danger'}

                                                                            onClick={() => handleButtonClick(elem._id)}>
                                                                            {
                                                                                activeClass[elem._id] ? "Keldi" : "Kelmadi"
                                                                            }


                                                                        </button>
                                                                    </div>
                                                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                                                                        <div className="input-group">
                                                                            <input
                                                                                key={elem._id}
                                                                                type="number"
                                                                                className="form-control"
                                                                                placeholder="soat"
                                                                                style={{ marginRight: '10px' }}
                                                                                onChange={e => handleInputChangeHour(e.target.value, elem._id)}
                                                                            />
                                                                            <input
                                                                                key={ind}
                                                                                type="number"
                                                                                className="form-control"
                                                                                // defaultValue={0}
                                                                                onChange={e => handleInputChangeMinut(e.target.value, elem._id)}
                                                                            />

                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                }

                                                <div className="text-right mt-4">
                                                    <Link to="/attendance" className='btn myButtonCalculates qushishCalculate' type="button" onClick={handleChange}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                        </svg> Saqlash
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </Tab.Pane>

                                {/* Davomatni ko'rish oynasi */}

                                <Tab.Pane eventKey="staff-attendance-view" role='tabpanel'>
                                    <Card>
                                        <div className="container-fluid mt-5 myContainerStyleStaff">
                                            <div className="d-grid gapStyleStaff">


                                                <div className="p-2">
                                                    <div className="container">
                                                        <div className="row align-items-center myHeaderStaffStyle">
                                                            <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 text-center">№</div>
                                                            <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 text-left">Familiya Ismi</div>
                                                            <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">Ishga kelgani</div>
                                                            <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 text-left">Sana</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {

                                                    attendance.map((elem, ind) => (
                                                        <div key={ind} className="p-2 border myStyleStaff ownStyleStaff">
                                                            <div className="container">
                                                                <div className="row align-items-center">
                                                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 text-center">{ind + 1}</div>
                                                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 text-left" style={{ fontWeight: "500" }}>{elem.firstName} {elem.lastName}</div>
                                                                    {elem.attendance.map((att, index) => (
                                                                        <div key={index} className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                                                                            {att.keldi === 1 ? "+" : "-"}
                                                                        </div>
                                                                    ))}

                                                                    {elem.attendance.map((att, index) => (
                                                                        <div key={index} className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                                                                            {att.sana}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </Card>

                                </Tab.Pane>


                            </Tab.Content>
                        </div>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    )
}

export default Attendance;