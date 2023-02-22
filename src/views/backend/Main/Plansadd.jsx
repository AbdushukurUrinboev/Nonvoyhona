import React, { useState, useContext } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Card from '../../../components/Card'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';
import { PLANS_URL } from '../../../API';
import DatePicker from "react-datepicker";
import './Plans.css'

import { staffDataContext } from './ContextProvider/DataProvider';

const Plansadd = () => {

    const [plan, setPlan] = useState('');
    const [person, setPerson] = useState('');
    const [deadline, setDeadline] = useState();
    const [status, setStatus] = useState('');

    const staffList = useContext(staffDataContext);
    console.log(staffList);
    const history = useHistory()
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    function handleAdd(e) {
        e.preventDefault();
        axios.post(PLANS_URL, {
            plan,
            deadline: deadline.getDate() + "-" + month[deadline.getMonth()] + "," + deadline.getFullYear(),
            person,
            status
        })
            .then(res => {
                console.log("Data is saved", res);
                history.push('/plan')

            })
            .catch(err => console.log(err))
    }



    return (
        <>
            <Container>
                <Row>
                    <Col lg="12" className='mt-5'>
                        <div className="d-flex flex-wrap align-items-center justify-content-between">
                            <div className="d-flex align-items-center justify-content-between">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb p-0 mb-0">
                                        <li className="breadcrumb-item"><Link to="/plan">Rejalar</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">Yangi reja qo'shish</li>
                                    </ol>
                                </nav>
                            </div>
                            <Link to="/plan" className="btn btn-primary btn-sm d-flex align-items-center justify-content-between ml-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                </svg>
                                <span className="ml-2">Orqaga</span>
                            </Link>
                        </div>
                    </Col>
                    <Col lg="12" className="mb-3 d-flex justify-content-between mt-5 outputAddStyle">
                        <h4 className="font-weight-bold d-flex align-items-center">Yangi Reja qo'shish</h4>
                    </Col>
                    <Col lg="12" className='outputAddStyle'>
                        <Card>
                            <Card.Body>
                                <Form className="row g-3">
                                    <div className="col-md-12 mb-3">
                                        <Form.Label htmlFor="Text1" className="form-label font-weight-bold text-muted text-uppercase">Nomi</Form.Label>
                                        <Form.Control type="text" className="form-control" id="Text1" placeholder="Nomini kiriting..." onChange={e => setPlan(e.target.value)} />
                                    </div>
                                    <div className="col-md-12 mb-3 position-relative">
                                        <Form.Label htmlFor="Text2" className="font-weight-bold text-muted text-uppercase">Muddat</Form.Label>
                                        <DatePicker className="form-control" id="Text2" name="event_date" placeholderText="Sanani kiriting" autoComplete="off" selected={deadline} onChange={date => setDeadline(date)} />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <Form.Label htmlFor="Text2" className="form-label font-weight-bold text-muted text-uppercase">Mas'ul shahs</Form.Label>
                                        <select id="Text2" className="form-select form-control choicesjs" onChange={e => setPerson(e.target.value)}>
                                            <option value="Bajarildi">Xodimlar</option>
                                            {
                                                staffList.map((staff, ind) => {
                                                    return <option key={ind} value={staff}>{staff}</option>
                                                })
                                            }                                           
                                        </select>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <Form.Label htmlFor="inputState" className="form-label font-weight-bold text-muted text-uppercase">Tur</Form.Label>
                                        <select id="inputState" className="form-select form-control choicesjs" onChange={e => setStatus(e.target.value)}>
                                            <option value="Bajarildi">Bajarildi</option>
                                            <option value="Bajarilmoqda">Bajarilmoqda</option>
                                            <option value="Bajarilmadi">Bajarilmadi</option>
                                        </select>
                                    </div>
                                </Form>
                                <div className="text-right mt-4">
                                    <Link to="/output" className='btn myButtonOutput qushishOutput' type="button" onClick={handleAdd}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>Qo'shish
                                    </Link>
                                </div>
                            </Card.Body>
                        </Card>

                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default Plansadd;