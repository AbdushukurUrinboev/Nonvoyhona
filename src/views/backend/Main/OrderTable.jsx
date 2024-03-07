import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import Card from '../../../components/Card'
import { Link } from 'react-router-dom'
// import { formatIsoTimeString } from '@fullcalendar/react'
import Datepickers from '../../../components/Datepicker';
import { FilterPlans } from './FilterCustomer/FilterCustomer';
import { ORDERS_URL } from '../../../API';
import axios from 'axios';
import "./Order.css"
import { useHistory } from "react-router";
import { base_URL } from '../../../API';
import deliveryIcon from '../../../assets/images/icon/deliveryIcon.gif'
import cardIcon from '../../../assets/images/icon/card.png'
import tableIcon from '../../../assets/images/icon/table.png'


// Delete Icon
import deleteIcon from '../../../assets/images/delete.png'

// lineThrough icon
import Strikethrough from '../../../assets/images/icon/Strikethrough.svg'

// Loading
import { FallingLines } from 'react-loader-spinner';

// Pagination
import ReactPaginate from 'react-paginate';

// WithAuthGuard
import { withAllRouterGuard } from "../App/guards/with-auth-guard";

const OrderTable = withAllRouterGuard(({ isTable, setIsTable }) => {
    const [isShownCard, setIsShownCard] = useState(false);
    const [isShownTable, setIsShownTable] = useState(false);
    const [orders, setOrders] = useState([]);

    const [filterTextValue, updateFilterTextValue] = useState('no');
    const [popsUp, setPopsUp] = useState(false);
    const [searchData, setSearchData] = useState([]);
    const [filterVal, setFilterVal] = useState('');

    const history = useHistory()

    const filterOrdersList = (data) => {
        return data.filter((order) => {
            if (filterTextValue == "Bajarildi") {
                // console.log(order.status == "Bajarildi");
                return order.status == "Bajarildi"
            } else if (filterTextValue == "Bajarilmoqda") {
                return order.status == "Bajarilmoqda"
            } else if (filterTextValue == "Bajarilmadi") {
                return order.status == "Bajarilmadi"
            } else {
                return order
            }
        })
    }

    let filteredOrderslist = filterOrdersList(orders);

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(ORDERS_URL)
            .then(res => {
                const sortedData = res.data.reverse();
                setOrders(sortedData)
                setLoading(false)
                setSearchData(sortedData)
                // console.log(res.data);
            })
            .catch(err => console.log(err))
    }, [])

    function onFilterValueSelected(filterValue) {
        // console.log(filterValue);
        updateFilterTextValue(filterValue)

    }

    // Search Data
    function handleFilter(e) {
        if (e.target.value == '') {
            setOrders(searchData)
        } else {
            const filterResult = searchData.filter(item => item.customer.toLowerCase().includes(e.target.value.toLowerCase()) || item.order.toLowerCase().includes(e.target.value.toLowerCase()))
            setOrders(filterResult)
        }
        setFilterVal(e.target.value)
    }

    const [modal, setModal] = useState('modal')
    const [id, setId] = useState(0);
    function deleteFunction(id) {
        setId(id)
        setModal('')
    }


    function deleteOrder() {
        axios.delete(ORDERS_URL, { data: { id } })
            .then(res => {
                setModal('modal')
                console.log("Data is deleted!!!", res)
                setOrders(orders.filter(p => p._id !== id))
            })
            .catch(err => console.log(err))
        // console.log("kirish = " + id);
    }

    const getData = (st, ed) => {
        axios.get(`${base_URL}/orders?startDate=${st}&endDate=${ed}`)
            .then(({ data: receivedDT }) => {
                setOrders(receivedDT);
            })
    }

    const lineThrough = (id) => {
        const updatedOrders = orders.map(order => {
            if (order._id === id) {
                if (order.status === "Bajarilmoqda") {
                    axios.put(ORDERS_URL, {
                        id,
                        new: {
                            status: "Bajarildi"
                        }
                    })
                        .then(res => {
                            console.log("Data is updated", res);
                            setOrders((prev) => {
                                return prev.map((elem) => {
                                    if (elem._id === id) {
                                        return { ...elem, status: "Bajarildi" }
                                    } else {
                                        return elem;
                                    }
                                })
                            })
                        })
                        .catch(err => console.log(err))
                } else if (order.status === "Bajarildi") {
                    axios.put(ORDERS_URL, {
                        id,
                        new: {
                            status: "Bajarilmoqda"
                        }
                    })
                        .then(res => {
                            console.log("Data is updated", res);
                            setOrders((prev) => {
                                return prev.map((elem) => {
                                    if (elem._id === id) {
                                        return { ...elem, status: "Bajarilmoqda" }
                                    } else {
                                        return elem;
                                    }
                                })
                            })
                        })
                        .catch(err => console.log(err))
                }
                return { ...order, popsUp: !order.popsUp };
            }
            return order;
        });
        setOrders(updatedOrders);




    };


    // Pagination 
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 10;
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = filteredOrderslist.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(filteredOrderslist.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % filteredOrderslist.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };



    return (
        <>
            {/* delete button */}
            {
                modal.length < 1 ?
                    <div className="modalBg">
                        <div className="myModal">
                            <h4 className='mb-3'>O'chirasizmi?</h4>
                            <img src={deleteIcon} alt="" />
                            <button className='btn btn-danger' onClick={() => deleteOrder()}>Ha</button>
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

                        <div className="d-flex flex-wrap align-items-center justify-content-between my-schedule mb-4 orderSt ">
                            <div className="d-flex align-items-center justify-content-between">
                                <h4 className="font-weight-bold ">Zakazlar</h4>
                            </div>
                            <div className="create-workform">
                                <div className="d-flex flex-wrap align-items-center justify-content-between">
                                    <div className="d-flex">
                                        <div className="form-group mb-0 vanila-daterangepicker d-flex flex-row">
                                            <div className="date-icon-set">
                                                <Datepickers className="vanila-datepicker" givenID="dateStart" names="start" placeholder="...dan" />
                                                <span className="search-link">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </span>
                                            </div>
                                            <span className="flex-grow-0">
                                                <span className="btn">to</span>
                                            </span>
                                            <div className="date-icon-set">
                                                <Datepickers names="end" givenID="dateEnd" placeholder="...gacha" />
                                                <span className="search-link">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </span>
                                            </div>


                                        </div>

                                        <button className='btn btn-primary myButtonOutput position-relative d-flex align-items-center justify-content-between' onClick={() => {
                                            const startDate = document.getElementById("dateStart").value
                                            const endDate = document.getElementById("dateEnd").value
                                            const [smonth, sday, syear] = startDate.split('/');
                                            const [emonth, eday, eyear] = endDate.split('/');
                                            const modifiedStart = `${syear}-${smonth}-${sday}`
                                            const modifiedEnd = `${eyear}-${emonth}-${eday}`
                                            getData(modifiedStart, modifiedEnd)
                                        }}>Saralash</button>

                                        <Link to="/order-new" className="btn myButtonOrder qushishOrder position-relative d-flex align-items-center justify-content-between">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>Qo'shish
                                        </Link>
                                    </div>
                                </div>


                            </div>


                        </div>
                        <div className='container-fluid'>
                            <div className='row justify-content-end align-items-center'>
                                <div className='col-auto'>
                                    <Form className="mr-3 d-flex align-items-center position-relative">
                                        <Form.Control type="text" className="form-control"
                                            id="exampleInputText"
                                            placeholder="Qidirish..."
                                            style={{ borderRadius: "10px" }}
                                            value={filterVal}
                                            onInput={e => handleFilter(e)}
                                        />
                                        <Link className="search-link" to="#">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </Link>
                                    </Form>
                                </div>
                                <div className='col-auto'>
                                    <img
                                        src={tableIcon}
                                        width={50}
                                        style={{
                                            // margin: "10px",
                                            opacity: isShownCard ? "0.5" : "1",
                                            cursor: isShownCard ? "pointer" : "none"
                                        }}
                                        onMouseEnter={() => setIsShownCard(true)}
                                        onMouseLeave={() => setIsShownCard(false)}
                                        onClick={() => setIsTable(true)}
                                    />
                                </div>
                                <div className='col-auto'>
                                    <img
                                        src={cardIcon}
                                        width={60}
                                        style={{
                                            // margin: "10px",
                                            opacity: isShownTable ? "0.5" : "1",
                                            cursor: isShownTable ? "pointer" : "none"
                                        }}
                                        onMouseEnter={() => setIsShownTable(true)}
                                        onMouseLeave={() => setIsShownTable(false)}
                                        onClick={() => setIsTable(false)}
                                    />
                                </div>
                            </div>
                        </div>


                        <Card>

                            <div className="container-fluid mt-5 myContainerStyleOrder">
                                <div className="d-grid gapStyleOrder mb-5">
                                    <div className="p-2">
                                        <div className="container">
                                            <div className="row align-items-center myHeaderOrderStyle">
                                                <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">№ &nbsp; &nbsp; &nbsp; Zakaz nomi</div>
                                                <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">Mijoz</div>
                                                <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1">Telefon</div>
                                                <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">Muddati</div>
                                                <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">Soati</div>
                                                <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">Soni</div>
                                                <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center"><FilterPlans filterValueSelected={onFilterValueSelected}></FilterPlans></div>
                                                <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-right">Amal</div>
                                            </div>
                                        </div>
                                    </div>

                                    {
                                        currentItems.map((order, index) => (
                                            <div key={index} className="p-2 border myStyleOrder ownStyleOrder">
                                                <div className="container">
                                                    <div className="row align-items-center">
                                                        <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2" style={{ textDecoration: order.status === "Bajarildi" ? 'line-through' : 'none', textDecorationColor: "red", fontWeight: order.status === "Bajarildi" ? "bold" : "normal" }}>{index + 1} &nbsp; &nbsp; {order.delivery ?
                                                            <img src={deliveryIcon} alt="Dostavka" style={{ width: "55px" }} /> : null} {order.delivery ? <br /> : null} {order.order}</div>
                                                        <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2" style={{ textDecoration: order.status === "Bajarildi" ? 'line-through' : 'none', textDecorationColor: "red", fontWeight: order.status === "Bajarildi" ? "bold" : "normal" }}>{order.customer}</div>
                                                        <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1" style={{ textDecoration: order.status === "Bajarildi" ? 'line-through' : 'none', textDecorationColor: "red", fontWeight: order.status === "Bajarildi" ? "bold" : "normal" }}>{order.phone}</div>
                                                        <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center" style={{ textDecoration: order.status === "Bajarildi" ? 'line-through' : 'none', textDecorationColor: "red", fontWeight: order.status === "Bajarildi" ? "bold" : "normal" }} ><p>{order.deadline}</p> </div>
                                                        <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center" style={{ textDecoration: order.status === "Bajarildi" ? 'line-through' : 'none', textDecorationColor: "red", fontWeight: order.status === "Bajarildi" ? "bold" : "normal" }} ><p>{order.deadlineTime}</p> </div>
                                                        <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center" style={{ textDecoration: order.status === "Bajarildi" ? 'line-through' : 'none', textDecorationColor: "red", fontWeight: order.status === "Bajarildi" ? "bold" : "normal" }} >{order.productQuantity} ta</div>
                                                        <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-left" style={{ color: order.status === "Bajarildi" ? '#149100' : order.status === "Bajarilmadi" ? "#EC0000" : '#EFAC00', fontWeight: '500' }}>
                                                            <small><svg className="" xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24" fill="none">
                                                                <circle cx="12" cy="12" r="8" style={{ fill: order.status === "Bajarildi" ? '#149100' : order.status === "Bajarilmadi" ? "#EC0000" : '#EFAC00' }}></circle></svg>
                                                            </small>
                                                            {order.status}
                                                        </div>
                                                        <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-right">
                                                            <OverlayTrigger placement="top" overlay={<Tooltip>Ustiga chizish</Tooltip>} >
                                                                <Link className="" to="#">
                                                                    <img src={Strikethrough} className='' width="20" viewBox="0 0 24 24" onClick={() => lineThrough(order._id)} />
                                                                </Link>
                                                            </OverlayTrigger>
                                                            <OverlayTrigger placement="top" overlay={<Tooltip>Ko'rish</Tooltip>} >
                                                                <Link className="" to="#">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="text-secondary" width="20" fill="none" viewBox="0 0 24 24" stroke="#0A7AFF" onClick={() => history.push(`/order/${order._id}`)}>
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                                    </svg>
                                                                </Link>
                                                            </OverlayTrigger>
                                                            <OverlayTrigger placement="top" overlay={<Tooltip>O'zgartirish</Tooltip>} >
                                                                <Link className="" to="#">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="text-secondary" width="20" fill="none" viewBox="0 0 24 24" stroke="#E87129" onClick={() => history.push({ pathname: `/order-details/${order._id}` })}>
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                                    </svg>
                                                                </Link>
                                                            </OverlayTrigger>
                                                            <OverlayTrigger placement="top" overlay={<Tooltip>O'chirish</Tooltip>} >
                                                                <Link className="badge" to="#">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="none" viewBox="0 0 24 24" stroke="#EE1D00" onClick={() => deleteFunction(order._id)}>
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
                        <div className='container text-center mt-5'>
                            {currentItems && currentItems.length ? '' : "Xozirda ma'lumotlar kiritilmagan"}
                        </div>
                    </Container>
            }
        </>
    )
})
export default OrderTable;
