import  React, {useState, useEffect} from 'react'
import {Container,Row,Col,Form,Button,OverlayTrigger,Tooltip} from 'react-bootstrap'
import  Card from '../../../components/Card'
import {Link} from 'react-router-dom'
// import { formatIsoTimeString } from '@fullcalendar/react'
//datepicker
import Datepickers from '../../../components/Datepicker';
import { FilterPlans } from './FilterCustomer/FilterCustomer';
import { ORDERS_URL } from '../../../API';
import axios from 'axios';
import { MyModal } from './Modal';
import "./Order.css"
import { useHistory } from "react-router";



const Order = ()=>{

    const [orders, setOrders] = useState([]);

    const [filterTextValue, updateFilterTextValue] = useState('no');
    const [popsUp, setPopsUp] = useState(true);
    const history = useHistory()
    
    const filterOrdersList = (data) => {
        return data.filter((order) => {
            if (filterTextValue == "Bajarildi") {
                console.log(order.status == "Bajarildi");
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



    useEffect(() => {
        axios.get(ORDERS_URL)
            .then(res => {
                setOrders(res.data)
                // console.log(res.data);
            })
            .catch(err => console.log(err))
    }, [])

    function onFilterValueSelected(filterValue) {
        // console.log(filterValue);
        updateFilterTextValue(filterValue)

    }

    function deleteOrder(index, id) {
        axios.delete(ORDERS_URL, {data: {id}})
        .then(res => {
            console.log("Data is deleted!!!", res)
            setOrders(orders.filter(p => p._id !== id))
        })
        .catch(err => console.log(err))
        // console.log("kirish = " + id);
    }
  
    
    return (
        <>
            <Container fluid>                
                <MyModal/>
                <div className="d-flex flex-wrap align-items-center justify-content-between my-schedule mb-4 orderSt ">
                    <div className="d-flex align-items-center justify-content-between">
                        <h4 className="font-weight-bold ">Zakazlar</h4>
                    </div>
                    <div className="create-workform">
                        <div className="d-flex flex-wrap align-items-center justify-content-between">
                            <div className="d-flex">
                                <div className="form-group mb-0 vanila-daterangepicker d-flex flex-row">
                                    <div className="date-icon-set">
                                        <Datepickers className="vanila-datepicker" names="start" placeholder="...dan" />
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
                                        <Datepickers names="end" placeholder="...gacha" />
                                        <span className="search-link">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </span>
                                    </div>


                                </div>

                                <Link to="/order-new" className="btn myButtonOrder qushishOrder position-relative d-flex align-items-center justify-content-between">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>Qo'shish
                                </Link>
                            </div>
                        </div>


                    </div>


                </div>




                <div className="container-fluid mt-5 myContainerStyleOrder">
                    <div className="d-grid gapStyleOrder">
                        <div className="p-2">
                            <div className="container">
                                <div className="row align-items-center myHeaderOrderStyle">
                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">№ &nbsp; &nbsp; &nbsp; Zakaz nomi</div>
                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">Mijoz</div>
                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1">Telefon</div>
                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">Muddati</div>
                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">Avans</div>
                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">Umumiy</div>
                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center"><FilterPlans filterValueSelected={onFilterValueSelected}></FilterPlans></div>
                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-right">Amal</div>
                                </div>
                            </div>
                        </div>

                        {
                            filteredOrderslist.map((order, index) => (
                                <div key={index} className="p-2 border myStyleOrder ownStyleOrder">
                                    <div className="container">
                                        <div className="row align-items-center">
                                            <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2" style={{ fontWeight: "500" }}>{index + 1} &nbsp; &nbsp; {order.order}</div>
                                            <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">{order.customer}</div>
                                            <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1">{order.phone}</div>
                                            <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">
                                                <p>{order.date}</p>
                                                <p style={{lineHeight: "0px"}}>{order.time}</p>
                                            </div>
                                            <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1">{order.avans}</div>
                                            <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">{order.price}</div>
                                            <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-left" style={{ color: order.status === "Bajarildi" ? '#149100' : order.status === "Bajarilmadi" ? "#EC0000" : '#EFAC00', fontWeight: '500' }}>
                                                <small><svg className="" xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24" fill="none">
                                                    <circle cx="12" cy="12" r="8" style={{ fill: order.status === "Bajarildi" ? '#149100' : order.status === "Bajarilmadi" ? "#EC0000" : '#EFAC00' }}></circle></svg>
                                                </small>
                                                {order.status}
                                            </div>
                                            <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-right">
                                                <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>} >
                                                    <Link className="" to="#">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="text-secondary" width="20" fill="none" viewBox="0 0 24 24" stroke="#E87129" onClick={() => history.push({pathname: `/order-details/${order._id}`})}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                        </svg>
                                                    </Link>
                                                </OverlayTrigger>
                                                <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>} >
                                                    <Link className="badge" to="#">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="none" viewBox="0 0 24 24" stroke="#EE1D00" onClick={() =>  deleteOrder(index, order._id)}>
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

                </div>
                <div className='container text-center mt-5'>
                    {filteredOrderslist && filteredOrderslist.length ? '' : "Xozirda ma'lumotlar kiritilmagan"}
                </div>
            </Container>
        </>
    )
}
export default Order;
