import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { SALE_URL } from '../../../API';
import { useHistory } from "react-router";
import './Sail.css'
import { base_URL } from '../../../API';
import Card from 'react-bootstrap/Card'
import Datepickers from '../../../components/Datepicker';
import SaleAddModal from './SaleAddModal';

//img
import LogoBread from '../../../assets/images/logoBread.png'


// Delete Icon
import deleteIcon from '../../../assets/images/delete.png'

// Loading
import { FallingLines } from 'react-loader-spinner';

// WithAuthGuard
import { withAllRouterGuard } from "../App/guards/with-auth-guard";


const SaleCard = withAllRouterGuard(() => {
    const [postsSail, setpostsSail] = useState([]);
    const [filterVal, setFilterVal] = useState('');
    const [searchData, setSearchData] = useState([]);

    const history = useHistory()
    const [loading, setLoading] = useState(true)
    const [modalShowSale, setModalShowSale] = useState(false);

    useEffect(() => {
        axios.get(SALE_URL)
            .then(res => {
                const sortedData = res.data.reverse();
                setpostsSail(sortedData);
                setSearchData(sortedData)
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

    // Search Data
    function handleFilter(e) {
        if (e.target.value == '') {
            setpostsSail(searchData)
        } else {
            const filterResult = searchData.filter(item => item.breadName.toLowerCase().includes(e.target.value.toLowerCase()))
            setpostsSail(filterResult)
        }
        setFilterVal(e.target.value)
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

                        <Form className="mt-5">
                            <Form.Group className="mb-5">
                                <Form.Control type="text" className="form-control"
                                    id="exampleInputText"
                                    placeholder="Qidirish..."
                                    style={{ borderRadius: "10px" }}
                                    value={filterVal}
                                    onInput={e => handleFilter(e)}
                                />
                            </Form.Group>
                        </Form>

                        <Row
                            xs={1}
                            sm={2}
                            md={3}
                            lg={4}
                            className="justify-content-center disableCopiedSale"
                            onClick={() => setModalShowSale(true)}
                        >
                            {
                                postsSail.map((sale, index) => (
                                    <Col key={index} className="mb-3 d-flex justify-content-between">
                                        <Card
                                            border="primary"
                                            style={{
                                                width: '18rem',
                                                border: "1px solid"
                                            }}>
                                            <Card.Header style={{ backgroundColor: "#dfe7ff", borderBottom: "1px solid", display: "flex", justifyContent: "space-between" }}><img className="avatar myCalculateAvatar" src={sale.imageUrl === 'none' ? LogoBread : `${base_URL}/${sale.imageUrl}`} alt="Rasm" style={{ width: "35px" }} /> </Card.Header>

                                            <Card.Body>
                                                <Card.Title style={{ fontSize: '50px' }} className='align-items-center text-center'>
                                                    {sale.breadName}
                                                </Card.Title>

                                            </Card.Body>
                                            <Card.Footer className="text-muted">
                                                <p style={{ textAlign: "center", color: "grey" }}>-----------------------------------------</p>
                                                <Card.Subtitle className="mb-2 text-muted text-center" style={{ fontSize: '30px' }}>{sale.quantity} ta</Card.Subtitle>

                                                {/* {sale.quantity} ta */}
                                            </Card.Footer>
                                        </Card>

                                    </Col>

                                ))
                            }

                        </Row>
                        <SaleAddModal
                            show={modalShowSale}
                            onHide={() => setModalShowSale(false)}
                        />
                        <div className='container text-center mt-5'>
                            {postsSail && postsSail.length ? '' : "Xozirda ma'lumotlar kiritilmagan"}
                        </div>
                    </Container>
            }
        </>
    )
})
export default SaleCard;
