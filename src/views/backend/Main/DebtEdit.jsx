import React, { useState, useContext } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Card from '../../../components/Card'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';
import { NASIYA_URL } from '../../../API';
import DatePicker from "react-datepicker";

import { customersDataContext } from './ContextProvider/DataProvider';


const DebtEdit = () => {

    const [product, setProduct] = useState(''); //
    const [customer, setCustomer] = useState(''); //
    const [productQuantity, setProductQuantity] = useState(0); //
    const [overall, setOverall] = useState(0); //
    const [avans, setAvans] = useState(''); //
    const [customerType, setCustomerType] = useState(''); //
    const [sana, setSana] = useState(new Date());
    const [mijozlar, setMijozlar] = useState(false)
    const [error, setError] = useState(false);
    const customerList = useContext(customersDataContext);


    // const [uploadImage, setUploadImage] = useState(); // Manashu rasm console logga kelyabdi uni endi saqlashim kerak!!!!
    const history = useHistory()

    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    function handleChange(e) {
        e.preventDefault();
        if (product.length === 0 || customer.length || productQuantity.length || overall.length || avans.length || customerType.length) {
            setError(true)
        }
        if (product && customer && productQuantity && overall && avans && customerType) {
            axios.post(NASIYA_URL, {
                product,
                customer,
                productQuantity,
                overall,
                avans,
                sana: sana.getDate() + "-" + month[sana.getMonth()] + "," + sana.getFullYear(),
                customerType
            })
                .then(res => {
                    console.log("Data is saved", res)
                    history.push('/debt')
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
                                        <li className="breadcrumb-item"><Link to="/debt">Nasiya</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">Nasiyani o'zgartirish</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </Col>
                    <Col lg="12" className="mb-3 d-flex justify-content-between">
                        <h4 className="font-weight-bold0 d-flex align-items-center customerAddHead">Nasiyani o'zgartirish</h4>
                    </Col>

                    <Col lg="12" className=" mb-3 d-flex justify-content-between">
                        <Link to="/debt" className="btn btn-primary btn-sm d-flex align-items-left justify-content-between">
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
                                                <Form.Label htmlFor="Text1" className="font-weight-bold text-muted text-uppercase">Nomi</Form.Label>
                                                <Form.Control type="text" id="Text1" placeholder="Nomini kiriting..." onChange={e => setProduct(e.target.value)} required='required' />
                                            </div>
                                            <div className="col-md-6 mb-3 mt-3 position-relative">
                                                <Form.Label htmlFor="Text2" className="font-weight-bold text-muted text-uppercase">Sana</Form.Label>
                                                <DatePicker className="form-control" id="Text2" name="event_date" placeholderText="Sanani kiriting" autoComplete="off" selected={sana} onChange={date => setSana(date)} />
                                                <span className="search-link">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </span>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="inputState" className="form-label font-weight-bold text-muted text-uppercase">Tur</Form.Label>
                                                <select id="inputState" className="form-select form-control choicesjs" onChange={e => { setCustomerType(e.target.value); if (e.target.value === "temporary") setMijozlar(true); else setMijozlar(false) }}>
                                                    <option value="no">Turi</option>
                                                    <option value="temporary">Doimiy</option>
                                                    <option value="daily">Vaqtincha</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="Text5" className="font-weight-bold text-muted text-uppercase">Miqdori</Form.Label>
                                                <Form.Control type="number" id="Text5" placeholder="Nechta non berdingiz..." onChange={e => setProductQuantity(e.target.value)} />
                                            </div>
                                            {
                                                mijozlar ? (<div className="col-md-6 mb-3">
                                                    <Form.Label htmlFor="inputState" className="form-label font-weight-bold text-muted text-uppercase">Mijozlar ro'yhati</Form.Label>
                                                    <select id="inputState" className="form-select form-control choicesjs" value={customer} onChange={e => setCustomer(e.target.value)} >
                                                        <option value="">Mijozlar ro'yxati</option>
                                                        {
                                                            customerList.map((cust, ind) => {
                                                                return <option key={ind} value={cust.lastName + " " + cust.firstName}>{cust.lastName + " " + cust.firstName}</option>
                                                            })
                                                        }
                                                    </select>
                                                </div>) : (<div className="col-md-6 mb-3">
                                                    <Form.Label htmlFor="Text5" className="font-weight-bold text-muted text-uppercase">Kimga</Form.Label>
                                                    <Form.Control type="text" id="Text5" placeholder="Kim uchunligini kiriting..." onChange={e => setCustomer(e.target.value)} />
                                                </div>)
                                            }


                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="Text3" className="font-weight-bold text-muted text-uppercase">Narx</Form.Label>
                                                <Form.Control type="number" id="Text3" placeholder="Jami narxini kiriting..." required='required' onChange={e => setOverall(e.target.value)} />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="Text4" className="font-weight-bold text-muted text-uppercase">Avans</Form.Label>
                                                <Form.Control type="number" id="Text4" placeholder="Avans kiriting..." onChange={e => setAvans(e.target.value)} />
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
export default DebtEdit;