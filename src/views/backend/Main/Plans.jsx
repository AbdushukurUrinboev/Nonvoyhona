import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import Card from '../../../components/Card'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { PLANS_URL } from '../../../API';
import { FilterPlans } from './FilterCustomer/FilterCustomer';
//datepicker
import Datepickers from '../../../components/Datepicker';
import './Plans.css'
import { useHistory } from "react-router";



// Delete Icon
import deleteIcon from '../../../assets/images/delete.png'


// Loading
import { FallingLines } from 'react-loader-spinner';




const Plans = () => {

    const [plans, setPlans] = useState([]);

    const [filterTextValue, updateFilterTextValue] = useState('no');;
    const history = useHistory()

    const filterPlansList = (data) => {
        return data.filter((plan) => {
            if (filterTextValue === "Bajarildi") {
                console.log(plan.group === "Bajarildi");
                return plan.status === "Bajarildi"
            } else if (filterTextValue === "Bajarilmoqda") {
                return plan.status === "Bajarilmoqda"
            } else if (filterTextValue === "Bajarilmadi") {
                return plan.status === "Bajarilmadi"
            } else {
                return plan
            }
        })
    }

    let filteredPlanstlist = filterPlansList(plans);


    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(PLANS_URL)
            .then(res => {
                setPlans(res.data)
                setLoading(false)
                // console.log(res.data);
            })
            .catch(err => console.log(err))
    }, [])

    function onFilterValueSelected(filterValue) {
        console.log(filterValue);
        updateFilterTextValue(filterValue)

    }


    // Delete
    const [modal, setModal] = useState('modal')
    const [id, setId] = useState(0);
    function deleteFunction(id) {
        setId(id)
        setModal('')
    }

    function deletePlan() {
        axios.delete(PLANS_URL, { data: { id } })
            .then(res => {
                setModal('modal')
                console.log("Data is deleted!!!", res)
                setPlans(plans.filter(p => p._id !== id))
            })
            .catch(err => console.log(err))
        // console.log("kirish = " + id);
    }

    const getData = (st, ed) => {       
        axios.get(`http://localhost:4000/plans?startDate=${st}&endDate=${ed}`)
            .then(({ data: receivedDT }) => {
                setPlans(receivedDT);
            })
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
                            <button className='btn btn-danger' onClick={() => deletePlan()}>Ha</button>
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
                        <div className="d-flex flex-wrap align-items-center justify-content-between my-schedule mb-4 planSt ">
                            <div className="d-flex align-items-center justify-content-between">
                                <h4 className="font-weight-bold ">Rejalar</h4>
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

                                        <Link to="/plan-add" className="btn myButtonPlan qushishPlan position-relative d-flex align-items-center justify-content-between">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>Qo'shish
                                        </Link>
                                    </div>
                                </div>


                            </div>


                        </div>




                        <div className="container-fluid mt-5 myContainerStylePlan">
                            <div className="d-grid gapStylePlan">
                                <div className="p-2">
                                    <div className="container">
                                        <div className="row align-items-center myHeaderPlanStyle">
                                            <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-left">№</div>
                                            <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">Reja nomi</div>
                                            <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">Mas'ul shahs</div>
                                            <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">Muddati</div>
                                            <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center"><FilterPlans filterValueSelected={onFilterValueSelected}></FilterPlans></div>
                                            <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-right">Amal</div>
                                        </div>
                                    </div>
                                </div>

                                {
                                    filteredPlanstlist.map((plan, index) => (
                                        <div key={index} className="p-2 border myStylePlan ownStylePlan">
                                            <div className="container">
                                                <div className="row align-items-center">
                                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-left">{index + 1}</div>
                                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3" style={{ fontWeight: "500" }}>{plan.plan}</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">{plan.person}</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">{plan.deadline}</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-left" style={{ color: plan.status === "Bajarildi" ? '#149100' : plan.status === "Bajarilmadi" ? "#EC0000" : '#EFAC00', fontWeight: '500' }}>
                                                        <small><svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24" fill="none">
                                                            <circle cx="12" cy="12" r="8" style={{ fill: plan.status === "Bajarildi" ? '#149100' : plan.status === "Bajarilmadi" ? "#EC0000" : '#EFAC00' }}></circle></svg>
                                                        </small>
                                                        {plan.status}
                                                    </div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-right">
                                                        <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>} >
                                                            <Link className="" to="#">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="text-secondary mx-4" width="20" fill="none" viewBox="0 0 24 24" stroke="#E87129" onClick={() => history.push({ pathname: `/plan-edit/${plan._id}` })}>
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                                </svg>
                                                            </Link>
                                                        </OverlayTrigger>
                                                        <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>} >
                                                            <Link className="badge" to="#">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="none" viewBox="0 0 24 24" stroke="#EE1D00" onClick={() => deleteFunction(plan._id)}>
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
                            {filteredPlanstlist && filteredPlanstlist.length ? '' : "Xozirda ma'lumotlar kiritilmagan"}
                        </div>
                    </Container>
            }
        </>
    )
}

export default Plans;
