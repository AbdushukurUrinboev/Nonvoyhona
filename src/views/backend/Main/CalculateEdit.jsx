import React, { useState, useContext } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Card from '../../../components/Card'
import { Link, useHistory, useParams } from 'react-router-dom'
import axios from 'axios';
import { CALCULATE_URL } from '../../../API';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './Calculate.css'
// DataProvider
import { dataContext } from './ContextProvider/DataProvider';
import { useEffect } from 'react';
import { base_URL } from '../../../API';

const Calculateadd = () => {
    const [staffShare, setStaffShare] = useState([])
    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [birQopUchunTulov, setBirQopUchunTulov] = useState('')
    const [breadPerBag, setBreadPerBag] = useState('')
    const [allExpensesPerBag, setAllExpensesPerBag] = useState(0)
    const [requiredItems, setRequiredItems] = useState([])
    const [others, setOthers] = useState([])

    const [error, setError] = useState(false);



    const { id } = useParams();
    const history = useHistory()


    useEffect(() => {
        axios.get(`${base_URL}/calculation/${id}`)
            .then(res => {
                setStaffShare(res.data.staffShare)
                setProductName(res.data.productName);
                setProductPrice(res.data.productPrice);
                setBirQopUchunTulov(res.data.birQopUchunTulov);
                setBreadPerBag(res.data.breadPerBag);
                setAllExpensesPerBag(res.data.allExpensesPerBag);
                setRequiredItems(res.data.requiredItems)
                setOthers(res.data.others)
            })
            .catch(err => console.log(err))
    }, [id])

    function handleChange(e) {
        e.preventDefault();
        
        const fd = new FormData()
        fd.append('productName', productName)
        fd.append('productPrice', productPrice)
        fd.append('allExpensesPerBag', others.reduce((acc, objt) => acc + objt.spent, 0))
        fd.append('requiredItems', requiredItems)
        fd.append('others', others)
        fd.append('staffShare', staffShare)
        fd.append('birQopUchunTulov', birQopUchunTulov) //
        fd.append('breadPerBag', breadPerBag)

        axios.put(CALCULATE_URL, fd)
            .then(res => {
                console.log("Data is updated", res)
                history.push('/calculate')
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
                                        <li className="breadcrumb-item"><Link to="/calculate">Kalkulyatsiya</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">Kalkulyatsiyani o'zgartirish</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </Col>
                    <Col lg="12" className="mb-3 d-flex justify-content-between">
                        <h4 className="font-weight-bold0 d-flex align-items-center customerAddHead">Kalkulyatsiyani o'zgartirish</h4>
                    </Col>

                    <Col lg="12" className=" mb-3 d-flex justify-content-between">
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
                                {error ? <p className='text-danger text-center font-weight-bold'>Ushbu qatorlarning barchasini to'ldirishingiz shart</p> : ''}
                                <Row>
                                    <Col md="12">
                                        <Form className="row g-3 date-icon-set-modal myStyleCustomerAdd">
                                            <div className="col-md-6 mb-3 mt-3">
                                                <Form.Label htmlFor="Text1" className="font-weight-bold text-muted text-uppercase">Nomi</Form.Label>
                                                <Form.Control type="text" id="Text1" placeholder="Nomini kiriting..." defaultValue={productName} onChange={e => setProductName(e.target.value)} required='required' />
                                            </div>
                                            <div className="col-md-6 mb-3 mt-3">
                                                <Form.Label htmlFor="Text5" className="font-weight-bold text-muted text-uppercase">Non narhi</Form.Label>
                                                <Form.Control type="number" id="Text5" placeholder="Nechta non berdingiz..." defaultValue={productPrice} onChange={e => setProductPrice(e.target.value)} />
                                            </div>
                                            <div className="col-md-6 mb-3 mt-3">
                                                <Form.Label htmlFor="Text5" className="font-weight-bold text-muted text-uppercase">Bir qop uchun to'lov</Form.Label>
                                                <Form.Control type="number" id="Text5" placeholder="Nechta non berdingiz..." defaultValue={birQopUchunTulov} onChange={e => setBirQopUchunTulov(e.target.value)} />
                                            </div>
                                            <div className="col-md-6 mb-3 mt-3">
                                                <Form.Label htmlFor="Text1" className="font-weight-bold text-muted text-uppercase">Bir qopdan chiqadigan non soni</Form.Label>
                                                <Form.Control type="number" id="Text1" placeholder="Nomini kiriting..." defaultValue={breadPerBag} onChange={e => setBreadPerBag(e.target.value)} required='required' />
                                            </div>
                                            {
                                                staffShare.map((elem, ind) => (
                                                    <div className="col-md-6 mb-3 mt-3" key={ind}>
                                                        <Form.Label htmlFor="Text1" className="font-weight-bold text-muted text-uppercase">{elem.type}</Form.Label>                                                    
                                                        <Form.Control onChange={(e) => {
                                                                function addOrUpdateBread(arr, newBread) {
                                                                    const index = arr.findIndex(bread => bread.type === newBread.type);
                                                                    if (index !== -1) {
                                                                        arr[index].share = newBread.share;
                                                                    } else {
                                                                        arr.push(newBread);
                                                                    }
                                                                    return arr;
                                                                }
                                                                let result = addOrUpdateBread(staffShare, { type: elem.type, share: Number(e.target.value) })

                                                                setStaffShare([...result])
                                                            }} type="number" id="Text1" defaultValue={elem.share} />                                            
                                                    
                                                    
                                                    </div>

                                                    


                                                ))
                                            }



                                        </Form>
                                        <hr />
                                        <h4 className='col-md-6 mb-3 text-center mt-4 text-danger'>{productName} ga ishlatiladigan mahsulotlar</h4>

                                        {
                                            requiredItems.map((item, index) => {
                                                return (
                                                    <Form className="row g-3 date-icon-set-modal myStyleCustomerAdd" key={index}>
                                                        <div className="col-md-6 mb-3">
                                                            <Form.Label htmlFor="Text3" className="font-weight-bold text-muted text-uppercase">Nomi</Form.Label>
                                                            <Form.Control type="text" id="Text3" required='required' defaultValue={item.itemName} />
                                                        </div>
                                                        <div className="col-md-6 mb-3">
                                                            <Form.Label htmlFor="Text4" className="font-weight-bold text-muted text-uppercase">Miqdori</Form.Label>
                                                            <Form.Control type="number" id="Text4" defaultValue={item.itemQuantity} onChange={(e) => {
                                                                function addOrUpdateBread(arr, newBread) {
                                                                    const index = arr.findIndex(bread => bread.itemName === newBread.itemName);
                                                                    if (index !== -1) {
                                                                        arr[index].itemQuantity = newBread.itemQuantity;
                                                                    } else {
                                                                        arr.push(newBread);
                                                                    }
                                                                    return arr;
                                                                }
                                                                let result = addOrUpdateBread(requiredItems, { itemName: item.itemName, itemQuantity: Number(e.target.value) })
                                                                // console.log(result);
                                                                setRequiredItems([...result])
                                                            }} />
                                                        </div>
                                                    </Form>
                                                )
                                            })
                                        }

                                        {
                                            others.map((item, index) => {
                                                return (
                                                    <Form className="row g-3 date-icon-set-modal myStyleCustomerAdd mt-5" key={index}>
                                                        <div className="col-md-6 mb-3">
                                                            <Form.Label htmlFor="Text3" className="font-weight-bold text-muted text-uppercase">Nomi</Form.Label>
                                                            <Form.Control type="text" id="Text3" required='required' defaultValue={item.name} />
                                                        </div>
                                                        <div className="col-md-6 mb-3">
                                                            <Form.Label htmlFor="Text4" className="font-weight-bold text-muted text-uppercase">Miqdori</Form.Label>
                                                            <Form.Control onChange={(e) => {
                                                                function addOrUpdateBread(arr, newBread) {
                                                                    const index = arr.findIndex(bread => bread.name === newBread.name);
                                                                    if (index !== -1) {
                                                                        arr[index].spent = newBread.spent;
                                                                    } else {
                                                                        arr.push(newBread);
                                                                    }
                                                                    return arr;
                                                                }
                                                                let result = addOrUpdateBread(others, { name: item.name, spent: Number(e.target.value) })

                                                                setOthers([...result])
                                                            }} type="number" id="Text4" defaultValue={item.spent} />
                                                        </div>
                                                    </Form>
                                                )
                                            })
                                        }



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
export default Calculateadd;