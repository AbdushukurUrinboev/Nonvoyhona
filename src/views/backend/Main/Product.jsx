import React, { useState, useEffect } from 'react'
import { Card, Container, Form, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { STORAGE_URL } from '../../../API';
import { useHistory } from "react-router";
import "./Product.css"
import { base_URL } from '../../../API';

//img icons
import LogoProducts from '../../../assets/images/products/products.png'


// Delete Icon
import deleteIcon from '../../../assets/images/delete.png'

// Loading
import { FallingLines } from 'react-loader-spinner';

// Pagination
import ReactPaginate from 'react-paginate';

// WithAuthGuard
import { withAllRouterGuard } from "../App/guards/with-auth-guard";

const Product = withAllRouterGuard(() => {
    const [postProducts, setPostProducts] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [filterVal, setFilterVal] = useState('');

    const history = useHistory()

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(STORAGE_URL)
            .then(res => {
                setPostProducts(res.data)
                setSearchData(res.data)
                setLoading(false)
            })
            .catch(err => console.log(err))
    }, [])


    const [modal, setModal] = useState('modal')
    const [id, setId] = useState(0);
    function deleteFunction(id) {
        setId(id)
        setModal('')
    }

    function deleteProduct() {
        axios.delete(STORAGE_URL, { data: { id } })
            .then(res => {
                setModal('modal')
                console.log("Data is deleted!!!", res)
                setPostProducts(postProducts.filter(p => p._id !== id))
            })
            .catch(err => console.log(err))
        // console.log("kirish = " + id);
    }


    function handleFilter(e) {
        if (e.target.value == '') {
            setPostProducts(searchData)
        } else {
            const filterResult = searchData.filter(item => item.productName.toLowerCase().includes(e.target.value.toLowerCase()) || item.description.toLowerCase().includes(e.target.value.toLowerCase()))
            setPostProducts(filterResult)
        }
        setFilterVal(e.target.value)
    }

    // Pagination 
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 10;
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = postProducts.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(postProducts.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % postProducts.length;
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
                            <button className='btn btn-danger' onClick={() => deleteProduct()}>Ha</button>
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

                        <div className="d-flex flex-wrap align-items-center justify-content-between my-schedule mb-4 prodSt ">
                            <div className="d-flex align-items-center justify-content-between">
                                <h4 className="font-weight-bold ">Maxsulotlar</h4>
                            </div>
                            <div className="create-workform ">
                                <div className="d-flex flex-wrap align-items-center justify-content-between">
                                    <div className="modal-product-search d-flex flex-wrap">
                                        <Form className="mr-3 position-relative">
                                            <div className="form-group mb-0">
                                                <Form.Control
                                                    type="text"
                                                    className="form-control"
                                                    id="exampleInputText"
                                                    placeholder="Qidirish..."
                                                    style={{ borderRadius: "10px" }}
                                                    value={filterVal}
                                                    onInput={e => handleFilter(e)}
                                                />
                                                <Link className="search-link" to="#">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </Form>
                                        <Link to="/storage-add"
                                            className="btn myButtonCustomer qushishCustomer position-relative d-flex align-items-center justify-content-between">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>Qo'shish
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Card>
                            <div className="container-fluid mt-5 myContainerStyleProduct">
                                <div className="d-grid gapStyleProduct mb-5">
                                    <div className="p-2 hide-on-mobile">
                                        <div className="container">
                                            <div className="row align-items-center myHeaderProductStyle">
                                                <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">№</div>
                                                <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1"></div>
                                                <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">Mahsulot nomi</div>
                                                <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">Kategoriyasi</div>
                                                <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">Narhi</div>
                                                <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">Miqdori</div>
                                                <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">Skladda</div>
                                                <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">Amal</div>
                                            </div>
                                        </div>
                                    </div>

                                    {
                                        currentItems && currentItems.map((product, index) => (
                                            <div key={index} className="p-2 border myStyleProduct ownStylePro">
                                                <div className="container">
                                                    <div className="row align-items-center">
                                                        <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">{index + 1}</div>
                                                        <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1"><img className="avatar myProductAvatar" src={product.storageImage === 'none' ? LogoProducts : `${base_URL}/${product.storageImage}`} alt="Rasm" style={{ width: "35px" }} /></div>
                                                        <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2" style={{ fontWeight: "500" }}>{product.productName}</div>
                                                        <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">{product.description}</div>
                                                        <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-sm-center">{product.productPrice} - so'm</div>
                                                        <div className="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">{Math.round(product.poductQuantity)}</div>
                                                        <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2" style={{ color: product.poductQuantity > 10 ? '#149100' : product.poductQuantity <= 0 ? "#EC0000" : '#EFAC00', fontWeight: '500' }}>
                                                            <small><svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24" fill="none">
                                                                <circle cx="12" cy="12" r="8" style={{ fill: product.poductQuantity > 10 ? '#149100' : product.poductQuantity <= 0 ? "#EC0000" : '#EFAC00' }}></circle></svg>
                                                            </small>{product.poductQuantity > 10 ? "Mavjud" : product.poductQuantity <= 0 ? "Tugadi" : 'Oz qoldi'}
                                                        </div>
                                                        <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 productSvgStyle">
                                                            <OverlayTrigger placement="top" overlay={<Tooltip>View</Tooltip>} >
                                                                {/* <Link className=""> */}
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="text-secondary" width="20" fill="none" viewBox="0 0 24 24" stroke="#0A7AFF" onClick={() => history.push(`/storage/${product._id}`)}>
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                                </svg>
                                                                {/* </Link> */}
                                                            </OverlayTrigger>
                                                            <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>} >
                                                                <Link className="" to="#">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="text-secondary mx-4" width="20" fill="none" viewBox="0 0 24 24" stroke="#E87129" onClick={() => history.push({ pathname: `/storage-edit/${product._id}` })}>
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                                    </svg>
                                                                </Link>
                                                            </OverlayTrigger>
                                                            <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>} >
                                                                <Link className="badge" to="#">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="none" viewBox="0 0 24 24" stroke="#EE1D00" onClick={() => deleteFunction(product._id)}>
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
                            {postProducts && postProducts.length ? '' : "Xozirda ma'lumotlar kiritilmagan"}
                        </div>
                    </Container>
            }
        </>
    )
})

export default Product;
