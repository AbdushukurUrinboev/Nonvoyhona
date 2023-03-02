import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import Card from '../../../components/Card'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { STAFF_URL } from '../../../API';
import { FilterStaff, FilterStaffSmena } from './FilterProduct/FilterStaff';
import { useHistory } from "react-router";
import './Staff.css'

//img
import Avatar from '../../../assets/images/avatar.png'

const Staff = () => {
    const [staffList, setStaffList] = useState([]);
    const [filterTextValue, updateFilterTextValue] = useState('no');
    const [filterTextValueSmena, updateFilterTextValueSmena] = useState('no');
    const [searchData, setSearchData] = useState([]);
    const [filterVal, setFilterVal] = useState('');

    const history = useHistory()


    const filterStaffList = (data) => {
        return data.filter((staff) => {
            if (filterTextValue === "A-guruh") {
                // console.log(staff.group==="A-guruh");
                return staff.group === "A-guruh"
            } else if (filterTextValue === "B-guruh") {
                return staff.group === "B-guruh"
            } else if (filterTextValue === "C-guruh") {
                return staff.group === "C-guruh"
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
            } else {
                return staffSmena
            }
        })
    }


    let filteredStafflist = filterStaffList(staffList);
    let doneFilter = filterStaffListSmena(filteredStafflist);



    useEffect(() => {
        axios.get(STAFF_URL)
            .then(res => {
                setStaffList(res.data)
                setSearchData(res.data)
                // console.log(res.data)
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
    function deleteStaff(index, id) {
        axios.delete(STAFF_URL, { data: { id } })
            .then(res => {
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


    return (
        <>
            <Container fluid>
                <Row>
                    <Col lg="12" className='mt-2'>
                        <div className="d-flex flex-wrap align-items-center justify-content-between my-schedule mb-4">
                            <div className="d-flex align-items-center justify-content-between">
                                <h4 className="font-weight-bold">Xodimlar Ro'yxati</h4>
                            </div>
                            <div className="create-workform">
                                <div className="d-flex flex-wrap align-items-center justify-content-between">
                                    <div className="modal-product-search d-flex">
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

                        {/* New Version */}

                        <div className="container-fluid mt-5 myContainerStyleStaff">
                            <div className="d-grid gapStyleStaff">
                                <div className="p-2">
                                    <div className="container">
                                        <div className="row align-items-center myHeaderStaffStyle">
                                            <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">№</div>
                                            <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center"></div>
                                            <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 text-left">Familiya Ismi</div>
                                            <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1">Lavozimi</div>
                                            <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-left"><FilterStaff filterValueSelected={onFilterValueSelected}></FilterStaff></div>
                                            <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-right"><FilterStaffSmena filterValueSelectedSmena={onFilterValueSelectedSmena}></FilterStaffSmena></div>
                                            <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">Telefon</div>
                                            <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">Amal</div>
                                        </div>
                                    </div>
                                </div>

                                {
                                    doneFilter.map((staff, index) => (
                                        <div key={index} className="p-2 border myStyleStaff ownStyleStaff">
                                            <div className="container">
                                                <div className="row align-items-center">
                                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">{index + 1}</div>
                                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-left">
                                                        <div className="h-avatar is-small">
                                                            <img className="avatar myStaffAvatar" alt="user-icon" src={staff.image === 'none' ? Avatar : `http://localhost:4000/${staff.image}`} style={{ width: "35px" }} />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 text-left" style={{ fontWeight: "500" }}>{staff.firstName} {staff.lastName}</div>
                                                    <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1">{staff.typeOfWorker}</div>
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
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="text-secondary mx-4" width="20" fill="none" viewBox="0 0 24 24" stroke="#E87129">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                                </svg>
                                                            </Link>
                                                        </OverlayTrigger>
                                                        <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>} >
                                                            <Link className="badge" to="#">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="none" viewBox="0 0 24 24" stroke="#EE1D00" onClick={() => deleteStaff(index, staff._id)}>
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
                                <Link to="/staff-add" className='btn myButtonStaff qushishStaff' type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Qo'shish
                                </Link>
                            </div> */}
                        </div>









                        {/* Eski version */}


                        {/* <Row>
                            <Col lg="12">
                                <Card className="card-block card-stretch">
                                    <Card.Body className="p-0">
                                        <div className="table-responsive">
                                            <table className="table data-table mb-0">
                                                <thead className="table-color-heading">
                                                    <tr className="">
                                                        <th scope="col" className="pr-0 w-01">
                                                            <div className="d-flex justify-content-start align-items-end mb-1 ">
                                                                <div className="custom-control custom-checkbox custom-control-inline">
                                                                    <input type="checkbox" className="custom-control-input m-0" id="customCheck1" />
                                                                    <label className="custom-control-label" htmlFor="customCheck1"></label>
                                                                </div>
                                                            </div>
                                                        </th>
                                                        <th scope="col">Ismi va Familiyasi</th>
                                                        <th scope="col"><FilterStaff filterValueSelected={onFilterValueSelected}></FilterStaff></th>
                                                        <th scope="col"><FilterStaffSmena filterValueSelectedSmena={onFilterValueSelectedSmena}></FilterStaffSmena> </th>
                                                        <th scope="col"> Tug'ilgan sanasi </th>
                                                        <th scope="col"> Shahsiy telefon raqami</th>
                                                        <th scope="col" className="text-right"> Amallar</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        doneFilter.map((item) => (
                                                            <tr key={item.id} className="white-space-no-wrap">
                                                                <td className="pr-0 ">
                                                                    <div className="custom-control custom-checkbox custom-control-inline">
                                                                        <input type="checkbox" className="custom-control-input m-0" id="customCheck" />
                                                                        <label className="custom-control-label" htmlFor="customCheck"></label>
                                                                    </div>
                                                                </td>
                                                                <td className="">
                                                                    <div className="active-project-1 d-flex align-items-center mt-0 ">
                                                                        <div className="h-avatar is-medium">
                                                                            <img className="avatar rounded-circle" alt="user-icon" src={item.img} />
                                                                        </div>
                                                                        <div className="data-content">
                                                                            <div>
                                                                                <span className="font-weight-bold">{item.firstName + " " + item.surName}</span>
                                                                            </div>
                                                                            <p className="m-0 text-secondary small">
                                                                                {item.status}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>{item.group}</td>
                                                                <td>{item.smena}</td>
                                                                <td>
                                                                    {item.birthday}
                                                                </td>
                                                                <td>
                                                                    {item.phone}
                                                                </td>
                                                                <td>
                                                                    <div className="d-flex justify-content-end align-items-center">
                                                                        <OverlayTrigger placement="top" overlay={<Tooltip>View</Tooltip>} >
                                                                            <Link className="" to="/staff-view">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" className="text-secondary" width="20" fill="none" viewBox="0 0 24 24" stroke="#0A7AFF">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                                                </svg>
                                                                            </Link>
                                                                        </OverlayTrigger>
                                                                        <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>} >
                                                                            <Link className="" to="/staff-edit">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" className="text-secondary mx-4" width="20" fill="none" viewBox="0 0 24 24" stroke="#E87129">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                                                </svg>
                                                                            </Link>
                                                                        </OverlayTrigger>
                                                                        <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>} >
                                                                            <Link className="badge" to="#">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="none" viewBox="0 0 24 24" stroke="#EE1D00">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                                </svg>
                                                                            </Link>
                                                                        </OverlayTrigger>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))

                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row> */}


                    </Col>
                </Row>
                <div className='container text-center mt-5'>
                    {doneFilter && doneFilter.length ? '' : "Xozirda ma'lumotlar kiritilmagan"}
                </div>
            </Container>

        </>

    )
}
export default Staff;