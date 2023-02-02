import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import Card from '../../../components/Card'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { PRODUCTS_URL } from '../../../API';
import { useHistory } from "react-router";
import "./Product.css"



const Product = () => {
    const [postProducts, setPostProducts] = useState([]);

    const history = useHistory()

    useEffect(() => {
        axios.get(PRODUCTS_URL)
            .then(res => {
                setPostProducts(res.data)
                // console.log(res.data);
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            <Container fluid>

                <div className="d-flex flex-wrap align-items-center justify-content-between my-schedule mb-4 prodSt ">
                    <div className="d-flex align-items-center justify-content-between">
                        <h4 className="font-weight-bold ">Maxsulotlar</h4>
                    </div>
                    <div className="create-workform ">
                        <div className="d-flex flex-wrap align-items-center justify-content-between ">
                            <div className="modal-product-search d-flex ">
                                <Form className="mr-3 position-relative">
                                    <div className="form-group mb-0">
                                        <Form.Control type="text" className="form-control" id="exampleInputText" placeholder="Qidirish..." style={{ borderRadius: "10px" }} />
                                        <Link className="search-link" to="#">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </Link>
                                    </div>
                                </Form>
                                <Link to="/product-add" className="btn myButtonCustomer qushishCustomer position-relative d-flex align-items-center justify-content-between">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>Qo'shish
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="container-fluid mt-5 myContainerStyleProduct">
                    <div className="d-grid gapStyleProduct">
                        <div className="p-2">
                            <div className="container">
                                <div className="row align-items-center myHeaderProductStyle">
                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">№</div>
                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1"></div>
                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">Mahsulot nomi</div>
                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">Kategoriyasi</div>
                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">Narhi</div>
                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">Miqdori</div>
                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">Skladda</div>
                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">Amal</div>
                                </div>
                            </div>
                        </div>

                        {
                            postProducts.map((product) => (
                                <div key={product.id} className="p-2 border myStyleProduct ownStylePro">
                                    <div className="container">
                                        <div className="row align-items-center">
                                            <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">{product.id}</div>
                                            <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1"><img src={product.productImage} alt="Rasm" style={{ width: "35px" }} /></div>
                                            <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2" style={{ fontWeight: "500" }}>{product.productName}</div>
                                            <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">{product.productDes}</div>
                                            <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">{product.productPrice} - so'm</div>
                                            <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">{product.poductQuantity}</div>
                                            <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2" style={{ color: product.poductQuantity > 10 ? '#149100' : product.poductQuantity <= 0 ? "#EC0000" : '#EFAC00', fontWeight: '500' }}>
                                                <small><svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24" fill="none">
                                                    <circle cx="12" cy="12" r="8" style={{ fill: product.poductQuantity > 10 ? '#149100' : product.poductQuantity <= 0 ? "#EC0000" : '#EFAC00' }}></circle></svg>
                                                </small>{product.poductQuantity > 10 ? "Mavjud" : product.poductQuantity <= 0 ? "Tugadi" : 'Oz qoldi'}
                                            </div>
                                            <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 productSvgStyle">
                                                <OverlayTrigger placement="top" overlay={<Tooltip>View</Tooltip>} >
                                                    {/* <Link className=""> */}
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="text-secondary" width="20" fill="none" viewBox="0 0 24 24" stroke="#0A7AFF" onClick={() => history.push(`/product/${product.id}`)}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                    {/* </Link> */}
                                                </OverlayTrigger>
                                                <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>} >
                                                    <Link className="" to="#">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="text-secondary mx-4" width="20" fill="none" viewBox="0 0 24 24" stroke="#E87129">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                        </svg>
                                                    </Link>
                                                </OverlayTrigger>
                                                <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>} >
                                                    <Link className="badge" to="#">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="none" viewBox="0 0 24 24" stroke="#EE1D00">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </Link>
                                                </OverlayTrigger>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                    {/* <div className="text-right mt-4">
                        <Link to="/product-add" className='btn myButtonProducts qushishProduct' type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Qo'shish
                        </Link>
                    </div> */}

                </div>
            </Container>
        </>
    )
}

export default Product;
