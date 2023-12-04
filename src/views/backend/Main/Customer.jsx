import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button, OverlayTrigger, Tooltip, Tab, Nav, } from 'react-bootstrap'
import Card from '../../../components/Card'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { CUSTOMERS_URL } from '../../../API';
import './Customer.css'
import { FilterCustomer } from './FilterCustomer/FilterCustomer';
import { useHistory } from "react-router";
import { base_URL } from '../../../API';

// Delete Icon
import deleteIcon from '../../../assets/images/delete.png'


// Loading
import { FallingLines } from 'react-loader-spinner';

// Pagination
import ReactPaginate from 'react-paginate';



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

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(CUSTOMERS_URL)
            .then(res => {
                setpostsCustomer(res.data);
                setSearchData(res.data)
                setLoading(false)
                // console.log(res.data);
            })
            .catch(err => console.log(err))
    }, [])

    // Pagination 
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 10;
    const endOffset = itemOffset + itemsPerPage;

    const currentItems = filteredCustomerlist.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(filteredCustomerlist.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % filteredCustomerlist.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };
    // Pagination finished




    function onFilterValueSelected(filterValue) {
        // console.log(filterValue);
        updateFilterTextValue(filterValue)

    }


    const [modal, setModal] = useState('modal')
    const [id, setId] = useState(0);
    function deleteFunction(id) {
        setId(id)
        setModal('')
    }

    function deleteCustomer() {
        axios.delete(`${base_URL}/customers/`, { data: { id } })
            .then(res => {
                setModal('modal')
                console.log("Data is deleted!!!", res)
                setpostsCustomer(postsCustomer.filter(p => p._id !== id))
            })
            .catch(err => console.log(err))
        // console.log("kirish = " + id);
    }


    function handleFilter(e) {
        if (e.target.value == '') {
            setpostsCustomer(searchData)
        } else {
            const filterResult = searchData.filter(item => item.lastName.toLowerCase().includes(e.target.value.toLowerCase()) || item.firstName.toLowerCase().includes(e.target.value.toLowerCase()))
            setpostsCustomer(filterResult)
        }
        setFilterVal(e.target.value)
    }

    return (
        <>
            {/* delete button */}
            {
                modal.length < 1 ?
                    <div className="modalBg">
                        <div className="myModal">
                            <h4 className='mb-3'>O'chirasizmi?</h4>
                            <img src={deleteIcon} alt="" />
                            <button className='btn btn-danger' onClick={() => deleteCustomer()}>Ha</button>
                            <button className='btn btn-primary' onClick={() => setModal('modal')}>Yoq</button>
                        </div>
                    </div>
                    :
                    null
            }
            {
                loading ?
                    <div style={{ textAlign: 'center', paddingTop: '15%' }}>
                        <div>
                            <FallingLines
                                color="#4fa94d"
                                width="10%"
                                visible={true}
                                ariaLabel='falling-lines-loading'
                            />
                        </div>
                    </div>
                    :

                    <Container fluid>
                        <Tab.Container defaultActiveKey="customer-information">
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

                                    <Card>
                                        <Card.Body className="p-0">
                                            <div className="mm-edit-list usr-edit">
                                                <Nav variant="pills" className="mm-edit-profile d-flex">
                                                    <li className="col-md-3 p-0">
                                                        <Nav.Link eventKey="customer-information">Mijozlar haqida ma'lumot</Nav.Link>
                                                    </li>
                                                    <li className="col-md-3 p-0">
                                                        <Nav.Link eventKey="qarz-customer">Qarzdor mijozlar ro'yxati</Nav.Link>
                                                    </li>

                                                </Nav>
                                            </div>
                                        </Card.Body>
                                    </Card>

                                    <Col lg="12">
                                        <div className="mm-edit-list-data">
                                            <Tab.Content>
                                                <Tab.Pane eventKey="customer-information" role='tabpanel'>
                                                    <Card>
                                                        <div className="container-fluid mt-5 myContainerStyleCustomer">
                                                            <div className="d-grid gapStyleCustomer mb-5">
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
                                                                    currentItems.map((customer, index) => (
                                                                        <div key={index} className="p-2 border myStyleCustomer ownStyleCustomer">
                                                                            <div className="container">
                                                                                <div className="row align-items-center">
                                                                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">{index + 1}</div>
                                                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2" style={{ fontWeight: "500" }}>{customer.lastName} {customer.firstName}</div>
                                                                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1">{customer.status}</div>
                                                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">{customer.phone}</div>
                                                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">{customer.phone2}</div>
                                                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2" style={{ color: customer.customerType === "daily" ? '#149100' : "#EC0000", fontWeight: '500' }}>
                                                                                        <small><svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24" fill="none">
                                                                                            <circle cx="12" cy="12" r="8" style={{ fill: customer.customerType === "daily" ? '#149100' : '#EC0000' }}></circle></svg>
                                                                                        </small> {customer.customerType === 'daily' ? 'Doimiy' : "Vaqtincha"}
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
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" className="text-secondary mx-4" width="20" fill="none" viewBox="0 0 24 24" stroke="#E87129" onClick={() => history.push({ pathname: `/customers-edit/${customer._id}` })} >
                                                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                                                                </svg>
                                                                                            </Link>
                                                                                        </OverlayTrigger>
                                                                                        <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>} >
                                                                                            <Link className="badge" to="#">
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="none" viewBox="0 0 24 24" stroke="#EE1D00" onClick={() => deleteFunction(customer._id)} >
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
                                                            {/* Pagination */}
                                                            <ReactPaginate
                                                                breakLabel="..."
                                                                nextLabel="keyingisi >"
                                                                onPageChange={handlePageClick}
                                                                pageRangeDisplayed={5}
                                                                pageCount={pageCount}
                                                                previousLabel="< avvalgisi"
                                                                renderOnZeroPageCount={null}
                                                                containerClassName="pagination"
                                                                pageLinkClassName="page-num-pagination"
                                                                previousLinkClassName="page-num-pagination"
                                                                nextLinkClassName="page-num-pagination"
                                                                activeLinkClassName="active"
                                                            />

                                                        </div>
                                                    </Card>
                                                </Tab.Pane>

                                                {/* Qarzdor mijozlar */}
                                                <Tab.Pane eventKey="qarz-customer" role='tabpanel'>
                                                    <Card>

                                                        <div className="container-fluid mt-5 myContainerStyleCustomer">
                                                            <div className="d-grid gapStyleCustomer mb-5">
                                                                <div className="p-2">
                                                                    <div className="container">
                                                                        <div className="row align-items-center myHeaderCustomerStyle">
                                                                            <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">№</div>
                                                                            <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">Familiya Ismi</div>
                                                                            <div className="col-sm-12 col-md-8 col-lg-8 col-xl-8">Jami qarzi</div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {
                                                                    filteredCustomerlist
                                                                    .filter(customer => customer.history && customer.history.length > 0)
                                                                    .map((customer, index) => (
                                                                        <div key={index} className="p-2 border myStyleCustomer ownStyleCustomer">

                                                                            <div className="container">
                                                                                <div className="row align-items-center">
                                                                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">{index + 1}</div>
                                                                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3" style={{ fontWeight: "500" }}>{customer.lastName} {customer.firstName}</div>
                                                                                    <div className="col-sm-12 col-md-8 col-lg-8 col-xl-8">
                                                                                        {(() => {
                                                                                            const totalOverall = customer.history.reduce((sum, entry) => sum + entry.overall, 0);
                                                                                            return totalOverall;
                                                                                        })()}
                                                                                    </div>

                                                                                   
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))
                                                                }

                                                            </div>
                                                            {/* Pagination */}
                                                            {/* <ReactPaginate
                                                                breakLabel="..."
                                                                nextLabel="keyingisi >"
                                                                onPageChange={handlePageClick}
                                                                pageRangeDisplayed={5}
                                                                pageCount={pageCount}
                                                                previousLabel="< avvalgisi"
                                                                renderOnZeroPageCount={null}
                                                                containerClassName="pagination"
                                                                pageLinkClassName="page-num-pagination"
                                                                previousLinkClassName="page-num-pagination"
                                                                nextLinkClassName="page-num-pagination"
                                                                activeLinkClassName="active"
                                                            /> */}

                                                        </div>
                                                    </Card>
                                                </Tab.Pane>
                                            </Tab.Content>
                                        </div>
                                    </Col>
                                </Col>
                            </Row>
                        </Tab.Container>
                        <div className='container text-center mt-5'>
                            {filteredCustomerlist && filteredCustomerlist.length ? '' : "Xozirda ma'lumotlar kiritilmagan"}
                        </div>
                    </Container>
            }

        </>

    )
}
export default Customer;