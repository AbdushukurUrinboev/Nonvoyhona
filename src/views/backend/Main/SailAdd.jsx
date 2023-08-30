import React, { useState, useContext } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import Card from '../../../components/Card'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';
import { SALE_URL } from '../../../API';
import "react-datepicker/dist/react-datepicker.css";
import './ProductAdd.css'
import addOrderLogo from '../../../assets/images/icon/additemaddButonLogo.svg'

import { breadDataContext, customersDataContext, zakazBreadDataContext, sotuvBreadDataContext } from './ContextProvider/DataProvider';

const SailAdd = () => {
    const [order, setOrder] = useState(''); // 
    const [addInputOrder, setAddInputOrder] = useState([{ order: '', productQuantity: '', price: '', customerID: ""}]);
    const [productQuantity, setProductQuantity] = useState(0);
    const [customerType, setCustomerType] = useState('no'); // 
    const [customer, setCustomer] = useState(''); // 
    const [avans, setAvans] = useState(0);
    const [price, setPrice] = useState([]);
    // const [customerID, setCustomerID] = useState(0);
    const [breadPrice, setBreadPrice] = useState([]);

    // const [uploadImage, setUploadImage] = useState(); // Manashu rasm console logga kelyabdi uni endi saqlashim kerak!!!!
    const [error, setError] = useState(false);
    const [breadNotIncluded, setBreadNotIncluded] = useState(false);
    const history = useHistory()

    const breadList = useContext(breadDataContext);
    const customerList = useContext(customersDataContext);
    const zakazBreadList = useContext(zakazBreadDataContext);
    const sotuvBreadList = useContext(sotuvBreadDataContext);

    

    function handleChange(e) {
        e.preventDefault();
        
        
        const isValid = addInputOrder.every(elem => {
            const isOrderIncluded = sotuvBreadList.some(bread => bread === elem.order);
            return isOrderIncluded;
        });

        if (!isValid) {
            console.log("At least one order is not included in sotuvBreadList");
            setBreadNotIncluded(true);
            return;
        }

        const newArrForPost = addInputOrder.map((elem) => {
            return {
                name: elem.order,
                quantity: Number(elem.productQuantity),
                price: elem.price,
                customerID: elem.customerID
            };
        });


      


        axios.post(SALE_URL, {
            order: newArrForPost,
            customerType: customerType,
            customer,
            avans,
            price
        })
            .then(res => {
                console.log("Data is saved", res)
                window.location.reload(history.push('/sale'));
                // history.push('/sale')
            })
            .catch(err => {
                console.log(err)

            })

        // const newArrForPost = addInputOrder.map((elem) => {            
        //     // Check if the order is included in sotuvBreadList
        //     const isOrderIncluded = sotuvBreadList.some(bread =>bread === elem.order);
        //     if (!isOrderIncluded) {
        //         setBreadNotIncluded(true); // Set the error state to true
        //         return null; // Return null for this element, indicating it's invalid
        //     }
        
        //     return {
        //         name: elem.order,
        //         quantity: elem.productQuantity,
        //         price: elem.price,
        //         customerID: elem.customerID
        //     };
        // }).filter(elem => elem !== null); // Filter out the null elements
    
        // if (newArrForPost.length === 0) {
        //     console.log("Order not included in sotuvBreadList");
        //     return; // Don't proceed if no valid elements
        // } else {
        //     axios.post(SALE_URL, {
        //         order: newArrForPost,
        //         customerType,
        //         customer,
        //         avans,
        //         price
        //     })
        //         .then(res => {
        //             console.log("Data is saved", res)
        //             window.location.reload(history.push('/sale'));
        //             // history.push('/sale')
        //         })
        //         .catch(err => {
        //             console.log(err)
    
        //         })
        // }
        
        


        
        
        

    }



    const onChangeHandler = (indx, field, val) => {
        setOrder(val.target.value);
        let currentBread = val.target.value



        let newArr = [...addInputOrder]
        newArr[indx][field] = currentBread;
        if (field === "order") {
            
            breadList.map(elem => {
                if (elem.productName === currentBread) {
                    // setPrice(elem.productPrice);
                    newArr[indx].price = elem.productPrice;                   
                    setBreadPrice(elem.productPrice);
                    calculateOverallPrice(elem.productPrice, productQuantity, avans);
                }
            })

            if(customerType === "zakaz") {
                zakazBreadList.map(elem => {
                    if(elem.order === currentBread) {
                        newArr[indx].customerID = elem._id;                                           
                    }
                })
            }
        }
        setAddInputOrder(newArr);


    }

    const deleteInputs = (e) => {
        e.preventDefault();
        if (addInputOrder.length > 1) {
            let newArray = [...addInputOrder];
            newArray.pop();
            setAddInputOrder(newArray);
        }
    };


    const calculateOverallPrice = () => {
        const overallPr = addInputOrder.reduce((acc, curOrder) => {
            return acc + curOrder.price * curOrder.productQuantity
        }, 0);
        setPrice(overallPr);
    }




    return (
        <>
            <Container fluid>
                <Row>
                    <Col lg="12" className='mt-5'>
                        <div className="d-flex align-items-center justify-content-between">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb p-0 mb-0">
                                    <li className="breadcrumb-item"><Link to="/sale">Sotuv</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Mijozlarga tarqatish</li>
                                </ol>
                            </nav>
                        </div>
                    </Col>
                    <Col lg="12" className="mt-3 mb-3 d-flex justify-content-between">
                        <h4 className="font-weight-bold0 d-flex align-items-center styleHeader">Mijozlarga Taqsimlash</h4>
                    </Col>
                    <Col lg="12" className="mt-3 mb-3 d-flex justify-content-between">
                        <Link to="/sale" className="btn btn-primary btn-sm d-flex align-items-left justify-content-between">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                            <span className="ml-2">Orqaga</span>
                        </Link>
                    </Col>

                    <Col lg="12">
                        <Card>
                            <Card.Body>
                                {breadNotIncluded ? <p className='text-danger text-center font-weight-bold'>Sotuv bo'limidan Non topilmadi</p> : ''}
                                <Row>
                                    <Col md="6">
                                        <Form className="row g-3 date-icon-set-modal">
                                            {
                                                addInputOrder.map((item, index) => {
                                                    return <div className="col-md-12 mb-3" key={index}>
                                                        <div className="row g-3">
                                                            <div className="col-md-4 mb-3">
                                                                <Form.Label htmlFor="inputState" className="form-label font-weight-bold text-muted text-uppercase">Nonni tanlang</Form.Label>
                                                                <select id="inputState" className="form-select form-control choicesjs" value={item.order} onChange={(e) => { onChangeHandler(index, 'order', e) }} >
                                                                    <option defaultValue="no">Nonlar ro'yxati</option>
                                                                    {
                                                                        customerType === "zakaz" ? (
                                                                            zakazBreadList.map((bread, ind) => {
                                                                                // console.log(bread)
                                                                                return bread.customer === customer && <option id={bread._id} key={ind} value={bread.order}>{bread.order}</option>
                                                                            })

                                                                        ) : customerType !== "no" ? (
                                                                            sotuvBreadList.map((bread, ind) => {
                                                                                return <option key={ind} value={bread}>{bread}</option>
                                                                            })
                                                                        ) : null
                                                                    }
                                                                </select>
                                                            </div>

                                                            <div className="col-md-4 mb-3">
                                                                <Form.Label htmlFor="Text5" className="font-weight-bold text-muted text-uppercase">Soni</Form.Label>
                                                                <Form.Control type="number" id="Text5" placeholder="Nechta non berdingiz..." value={item.productQuantity} onChange={e => {
                                                                    onChangeHandler(index, 'productQuantity', e);
                                                                    setProductQuantity(Number(e.target.value))
                                                                    calculateOverallPrice(breadPrice, Number(e.target.value), avans)
                                                                }} />
                                                            </div>

                                                            <div className="col-md-4 mb-3">
                                                                <Form.Label htmlFor="Text5" className="font-weight-bold text-muted text-uppercase">Narhi</Form.Label>
                                                                <Form.Control type="number" id="Text5" placeholder="Non narhi..." value={item.price} onChange={e => {
                                                                    onChangeHandler(index, 'price', e);
                                                                    setBreadPrice(Number(e.target.value))
                                                                    calculateOverallPrice(Number(e.target.value), productQuantity, avans)
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
                                                        setAddInputOrder([...addInputOrder, { order: '', productQuantity: '', price: '' }])
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

                                        </Form>

                                    </Col>

                                    <Col md="6">
                                        <Form className="row g-3 date-icon-set-modal">
                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="inputState" className="form-label font-weight-bold text-muted text-uppercase">Mijozni tanlang</Form.Label>
                                                <select id="inputState" className="form-select form-control choicesjs" onChange={e => { setCustomerType(e.target.value); setProductQuantity(0); setBreadPrice(0) }}>
                                                    <option value="no">Turi</option>
                                                    <option value="daily">Doimiy</option>
                                                    <option value="temporary">Vaqtincha</option>
                                                    <option value="zakaz">Zakazlar</option>
                                                </select>
                                            </div>

                                            {
                                                customerType == "daily" ? (<div className="col-md-6 mb-3">
                                                    <Form.Label htmlFor="inputState" className="form-label font-weight-bold text-muted text-uppercase">Mijozlar ro'yhati</Form.Label>
                                                    <select id="inputState" className="form-select form-control choicesjs" value={customer} onChange={e => setCustomer(e.target.value)} >
                                                        <option value="">Mijozlar ro'yxati</option>
                                                        {
                                                            customerList.map((cust, ind) => {
                                                                return <option key={ind} value={cust.firstName + " " + cust.lastName}>{cust.lastName + " " + cust.firstName}</option>
                                                            })
                                                        }
                                                    </select>
                                                </div>) : customerType == "temporary" ? (<div className="col-md-6 mb-3">
                                                    <Form.Label htmlFor="Text5" className="font-weight-bold text-muted text-uppercase">Kimga</Form.Label>
                                                    <Form.Control type="text" id="Text5" placeholder="Kim uchunligini kiriting..." onChange={e => setCustomer(e.target.value)} />
                                                </div>) : customerType == "zakaz" ? (<div className="col-md-6 mb-3">
                                                    <Form.Label htmlFor="inputState" className="form-label font-weight-bold text-muted text-uppercase">Zakaz bergan mijozlar ro'yhati</Form.Label>
                                                    <select id="inputState" className="form-select form-control choicesjs" value={customer} onChange={e => setCustomer(e.target.value)} >
                                                        <option value="">Zakazlar ro'yxati</option>
                                                        {
                                                            zakazBreadList.filter((obj, index, self) =>
                                                                index === self.findIndex((t) => (
                                                                    t.customer === obj.customer
                                                                ))
                                                            ).map((cust, ind) => {
                                                                return <option key={ind} value={cust.customer}>{cust.customer}</option>
                                                            })
                                                        }
                                                    </select>
                                                </div>) : null
                                            }

                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="Text1" className="font-weight-bold text-uppercase">Avans</Form.Label>
                                                <Form.Control type="text" id="Text1" value={avans} onChange={e => {
                                                    setAvans(Number(e.target.value))
                                                    calculateOverallPrice(breadPrice, productQuantity, Number(e.target.value))
                                                }} required='required' />
                                            </div>
                                            <div className="col-md-12 mb-3 position-relative">
                                                <Form.Label htmlFor="Text1" className="font-weight-bold text-uppercase">Jami Non narhi</Form.Label>
                                                <Form.Control type="text" id="Text1" placeholder="Jami pul..." value={price} onChange={e => setPrice(Number(e.target.value))} required='required' />
                                            </div>

                                        </Form>
                                    </Col>
                                </Row>
                                <div className="mt-4" style={{ textAlign: "right" }}>
                                    <Link to="/sail" className='btn myButtonSails qushishSail' type="button" onClick={handleChange}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Taqsimlash
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
export default SailAdd;