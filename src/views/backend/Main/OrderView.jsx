import React, { useEffect, useState, useContext } from 'react'
import { Container, Row, Col, Button, ListGroup, Tab, Nav } from 'react-bootstrap'
import Card from '../../../components/Card'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import './CustomerView.css'
import { xamkorDataContext } from './ContextProvider/DataProvider';
import axios from 'axios';

//img
import BreadImage from '../../../assets/images/bread/logoBread.png'


const OrderView = () => {
    const [order, setOrder] = useState({});

    const { id } = useParams();
    const xamkorList = useContext(xamkorDataContext);


    useEffect(() => {
        axios.get(`http://localhost:4000/order/${id}`)
            .then(res => {
                setOrder(res.data)
                // console.log(res.data);
            })
            .catch(err => console.log(err))
    }, [id])

    return (
        <>
            <Container fluid>
                <Row>
                    <Col lg="12" className='mt-1'>
                        <div className="d-flex flex-wrap align-items-center justify-content-between">
                            <div className="d-flex align-items-center justify-content-between">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb p-0 mb-0">
                                        <li className="breadcrumb-item"><Link to="/order">Zakazlar</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">Maxsulotni ko'rish</li>
                                    </ol>
                                </nav>
                            </div>

                        </div>
                    </Col>
                    <Col lg="12" className="mb-3 d-flex justify-content-between">
                        <h4 className="font-weight-bold d-flex align-items-center customerViewHeadStyle">Zakazni ko'rish</h4>
                    </Col>
                    <Col lg="12" className="mb-3 d-flex justify-content-between">
                        <Link to="/order" className="btn btn-primary btn-sm d-flex align-items-center justify-content-between ml-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                            <span className="ml-2">Orqaga</span>
                        </Link>
                    </Col>
                </Row>

                <Row>
                    <Col lg="4">
                        <Card>
                            <ListGroup as="ul" className="list-group-flush">
                                <ListGroup.Item as="li">
                                    <div>
                                        <ListGroup as="ul" className="list-style-1 mb-0">
                                            <ListGroup.Item as="li" className="d-flex justify-content-start align-items-center">                                               
                                                <div className="list-style-detail ml-4 mr-2">
                                                    <table className="table table-borderless mb-0 customerViewStP">
                                                        <tbody>
                                                            <tr>
                                                                <td className="p-0">
                                                                    <p className="mb-0 text-muted">Non nomi: </p>
                                                                </td>
                                                                <td>
                                                                    <p className="mb-0 font-weight-bold">{order.order}</p>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>                                                   
                                                </div>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item as="li">
                                    <table className="table table-borderless mb-0 customerViewStP">
                                        <tbody>
                                            <tr>
                                                <td className="p-0">
                                                    <p className="mb-0 text-muted">Mijoz: </p>
                                                </td>
                                                <td>
                                                    <p className="mb-0 ">{order.customer}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-0">
                                                    <p className="mb-0 text-muted">Mijoz telefon raqami: </p>
                                                </td>
                                                <td>
                                                    <p className="mb-0 ">{order.phone}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-0">
                                                    <p className="mb-0 text-muted">Zakaz qilgan non soni: </p>
                                                </td>
                                                <td>
                                                    <p className="mb-0 ">{order.productQuantity}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-0">
                                                    <p className="mb-0 text-muted">Bitta non narhi:</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0 ">{order.price}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-0">
                                                    <p className="mb-0 text-muted">Jami non narhi:</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0 ">{order.price * order.productQuantity}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-0">
                                                    <p className="mb-0 text-muted">Berilgan avans:</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0 ">{order.avans}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-0">
                                                    <p className="mb-0 text-muted">Qolgan pul:</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0 ">{(order.price * order.productQuantity) - order.avans}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-0">
                                                    <p className="mb-0 text-muted">Olingan sana: </p>
                                                </td>
                                                <td>
                                                    <p className="mb-0 ">{order.date}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-0">
                                                    <p className="mb-0 text-muted">Olingan soat:</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0 ">{order.time}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-0">
                                                    <p className="mb-0 text-muted">Nonning tayyor bo'lish sanasi:</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0 ">{order.deadline}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-0">
                                                    <p className="mb-0 text-muted">Nonning tayyor bo'lish soati:</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0 ">{order.deadlineTime}</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </ListGroup.Item>

                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default OrderView;