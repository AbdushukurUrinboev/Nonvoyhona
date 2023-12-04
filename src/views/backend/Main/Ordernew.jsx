import React, { useState, useContext, useEffect } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Card from '../../../components/Card'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';
import { ORDERS_URL } from '../../../API';
import DatePicker from "react-datepicker";
import { breadDataContext, customersDataContext } from './ContextProvider/DataProvider';
// SVG ICON
import addOrderLogo from '../../../assets/images/icon/additemaddButonLogo.svg'





const Ordernew = () => {
    const [order, setOrder] = useState('');
    const [addInputOrder, setAddInputOrder] = useState([{order: '', productQuantity: '', price: ''}]);

    const [customer, setCustomer] = useState('');
    const [productQuantity, setProductQuantity] = useState(0);
    const [turi, setTuri] = useState('');
    const [mijozlar, setMijozlar] = useState(false)
    const [deadline, setDeadline] = useState()
    const [avans, setAvans] = useState(0);
    const [price, setPrice] = useState([]);
    const [phoneCode, setPhoneCode] = useState(0);
    const [phone, setPhone] = useState(0);
    const [status, setStatus] = useState('Bajarilmoqda');
    const [umumiyPrice, setUmumiyPrice] = useState(0);

    const [deadlineSoat, setDeadlineSoat] = useState(); // bu backendga ketmaydi deadlineTimega qushdim 
    const [deadlineMinut, setDeadlineMinut] = useState(0); // bu backendga ketmaydi deadlineTimega qushdim 
    const [deadlineTime, setDeadlineTime] = useState(new Date().getHours() + ":" + new Date().getMinutes()); //
    const [error, setError] = useState(false);

    // Deadline quyish
    const [deadlineDay, setDeadlineDay] = useState('')
    const [deadlineMonth, setDeadlineMonth] = useState('')
    const [deadlineYear, setDeadlineYear] = useState(2023)



    const breadList = useContext(breadDataContext);

    const customerList = useContext(customersDataContext);
    // const [uploadImage, setUploadImage] = useState(); // Manashu rasm console logga kelyabdi uni endi saqlashim kerak!!!!
    const history = useHistory()

    // const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Getting price of Bread and sending to priceInput
    const calculateOverallPrice = () => {
        const overallPr = addInputOrder.reduce((acc, curOrder) => {
            return acc + curOrder.price * curOrder.productQuantity
        }, 0);
        setUmumiyPrice(overallPr);
    }


    function handleChange(e) {
        e.preventDefault();
        if (order.length === 0 || customer.length === 0 || turi.length === 0 || productQuantity.length === 0) {
            setError(true)
        }
        if (order && customer && turi && productQuantity) {
            const newArrForPost = addInputOrder.map((elem) => {
                return {...elem, 
                    customer, 
                    type: turi, 
                    deadline: deadlineDay + " " + deadlineMonth + " " + deadlineYear + " yil", 
                    deadlineTime: deadlineSoat + ":" + deadlineMinut,
                    phone: phoneCode + ' - ' + phone,
                    status
                }
            });
            axios.post(ORDERS_URL, {
                orders: newArrForPost,                
                avans,
                neededPayment: umumiyPrice
            })
                .then(res => {
                    console.log("Data is saved", res)
                    window.location.reload(history.push('/order'));
                    // history.push('/order')
                })
                .catch(err => console.log(err))
        }
    }

    function onChangeHandler(indx, field, val) {      
        setOrder(val)
        let newArr = [...addInputOrder]
        newArr[indx][field] = val;
        if(field === "order"){
            breadList.map(elem => {
                if (elem.productName === val) {
                    // setPrice(elem.productPrice);
                    newArr[indx].price = elem.productPrice;

                }
            })
        }
        setAddInputOrder(newArr);

    }

    const deleteInputs = () => {
        if(addInputOrder.length > 1){
            let newArray = [...addInputOrder]
            newArray.pop();
            setAddInputOrder(newArray)
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
                                        <li className="breadcrumb-item active" aria-current="page">Yangi zakaz qo'shish</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </Col>
                    <Col lg="12" className="mb-3 d-flex justify-content-between">
                        <h4 className="font-weight-bold0 d-flex align-items-center customerAddHead">Yangi Zakaz qo'shish</h4>
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

                                    <Col md="6">
                                        <Form className="row g-3 date-icon-set-modal myStyleCustomerAdd">    
                                            {
                                                addInputOrder.map((item, index) => {
                                                    return <div className="col-md-12 mb-3" key={index}>
                                                        <div className="row g-3">
                                                            <div className="col-md-4 mb-3">
                                                                <Form.Label htmlFor="Text1" className="font-weight-bold text-muted text-uppercase">Nonni tanlang</Form.Label>
                                                                <select id="Text1" className="form-select form-control choicesjs" value={item.order} onChange={(e) => {onChangeHandler(index, 'order', e.target.value)}}>
                                                                   <option value="no">Nonlar ro'yxati</option>
                                                                    {
                                                                        breadList.map((bread, ind) => {
                                                                            return <option key={ind} value={bread.productName}>{bread.productName}</option>
                                                                        })
                                                                    }
                                                                </select>
                                                            </div>
                                                            <div className="col-md-4 mb-3">
                                                                <Form.Label htmlFor="Text3" className="font-weight-bold text-muted text-uppercase">Soni</Form.Label>
                                                                <Form.Control type="number" id="Text3" placeholder="Sonini kiriting..." value={item.productQuantity} onChange={e => {
                                                                    onChangeHandler(index, 'productQuantity', e.target.value);
                                                                    setProductQuantity(e.target.value)
                                                                    calculateOverallPrice(price, e.target.value)
                                                                }} />
                                                            </div>
                                                            
                                                            <div className="col-md-4 mb-3">
                                                                <Form.Label htmlFor="Text3" className="font-weight-bold text-muted text-uppercase">Narxi</Form.Label>
                                                                <Form.Control type="number" id="Text3" placeholder="Jami narxini kiriting..." value={item.price} onChange={e => {
                                                                    onChangeHandler(index, 'price', e.target.value);
                                                                    setPrice(e.target.value)
                                                                    calculateOverallPrice(e.target.value, productQuantity)
                                                                }} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                })
                                            }
                                            <div className="col-md-12 mb-5">
                                                <div className="button-group-order">
                                                    <button className='btn btn-primary order-button order-button-first' onClick={(e) => {
                                                        e.preventDefault()
                                                        setAddInputOrder([...addInputOrder, {order: '', productQuantity: '', price: ''}])
                                                        setOrder('no')
                                                    }}>
                                                        <img src={addOrderLogo} className='mr-2' />
                                                        Non qo'shish
                                                    </button>
                                                    <button className='btn btn-danger order-button' onClick={deleteInputs}>
                                                        <img src={addOrderLogo} className='mr-2' />
                                                        Nonni o'chirish
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <Form.Label htmlFor="Text3" className="font-weight-bold text-muted text-uppercase">Jami non narxi</Form.Label>
                                                <Form.Control type="number" id="Text3" placeholder="Jami narxini kiriting..." required='required' value={umumiyPrice} onChange={e => setUmumiyPrice(e.target.value)} />
                                            </div>
                                        </Form>
                                    </Col>
                                    <Col md="6">
                                        <Form className="row g-3 date-icon-set-modal myStyleCustomerAdd">


                                            <div className="col-md-12 mb-3">
                                                <Form.Label htmlFor="inputState" className="form-label font-weight-bold text-muted text-uppercase">Mijoz turi</Form.Label>
                                                <select id="inputState" className="form-select form-control choicesjs" onChange={e => { setPhone(''); setTuri(e.target.value); if (e.target.value === "daily") setMijozlar(true); else setMijozlar(false) }}>
                                                    <option value="no">Turi</option>
                                                    <option value="daily">Doimiy</option>
                                                    <option value="temporary">Vaqtincha</option>
                                                </select>
                                            </div>
                                            {
                                                mijozlar ? (<div className="col-md-12 mb-3">
                                                    <Form.Label htmlFor="inputState" className="form-label font-weight-bold text-muted text-uppercase">Mijozlar ro'yhati</Form.Label>
                                                    <select id="inputState" className="form-select form-control choicesjs" value={customer} onChange={e => {
                                                        setCustomer(e.target.value);
                                                        // console.log(e.target.value);
                                                        if (turi === "daily") {

                                                            setPhoneCode(customerList.find(evv => e.target.value === (evv.firstName + ' ' + evv.lastName)).phone.slice(0, 4));
                                                            let currentPhoneNumber = 0
                                                            customerList.find(evv => {
                                                                if (e.target.value === (evv.firstName + ' ' + evv.lastName)) {
                                                                    // console.log(evv.phone.slice(7, evv.phone.length));
                                                                    currentPhoneNumber = evv.phone.slice(7, evv.phone.length)
                                                                }
                                                                setPhone(currentPhoneNumber)
                                                            });
                                                        }
                                                    }} >
                                                        <option value="">Mijozlar ro'yxati</option>
                                                        {
                                                            customerList.map((cust, ind) => {
                                                                return <option key={ind} value={cust.firstName + " " + cust.lastName}>{cust.lastName + " " + cust.firstName}</option>
                                                            })
                                                        }
                                                    </select>
                                                </div>) : (<div className="col-md-12 mb-3">
                                                    <Form.Label htmlFor="Text5" className="font-weight-bold text-muted text-uppercase">Kimga</Form.Label>
                                                    <Form.Control type="text" id="Text5" placeholder="Kim uchunligini kiriting..." onChange={e => setCustomer(e.target.value)} />
                                                </div>)
                                            }
                                            <div className="col-md-12 mb-3">
                                                <Form.Label htmlFor="Text4" className="font-weight-bold text-muted text-uppercase">Mijoz telefoni</Form.Label>
                                                <div className='input-group'>
                                                    <select value={phoneCode} id="inputState" className="form-select form-control choicesjs" onChange={e => setPhoneCode(e.target.value)} disabled={mijozlar}>
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
                                                    <Form.Control type="text" id="Text4" placeholder='Telefonni kiriting...' style={{ width: '70%', marginLeft: '8px' }} onChange={e => setPhone(e.target.value)} disabled={mijozlar} />
                                                </div>

                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <Form.Label htmlFor="Text4" className="font-weight-bold text-muted text-uppercase">Avans</Form.Label>
                                                <Form.Control type="number" id="Text4" value={avans} onChange={e => setAvans(Number(e.target.value))} />
                                            </div>



                                            {/* <div className="col-md-6 mb-3 position-relative">
                                                <Form.Label htmlFor="Text2" className="font-weight-bold text-muted text-uppercase">Zakaz olingan Sana </Form.Label>
                                                <DatePicker className="form-control" id="Text2" name="event_date" placeholderText="Sanani kiriting" autoComplete="off" selected={date} onChange={date => setDate(date)} />
                                                <span className="search-link">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </span>
                                            </div> */}


                                            <div className="col-md-12 mb-3">
                                                <Form.Label htmlFor="Text7" className="font-weight-bold text-muted text-uppercase">Zakaz tayyor bo'ladigan sana</Form.Label>
                                                <div className='input-group'>
                                                    <Form.Control type="number" id="Text5" placeholder="Kun..." style={{ width: '10%', marginRight: '8px' }} onChange={e => setDeadlineDay(e.target.value)} />
                                                    <select value={deadlineMonth} id="inputState" className="form-select form-control choicesjs" onChange={e => setDeadlineMonth(e.target.value)}>
                                                        <option value="Yanvar">Yanvar</option>
                                                        <option value="Fevral">Fevral</option>
                                                        <option value="Mart">Mart</option>
                                                        <option value="Aprel">Aprel</option>
                                                        <option value="May">May</option>
                                                        <option value="Iyun">Iyun</option>
                                                        <option value="Iyul">Iyul</option>
                                                        <option value="Avgust">Avgust</option>
                                                        <option value="Sentyabr">Sentyabr</option>
                                                        <option value="Octyabr">Oktyabr</option>
                                                        <option value="Noyabr">Noyabr</option>
                                                        <option value="Dekabr">Dekabr</option>
                                                    </select>
                                                    <Form.Control type="number" id="Text5" value={deadlineYear} style={{ width: '10%', marginLeft: '8px' }} onChange={e => setDeadlineYear(e.target.value)} />
                                                </div>
                                            </div>





                                            <div className="col-md-12 mb-3">
                                                <Form.Label htmlFor="Text4" className="font-weight-bold text-muted text-uppercase">Zakaz tayyor bo'ladigan soat</Form.Label>
                                                <div className='input-group'>
                                                    <Form.Control type="text" id="Text4" placeholder={'Soatni kiriting'} onChange={e => setDeadlineSoat(e.target.value)} style={{ width: 'auto', marginLeft: '8px' }} />
                                                    <Form.Control type="text" id="Text4" value={deadlineMinut} onChange={e => setDeadlineMinut(e.target.value)} style={{ width: '50%', marginLeft: '8px' }} />

                                                </div>
                                            </div>
                                        </Form>
                                        <div className="d-flex justify-content-end mt-1 ">
                                            <Button variant="btn myButtonProducts qushishProduct" onClick={handleChange}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                                Qo'shish
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

export default Ordernew;