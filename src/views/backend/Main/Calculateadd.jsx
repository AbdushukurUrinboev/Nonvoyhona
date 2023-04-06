import React, { useState, useContext } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Card from '../../../components/Card'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';
import { CALCULATE_URL } from '../../../API';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './Calculate.css'
// DataProvider
import { dataContext } from './ContextProvider/DataProvider';
import { useEffect } from 'react';

const Calculateadd = () => {

    const [requiredItems, setRequiredItems] = useState([])
    const [productExpenses, setProductExpenses] = useState([])
       
    
    const [addInput, setAddInput] = useState([])
    const [birQopUchunTulov, setBirQopUchunTulov] = useState(0)   
    const [breadPerBag, setBreadPerBag] = useState(0)

    const [productInput, setProductInput] = useState('no')
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);

    const [others, setOthers] = useState(["Elektr", "Gaz", "Ko'mir", "Ovqat", "Yo'lkira", "Nonho'ja", "Sotuvchi", "Boshqalar"]);
    const [addOthersInput, setAddOthersInput] = useState([]);


    // const [breadQuantity, setBreadQuantity] = useState(0);    
    // const [pista, setPista] = useState(0);
    // const [bodom, setBodom] = useState(0);
    // const [yongoq, setYongoq] = useState(0);
    // const [un, setUn] = useState(1);
    // const [shakar, setShakar] = useState(0);
    // const [yog, setYog] = useState(0);
    // const [suzma, setSuzma] = useState(0);
    // const [suhoy, setSuhoy] = useState(0);
    // const [droj, setDroj] = useState(0);
    // const [kunjut, setKunjut] = useState(0);
    // const [sedana, setSedana] = useState(0);
    // const [tuz, setTuz] = useState(0);
    // const [keshu, setKeshu] = useState(0);
    // const [nonhuja, setNonhuja] = useState(0);
    // const [kumir, setKumir] = useState(0);
    // const [gaz, setGaz] = useState(0);
    // const [elektr, setElektr] = useState(0);
    // const [paket, setPaket] = useState(1);
    // const [ovqat, setOvqat] = useState(0);
    // const [sotuvchi, setSotuvchi] = useState(0);
    // const [ishHaqi, setIshHaqi] = useState(0);
    // const [boshqalar, setBoshqalar] = useState(0);

    const [currOthers, setCurrOthers] = useState("No");
    const [freeValue, setFreeValue] = useState(undefined);


    const [productImage, setProductImage] = useState(); // Manashu rasm console logga kelyabdi uni endi saqlashim kerak!!!!

    const history = useHistory()

    const valueProducts = useContext(dataContext)



    function handleChange(e) {
        e.preventDefault();

        const fd = new FormData()





        fd.append('productName', productName);
        fd.append('birQopUchunTulov', birQopUchunTulov);
        fd.append('breadPerBag', breadPerBag);
        fd.append('productPrice', productPrice);
        fd.append('productImage', productImage);
        
        for (var i = 0; i < requiredItems.length; i++) {
            fd.append('requiredItems[]', JSON.stringify(requiredItems[i]));
        }
        for (var i = 0; i < productExpenses.length; i++) {
            fd.append('others[]', JSON.stringify(productExpenses[i]));
        }
        const overallexpenses = productExpenses.reduce((acc, objt) => acc + objt.spent, 0)

        fd.append('allExpensesPerBag', overallexpenses);
        axios.post(CALCULATE_URL, fd)
            .then(res => {
                console.log("Data is saved", res)
                history.push('/calculate')
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
                                    <li className="breadcrumb-item"><Link to="/calculate">Mahsulotlar</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Mahsulot qo'shish</li>
                                </ol>
                            </nav>
                        </div>
                    </Col>
                    <Col lg="12" className="mt-3 mb-3 d-flex justify-content-between">
                        <h4 className="font-weight-bold0 d-flex align-items-center calculateHeader">Yangi non va shu nonga bir qop uchun ketadigan mahsulot qo'shish</h4>
                    </Col>
                    <Col lg="12" className="mt-3 mb-3 d-flex justify-content-between">
                        <Link to="/calculate" className="btn btn-primary btn-sm d-flex align-items-left justify-content-between">
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

                                        <Card.Body className=" mt-3 mx-auto">
                                            <Form.Label htmlFor="inputState" className="form-label font-weight-bold text-muted text-uppercase">Maxsulotni tanlang</Form.Label>
                                            <select id="inputState" className="form-select form-control choicesjs" value={productInput} onChange={e => setProductInput(e.target.value)} >
                                                <option value="no">Maxsulotlar</option>
                                                {
                                                    valueProducts.filter((product) => {
                                                        return !addInput.includes(product)
                                                    }).map((product, ind) => {
                                                        return <option key={ind} value={product}>{product}</option>
                                                    })
                                                }
                                                <option value="boshqalar">Boshqalar</option>
                                                {/* <option value="no">Maxsulotlar</option>
                                                <option value="Sedana">Sedana</option>
                                                <option value="Sedana">Yongoq</option>
                                                <option value="...">...</option> */}
                                            </select>

                                            <button disabled={productInput === "no" ? true : false} className='btn btn-primary mt-2 w-100' onClick={() => {

                                                setAddInput([...addInput, productInput])
                                                setProductInput('no')
                                            }}>

                                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                                Maxsulot qo'shish
                                            </button>
                                        </Card.Body>

                                        {/* Others Chiqimlarni kiritish */}

                                        <Card.Body className=" mt-3 mx-auto">

                                            <div className="col-md-12 mb-3">
                                                <Form.Label htmlFor="inputState1" className="form-label font-weight-bold text-muted text-uppercase">Chiqimni tanlang</Form.Label>
                                                <select id="inputState1" className="form-select form-control choicesjs" value={currOthers} onChange={e => {
                                                    setCurrOthers(e.target.value);
                                                    if (e.target.value !== "Qo'shimcha kiritish") {
                                                        setFreeValue(undefined);
                                                    }
                                                }}>
                                                    <option value="No">Chiqimlar</option>
                                                    {
                                                        others.filter((product) => {
                                                            return !addOthersInput.includes(product)
                                                        }).map((product, ind) => {
                                                            return <option key={ind} value={product}>{product}</option>
                                                        })
                                                    }
                                                    <option value="Qo'shimcha kiritish">Qo'shimcha kiritish</option>

                                                </select>
                                                {
                                                    
                                                    currOthers == "Qo'shimcha kiritish" ? <Form.Control type="text" id="Text1" className='mt-2' placeholder="Chiqim nomini kiriting..." value={freeValue} onChange={(e) => setFreeValue(e.target.value)} type="text" /> : null
                                                }
                                            </div>

                                            <button className='btn btn-primary mt-2 w-100' disabled={currOthers === "No" ? true : false} onClick={() => {

                                                if (freeValue) {
                                                    setAddOthersInput([...addOthersInput, freeValue]);
                                                } else {
                                                    setAddOthersInput([...addOthersInput, currOthers]);
                                                }
                                                setCurrOthers('No')
                                            }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                                Chiqim qo'shish
                                            </button>
                                        </Card.Body>
                                        <Card.Body className="calculateAddStyleCardBody mt-3 mx-auto">
                                            <input type="file" className='calculateAddStyleInput ' accept='image/png, image/jpg, image/jpeg' name='productImage' onChange={(e) => setProductImage(e.target.files[0])} />
                                            <div className="d-flex justify-content-center mt-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="60px" x="0px" y="0px" viewBox="0 0 419.2 419.2" style={{ enableBackground: "new 0 0 419.2 419.2" }} stroke="currentColor">
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
                                            <div className="d-flex justify-content-center">

                                                <p className="mb-0 text-muted font-weight-bold">Rasm yuklash</p>
                                            </div>
                                        </Card.Body>
                                    </Col>
                                    <Col md="9">
                                        <Form className="row g-3 date-icon-set-modal">
                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="Text1" className="font-weight-bold text-uppercase">Non nomi</Form.Label>
                                                <Form.Control type="text" id="Text1" placeholder="Non nomini kiriting..." onChange={e => setProductName(e.target.value)} required='required' />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="Text3" className="font-weight-bold text-uppercase">Non narhi</Form.Label>
                                                <Form.Control type="number" id="Text3" placeholder="Non narhini kiriting..." required='required' onChange={e => setProductPrice(e.target.value)} value={productPrice} />
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="Text3" className="font-weight-bold text-uppercase">Bir qop uchun to'lov</Form.Label>
                                                <Form.Control type="number" id="Text3" placeholder="Non narhini kiriting..." required='required' onChange={e => setBirQopUchunTulov(e.target.value)} value={birQopUchunTulov} /> 
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="Text3" className="font-weight-bold text-uppercase">Bir qopdan chiqadigan non soni</Form.Label>
                                                <Form.Control type="number" id="Text3" placeholder="Non narhini kiriting..." required='required' onChange={e => setBreadPerBag(e.target.value)} value={breadPerBag} />
                                            </div>


                                            {/* Mahsulotlarni qo'shish */}
                                            {
                                                addInput.map((item, index) => {
                                                    return <div className="col-md-6 mb-3" key={index}>
                                                        <Form.Label htmlFor="Text1" className="font-weight-bold text-uppercase">{item} miqdorini kiriting</Form.Label>
                                                        <Form.Control type="text" id="Text1" placeholder={item + ' miqdorini kiriting'} onChange={(e) => {
                                                            function addOrUpdateBread(arr, newBread) {
                                                                const index = arr.findIndex(bread => bread.itemName === newBread.itemName);
                                                                if (index !== -1) {
                                                                    arr[index].itemQuantity = newBread.itemQuantity;
                                                                } else {
                                                                    arr.push(newBread);
                                                                }
                                                                return arr;
                                                            }
                                                            let result = addOrUpdateBread(requiredItems, { itemName: item, itemQuantity: Number(e.target.value) })
                                                            setRequiredItems([...result])
                                                        }} required='required' />
                                                    </div>
                                                })
                                            }

                                            {/* Chiqimlarni qo'shish */}
                                            {
                                                addOthersInput.map((item, index) => {
                                                    return <div className="col-md-6 mb-3" key={index}>
                                                        <Form.Label htmlFor="Text1" className="font-weight-bold text-uppercase" style={{ color: 'red' }}>{item} pulini kiriting</Form.Label>
                                                        <Form.Control type="text" id="Text1" placeholder="Narhni kiriting..." onChange={(e) => {
                                                            function addOrUpdateBread(arr, newBread) {
                                                                const index = arr.findIndex(bread => bread.name === newBread.name);
                                                                if (index !== -1) {
                                                                    arr[index].spent = newBread.spent;
                                                                } else {
                                                                    arr.push(newBread);
                                                                }
                                                                return arr;
                                                            }
                                                            let result = addOrUpdateBread(productExpenses, { name: item, spent: Number(e.target.value) })
                                                            setProductExpenses([...result])
                                                        }} required='required' />

                                                    </div>
                                                })
                                            }  
                                        </Form>
                                    </Col>
                                </Row>
                                <div className="text-right mt-4">
                                    <Link to="/calculate" className='btn myButtonCalculates qushishCalculate' type="button" onClick={handleChange}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg> Qo'shish
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
export default Calculateadd;