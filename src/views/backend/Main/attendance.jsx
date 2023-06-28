
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Container, Tab, Nav, Row, Col, Form, OverlayTrigger, Tooltip, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';
//datepicker
import Datepickers from '../../../components/Datepicker';

// Data Context Staff
import { allstaffDataContext } from './ContextProvider/DataProvider';

// API for attandance 
import { ATTANDANCE_URL } from '../../../API';

// davomatOlish icon
import DavomatOlish from '../../../assets/images/icon/tick-circle.png'
import DavomatKurish from '../../../assets/images/icon/eye.png'



const Attendance = () => {
    const [attendance, setAttendance] = useState([]);
    const [filterVal, setFilterVal] = useState('');
    const [activeClass, setActiveClass] = useState({});
    const [attanded, setAttanded] = useState(false);
    const [searchData, setSearchData] = useState([]);
    const [soat, setSoat] = useState('');
    const [errorMessagesHour, setErrorMessagesHour] = useState({});
    const [minut, setMinut] = useState('');
    const [errorMessagesMinute, setErrorMessagesMinute] = useState({});
    const staffList = useContext(allstaffDataContext);


    // Bugungi sanani olish
    const attDate = new Date().getDate();
    const attMonth = new Date().getMonth() + 1;
    const attYear = new Date().getFullYear();
    const todayDate = attDate + "/" + attMonth + "/" + attYear // Bugungi sana





    useEffect(() => {
        axios.get(ATTANDANCE_URL)
            .then(res => {
                console.log(res.data);
                setSearchData(res.data)
                setAttendance(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    // // Search
    // function handleFilter(e) {
    //     if (e.target.value == '') {
    //         setAttendance(searchData)
    //     } else {
    //         const filterResult = searchData.filter(item => item.firstName.toLowerCase().includes(e.target.value.toLowerCase()) || item.lastName.toLowerCase().includes(e.target.value.toLowerCase()))
    //         setAttendance(filterResult)
    //     }
    //     setFilterVal(e.target.value)
    // }

    const handleButtonClick = (id) => {

        console.log(
            !attanded,
            id,
            soat[id] + ":" + minut[id]
        );

        // if (attendance.date === todayDate) {
        //     axios.put(ATTANDANCE_URL, {
        //         present: !attanded,
        //         staffId: id, // hodim ID
        //         timeOfArrival: soat[id] + ":" + minut[id] // string
        //     })
        // } else {
        //     axios.post(ATTANDANCE_URL, {
        //         present: !attanded,
        //         staffId: id, // hodim ID
        //         timeOfArrival: soat + ":" + minut // string
        //     })
        // }

        setActiveClass((prevActiveClass) => ({
            ...prevActiveClass,
            [id]: !prevActiveClass[id], // toggle the class
        }));
    };





    return (
        <Container fluid>
            <Tab.Container defaultActiveKey="staff-attendance">
                <Row>
                    <Col lg="12">
                        <div className="d-flex flex-wrap align-items-center justify-content-between my-schedule mb-4">
                            <div className="d-flex align-items-center justify-content-between">
                                <h4 className="font-weight-bold"></h4>
                            </div>
                            {/* <div className="create-workform">
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
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        <Card>
                            <Card.Body className="p-0">
                                <div className="mm-edit-list usr-edit">
                                    <Nav variant="pills" className="mm-edit-profile d-flex">
                                        <li className="col-md-3 p-0">
                                            <Nav.Link eventKey="staff-attendance" style={{ fontSize: "22px", fontWeight: "bold", paddingLeft: "32px" }}>
                                                Davomat olish
                                                <img src={DavomatOlish} style={{ marginLeft: "12px" }} alt="" />
                                            </Nav.Link>
                                        </li>
                                        <li className="col-md-3 p-0">
                                            <Nav.Link eventKey="staff-attendance-view" style={{ fontSize: "22px", fontWeight: "bold", paddingLeft: "32px", color: "black" }}>
                                                Davomat ko'rish
                                                <img src={DavomatKurish} style={{ marginLeft: "12px" }} alt="" />
                                            </Nav.Link>
                                        </li>
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
                                                    placeholder={todayDate}
                                                    disabled={true}
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
                                                            <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 text-center">Ishga kelgan vaqti</div>
                                                            <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">Ishga kelgani</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {
                                                    staffList
                                                        .sort((a, b) => a.lastName.localeCompare(b.lastName))
                                                        .map((staff, ind) => (
                                                            <div key={ind} className="p-2 border myStyleStaff ownStyleStaff">
                                                                <div className="container">
                                                                    <div className="row align-items-center">
                                                                        <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 text-center">{ind + 1}</div>
                                                                        <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 text-left" style={{ fontWeight: "500" }}>{staff.lastName + " " + staff.firstName}</div>
                                                                        <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                                                                            <div className="input-group">
                                                                                <input
                                                                                    key={staff._id}
                                                                                    type="number"
                                                                                    className="form-control"
                                                                                    placeholder="soat"
                                                                                    style={{ marginRight: '10px' }}
                                                                                    // onChange={e => handleInputChangeHour(e.target.value, staff._id)}
                                                                                    onChange={e => {
                                                                                        const inputValue = parseInt(e.target.value);
                                                                                        const staffId = staff._id;
                                                                                        if (inputValue > 24 || inputValue < 0) {
                                                                                            setErrorMessagesHour(prevState => ({
                                                                                                ...prevState,
                                                                                                [staffId]: "Kiritilgan raqam 24 dan oshmasligi kerak"
                                                                                            }));
                                                                                        } else {
                                                                                            setErrorMessagesHour(prevState => ({
                                                                                                ...prevState,
                                                                                                [staffId]: ''
                                                                                            }));
                                                                                            setSoat(prevState => ({
                                                                                                ...prevState,
                                                                                                [staffId]: inputValue
                                                                                            }));
                                                                                        }
                                                                                    }}
                                                                                    value={soat[staff._id] || ''}
                                                                                    required
                                                                                />
                                                                                {errorMessagesHour[staff._id] && (
                                                                                    <div style={{ color: 'red' }}>{errorMessagesHour[staff._id]}</div>
                                                                                )}
                                                                                <input
                                                                                    key={ind}
                                                                                    type="number"
                                                                                    className="form-control"
                                                                                    placeholder="minut"
                                                                                    // onChange={e => handleInputChangeMinut(e.target.value, staff._id)}
                                                                                    onChange={e => {
                                                                                        const inputValue = parseInt(e.target.value);
                                                                                        const staffId = staff._id;
                                                                                        if (inputValue > 59 || inputValue < 0) {
                                                                                            setErrorMessagesMinute(prevState => ({
                                                                                                ...prevState,
                                                                                                [staffId]: "Kiritilgan raqam 60 dan oshmasligi kerak"
                                                                                            }));
                                                                                        } else {
                                                                                            setErrorMessagesMinute(prevState => ({
                                                                                                ...prevState,
                                                                                                [staffId]: ''
                                                                                            }));
                                                                                            setMinut(prevState => ({
                                                                                                ...prevState,
                                                                                                [staffId]: inputValue
                                                                                            }));
                                                                                        }
                                                                                    }}
                                                                                    value={minut[staff._id] || ''}
                                                                                />
                                                                                {errorMessagesMinute[staff._id] && (
                                                                                    <div style={{ color: 'red' }}>{errorMessagesMinute[staff._id]}</div>
                                                                                )}

                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                                                                            <button
                                                                                key={staff._id}
                                                                                className={activeClass[staff._id] ? 'btn btn-success' : 'btn btn-danger'}

                                                                                onClick={() => handleButtonClick(staff._id)}>
                                                                                {
                                                                                    activeClass[staff._id] ? "Keldi" : "Kelmadi"
                                                                                }


                                                                            </button>


                                                                        </div>


                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                }
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