import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, OverlayTrigger, Tooltip, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { XAMKOR_URL } from '../../../API';
import './Customer.css'
import { FilterCustomer } from './FilterCustomer/FilterCustomer';
import { useHistory } from "react-router";
import { base_URL } from '../../../API'


// Delete Icon
import errorIcon from '../../../assets/images/error/error.png'

// Loading
import { FallingLines } from 'react-loader-spinner';

// Pagination
import ReactPaginate from 'react-paginate';

// WithAuthGuard
import { withAllRouterGuard } from "../App/guards/with-auth-guard";


const Xamkorlar = withAllRouterGuard(() => {

    const [postsXamkor, setpostsXamkor] = useState([])
    const [filterTextValue, updateFilterTextValue] = useState('no');
    const [searchData, setSearchData] = useState([]);
    const [filterVal, setFilterVal] = useState('');
    const [paymentRequired, setPaymentRequired] = useState(0);
    const [inputPaymentRequired, setInputPaymentRequired] = useState(0);
    const [errorInput, setErrorInput] = useState(true);

    const history = useHistory()

    const filterXamkorList = (data) => {
        return data.filter((customer) => {
            if (filterTextValue === "temporary") {
                console.log(customer.category === "temporary");
                return customer.category === "temporary"
            } else if (filterTextValue === "daily") {
                return customer.category === "daily"
            } else {
                return customer
            }
        })
    }

    let filteredXamkorlist = filterXamkorList(postsXamkor);

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(XAMKOR_URL)
            .then(res => {
                setpostsXamkor(res.data);
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
    const currentItems = filteredXamkorlist.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(filteredXamkorlist.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % filteredXamkorlist.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };




    function onFilterValueSelected(filterValue) {
        // console.log(filterValue);
        updateFilterTextValue(filterValue)

    }

    // Delete
    const [modal, setModal] = useState('modal')
    const [id, setId] = useState(id);

    function deleteFunction(id) {
        setId(id)
        setModal('')
    }

    const [modalPayment, setModalPayment] = useState('modal2')

    function paymentFunction(id) {
        axios.get(`${base_URL}/xamkor/${id}`)
            .then(res => {
                setPaymentRequired(res.data.paymentRequired)
            })
            .catch(err => console.log(err))

        setId(id)
        setModalPayment('')
    }

    function deleteXamkor() {
        axios.delete(XAMKOR_URL, { data: { id } })
            .then(res => {
                setModal('modal')
                console.log("Data is deleted!!!", res)
                setpostsXamkor(postsXamkor.filter(p => p._id !== id))
            })
            .catch(err => console.log(err))
        // console.log("kirish = " + id);
    }

    function paymentXamkor() {
        if (inputPaymentRequired > paymentRequired) {
            setErrorInput(false)
        } else {
            axios.post(XAMKOR_URL + "/pay/" + id,
                {
                    amount: inputPaymentRequired
                })
                .then(res => {
                    setModalPayment('modal2')
                    console.log("Data is updated!!!", res)

                })
                .catch(err => console.log(err))
        }
    }



    function handleFilter(e) {
        if (e.target.value == '') {
            setpostsXamkor(searchData)
        } else {
            const filterResult = searchData.filter(item => item.firstName.toLowerCase().includes(e.target.value.toLowerCase()) || item.lastName.toLowerCase().includes(e.target.value.toLowerCase()))
            setpostsXamkor(filterResult)
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
                            <img src={errorIcon} alt="" />
                            <button className='btn btn-danger' onClick={() => deleteXamkor()}>Ha</button>
                            <button className='btn btn-primary' onClick={() => setModal('modal')}>Yoq</button>
                        </div>
                    </div>
                    :
                    null
            }

            {/* payment button */}
            {
                modalPayment.length < 1 ?
                    <div className="modalBg">
                        <div className="myModal">
                            {errorInput ? (<div>
                                <h5 className='text-danger'>Qarzimiz: {paymentRequired}</h5>
                                <div className="container mt-5">
                                    <Form.Label htmlFor="Text1" className="font-weight-bold text-muted text-uppercase">To'laydigan pul</Form.Label>
                                    <Form.Control type="number" id="Text1" placeholder="Summa..." onChange={e => setInputPaymentRequired(Number(e.target.value))} required='required' />
                                    <button className='btn btn-danger mt-5' onClick={() => paymentXamkor()}>Saqlash</button>
                                    <button className='btn btn-primary' onClick={() => setModalPayment('modal2')}>Bekor qilish</button>
                                </div>
                            </div>) : <div>
                                <img src={errorIcon} className='w-100' alt="" />
                                <h3 style={{ color: "red", fontWeight: "600" }}>Katta summa kiritdingiz</h3>
                                <button className='btn btn-primary mt-5' onClick={() => { setModalPayment('modal2'); window.location.reload(true) }}>Bekor qilish</button>
                            </div>}


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
                        <Row>
                            <Col lg="12" className='mt-5'>
                                <div className="d-flex flex-wrap align-items-center justify-content-between my-schedule mb-4 customerSt">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h4 className="font-weight-bold">Xamkorlar</h4>
                                    </div>
                                    <div className="create-workform">
                                        <div className="d-flex flex-wrap align-items-center justify-content-between">
                                            <div className="modal-product-search d-flex">
                                                <Form className="mr-3 position-relative">
                                                    <Form.Group className="mb-0">
                                                        <Form.Control type="text"
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
                                                <Link to="/xamkorlar-add" className="btn myButtonCustomer qushishCustomer position-relative d-flex align-items-center justify-content-between">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                    </svg>Qo'shish
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Card>
                                    <div className="container-fluid mt-5 myContainerStyleCustomer">
                                        <div className="d-grid gapStyleCustomer mb-5">
                                            <div className="p-2">
                                                <div className="container">
                                                    <div className="row align-items-center myHeaderCustomerStyle">
                                                        <div className="col-sm-12 col-md-auto col-lg-auto col-xl-auto text-left">№</div>
                                                        <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">Familiya Ismi</div>
                                                        <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1">Lavozimi</div>
                                                        <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">Telefon</div>
                                                        <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">Telefon 2</div>
                                                        <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center"><FilterCustomer filterValueSelected={onFilterValueSelected}></FilterCustomer></div>
                                                        <div className="col-sm-12 col-md-auto col-lg-auto col-xl-auto text-right">Amal</div>
                                                    </div>
                                                </div>
                                            </div>

                                            {
                                                currentItems.map((xamkor, index) => (
                                                    <div key={index} className="p-2 border myStyleCustomer ownStyleCustomer">
                                                        <div className="container">
                                                            <div className="row align-items-center">
                                                                <div className="col-sm-12 col-md-auto col-lg-auto col-xl-auto text-left">{index + 1}</div>
                                                                <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2" style={{ fontWeight: "500" }}>{xamkor.firstName} {xamkor.lastName}</div>
                                                                <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1">{xamkor.position}</div>
                                                                <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">{xamkor.phone}</div>
                                                                <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">{xamkor.phone2}</div>
                                                                <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2" style={{ color: xamkor.category === "temporary" ? '#149100' : "#EC0000", fontWeight: '500' }}>
                                                                    <small><svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24" fill="none">
                                                                        <circle cx="12" cy="12" r="8" style={{ fill: xamkor.category === "temporary" ? '#149100' : '#EC0000' }}></circle></svg>
                                                                    </small> {xamkor.category === 'temporary' ? 'Doimiy' : "Vaqtincha"}
                                                                </div>
                                                                <div className="col-sm-12 col-md-auto col-lg-auto col-xl-auto text-right customerSvgStyle">


                                                                    <OverlayTrigger placement="top" overlay={<Tooltip>View</Tooltip>} >

                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="text-secondary" width="20" fill="none" viewBox="0 0 24 24" stroke="#0A7AFF" onClick={() => history.push(`/xamkor/${xamkor._id}`)}>
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                                        </svg>

                                                                    </OverlayTrigger>



                                                                    <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>} >
                                                                        <Link className="" to="#">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" className="text-secondary mx-4" width="20" fill="none" viewBox="0 0 24 24" stroke="#E87129" onClick={() => history.push({ pathname: `/xamkor-edit/${xamkor._id}` })}>
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                                            </svg>
                                                                        </Link>
                                                                    </OverlayTrigger>
                                                                    <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>} >
                                                                        <Link className="badge" to="#">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="none" viewBox="0 0 24 24" stroke="#EE1D00" onClick={() => deleteFunction(xamkor._id)}>
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                            </svg>
                                                                        </Link>
                                                                    </OverlayTrigger>
                                                                    <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>} >
                                                                        <Link className="badge" to="#">
                                                                            <button className='btn btn-primary' onClick={() => paymentFunction(xamkor._id)}>To'lash</button>
                                                                        </Link>
                                                                    </OverlayTrigger>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        {/* Pagination Page */}
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
                            </Col>
                        </Row>
                        <div className='container text-center mt-5'>
                            {filteredXamkorlist && filteredXamkorlist.length ? '' : "Xozirda ma'lumotlar kiritilmagan"}
                        </div>
                    </Container>
            }
        </>

    )
})
export default Xamkorlar;