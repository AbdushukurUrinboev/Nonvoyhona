import  React, {useState, useEffect} from 'react'
import {Container,Row,Col,Form,Button,OverlayTrigger,Tooltip} from 'react-bootstrap'
import  Card from '../../../components/Card'
import {Link} from 'react-router-dom'
import axios from 'axios';
import { PRODUCTS_URL } from '../../../API';



const Calculate =()=>{

    const[postProducts, setPostProducts] = useState([])


    useEffect(() => {
        axios.get(PRODUCTS_URL)
        .then(res => {
            setPostProducts(res.data)
            // console.log(res.data);
        })
        .catch(err => console.log(err))
    }, [])

    return(
        <>
        <Container fluid>
        <Row>
            
            <Col lg="12" className='mt-5'>
                <div className="d-flex flex-wrap align-items-center justify-content-between my-schedule mb-4">
                   <div className="d-flex align-items-center justify-content-between">
                        <h4 className="font-weight-bold">Kalkulyatsiyalar oynasi</h4>
                    </div>  
                    <div className="create-workform">
                        <div className="d-flex flex-wrap align-items-center justify-content-between">
                            <div className="modal-product-search d-flex">
                                <Form className="mr-3 position-relative">
                                    <div className="form-group mb-0">
                                    <Form.Control type="text" className="form-control" id="exampleInputText"  placeholder="Kalkulyatsiya qidirish..."/>
                                    <Link className="search-link" to="#">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </Link>
                                    </div>
                                </Form>
                                <Link to="/calculate-add" className="btn btn-primary position-relative d-flex align-items-center justify-content-between">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Kalkulyatsiya qo'shish
                                </Link>
                            </div>                            
                        </div>
                    </div>                    
                </div>
                
                <Row>
                    <Col lg="12">
                        <Card className="card-block card-stretch">
                            <Card.Body className="p-0">
                                <div className="d-flex justify-content-between align-items-center p-3">
                                    <h5 className="font-weight-bold">Kalkulyatsiya ro'yhati</h5>
                                    <Button variant="btn btn-secondary btn-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-1" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        Export
                                    </Button>
                                </div>
                                <div className="table-responsive">
                                    <table className="table data-table mb-0">
                                        <thead className="table-color-heading">
                                            <tr className="text-light">
                                                <th scope="col">
                                                    <label className="text-muted m-0" >Maxsulot nomi</label>
                                                    {/* <input type="text" className="form-control mt-2" id="text1" aria-describedby="textHelp" placeholder="Search Product">  */}
                                                </th>
                                                
                                                <th scope="col">
                                                    <label className="text-muted mb-0" >Kategoriyasi</label>
                                                    {/* <select className="custom-select custom-select-sm mt-2 choicesjs" id="validationServer01">
                                                        <option selected>Select Category</option>
                                                        <option value="1">Tablet</option>
                                                        <option value="2">Speaker</option>
                                                        <option value="3">Pendrive</option>
                                                        <option value="4">Mobile</option>
                                                        <option value="5">Laptop</option>
                                                        <option value="6">Headset</option>
                                                    </select>  */}
                                                </th> 
                                               
                                                <th scope="col" className="text-right">
                                                    <label className="text-muted mb-0" >Narxi</label>
                                                     {/* <input type="text" className="form-control mt-2" id="text2" aria-describedby="textHelp" placeholder="Price">  */}
                                                </th>
                                                <th scope="col">
                                                    <label className="text-muted mb-0" >Miqdori</label>
                                                     {/* <input type="text" className="form-control mt-2" id="text3" aria-describedby="textHelp" placeholder="Quantity"> */}
                                                </th>
                                                <th scope="col">
                                                    <label className="text-muted mb-0"> Skladda mavjudligi</label>
                                                     {/* <select className="custom-select custom-select-sm mt-2" id="validationServer02">
                                                        <option selected>Select Inventory</option>
                                                        <option value="1">In Stock</option>
                                                        <option value="2">Limited</option>
                                                        <option value="3">Out Of Stock</option>
                                                    </select>  */}
                                                </th>
                                                <th scope="col" className="text-right">
                                                    <span className="text-muted" >Amallar</span>
                                                    {/* <p className="text-muted"></p>  */}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                             {
                                                postProducts.map( (product) => (
                                            <tr key={product.id} className="white-space-no-wrap">
                                                <td className="">
                                                    <div className="active-project-1 d-flex align-items-center mt-0 ">
                                                        {/* <div className="h-avatar is-medium">
                                                            <img className="avatar rounded" alt="user-icon" src={product.productImage}/>
                                                        </div> */}
                                                        <div className="data-content">
                                                            <div>
                                                            <span className="font-weight-bold">{product.productName}</span>                           
                                                            </div>
                                                            <p className="m-0 mt-1">
                                                            {product.productDes}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{product.productCategory}</td>
                                                <td className="text-right">
                                                    ${product.productPrice}
                                                </td>
                                                <td>
                                                  {product.poductQuantity} 
                                                </td>
                                                <td>
                                                    <p className={`mb-0 font-weight-bold d-flex justify-content-start align-items-center`} style={{color: product.inventory > 10 ? '#3cb72c' : product.inventory <= 0 ? "#f42a47" : '#da7e0b'}}>
                                                        <small><svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24" fill="none">                                                
                                                        <circle cx="12" cy="12" r="8" fill="#3cb72c"></circle></svg>
                                                      </small>{product.inventory > 10 ? "Mavjud" : product.inventory <= 0 ? "Tugadi" : 'Oz qoldi'}
                                                    </p>
                                                </td>
                                                <td>
                                                    <div className="d-flex justify-content-end align-items-center">
                                                        <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>} >
                                                            <Link className="" to="#">
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
                </Row>
            </Col>
        </Row>
    </Container>
        </>
    )
}

export default Calculate;
