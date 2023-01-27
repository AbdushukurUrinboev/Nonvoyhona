import  React, {useState} from 'react'
import {Container,Row,Col,Form,Button,ListGroup} from 'react-bootstrap'
import  Card from '../../../components/Card'
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios';
import { ORDERS_URL } from '../../../API';
import DatePicker from "react-datepicker";




const Ordernew =()=>{

    const [name, setName] = useState('');
    const [customer, setCustomer] = useState('');
    const [phone, setPhone] = useState('');
    const [date, setDate] = useState('');
    const [deadline, setDeadline] = useState('')
    const [time, setTime] = useState('');
    const [avans, setAvans] = useState('');
    const [price, setPrice] = useState('');
    const [turi, setTuri] = useState('');
    const [mijozlar, setMijozlar] = useState(false)


    // const [uploadImage, setUploadImage] = useState(); // Manashu rasm console logga kelyabdi uni endi saqlashim kerak!!!!
    const history = useHistory()

    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    function handleChange(e) {
        e.preventDefault();
        axios.post(ORDERS_URL, {
            name,
            customer,     
            phone,      
            date: date.getDate() + "-" + month[date.getMonth()] + "," + date.getFullYear(),
            time,
            avans,
            price,
            turi
            
           

        })
            .then(res => {
                console.log("Data is saved", res)
                history.push('/order')
            })
            .catch(err => console.log(err))


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
                                <Row>

                                    <Col md="12">
                                        <Form className="row g-3 date-icon-set-modal myStyleCustomerAdd">
                                            <div className="col-md-6 mb-3 mt-3">
                                                <Form.Label htmlFor="Text1" className="font-weight-bold text-muted text-uppercase">Zakaz Nomi</Form.Label>
                                                <Form.Control type="text" id="Text1" placeholder="Nomini kiriting..." onChange={e => setName(e.target.value)} required='required' />
                                            </div>
                                            <div className="col-md-6 mb-3 mt-3 position-relative">
                                                <Form.Label htmlFor="Text2" className="font-weight-bold text-muted text-uppercase">Zakaz olingan Sana </Form.Label>
                                                <DatePicker className="form-control" id="Text2" name="event_date" placeholderText="Sanani kiriting" autoComplete="off" selected={date} onChange={date => setDate(date)} />
                                                <span className="search-link">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </span>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="inputState" className="form-label font-weight-bold text-muted text-uppercase">Tur</Form.Label>
                                                <select id="inputState" className="form-select form-control choicesjs" onChange={e => {setTuri(e.target.value); if(e.target.value === "Doimiy") setMijozlar(true); else setMijozlar(false)}}>
                                                    <option value="no">Turi</option>
                                                    <option value="Doimiy">Doimiy</option>
                                                    <option value="Vaqtincha">Vaqtincha</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6 mb-3 position-relative">
                                                <Form.Label htmlFor="Text2" className="font-weight-bold text-muted text-uppercase">Zakaz Muddati </Form.Label>
                                                <DatePicker className="form-control" id="Text2" name="event_date" placeholderText="Sanani kiriting" autoComplete="off" selected={deadline} onChange={date => setDeadline(date)} />
                                                <span className="search-link">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </span>
                                            </div>
                                            {
                                                mijozlar ? (<div className="col-md-6 mb-3">
                                                        <Form.Label htmlFor="inputState" className="form-label font-weight-bold text-muted text-uppercase">Mijozlar ro'yhati</Form.Label>
                                                        <select id="inputState" className="form-select form-control choicesjs" onChange={e => setCustomer(e.target.value)}>
                                                            <option value="no">Mijozlar</option>
                                                            <option value="O'rinboyev Abdushukur">O'rinboyev Abdushukur</option>
                                                            <option value="Mavlonov Elbek">Mavlonov Elbek</option>
                                                            <option value="Ziyayev Anvar">Ziyayev Anvar</option>
                                                            <option value="Xomidov Abdusattor">Xomidov Abdusattor</option>
                                                            <option value="Kamolov Alijon">Kamolov Alijon</option>
                                                        </select>
                                                    </div>) : (<div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="Text5" className="font-weight-bold text-muted text-uppercase">Kimga</Form.Label>
                                                <Form.Control type="text" id="Text5" placeholder="Kim uchunligini kiriting..." onChange={e => setCustomer(e.target.value)} />
                                            </div>)
                                            }

                                            
                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="Text3" className="font-weight-bold text-muted text-uppercase">Narx</Form.Label>
                                                <Form.Control type="number" id="Text3" placeholder="Jami narxini kiriting..." required='required' onChange={e => setPrice(e.target.value)} />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="Text4" className="font-weight-bold text-muted text-uppercase">Telefon</Form.Label>
                                                <Form.Control type="number" id="Text4" placeholder="Avans kiriting..." onChange={e => setPhone(e.target.value)} />
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