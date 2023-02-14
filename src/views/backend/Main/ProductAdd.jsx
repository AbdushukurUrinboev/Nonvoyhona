import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Card from '../../../components/Card'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';
import { STORAGE_URL } from '../../../API';
import Avatar from '../../../assets/images/avatar.png'
import DefaultBread from '../../../assets/images/logoBread.png'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './ProductAdd.css'

const Productadd = () => {
    const [productName, setProductName] = useState(''); //
    const [description, setDescription] = useState(''); //
    const [productPrice, setProductPrice] = useState(0); //
    const [poductQuantity, setPoductQuantity] = useState(0); // 
    const [umumiyNarhi, setUmumiyNarhi] = useState(0);
    const [xamkor, setXamkor] = useState(""); //
    const [berilganAvans, setBerilganAvans] = useState(0);
    const [qolganPul, setQolganPul] = useState(0);
    const [olinganSana, setOlinganSana] = useState(new Date()); // 
    const [olinganSoat, setOlinganSoat] = useState(new Date().getHours() + ":" + new Date().getMinutes()); //
    const [storageImage, setStorageImage] = useState(''); // Manashu rasm console logga kelyabdi uni endi saqlashim kerak!!!!
    const history = useHistory()


    const month = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"];


  console.log(storageImage, 12);

    function handleChange(e) {
        e.preventDefault();   
        
        const fd = new FormData()
        fd.append('productName', productName)
        fd.append('description', description)
        fd.append('productPrice', productPrice)
        fd.append('poductQuantity', poductQuantity)
        fd.append('umumiyNarhi', umumiyNarhi.length ? umumiyNarhi : productPrice * poductQuantity)
        fd.append('xamkor', xamkor)
        fd.append('berilganAvans', berilganAvans)
        fd.append('qolganPul', qolganPul)
        fd.append('olinganSana', olinganSana.getDate() + "-" + month[olinganSana.getMonth()] + "," + olinganSana.getFullYear())
        fd.append('olinganSoat', olinganSoat)
        fd.append('storageImage', storageImage)

        axios.post(STORAGE_URL, fd)
        .then(res => {
            console.log("Data is saved", res)
            history.push('/products')
        })
        .catch(err => console.log(err))
        
        
       
    }



    return (
        <>
            <Container fluid>
                <Row>
                    <Col lg="12" className='mt-5'>
                        <div className="d-flex align-items-center justify-content-between">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb p-0 mb-0">
                                    <li className="breadcrumb-item"><Link to="/products">Mahsulotlar</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Mahsulot qo'shish</li>
                                </ol>
                            </nav>
                        </div>
                    </Col>
                    <Col lg="12" className="mt-3 mb-3 d-flex justify-content-between">
                        <h4 className="font-weight-bold0 d-flex align-items-center productHeader">Yangi mahsulot qo'shish</h4>
                    </Col>
                    <Col lg="12" className="mt-3 mb-3 d-flex justify-content-between">
                        <Link to="/products" className="btn btn-primary btn-sm d-flex align-items-left justify-content-between">
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
                                    <Col md="3" className="mb-3">
                                        <Card.Body className="productAddStyleCardBody mt-3 mx-auto">
                                            <input type="file" className='productAddStyleInput ' accept='image/png, image/jpg, image/jpeg' name='storageImage' onChange={(e) => setStorageImage(e.target.files[0])} />
                                            <div className="d-flex justify-content-center mt-4">
                                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="80px" x="0px" y="0px" viewBox="0 0 419.2 419.2" style={{ enableBackground: "new 0 0 419.2 419.2" }} stroke="currentColor">
                                                    <g>
                                                        <g>
                                                            <g>
                                                                <circle cx="158" cy="144.4" r="28.8" />
                                                                <path d="M394.4,250.4c-13.6-12.8-30.8-21.2-49.6-23.6V80.4c0-15.6-6.4-29.6-16.4-40C318,30,304,24,288.4,24h-232     c-15.6,0-29.6,6.4-40,16.4C6,50.8,0,64.8,0,80.4v184.4V282v37.2c0,15.6,6.4,29.6,16.4,40c10.4,10.4,24.4,16.4,40,16.4h224.4     c14.8,12,33.2,19.6,53.6,19.6c23.6,0,44.8-9.6,60-24.8c15.2-15.2,24.8-36.4,24.8-60C419.2,286.8,409.6,265.6,394.4,250.4z      M21.2,80.4c0-9.6,4-18.4,10.4-24.4c6.4-6.4,15.2-10.4,24.8-10.4h232c9.6,0,18.4,4,24.8,10.4c6.4,6.4,10.4,15.2,10.4,24.8v124.8     l-59.2-59.2c-4-4-10.8-4.4-15.2,0L160,236l-60.4-60.8c-4-4-10.8-4.4-15.2,0l-63.2,64V80.4z M56,355.2v-0.8     c-9.6,0-18.4-4-24.8-10.4c-6-6.4-10-15.2-10-24.8V282v-12.4L92,198.4l60.4,60.4c4,4,10.8,4,15.2,0l89.2-89.6l58.4,58.8     c-1.2,0.4-2.4,0.8-3.6,1.2c-1.6,0.4-3.2,0.8-5.2,1.6c-1.6,0.4-3.2,1.2-4.8,1.6c-1.2,0.4-2,0.8-3.2,1.6c-1.6,0.8-2.8,1.2-4,2     c-2,1.2-4,2.4-6,3.6c-1.2,0.8-2,1.2-3.2,2c-0.8,0.4-1.2,0.8-2,1.2c-3.6,2.4-6.8,5.2-9.6,8.4c-15.2,15.2-24.8,36.4-24.8,60     c0,6,0.8,11.6,2,17.6c0.4,1.6,0.8,2.8,1.2,4.4c1.2,4,2.4,8,4,12v0.4c1.6,3.2,3.2,6.8,5.2,9.6H56z M378.8,355.2     c-11.6,11.6-27.2,18.4-44.8,18.4c-16.8,0-32.4-6.8-43.6-17.6c-1.6-1.6-3.2-3.6-4.8-5.2c-1.2-1.2-2.4-2.8-3.6-4     c-1.6-2-2.8-4.4-4-6.8c-0.8-1.6-1.6-2.8-2.4-4.4c-0.8-2-1.6-4.4-2-6.8c-0.4-1.6-1.2-3.6-1.6-5.2c-0.8-4-1.2-8.4-1.2-12.8     c0-17.6,7.2-33.2,18.4-44.8c11.2-11.6,27.2-18.4,44.8-18.4s33.2,7.2,44.8,18.4c11.6,11.6,18.4,27.2,18.4,44.8     C397.2,328,390,343.6,378.8,355.2z" />
                                                                <path d="M341.6,267.6c-0.8-0.8-2-1.6-3.6-2.4c-1.2-0.4-2.4-0.8-3.6-0.8c-0.4,0-0.4,0-0.4,0c-0.4,0-0.4,0-0.4,0     c-1.2,0-2.4,0.4-3.6,0.8c-1.2,0.4-2.4,1.2-3.6,2.4l-24.8,24.8c-4,4-4,10.8,0,15.2c4,4,10.8,4,15.2,0l6.4-6.4v44     c0,6,4.8,10.8,10.8,10.8s10.8-4.8,10.8-10.8v-44l6.4,6.4c4,4,10.8,4,15.2,0c4-4,4-10.8,0-15.2L341.6,267.6z" />
                                                            </g>
                                                        </g>
                                                    </g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
                                                </svg>
                                            </div>
                                            <div className="d-flex justify-content-center mt-2 mb-5">

                                                <p className="mb-0 text-muted font-weight-bold">Rasm yuklash</p>
                                            </div>
                                        </Card.Body>
                                    </Col>
                                    <Col md="9">
                                        <Form className="row g-3 date-icon-set-modal">
                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="Text1" className="font-weight-bold text-uppercase">Nomi</Form.Label>
                                                <Form.Control type="text" id="Text1" placeholder="Mahsulot nomini kiriting..." onChange={e => setProductName(e.target.value)} required='required' />
                                            </div>
                                            <div className="col-md-6 mb-3 position-relative">
                                                <Form.Label htmlFor="Text1" className="font-weight-bold text-uppercase">Narxi</Form.Label>
                                                <Form.Control type="number" id="Text1" placeholder="Narxini kiriting..." onChange={e => setProductPrice(e.target.value)} required='required' />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="Text3" className="font-weight-bold text-uppercase">Kategoriya</Form.Label>
                                                <Form.Control type="text" id="Text3" placeholder="Kategoriyani kiriting..." required='required' onChange={e => setDescription(e.target.value)} />
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="Text3" className="font-weight-bold text-uppercase">Miqdori</Form.Label>
                                                <Form.Control type="number" id="Text3" placeholder="Miqdorini kiriting..." required='required' onChange={e => setPoductQuantity(e.target.value)} />
                                            </div>
                                            <div className="col-md-6 mb-3 position-relative">
                                                <Form.Label htmlFor="Text1" className="font-weight-bold text-uppercase">Umumiy narxi</Form.Label>
                                                <Form.Control type="number" id="Text1" placeholder={productPrice * poductQuantity} onChange={e => setUmumiyNarhi(e.target.value)} required='required' />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="inputState" className="form-label font-weight-bold text-muted text-uppercase">Xamkorni tanlang</Form.Label>
                                                <select id="inputState" className="form-select form-control choicesjs" onChange={e => setXamkor(e.target.value)}>
                                                    <option value="Bajarildi">Xamkorlar</option>
                                                    <option value="Bajarilmoqda">Sherov Abdurashid</option>
                                                    <option value="Bajarilmadi">Karimov Komil</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6 mb-3 position-relative">
                                                <Form.Label htmlFor="Text1" className="font-weight-bold text-uppercase">Berilgan avans</Form.Label>
                                                <Form.Control type="number" id="Text1" placeholder="Berilgan pulni kiriting..." onChange={e => setBerilganAvans(e.target.value)} required='required' />
                                            </div>
                                            <div className="col-md-6 mb-3 position-relative">
                                                <Form.Label htmlFor="Text1" className="font-weight-bold text-uppercase">Qolgan pul</Form.Label>
                                                <Form.Control type="number" id="Text1" placeholder="Qolgan pul..." onChange={e => setQolganPul(e.target.value)} required='required' />
                                            </div>
                                            <div className="col-md-6 mb-3 position-relative">
                                                <Form.Label htmlFor="Text2" className="font-weight-bold text-muted text-uppercase">Mahsulot olingan sana</Form.Label>
                                                <DatePicker className="form-control" id="Text2" name="event_date" placeholderText="Sanani kiriting" autoComplete="off" selected={olinganSana} onChange={date => setOlinganSana(date)} />
                                                <span className="search-link">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </span>
                                            </div>
                                            <div className="col-md-6 mb-3 position-relative">
                                                <Form.Label htmlFor="Text1" className="font-weight-bold text-uppercase">Maxsulot olingan soat</Form.Label>
                                                <Form.Control type="number" id="Text1" placeholder={olinganSoat} onChange={e => setOlinganSoat(e.target.value)} required='required' value={olinganSoat} />
                                            </div>


                                        </Form>
                                        <div className="text-right mt-4">
                                            <Link to="/products" className='btn myButtonProducts qushishProduct' type="button" onClick={handleChange}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                                Qo'shish
                                            </Link>
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
export default Productadd;