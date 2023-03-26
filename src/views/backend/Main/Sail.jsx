import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import Card from '../../../components/Card'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { SALE_URL } from '../../../API';
import { useHistory } from "react-router";
import './Sail.css'


// Delete Icon
import deleteIcon from '../../../assets/images/delete.png'

// Loading
import { FallingLines } from 'react-loader-spinner';



const Sail = () => {

    const [postsSail, setpostsSail] = useState([]);

    const history = useHistory()



    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(SALE_URL)
            .then(res => {
                setpostsSail(res.data);
                console.log(res.data);
                setLoading(false)
            })
            .catch(err => console.log(err))
    }, [])



    // Delete
    const [modal, setModal] = useState('modal')
    const [id, setId] = useState(0);
    function deleteFunction(id) {
        setId(id)
        setModal('')
    }

    function deleteSail() {
        axios.delete(SALE_URL, { data: { id } })
            .then(res => {
                setModal('modal')
                console.log("Data is deleted!!!", res)
                setpostsSail(postsSail.filter(p => p._id !== id))
            })
            .catch(err => console.log(err))
        // console.log("kirish = " + id);
    }


    return (
        <>{/* delete button */}
            {
                modal.length < 1 ?
                    <div className="modalBg">
                        <div className="myModal">
                            <h4 className='mb-3'>O'chirasizmi?</h4>
                            <img src={deleteIcon} alt="" />
                            <button className='btn btn-danger' onClick={() => deleteSail()}>Ha</button>
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
                        <Row>
                            <Col lg="12" className='mt-5'>
                                <div className="d-flex flex-wrap align-items-center justify-content-between my-schedule mb-4 sailSt">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h4 className="font-weight-bold">Sotuv</h4>
                                    </div>
                                    <div className="create-workform">
                                        <div className="d-flex flex-wrap align-items-center justify-content-between">
                                            <div className="modal-product-search d-flex">
                                                <Form className="mr-3 position-relative">
                                                    <Form.Group className="mb-0">
                                                        <Form.Control type="text" className="form-control" id="exampleInputText" placeholder="Qidiruv..." />
                                                        <Link to="#" className="search-link">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                            </svg>
                                                        </Link>
                                                    </Form.Group>
                                                </Form>
                                                <Link to="/sale-add" className="btn myButtonSail qushishSail position-relative d-flex align-items-center justify-content-between">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                    </svg>Qo'shish
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="container-fluid mt-5 myContainerStyleSail">
                                    <div className="d-grid gapStyleSail">
                                        <div className="p-2">
                                            <div className="container">
                                                <div className="row align-items-center myHeaderSailStyle">
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-left">№</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">Rasmi</div>
                                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 text-center">Non Nomi</div>
                                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">Soni</div>
                                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 text-center">Amal</div>
                                                </div>
                                            </div>
                                        </div>

                                        {
                                            postsSail.map((sail, index) => (
                                                <div key={index} className="p-2 border myStyleSail ownStyleSail">
                                                    <div className="container">
                                                        <div className="row align-items-center">
                                                            <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-left">{index + 1}</div>
                                                            <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2" style={{ fontWeight: "500" }}> <img src={sail.productImage} alt="" />  </div>
                                                            <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 text-center">{sail.breadName}</div>
                                                            <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">{sail.quantity}</div>
                                                            <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 text-right sailSvgStyle">
                                                                {/* <OverlayTrigger placement="top" overlay={<Tooltip>View</Tooltip>} >                                                           
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="text-secondary" width="20" fill="none" viewBox="0 0 24 24" stroke="#0A7AFF" onClick={() => history.push(`/sail/${sail.id}`)}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>                                                            
                                                        </OverlayTrigger>
                                                        <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>} >
                                                            <Link className="" to="#">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="text-secondary mx-4" width="20" fill="none" viewBox="0 0 24 24" stroke="#E87129">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                                </svg>
                                                            </Link>
                                                        </OverlayTrigger> */}
                                                                <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>} >
                                                                    <Link className="badge" to="#">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="none" viewBox="0 0 24 24" stroke="#EE1D00" onClick={() => deleteFunction(sail._id)}>
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

                            </Col>
                        </Row>
                        <div className='container text-center mt-5'>
                            {postsSail && postsSail.length ? '' : "Xozirda ma'lumotlar kiritilmagan"}
                        </div>
                    </Container>
            }
        </>

    )
}
export default Sail;