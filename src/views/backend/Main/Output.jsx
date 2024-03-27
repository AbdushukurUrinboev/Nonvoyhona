import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import Card from '../../../components/Card'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { EXPENSES_URL } from '../../../API';
//datepicker
import Datepickers from '../../../components/Datepicker';
import './Output.css'
import { useHistory } from "react-router";


// Delete Icon
import deleteIcon from '../../../assets/images/delete.png'
import { contains } from 'jquery';

// Loading
import { FallingLines } from 'react-loader-spinner';

import { base_URL } from '../../../API';

// Pagination
import ReactPaginate from 'react-paginate';


// WithAuthGuard
import { withAllRouterGuard } from "../App/guards/with-auth-guard";


const Output = withAllRouterGuard(() => {

    const [outputs, setOutputs] = useState([])


    const [loading, setLoading] = useState(true)

    const history = useHistory()
    useEffect(() => {
        axios.get(EXPENSES_URL)
            .then(res => {
                const sortedData = res.data.reverse();
                setOutputs(sortedData)
                // console.log(res.data);
                setLoading(false)
            })
            .catch(err => console.log(err))
    }, [])

    //delete

    const [modal, setModal] = useState('modal')
    const [id, setId] = useState(0);
    function deleteFunction(id) {
        setId(id)
        setModal('')
    }

    function deleteOutput() {
        axios.delete(EXPENSES_URL, { data: { id } })
            .then(res => {
                setModal('modal')
                console.log("Data is deleted!!!", res)
                setOutputs(outputs.filter(p => p._id !== id))
            })
            .catch(err => console.log(err))
        // console.log("kirish = " + id);
    }

    const getData = (st, ed) => {
        axios.get(`${base_URL}/report/expenses?startDate=${st}&endDate=${ed}`)
            .then(({ data: receivedDT }) => {
                console.log(st);
                setOutputs(receivedDT);
            })
    }

    // Pagination 
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 10;
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = outputs.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(outputs.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % outputs.length;
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
                            <button className='btn btn-danger' onClick={() => deleteOutput()}>Ha</button>
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

                        <div className="d-flex flex-wrap align-items-center justify-content-between my-schedule mb-4 outputSt ">
                            <div className="d-flex align-items-center justify-content-between">
                                <h4 className="font-weight-bold ">Chiqimlar</h4>
                            </div>
                            <div className="create-workform">
                                <div className="d-flex flex-wrap align-items-center justify-content-between">
                                    <div className="d-flex flex-wrap">
                                        <div className="form-group mb-0 vanila-daterangepicker d-flex flex-row">
                                            <div className="date-icon-set">
                                                <Datepickers className="vanila-datepicker" givenID="dateStart" names="start" placeholder="...dan" />
                                                <span className="search-link">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </span>
                                            </div>
                                            <span className="flex-grow-0">
                                                <span className="btn">to</span>
                                            </span>
                                            <div className="date-icon-set">
                                                <Datepickers names="end" placeholder="...gacha" givenID="dateEnd" />
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

                                        <Link to="/output-add" className="btn myButtonOutput qushishOutput position-relative d-flex align-items-center justify-content-between">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>Qo'shish
                                        </Link>
                                    </div>
                                </div>


                            </div>


                        </div>


                        <Card>

                            <div className="container-fluid mt-5 myContainerStyleOutput">
                                <div className="d-grid gapStyleOutput mb-5">
                                    <div className="p-2 hide-on-mobile-output">
                                        <div className="container">
                                            <div className="row align-items-center myHeaderOutputStyle">
                                                <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-left">№</div>
                                                <div className="col-sm-12 col-md-5 col-lg-5 col-xl-5">Chiqim nomi</div>
                                                <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">Sana</div>
                                                <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">Narhi</div>
                                                <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">Amal</div>
                                            </div>
                                        </div>
                                    </div>

                                    {
                                        currentItems.map((output, index) => (
                                            <div key={index} className="p-2 border myStyleOutput ownStyleOutput">
                                                <div className="container">
                                                    <div className="row align-items-center">
                                                        <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-left">{index + 1}</div>
                                                        <div className="col-sm-12 col-md-5 col-lg-5 col-xl-5" style={{ fontWeight: "500" }}>{output.name}</div>
                                                        <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">{output.day}/{output.month}/{output.year}</div>
                                                        <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">{output.overallPrice}</div>
                                                        <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">
                                                            <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>} >
                                                                <Link className="" to="#">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="text-secondary mx-4" width="20" fill="none" viewBox="0 0 24 24" stroke="#E87129" onClick={() => history.push({ pathname: `/output-edit/${output._id}` })}>
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                                    </svg>
                                                                </Link>
                                                            </OverlayTrigger>
                                                            <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>} >
                                                                <Link className="badge" to="#">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="none" viewBox="0 0 24 24" stroke="#EE1D00" onClick={() => deleteFunction(output._id)}>
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

export default Output;
