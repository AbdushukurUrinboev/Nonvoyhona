import React, { useEffect, useState } from 'react'
import { Container, Tab, Nav, Row, Col, Form, OverlayTrigger, Tooltip, Card, Accordion, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { STAFF_URL } from '../../../API';
import { FilterStaff, FilterStaffSmena } from './FilterProduct/FilterStaff';
import { useHistory } from "react-router";
import './Staff.css'
import { base_URL } from '../../../API';

//img
import Avatar from '../../../assets/images/avatar.png'


// Delete Icon
import deleteIcon from '../../../assets/images/delete.png'

// Loading
import { FallingLines } from 'react-loader-spinner';

// Pagination
import ReactPaginate from 'react-paginate';

import StaffBonusAdd from './StaffBonusAdd';

// WithAuthGuard
import { withAllRouterGuard } from "../App/guards/with-auth-guard";


const Staff = withAllRouterGuard(() => {
    const [staffList, setStaffList] = useState([]);
    const [remainingStaffDepts, setRemainingStaffDepts] = useState([]);
    const [filterTextValue, updateFilterTextValue] = useState('no');
    const [filterTextValueSmena, updateFilterTextValueSmena] = useState('no');
    const [searchData, setSearchData] = useState([]);
    const [filterVal, setFilterVal] = useState('');
    const [hasElements, setHasElements] = useState(false)
    const [activeAccordion, setActiveAccordion] = useState(null);
    const history = useHistory()

    const filterStaffList = (data) => {
        return data.filter((staff) => {
            if (filterTextValue === "TepaTandir") {
                // console.log(staff.group==="A-guruh");
                return staff.group === "TepaTandir"
            } else if (filterTextValue === "KulchaTandir") {
                return staff.group === "KulchaTandir"
            } else if (filterTextValue === "PodvalPatir") {
                return staff.group === "PodvalPatir"
            } else if (filterTextValue === "D-guruh") {
                return staff.group === "D-guruh"
            } else {
                return staff
            }
        })
    }
    const filterStaffListSmena = (data) => {
        return data.filter((staffSmena) => {
            if (filterTextValueSmena === "1-smena") {
                // console.log(staff.group==="A-guruh");
                return staffSmena.smena === "1-smena"
            } else if (filterTextValueSmena === "2-smena") {
                return staffSmena.smena === "2-smena"
            } else if (filterTextValueSmena === "3-smena") {
                return staffSmena.smena === "3-smena"
            } else if (filterTextValueSmena === "4-smena") {
                return staffSmena.smena === "4-smena"
            } else {
                return staffSmena
            }
        })
    }


    let filteredStafflist = filterStaffList(staffList);
    let doneFilter = filterStaffListSmena(filteredStafflist);

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(STAFF_URL)
            .then(res => {
                setStaffList(res.data)
                setSearchData(res.data)
                setLoading(false)
            })
            .catch(err => console.log(err))
    }, [])



    function onFilterValueSelected(filterValue) {
        // console.log(filterValue);
        updateFilterTextValue(filterValue)

    }

    function onFilterValueSelectedSmena(filterValue) {
        console.log(filterValue);
        updateFilterTextValueSmena(filterValue)
    }

    // Delete
    const [modal, setModal] = useState('modal')
    const [id, setId] = useState(0);
    function deleteFunction(id) {
        setId(id)
        setModal('')
    }

    function deleteStaff() {
        axios.delete(STAFF_URL, { data: { id } })
            .then(res => {
                setModal('modal')
                console.log("Data is deleted!!!", res)
                setStaffList(staffList.filter(p => p._id !== id))
            })
            .catch(err => console.log(err))
        // console.log("kirish = " + id);
    }




    // Search
    function handleFilter(e) {
        if (e.target.value == '') {
            setStaffList(searchData)
        } else {
            const filterResult = searchData.filter(item => item.firstName.toLowerCase().includes(e.target.value.toLowerCase()) || item.lastName.toLowerCase().includes(e.target.value.toLowerCase()))
            setStaffList(filterResult)
        }
        setFilterVal(e.target.value)
    }


    // Pagination 
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 10;
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = doneFilter.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(doneFilter.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % doneFilter.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };



    // jarima/mukofot bor xodimlar filtr qilish 
    const staffWithFines = staffList.filter(staff => staff.fines.length > 0);


    const handleAccordionToggle = (accordionKey) => {
        setActiveAccordion(accordionKey === activeAccordion ? null : accordionKey);
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
                            <button className='btn btn-danger' onClick={() => deleteStaff()}>Ha</button>
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
                        <Tab.Container defaultActiveKey="staff-information">
                            <Row>
                                <Col lg="12">
                                    <div className="d-flex flex-wrap align-items-center justify-content-between my-schedule mb-4">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <h4 className="font-weight-bold"></h4>
                                        </div>
                                        <div className="create-workform">
                                            <div className="d-flex flex-wrap align-items-center justify-content-between">
                                                <div className="modal-product-search d-flex flex-wrap">
                                                    <Form className="mr-3 position-relative">
                                                        <Form.Group className="mb-0">
                                                            <Form.Control type="text"
                                                                className="form-control"
                                                                id="exampleInputText"
                                                                placeholder="Qidirish..."
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
                                                    <Link to="/staff-add" className="btn myButtonStaff qushishStaff position-relative d-flex align-items-center justify-content-between">
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
                                                        <Nav.Link eventKey="staff-information">Xodimlar haqida ma'lumot</Nav.Link>
                                                    </li>
                                                    <li className="col-md-3 p-0">
                                                        <Nav.Link eventKey="qarz-staff">Qarzdor xodimlar ro'yxati</Nav.Link>
                                                    </li>
                                                    <li className="col-md-3 p-0">
                                                        <Nav.Link eventKey="jarima-ragbat">Jarima va Rag'batlar</Nav.Link>
                                                    </li>
                                                    {/* <li className="col-md-3 p-0">
                                                <Nav.Link eventKey="emailandsms">Email and SMS</Nav.Link>
                                            </li>
                                            <li className="col-md-3 p-0">
                                                <Nav.Link eventKey="manage-contact">Manage Contact</Nav.Link>
                                            </li> */}
                                                </Nav>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col lg="12" className=''>
                                    {/* New Version */}
                                    <div className="mm-edit-list-data">
                                        <Tab.Content>
                                            <Tab.Pane eventKey="staff-information" role="tabpanel">
                                                <Card>
                                                    <div className="container-fluid mt-5 myContainerStyleStaff">
                                                        <div className="d-grid gapStyleStaff mb-5">
                                                            <div className="p-2 hide-on-mobile-staff">
                                                                <div className="container">
                                                                    <div className="row align-items-center myHeaderStaffStyle">
                                                                        <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">№</div>
                                                                        <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center"></div>
                                                                        <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-left">Familiya Ismi</div>
                                                                        <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">Lavozimi</div>
                                                                        <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-left"><FilterStaff filterValueSelected={onFilterValueSelected}></FilterStaff></div>
                                                                        <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-right"><FilterStaffSmena filterValueSelectedSmena={onFilterValueSelectedSmena}></FilterStaffSmena></div>
                                                                        <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">Telefon</div>
                                                                        <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">Amal</div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {
                                                                currentItems.map((staff, index) => (
                                                                    <div key={index} className="p-2 border myStyleStaff ownStyleStaff">
                                                                        <div className="container">
                                                                            <div className="row align-items-center">
                                                                                <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">{index + 1}</div>
                                                                                <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-left">
                                                                                    <div className="h-avatar is-small">
                                                                                        <img className="avatar myStaffAvatar" alt="user-icon" src={staff.image === 'none' ? Avatar : `${base_URL}/${staff.image}`} style={{ width: "35px" }} />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-left" style={{ fontWeight: "500" }}>{staff.firstName} {staff.lastName}</div>
                                                                                <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">{staff.typeOfWorker}</div>
                                                                                <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1">{staff.group == 'No' ? "Yo'q" : staff.group}</div>
                                                                                <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1">{staff.smena == 'No' ? "Yo'q" : staff.smena}</div>
                                                                                <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center" >{staff.phone}</div>
                                                                                <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 staffSvgStyle text-right">
                                                                                    <OverlayTrigger placement="top" overlay={<Tooltip>View</Tooltip>} >
                                                                                        {/* <Link className=""> */}
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="text-secondary" width="20" fill="none" viewBox="0 0 24 24" stroke="#0A7AFF" onClick={() => history.push(`/staff/${staff._id}`)}>
                                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                                                        </svg>
                                                                                        {/* </Link> */}
                                                                                    </OverlayTrigger>
                                                                                    <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>} >
                                                                                        <Link className="" to="#">
                                                                                            <svg xmlns="http://www.w3.org/2000/svg" className="text-secondary mx-4" width="20" fill="none" viewBox="0 0 24 24" stroke="#E87129" onClick={() => history.push({ pathname: `/staff-edit/${staff._id}` })}>
                                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                                                            </svg>
                                                                                        </Link>
                                                                                    </OverlayTrigger>
                                                                                    <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>} >
                                                                                        <Link className="badge" to="#">
                                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="none" viewBox="0 0 24 24" stroke="#EE1D00" onClick={() => deleteFunction(staff._id)}>
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
                                            </Tab.Pane>

                                            {/* Qarzdor xodimlar ro'yhati oynasi */}

                                            <Tab.Pane eventKey="qarz-staff" role='tabpanel'>
                                                <Card>
                                                    <div className="container-fluid mt-5 myContainerStyleStaff">
                                                        <div className="d-grid gapStyleStaff">


                                                            <div className="p-2">
                                                                <div className="container">
                                                                    <div className="row align-items-center myHeaderStaffStyle">
                                                                        <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">№</div>
                                                                        <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center"></div>
                                                                        <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-left">Familiya Ismi</div>
                                                                        <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">Lavozimi</div>
                                                                        <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-left"><FilterStaff filterValueSelected={onFilterValueSelected}></FilterStaff></div>
                                                                        <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-right"><FilterStaffSmena filterValueSelectedSmena={onFilterValueSelectedSmena}></FilterStaffSmena></div>
                                                                        <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">Telefon</div>
                                                                        <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">Amal</div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {

                                                                staffList.filter(el => el.remainingDepts > 0).length > 0 ? (
                                                                    staffList.filter(el => el.remainingDepts > 0).map((staff, index) => (
                                                                        <div key={index} className="p-2 border myStyleStaff ownStyleStaff">
                                                                            <div className="container">
                                                                                <div className="row align-items-center">
                                                                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">{index + 1}</div>
                                                                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-left">
                                                                                        <div className="h-avatar is-small">
                                                                                            <img className="avatar myStaffAvatar" alt="user-icon" src={staff.image === 'none' ? Avatar : `${base_URL}/${staff.image}`} style={{ width: "35px" }} />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-left" style={{ fontWeight: "500" }}>{staff.firstName} {staff.lastName}</div>
                                                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">{staff.typeOfWorker}</div>
                                                                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1">{staff.group == 'No' ? "Yo'q" : staff.group}</div>
                                                                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1">{staff.smena == 'No' ? "Yo'q" : staff.smena}</div>
                                                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center" >{staff.phone}</div>
                                                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 staffSvgStyle text-right">
                                                                                        <OverlayTrigger placement="top" overlay={<Tooltip>View</Tooltip>} >
                                                                                            <svg xmlns="http://www.w3.org/2000/svg" className="text-secondary" width="20" fill="none" viewBox="0 0 24 24" stroke="#0A7AFF" onClick={() => history.push(`/staff/${staff._id}`)}>
                                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                                                            </svg>
                                                                                        </OverlayTrigger>
                                                                                        <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>} >
                                                                                            <Link className="" to="#">
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" className="text-secondary mx-4" width="20" fill="none" viewBox="0 0 24 24" stroke="#E87129" onClick={() => history.push({ pathname: `/staff-edit/${staff._id}` })}>
                                                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                                                                </svg>
                                                                                            </Link>
                                                                                        </OverlayTrigger>
                                                                                        <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>} >
                                                                                            <Link className="badge" to="#">
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="none" viewBox="0 0 24 24" stroke="#EE1D00" onClick={() => deleteFunction(staff._id)}>
                                                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                                                </svg>
                                                                                            </Link>
                                                                                        </OverlayTrigger>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))
                                                                ) : (<p className='text-center' style={{ color: "blue", fontWeight: "bold" }}>Qarzdor Xodimlar topilmadi</p>)


                                                            }

                                                        </div>
                                                    </div>
                                                </Card>

                                            </Tab.Pane>

                                            {/* Jarima va Ragbat */}

                                            <Tab.Pane eventKey="jarima-ragbat" role='tabpanel'>
                                                <Card>
                                                    <div style={{ marginTop: "15px", marginRight: "15px" }}>
                                                        <StaffBonusAdd />
                                                    </div>
                                                    <div className="container mt-3">
                                                        {
                                                            staffWithFines.length > 0 ? (
                                                                <>
                                                                {staffWithFines.map((staff, index) => (
                                                            <Accordion key={index}>
                                                                <Card>
                                                                    <Card.Header>
                                                                        <Accordion.Toggle
                                                                            as={Button}
                                                                            variant="link"
                                                                            eventKey="collapseOne"
                                                                            onClick={() => handleAccordionToggle('collapseOne')}
                                                                        >
                                                                            {staff.firstName} {staff.lastName}
                                                                        </Accordion.Toggle>
                                                                    </Card.Header>
                                                                    <Accordion.Collapse eventKey="collapseOne">
                                                                        <Card.Body>
                                                                            <div className="container-fluid myContainerStyleStaff">
                                                                                <div className="d-grid gapStyleStaff">
                                                                                    <div className="p-2">
                                                                                        <div className="container">
                                                                                            <div className="row align-items-center myHeaderStaffStyle">
                                                                                                <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">№</div>
                                                                                                <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">Jarima/Ragbat</div>
                                                                                                <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">Sana</div>
                                                                                                <div className="col-sm-12 col-md-7 col-lg-7 col-xl-7 text-center">Izoh</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>

                                                                                    {staff.fines.map((fine, fineIndex) => {
                                                                                        const uzbekMonthNames = [
                                                                                            "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
                                                                                            "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"
                                                                                        ];
                                                                                        const formattedDate = new Date(fine.date);
                                                                                        const day = formattedDate.getDate();
                                                                                        const monthIndex = formattedDate.getMonth();
                                                                                        const year = formattedDate.getFullYear();
                                                                                        const monthName = uzbekMonthNames[monthIndex];

                                                                                        return (
                                                                                            <div key={fineIndex} className="p-2 border myStyleStaff ownStyleStaff">
                                                                                                <div className="container">
                                                                                                    <div className="row align-items-center">
                                                                                                        <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">{fineIndex + 1}</div>
                                                                                                        <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">
                                                                                                            {
                                                                                                                fine.fine === 'yellow' ? (
                                                                                                                    <span style={{
                                                                                                                        width: "65px",
                                                                                                                        textAlign: "center",
                                                                                                                        backgroundColor: 'yellow',
                                                                                                                        padding: '20px',
                                                                                                                        marginRight: "15px",
                                                                                                                        border: '2px solid darkgray',
                                                                                                                        borderRadius: '5px',
                                                                                                                        display: 'inline-block',
                                                                                                                        fontWeight: 'bold',
                                                                                                                        fontSize: '16px',
                                                                                                                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
                                                                                                                    }}>
                                                                                                                    </span>
                                                                                                                ) : fine.fine === 'red' ? (
                                                                                                                    <span style={{
                                                                                                                        width: "65px",
                                                                                                                        textAlign: "center",
                                                                                                                        backgroundColor: 'red',
                                                                                                                        padding: '20px',
                                                                                                                        marginRight: "15px",
                                                                                                                        border: '2px solid darkgray',
                                                                                                                        borderRadius: '5px',
                                                                                                                        display: 'inline-block',
                                                                                                                        fontWeight: 'bold',
                                                                                                                        fontSize: '16px',
                                                                                                                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
                                                                                                                    }}>
                                                                                                                    </span>
                                                                                                                ) : (
                                                                                                                    <span style={{
                                                                                                                        width: "65px",
                                                                                                                        textAlign: "center",
                                                                                                                        backgroundColor: 'green',
                                                                                                                        padding: '20px',
                                                                                                                        marginRight: "15px",
                                                                                                                        border: '2px solid darkgray',
                                                                                                                        borderRadius: '5px',
                                                                                                                        display: 'inline-block',
                                                                                                                        fontWeight: 'bold',
                                                                                                                        fontSize: '16px',
                                                                                                                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
                                                                                                                    }}>
                                                                                                                    </span>
                                                                                                                )
                                                                                                            }
                                                                                                        </div>
                                                                                                        <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">{`${day}-${monthName} ${year}`}</div>
                                                                                                        <div className="col-sm-12 col-md-7 col-lg-7 col-xl-7 text-center">{fine.description}</div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        )
                                                                                    })}
                                                                                </div>
                                                                            </div>
                                                                        </Card.Body>
                                                                    </Accordion.Collapse>
                                                                </Card>
                                                            </Accordion>
                                                        ))}
                                                                </>
                                                            ) : (
                                                                <p className='text-center' style={{ color: "blue", fontWeight: "bold" }}>Jarima / Rag'bat olgan xodimlar topilmadi</p>
                                                            )
                                                        }
                                                        
                                                    </div>
                                                </Card>
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </div>
                                </Col>
                            </Row>
                            <div className='container text-center mt-5'>
                                {staffList && doneFilter.length ? '' : "Xozirda ma'lumotlar kiritilmagan"}
                            </div>
                        </Tab.Container>
                    </Container>
            }

        </>

    )
})
export default Staff;