import React, { useState, useContext, useEffect } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Card from '../../../components/Card'
import { Link, useHistory, useParams } from 'react-router-dom'
import axios from 'axios';
import { PLANS_URL } from '../../../API';
import DatePicker from "react-datepicker";
import './Plans.css'
import { base_URL } from '../../../API';

import { staffDataContext } from './ContextProvider/DataProvider';

// WithAuthGuard
import { withAllRouterGuard } from "../App/guards/with-auth-guard";

const PlansEdit = withAllRouterGuard(() => {
    const [plan, setPlan] = useState('');
    const [person, setPerson] = useState('');
    const [deadline, setDeadline] = useState();
    const [status, setStatus] = useState('');
    const [error, setError] = useState(false);

    const staffList = useContext(staffDataContext);
    const { id } = useParams();
    const history = useHistory()
    



    useEffect(() => {
        axios.get(`${base_URL}/plan/${id}`)
            .then(res => {              
                setPlan(res.data.plan);
                setPerson(res.data.person);
                const [day, month, year] = res.data.deadline.split("/").map(Number);                
                setDeadline(new Date(year, month - 1, day));
                setStatus(res.data.status);                
                
            } )
            .catch(err => console.log(err))
    }, [id])





    function handleAdd(e) {
        e.preventDefault();
        if (plan.length === 0 || person.length || status.length) {
            setError(true)
        }
        if (plan && person && status) {
            axios.put(PLANS_URL, {
                id, 
                new: {
                plan,
                deadline: deadline.getDate() + "/" + (deadline.getMonth() + 1) + "/" + deadline.getFullYear(),
                person,
                status
            }
            })
                .then(res => {
                    console.log("Data is updated", res);
                    history.push('/plan')

                })
                .catch(err => console.log(err))
        }
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
                                        <li className="breadcrumb-item active" aria-current="page">Rejani o'zgartirish</li>
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
                        <h4 className="font-weight-bold d-flex align-items-center">Rejani o'zgartirish</h4>
                    </Col>
                    <Col lg="12" className='outputAddStyle'>
                        <Card>
                            <Card.Body>
                                {error ? <p className='text-danger text-center font-weight-bold'>Ushbu qatorlarning barchasini to'ldirishingiz shart</p> : ''}
                                <Form className="row g-3">
                                    <div className="col-md-12 mb-3">
                                        <Form.Label htmlFor="Text1" className="form-label font-weight-bold text-muted text-uppercase">Nomi</Form.Label>
                                        <Form.Control type="text" className="form-control" id="Text1" placeholder="Nomini kiriting..." value={plan} onChange={e => setPlan(e.target.value)} />
                                    </div>
                                    <div className="col-md-12 mb-3 position-relative">
                                        <Form.Label htmlFor="Text2" className="font-weight-bold text-muted text-uppercase">Muddat</Form.Label>
                                        <DatePicker className="form-control" id="Text2" name="event_date" placeholderText="Sanani kiriting" autoComplete="off" selected={deadline} onChange={date => setDeadline(date)} />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <Form.Label htmlFor="Text2" className="form-label font-weight-bold text-muted text-uppercase">Mas'ul shahs</Form.Label>
                                        <select id="Text2" className="form-select form-control choicesjs" value={person} onChange={e => setPerson(e.target.value)}>
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
                                        <select id="inputState" className="form-select form-control choicesjs" value={status} onChange={e => setStatus(e.target.value)}>
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
                                        </svg>Saqlash
                                    </Link>
                                </div>
                            </Card.Body>
                        </Card>

                    </Col>
                </Row>
            </Container>
        </>
    )
})
export default PlansEdit;