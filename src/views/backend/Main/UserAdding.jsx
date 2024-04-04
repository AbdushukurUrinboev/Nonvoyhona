import React, { useEffect, useState, useContext } from 'react'
import { Container, Tab, Nav, Row, Col, Card, Form, Button } from 'react-bootstrap'
import axios from 'axios';
import { FilterStaff, FilterStaffSmena } from './FilterProduct/FilterStaff';

import Datepickers from '../../../components/Datepicker';
import { Link, useHistory } from 'react-router-dom'
import './Staff.css'
import { USERS_URL, base_URL } from '../../../API';
import { CUSTOMERS_URL } from '../../../API';
import { customersDataContext, allstaffDataContext } from './ContextProvider/DataProvider';



// Loading
import { FallingLines } from 'react-loader-spinner';


// WithAuthGuard
import { withAllRouterGuard } from "../App/guards/with-auth-guard";

const UserAdding = withAllRouterGuard(() => {
    const [staffFullName, setStaffFullName] = useState(''); //    
    const [login, setLogin] = useState(''); //    
    const [password, setPassword] = useState(''); //    
    const [role, setRole] = useState(''); //    

    const [showPassword, setShowPassword] = useState(false);


    const history = useHistory()
    const customerList = useContext(customersDataContext);
    const staffList = useContext(allstaffDataContext);


    const handleChange = () => {

        axios.post(USERS_URL, {
            fullName: staffFullName,
            login,
            password,
            role
        })
            .then(res => {
                console.log("Data is saved", res)
                setLogin("");
                setPassword("");
                history.push('/');
                // history.push('/storage')
            })
            .catch(err => console.log(err))




    }





    return (
        <>

            <Container fluid>
                <Tab.Container>
                    <Row className='justify-content-center'>
                        <Col lg="12" className='mt-5'>
                            <div className="col-md-12 mb-3  w-50 mx-auto">
                                <Form.Label htmlFor="inputState" className="form-label font-weight-bold text-muted text-uppercase">Xodimlar ro'yhati</Form.Label>
                                <select id="inputState" className="form-select form-control choicesjs" value={staffFullName} onChange={e => setStaffFullName(e.target.value)} >
                                    <option value="">Xodimlar ro'yhati</option>
                                    {
                                        staffList.map((staff, ind) => {
                                            return <option key={ind}>{staff.lastName + " " + staff.firstName}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-md-12 mb-3 w-50 mx-auto">
                                <Form.Label htmlFor="Text3" className="font-weight-bold text-muted text-uppercase">Login</Form.Label>
                                <Form.Control type="text" id="Text3" placeholder="Login kiriting..." value={login} required='required' onChange={e => setLogin(e.target.value)} />
                            </div>
                            <div className="col-md-12 mb-3 w-50 mx-auto">
                                <Form.Label htmlFor="Text4" className="font-weight-bold text-muted text-uppercase">Parol</Form.Label>
                                <Form.Control
                                    type={showPassword ? 'text' : 'password'}
                                    id="Text4"
                                    placeholder="Parolni kiriting..."
                                    value={password}
                                    required='required'
                                    onChange={e => setPassword(e.target.value)}
                                    autoComplete="new-password"
                                />
                                <div className="form-check mt-1">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="exampleCheck1"
                                        checked={showPassword}
                                        onChange={() => setShowPassword(!showPassword)}
                                    />
                                    <label className="form-check-label" htmlFor="exampleCheck1">Parolni ko'rsatish</label>
                                </div>

                            </div>
                            <div className="col-md-12 mt-3 w-50 mx-auto">
                                <Form.Label htmlFor="inputState" className="form-label font-weight-bold text-muted text-uppercase">Rol</Form.Label>
                                <select id="inputState" className="form-select form-control choicesjs" onChange={e => setRole(e.target.value)}>
                                    <option value="no">Rol</option>
                                    <option value="rahbar">Rahbar</option>
                                    <option value="menejer">Menejer</option>
                                    <option value="buhgalter">Buhgalter</option>
                                    <option value="taminotchi">Ta'minotchi</option>
                                    <option value="yopuvchi">Yopuvchi</option>
                                    <option value="parkash">Parkash</option>
                                    <option value="xamirkash">Xamirkash</option>
                                    <option value="sotuvchi">Sotuvchi</option>
                                </select>
                            </div>

                            <div className="col-md-12 mt-3 mb-4 w-50 mx-auto">
                                <div className="d-flex justify-content-end">
                                    <Button variant="btn myButtonProducts qushishProduct" onClick={handleChange}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Saqlash
                                    </Button>
                                </div>

                            </div>
                        </Col>
                    </Row>
                </Tab.Container>

            </Container>


        </>

    )
})
export default UserAdding;