import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Card from '../../../components/Card'
import { Link, useHistory } from 'react-router-dom'

import axios from "axios"
import { XAMKOR_URL } from '../../../API';
// DatePicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './CustomerAdd.css'





const XamkorEdit = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneCode, setPhoneCode] = useState('(90) ');
    const [phone, setPhone] = useState('');
    const [phoneCode2, setPhoneCode2] = useState('(90) ');
    const [phone2, setPhone2] = useState('');
    const [address, setAddress] = useState('');
    const [workPlace, setWorkPlace] = useState('');
    const [position, setPosition] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState(false);




    // const [uploadImage, setUploadImage] = useState(); // Manashu rasm console logga kelyabdi uni endi saqlashim kerak!!!!
    const history = useHistory()



    function handleChange(e) {
        e.preventDefault();
        if (firstName.length === 0 || lastName.length === 0 || phone.length === 0 || phone2.length === 0 || address.length === 0 || workPlace.length === 0 || position.length === 0 || category.length === 0) {
            setError(true)
        }
        if (firstName && lastName && phone && phone2 && address && workPlace && position && category) {
            axios.post(XAMKOR_URL, {
                firstName,
                lastName,
                phone: phoneCode + ' - ' + phone,
                phone2: phoneCode2 + ' - ' + phone2,
                address,
                workPlace,
                position,
                category
            })
                .then(res => {
                    console.log("Data is saved", res)
                    history.push('/xamkorlar')
                })
                .catch(err => console.log(err))
        }


    }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col lg="12" className='mt-5'>
                        <div className="d-flex flex-wrap align-items-center justify-content-between">
                            <div className="d-flex align-items-center justify-content-between">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb p-0 mb-0">
                                        <li className="breadcrumb-item"><Link to="/customer">Xamkorlar</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">Xamkor ma'lumotlarini o'zgartirish</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </Col>
                    <Col lg="12" className="mb-3 d-flex justify-content-between">
                        <h4 className="font-weight-bold0 d-flex align-items-center customerAddHead">Xamkor ma'lumotlarini o'zgartirish</h4>
                    </Col>

                    <Col lg="12" className=" mb-3 d-flex justify-content-between">
                        <Link to="/xamkorlar" className="btn btn-primary btn-sm d-flex align-items-left justify-content-between">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                            <span className="ml-2">Orqaga</span>
                        </Link>
                    </Col>

                    <Col lg="12">
                        <Card>
                            <Card.Body>
                                {error ? <p className='text-danger text-center font-weight-bold'>Ushbu qatorlarning barchasini to'ldirishingiz shart</p> : ''}
                                <Row>

                                    <Col md="12">
                                        <Form className="row g-3 date-icon-set-modal myStyleCustomerAdd">
                                            <div className="col-md-6 mb-3 mt-3">
                                                <Form.Label htmlFor="Text1" className="font-weight-bold text-muted text-uppercase">Familiyasi</Form.Label>
                                                <Form.Control type="text" id="Text1" placeholder="Familiya kiriting..." onChange={e => setLastName(e.target.value)} required='required' />
                                            </div>
                                            <div className="col-md-6 mb-3 position-relative mt-3">
                                                <Form.Label htmlFor="Text1" className="font-weight-bold text-muted text-uppercase">Ismi</Form.Label>
                                                <Form.Control type="text" id="Text1" placeholder="Ismni kiriting..." onChange={e => setFirstName(e.target.value)} required='required' />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="Text5" className="font-weight-bold text-muted text-uppercase">Telefon raqami</Form.Label>
                                                <div className='input-group'>
                                                    <select value={phoneCode} id="inputState" className="form-select form-control choicesjs" onChange={e => setPhoneCode(e.target.value)}>
                                                        <option value="(90) ">(90)</option>
                                                        <option value="(91) ">(91)</option>
                                                        <option value="(93) ">(93)</option>
                                                        <option value="(94) ">(94)</option>
                                                    </select>
                                                    <Form.Control type="text" id="Text5" placeholder="Telefon raqamini kiriting..." style={{ width: '70%', marginLeft: '8px' }} onChange={e => setPhone(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="Text5" className="font-weight-bold text-muted text-uppercase">Telefon raqami 2</Form.Label>
                                                <div className='input-group'>
                                                    <select value={phoneCode} id="inputState" className="form-select form-control choicesjs" onChange={e => setPhoneCode2(e.target.value)}>
                                                        <option value="(90) ">(90)</option>
                                                        <option value="(91) ">(91)</option>
                                                        <option value="(93) ">(93)</option>
                                                        <option value="(94) ">(94)</option>
                                                    </select>
                                                    <Form.Control type="text" id="Text5" placeholder="Telefon raqamini kiriting..." style={{ width: '70%', marginLeft: '8px' }} onChange={e => setPhone2(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="inputState" className="form-label font-weight-bold text-muted text-uppercase">Tur</Form.Label>
                                                <select id="inputState" className="form-select form-control choicesjs" onChange={e => setCategory(e.target.value)}>
                                                    <option value="no">Turi</option>
                                                    <option value="temporary">Doimiy</option>
                                                    <option value="daily">Vaqtincha</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="Text3" className="font-weight-bold text-muted text-uppercase">Ish joyi</Form.Label>
                                                <Form.Control type="text" id="Text3" placeholder="Ish joyini kiriting..." required='required' onChange={e => setWorkPlace(e.target.value)} />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="Text4" className="font-weight-bold text-muted text-uppercase">Manzil</Form.Label>
                                                <Form.Control type="text" id="Text4" placeholder="Manzil kiriting..." onChange={e => setAddress(e.target.value)} />
                                            </div>


                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="Text3" className="font-weight-bold text-muted text-uppercase">Lavozimi</Form.Label>
                                                <Form.Control type="text" id="Text3" placeholder="Lavozimini kiriting..." required='required' onChange={e => setPosition(e.target.value)} />
                                            </div>
                                        </Form>
                                        <div className="d-flex justify-content-end mt-1 ">
                                            <Button variant="btn myButtonProducts qushishProduct" onClick={handleChange}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                               Saqlash
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default XamkorEdit;