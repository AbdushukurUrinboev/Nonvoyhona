import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import Card from '../../../components/Card'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { CUSTOMERS_URL } from '../../../API';
import './Customer.css'
import { FilterCustomer } from './FilterCustomer/FilterCustomer';
import { useHistory } from "react-router";


const Customer = () => {

    const [postsCustomer, setpostsCustomer] = useState([])
    const [filterTextValue, updateFilterTextValue] = useState('no');
    const [filterVal, setFilterVal] = useState('')
    const [searchData, setSearchData] = useState([])

    const history = useHistory()

    const filterCustomerList = (data) => {
        return data.filter((customer) => {
            if (filterTextValue === "temporary") {
                // console.log(customer.group === "temporary");
                return customer.customerType === "temporary"
            } else if (filterTextValue === "daily") {
                return customer.customerType === "daily"
            } else {
                return customer
            }
        })
    }

    let filteredCustomerlist = filterCustomerList(postsCustomer);


    useEffect(() => {
        axios.get(CUSTOMERS_URL)
            .then(res => {
                setpostsCustomer(res.data);
                setSearchData(res.data)
                // console.log(res.data);
            })
            .catch(err => console.log(err))
    }, [])

    function onFilterValueSelected(filterValue) {
        // console.log(filterValue);
        updateFilterTextValue(filterValue)

    }

    function deleteCustomer(index, id) {
        axios.delete(`http://localhost:4000/customers/`, {data: {id}})
        .then(res => {
            console.log("Data is deleted!!!", res)
            setpostsCustomer(postsCustomer.filter(p => p._id !== id))
        })
        .catch(err => console.log(err))
        // console.log("kirish = " + id);
    }


    function handleFilter(e) {
        if(e.target.value == '') {
            setpostsCustomer(searchData)
        } else {
            const filterResult = searchData.filter(item => item.lastName.toLowerCase().includes(e.target.value.toLowerCase()) || item.firstName.toLowerCase().includes(e.target.value.toLowerCase()) )
            setpostsCustomer(filterResult)
        }
        setFilterVal(e.target.value)
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col lg="12" className='mt-5'>
                        <div className="d-flex flex-wrap align-items-center justify-content-between my-schedule mb-4 customerSt">
                            <div className="d-flex align-items-center justify-content-between">
                                <h4 className="font-weight-bold">Mijozlar</h4>
                            </div>
                            <div className="create-workform">
                                <div className="d-flex flex-wrap align-items-center justify-content-between">
                                    <div className="modal-product-search d-flex">
                                        <Form className="mr-3 position-relative">
                                            <Form.Group className="mb-0">
                                                <Form.Control type="search"
                                                    className="form-control"
                                                    id="exampleInputText"
                                                    placeholder="Qidiruv..."
                                                    value={filterVal}
                                                    onInput={e => handleFilter(e)}

                                                />
                                                <Link to="#" className="search-link">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                    </svg>
                                                </Link>
                                            </Form.Group>
                                        </Form>
                                        <Link to="/customers-add" className="btn myButtonCustomer qushishCustomer position-relative d-flex align-items-center justify-content-between">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>Qo'shish
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="container-fluid mt-5 myContainerStyleCustomer">
                            <div className="d-grid gapStyleCustomer">
                                <div className="p-2">
                                    <div className="container">
                                        <div className="row align-items-center myHeaderCustomerStyle">
                                            <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">№</div>
                                            <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">Familiya Ismi</div>
                                            <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1">Lavozimi</div>
                                            <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">Telefon</div>
                                            <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">Telefon 2</div>
                                            <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center"><FilterCustomer filterValueSelected={onFilterValueSelected}></FilterCustomer></div>
                                            <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">Amal</div>
                                        </div>
                                    </div>
                                </div>

                                {
                                    filteredCustomerlist.map((customer, index) => (
                                        <div key={index} className="p-2 border myStyleCustomer ownStyleCustomer">
                                            <div className="container">
                                                <div className="row align-items-center">
                                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">{index + 1}</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2" style={{ fontWeight: "500" }}>{customer.firstName} {customer.lastName}</div>
                                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1">{customer.status}</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">{customer.phone}</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">{customer.phone2}</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2" style={{ color: customer.customerType === "temporary" ? '#149100' : "#EC0000", fontWeight: '500' }}>
                                                        <small><svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24" fill="none">
                                                            <circle cx="12" cy="12" r="8" style={{ fill: customer.customerType === "temporary" ? '#149100' : '#EC0000' }}></circle></svg>
                                                        </small> {customer.customerType === 'temporary' ? 'Doimiy' : "Vaqtincha"}
                                                    </div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 customerSvgStyle">
                                                        <OverlayTrigger placement="top" overlay={<Tooltip>View</Tooltip>} >
                                                            {/* <Link className=""> */}
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="text-secondary" width="20" fill="none" viewBox="0 0 24 24" stroke="#0A7AFF" onClick={() => history.push(`/customer/${customer._id}`)}>
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
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="none" viewBox="0 0 24 24" stroke="#EE1D00" onClick={() => deleteCustomer(index, customer._id)} >
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
                                <Link to="/customer-add" className='btn myButtonCustomer qushishCustomer' type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Qo'shish
                                </Link>
                            </div> */}
                        </div>

                    </Col>
                </Row>
                <div className='container text-center mt-5'>
                    {filteredCustomerlist && filteredCustomerlist.length ? '' : "Xozirda ma'lumotlar kiritilmagan"}
                </div>
            </Container>

        </>

    )
}
export default Customer;