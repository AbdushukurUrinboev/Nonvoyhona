import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import Card from '../../../components/Card'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { NASIYA_URL } from '../../../API';
import { FilterCustomer } from './FilterCustomer/FilterCustomer';
//datepicker
import Datepickers from '../../../components/Datepicker';
import './Debt.css'



const Debt = () => {

    const [debts, setDebts] = useState([]);
    const [filterTextValue, updateFilterTextValue] = useState('no');;

    const filterDebtList = (data) => {
        return data.filter((debt) => {
            if (filterTextValue === "temporary") {
                console.log(debt.group === "temporary");
                return debt.customerType === "temporary"
            } else if (filterTextValue === "daily") {
                return debt.customerType === "daily"
            } else {
                return debt
            }
        })
    }

    let filteredDebtlist = filterDebtList(debts);



    useEffect(() => {
        axios.get(NASIYA_URL)
            .then(res => {
                setDebts(res.data)
                // console.log(res.data);
            })
            .catch(err => console.log(err))
    }, [])

    function onFilterValueSelected(filterValue) {
        // console.log(filterValue);
        updateFilterTextValue(filterValue)

    }


    function deleteDebt(index, id) {
        axios.delete(NASIYA_URL, {data: {id}})
        .then(res => {
            console.log("Data is deleted!!!", res)
            setDebts(debts.filter(p => p._id !== id))
        })
        .catch(err => console.log(err))
        // console.log("kirish = " + id);
    }


    return (
        <>
            <Container fluid>
                <div className="d-flex flex-wrap align-items-center justify-content-between my-schedule mb-4 debtSt ">
                    <div className="d-flex align-items-center justify-content-between">
                        <h4 className="font-weight-bold ">Nasiyalar</h4>
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

                                <Link to="/debt-add" className="btn myButtonDebt qushishDebt position-relative d-flex align-items-center justify-content-between">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>Qo'shish
                                </Link>
                            </div>
                        </div>


                    </div>


                </div>




                <div className="container-fluid mt-5 myContainerStyleDebt">
                    <div className="d-grid gapStyleDebt">
                        <div className="p-2">
                            <div className="container">
                                <div className="row align-items-center myHeaderDebtStyle">
                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-left">№</div>
                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">Nasiya nomi</div>
                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">Kimga</div>
                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">Miqdor</div>
                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">Narxi</div>
                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">Avans</div>
                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">Sana</div>
                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center"><FilterCustomer filterValueSelected={onFilterValueSelected}></FilterCustomer></div>
                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-right">Amal</div>
                                </div>
                            </div>
                        </div>

                        {
                            filteredDebtlist.map((debt, index) => (
                                <div key={index} className="p-2 border myStyleDebt ownStyleDebt">
                                    <div className="container">
                                        <div className="row align-items-center">
                                            <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-left">{index + 1}</div>
                                            <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2" style={{ fontWeight: "500" }}>{debt.product}</div>
                                            <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-left">{debt.customer}</div>
                                            <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">{debt.productQuantity}</div>
                                            <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">{debt.overall}</div>
                                            <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">{debt.avans}</div>
                                            <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-left">{debt.date}</div>
                                            <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-left" style={{ color: debt.customerType === "temporary" ? '#149100' : "#EC0000", fontWeight: '500', padding: "0px" }}>
                                                <small><svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24" fill="none">
                                                    <circle cx="12" cy="12" r="8" style={{ fill: debt.customerType === "temporary" ? '#149100' : '#EC0000' }}></circle></svg>
                                                </small>{debt.customerType === 'temporary' ? 'Doimiy' : "Vaqtincha"}
                                            </div>
                                            <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-right">
                                                <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>} >
                                                    <Link className="" to="#">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="text-secondary mx-4" width="20" fill="none" viewBox="0 0 24 24" stroke="#E87129">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                        </svg>
                                                    </Link>
                                                </OverlayTrigger>
                                                <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>} >
                                                    <Link className="badge" to="#">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="none" viewBox="0 0 24 24" stroke="#EE1D00" onClick={() => deleteDebt(index, debt._id)}>
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
                    {filteredDebtlist && filteredDebtlist.length ? '' : "Xozirda ma'lumotlar kiritilmagan"}
                </div>
            </Container>
        </>
    )
}

export default Debt;
