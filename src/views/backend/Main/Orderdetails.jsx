import React, { useState, useContext, useEffect } from 'react'
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap'
import Card from '../../../components/Card'
import { Link, useHistory, useParams } from 'react-router-dom'
import axios from 'axios';
import { ORDERS_URL } from '../../../API';
import DatePicker from "react-datepicker";
import { breadDataContext, customersDataContext } from './ContextProvider/DataProvider';
import { base_URL } from '../../../API';




const Orderdetails = () => {
    const [order, setOrder] = useState('');
    const [customer, setCustomer] = useState('');
    const [turi, setTuri] = useState('');
    const [mijozlar, setMijozlar] = useState(false) // backendga ketmaydi
    const [productQuantity, setProductQuantity] = useState(0);
    const [date, setDate] = useState(new Date());
    const [deadline, setDeadline] = useState()
    const [deadlineTime, setDeadlineTime] = useState(''); //
    const [avans, setAvans] = useState(0);
    const [price, setPrice] = useState(0);
    const [umumiyPrice, setUmumiyPrice] = useState(0);
    const [qolganPul, setQolganPul] = useState();
    const [phoneCode, setPhoneCode] = useState('');
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState();
    const [error, setError] = useState(false);

    // console.log(umumiyPrice - avans);
    const breadList = useContext(breadDataContext);
    const customerList = useContext(customersDataContext);
    // const [uploadImage, setUploadImage] = useState(); // Manashu rasm console logga kelyabdi uni endi saqlashim kerak!!!!
    const history = useHistory()
    const { id } = useParams();




    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];



    useEffect(() => {
        axios.get(`${base_URL}/order/${id}`)
            .then(res => {              
                setOrder(res.data.order);                
                setCustomer(res.data.customer);
                setProductQuantity(res.data.productQuantity);               
                const [day, month, year] = res.data.date.split("/").map(Number);
                setDate(new Date(year, month - 1, day)); //   
                const [yearD, dayD, monthD ] = res.data.deadline.split("/").map(Number);  
                setDeadline(new Date(yearD, monthD - 1, dayD))              
                setDeadlineTime(res.data.deadlineTime);
                setPhoneCode(res.data.phone.slice(0,4));
                setPhone(res.data.phone.slice(8,res.data.phone.length));                
                setAvans(res.data.avans);
                setPrice(res.data.price);
                setStatus(res.data.status);
                setTuri(res.data.turi);
                setUmumiyPrice(res.data.price * res.data.productQuantity);
                setQolganPul(umumiyPrice - res.data.avans);                
            } )
            .catch(err => console.log(err))
    }, [id])





    function handleChange(e) {
        e.preventDefault();       
        if (order.length === 0 || customer.length === 0 || turi.length === 0 || productQuantity.length === 0 || deadline.length === 0 || avans.length === 0 || price.length === 0 || umumiyPrice.length === 0 || qolganPul.length === 0 || phone.length === 0 || status.length === 0 ) {
            setError(true)
        }
        if (order && customer && turi && productQuantity && deadline && avans && price && umumiyPrice && qolganPul && phone && status) {
            axios.post(ORDERS_URL, {
                order,
                customer,
                turi,
                productQuantity,
                date: date.getDate() + "-" + month[date.getMonth()] + "," + date.getFullYear(),
                deadline,
                deadlineTime,
                avans,
                price,
                umumiyPrice,
                qolganPul,
                phone: phoneCode + ' - ' + phone,
                status
            })
                .then(res => {
                    console.log("Data is saved", res)
                    history.push('/order')
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
                                        <li className="breadcrumb-item"><Link to="/order">Zakaz</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">Zakazni o'zgartirish</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </Col>
                    <Col lg="12" className="mb-3 d-flex justify-content-between">
                        <h4 className="font-weight-bold0 d-flex align-items-center customerAddHead">Zakazni o'zgartirish</h4>
                    </Col>

                    <Col lg="12" className=" mb-3 d-flex justify-content-between">
                        <Link to="/order" className="btn btn-primary btn-sm d-flex align-items-left justify-content-between">
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
                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="Text1" className="font-weight-bold text-muted text-uppercase">Nonni tanlang</Form.Label>
                                                <select id="Text1" className="form-select form-control choicesjs" value={order} onChange={e => setOrder(e.target.value)} >
                                                    <option value={order}>{order}</option>
                                                    {
                                                        breadList.map((bread, ind) => {
                                                            return <option key={ind} value={bread.productName}>{bread.productName}</option>
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="Text3" className="font-weight-bold text-muted text-uppercase">Zakaz berilgan mahsulot soni</Form.Label>
                                                <Form.Control type="number" id="Text3" value={productQuantity} onChange={e => setProductQuantity(e.target.value)} />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="Text3" className="font-weight-bold text-muted text-uppercase">Bitta non narxi</Form.Label>
                                                <Form.Control type="number" id="Text3" value={price} onChange={e => setPrice(e.target.value)} />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="Text3" className="font-weight-bold text-muted text-uppercase">Jami non narxi</Form.Label>
                                                <Form.Control type="number" id="Text3" value={price * productQuantity} onChange={e => setUmumiyPrice(e.target.value)} />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="Text4" className="font-weight-bold text-muted text-uppercase">Avans</Form.Label>
                                                <Form.Control type="number" id="Text4" value={avans} onChange={e => setAvans(e.target.value)} />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="Text3" className="font-weight-bold text-muted text-uppercase">Qolgan Pul</Form.Label>
                                                <Form.Control type="number" id="Text3" value={umumiyPrice - avans} onChange={e => setQolganPul(e.target.value)} />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="inputState" className="form-label font-weight-bold text-muted text-uppercase">Tur</Form.Label>
                                                <select id="inputState" className="form-select form-control choicesjs" onChange={e => { setTuri(e.target.value); if (e.target.value === "Doimiy") setMijozlar(true); else setMijozlar(false) }}>
                                                    <option value={turi}>{turi}</option>
                                                    <option value="Doimiy">Doimiy</option>
                                                    <option value="Vaqtincha">Vaqtincha</option>
                                                </select>
                                            </div>
                                            {
                                                mijozlar ? (<div className="col-md-6 mb-3">
                                                    <Form.Label htmlFor="inputState" className="form-label font-weight-bold text-muted text-uppercase">Mijozlar ro'yhati</Form.Label>
                                                    <select id="inputState" className="form-select form-control choicesjs" value={customer} onChange={e => setCustomer(e.target.value)} >
                                                        <option value={customer}>{customer}</option>
                                                        {
                                                            customerList.map((cust, ind) => {
                                                                return <option key={ind} value={cust.lastName + " " + cust.firstName}>{cust.lastName + " " + cust.firstName}</option>
                                                            })
                                                        }
                                                    </select>
                                                </div>) : (<div className="col-md-6 mb-3">
                                                    <Form.Label htmlFor="Text5" className="font-weight-bold text-muted text-uppercase">Kimga</Form.Label>
                                                    <Form.Control type="text" id="Text5" value={customer} onChange={e => setCustomer(e.target.value)} />
                                                </div>)
                                            }
                                            <div className="col-md-6 mb-3 position-relative">
                                                <Form.Label htmlFor="Text2" className="font-weight-bold text-muted text-uppercase">Zakaz olingan Sana </Form.Label>
                                                <DatePicker className="form-control" id="Text2" name="event_date" placeholderText="Sanani kiriting" autoComplete="off" selected={date} onChange={date => setDate(date)} />
                                                <span className="search-link">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </span>
                                            </div>

                                            <div className="col-md-6 mb-3 position-relative">
                                                <Form.Label htmlFor="Text2" className="font-weight-bold text-muted text-uppercase">Zakaz Muddati </Form.Label>
                                                <DatePicker className="form-control" id="Text2" name="event_date" value={deadline} autoComplete="off" selected={deadline} onChange={date => setDeadline(date)} />
                                                <span className="search-link">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </span>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="Text4" className="font-weight-bold text-muted text-uppercase">Mijoz telefoni</Form.Label>
                                                <div className='input-group'>
                                                    <select value={phoneCode} id="inputState" className="form-select form-control choicesjs" onChange={e => setPhoneCode(e.target.value)} disabled={mijozlar === true}>
                                                        <option value={phoneCode}>{phoneCode}</option>
                                                        <option value="(90) ">(90)</option>
                                                        <option value="(91) ">(91)</option>
                                                        <option value="(93) ">(93)</option>
                                                        <option value="(94) ">(94)</option>
                                                        <option value="(99) ">(99)</option>
                                                        <option value="(33) ">(33)</option>
                                                        <option value="(98) ">(98)</option>
                                                        <option value="(97) ">(97)</option>
                                                        <option value="(92) ">(92)</option>
                                                        <option value="(71) ">(71)</option>
                                                        <option value="(73) ">(73)</option>
                                                    </select>
                                                    <Form.Control type="text" id="Text4" value={phone} style={{ width: '70%', marginLeft: '8px' }} onChange={e => setPhone(e.target.value)} disabled={mijozlar === true} />
                                                </div>

                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="Text4" className="font-weight-bold text-muted text-uppercase">Zakaz tayyor bo'ladigan soat</Form.Label>
                                                <Form.Control type="text" id="Text4" value={deadlineTime} onChange={e => setDeadlineTime(e.target.value)}  />
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

export default Orderdetails;