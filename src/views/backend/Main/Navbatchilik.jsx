import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import Card from '../../../components/Card'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { NASIYA_URL } from '../../../API';
import { FilterCustomer } from './FilterCustomer/FilterCustomer';
//datepicker
import Datepickers from '../../../components/Datepicker';
import { useHistory } from "react-router";
import { base_URL } from '../../../API';


// Delete Icon
import deleteIcon from '../../../assets/images/delete.png'


// Loading
import { FallingLines } from 'react-loader-spinner';

// Pagination
import ReactPaginate from 'react-paginate';




const Navbatchilik = () => {

    const [debts, setDebts] = useState([]);
    const [filterTextValue, updateFilterTextValue] = useState('no');;

    const history = useHistory()

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

    // console.log(debts);
    let filteredDebtlist = filterDebtList(debts);

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(NASIYA_URL)
            .then(res => {
                const sortedData = res.data.reverse();
                setDebts(sortedData)
                setLoading(false)
                // console.log(res.data);
            })
            .catch(err => console.log(err))
    }, [])

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

    function deleteDebt() {
        console.log(id);

        axios.delete(NASIYA_URL, { data: { id } })
            .then(res => {
                setModal('modal')
                console.log("Data is deleted!!!", res)
                setDebts(debts.filter(p => p._id !== id))
            })
            .catch(err => console.log(err))

    }

    const getData = (st, ed) => {
        console.log(st + " va " + ed);
        axios.get(`${base_URL}/report/nasiya?startDate=${st}&endDate=${ed}`)
            .then(({ data: receivedDT }) => {
                setDebts(receivedDT);
            })
    }

    // Pagination 
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 10;
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = filteredDebtlist.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(filteredDebtlist.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % filteredDebtlist.length;
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
                            <button className='btn btn-danger' onClick={() => deleteDebt()}>Ha</button>
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
                        <div className="d-flex flex-wrap align-items-center justify-content-between my-schedule mb-4 debtSt ">
                            <div className="d-flex align-items-center justify-content-between">
                                <h4 className="font-weight-bold ">Navbatchilik</h4>
                            </div>
                            <div className="create-workform">
                                <div className="d-flex flex-wrap align-items-center justify-content-between">
                                    <div className="d-flex">
                                        {/* <div className="form-group mb-0 vanila-daterangepicker d-flex flex-row">
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


                                        </div> */}
                                        {/* <button className='btn btn-primary myButtonOutput position-relative d-flex align-items-center justify-content-between' onClick={() => {
                                            const startDate = document.getElementById("dateStart").value
                                            const endDate = document.getElementById("dateEnd").value
                                            const [smonth, sday, syear] = startDate.split('/');
                                            const [emonth, eday, eyear] = endDate.split('/');
                                            const modifiedStart = `${syear}-${smonth}-${sday}`
                                            const modifiedEnd = `${eyear}-${emonth}-${eday}`
                                            getData(modifiedStart, modifiedEnd)
                                        }}>Saralash</button> */}

                                        {/* <Link to="/nasiya-add" className="btn myButtonDebt qushishDebt position-relative d-flex align-items-center justify-content-between">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>Qo'shish
                                        </Link> */}
                                    </div>
                                </div>


                            </div>


                        </div>


                        <Card>

                            <div className="container-fluid mt-5 myContainerStyleDebt">
                                <div className="d-grid gapStyleDebt mb-5">
                                    <div className="p-2">
                                        <div className="container">
                                            <h4>Tez kunda...</h4>
                                            
                                        </div>
                                    </div>

                                    

                                </div>
                              

                            </div>
                        </Card>                        
                    </Container>
            }
        </>
    )
}

export default Navbatchilik;
