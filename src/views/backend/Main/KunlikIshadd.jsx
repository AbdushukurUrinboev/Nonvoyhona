import  React, {useState} from 'react'
import {Container,Row,Col,Form,Button} from 'react-bootstrap'
import  Card from '../../../components/Card'
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios';
import { DAILY_TASKS_URL } from '../../../API';

// WithAuthGuard
import { withAllRouterGuard } from "../App/guards/with-auth-guard";

const Calculateadd =withAllRouterGuard(()=>{

    const [productName, setproductName] = useState(''); 
    const [productDes, setProductDes] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productQuantity, setProductQuantity] = useState(0);
    const [inventory, setInventory] = useState();
    const [productCode, setProductCode] = useState(0);
    const [manufacturer, setManufacturer] = useState('');
    const [productTag, setProductTag] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productImage, setProductImage] = useState('');

    const history = useHistory()

        


    function handleAdd (e) {
        e.preventDefault();
        axios.post(DAILY_TASKS_URL, {
            productName,
            productDes,
            productCategory,
            productPrice,
            productQuantity,
            inventory: productQuantity,
            productCode,
            manufacturer,
            productTag,
            productDescription,
            productImage
        })
        .then(res => {
            console.log("Data is saved", res);
            history.push('/kunlik-ish')

        })
        .catch(err => console.log(err))
    }



    return(
        <>
        <Container fluid>
        <Row>
            <Col lg="12" className='mt-5'>
                <div className="d-flex flex-wrap align-items-center justify-content-between">
                   <div className="d-flex align-items-center justify-content-between">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb p-0 mb-0">
                                <li className="breadcrumb-item"><Link to="/kunlik-ish">Kunlik ish</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Add Kunlik ish</li>
                            </ol>
                        </nav>
                    </div>
                    <Link to="/kunlik-ish" className="btn btn-primary btn-sm d-flex align-items-center justify-content-between ml-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        <span className="ml-2">Orqaga</span>
                    </Link>
                </div>
            </Col>
            <Col lg="12" className="mb-3 d-flex justify-content-between">
                <h4 className="font-weight-bold d-flex align-items-center">Kunlik Ish qo'shish</h4>
            </Col>
            <Col lg="12">
                <Card>
                    <Card.Body>
                        <h5 className="font-weight-bold mb-3">Kalkulyatsiya haqida ma'lumot</h5>
                        <Form className="row g-3">
                            <div className="col-md-6 mb-3">
                                <Form.Label htmlFor="Text1" className="form-label font-weight-bold text-muted text-uppercase">Nomi</Form.Label>
                                <Form.Control type="text" className="form-control" id="Text1" placeholder="Maxsulot nomini kiriting..." onChange={e => setproductName(e.target.value)}/>
                            </div>
                            <div className="col-md-6 mb-3">
                                <Form.Label htmlFor="inputState" className="form-label font-weight-bold text-muted text-uppercase">Kategoriyasi</Form.Label>
                                <select id="inputState" className="form-select form-control choicesjs" onChange={e => setProductCategory(e.target.value)}> 
                                    <option value="selected">Kategoriyani tanlang</option>
                                    <option value="Electronics">Electronics</option>
                                    <option value="Applications">Applications</option>
                                    <option value="Gadgets">Gadgets</option>
                                </select>
                            </div>
                            <div className="col-md-6 mb-3">
                                <Form.Label htmlFor="Text2" className="form-label font-weight-bold text-muted text-uppercase">Kod</Form.Label>
                                <Form.Control type="number" className="form-control" id="Text2" placeholder="Maxsulot kodini kiriting..." onChange={e => setProductCode( parseInt(e.target.value))}/>
                            </div>
                            <div className="col-md-6 mb-3">
                                <Form.Label htmlFor="Text3" className="form-label font-weight-bold text-muted text-uppercase">Qo'shimcha nomi</Form.Label>
                                <Form.Control type="text" className="form-control" id="Text3" placeholder="Maxsulot qo'shimcha nomini kiriting..." onChange={e => setProductDes(e.target.value)} />
                            </div>
                            <div className="col-md-6 mb-3">
                                <Form.Label htmlFor="Text3" className="form-label font-weight-bold text-muted text-uppercase">Ishlab chiqaruvchi</Form.Label>
                                <Form.Control type="text" className="form-control" id="Text3" placeholder="Ishlab chiqaruvchini kiriting..." onChange={e => setManufacturer(e.target.value)} />
                            </div>
                            <div className="col-md-6 mb-3">
                                <Form.Label htmlFor="Text5" className="form-label font-weight-bold text-muted text-uppercase">Miqdori</Form.Label>
                                <Form.Control type="number" className="form-control" id="Text5" placeholder="Miqdorini kiriting..." onChange={e => setProductQuantity(parseInt(e.target.value))} />
                            </div>
                            <div className="col-md-6 mb-3">
                                <Form.Label htmlFor="Text6" className="form-label font-weight-bold text-muted text-uppercase">Narxi</Form.Label>
                                <Form.Control type="number" className="form-control" id="Text6" placeholder="Narxini kiriting..." onChange={ e => setProductPrice(parseInt(e.target.value))} />
                            </div>
                            <div className="col-md-6 mb-3">
                                <Form.Label htmlFor="inputState" className="form-label font-weight-bold text-muted text-uppercase">Skladda mavjudligi</Form.Label>
                                <select id="inputState" className="form-select form-control choicesjs" disabled> 
                                    <option value="In Stock">Mavjud</option>
                                    <option value="Limited">Oz qoldi</option>
                                    <option value="Out of Stock">Tugadi</option>
                                </select>
                            </div>
                            <div className="col-md-12 mb-3">
                                <Form.Label htmlFor="Text8" className="form-label font-weight-bold text-muted text-uppercase">Sifatini tanlang</Form.Label>
                                <select defaultValue="1" id="Text8" className="multipleSelect2  form-control choicesjs" multiple={false} onChange={e => setProductTag(e.target.value)}>
                                    <option value="1">Juda yahshi</option>
                                    <option value="2">Yahshi</option>
                                    <option value="4">Yomon</option>
                                </select>
                            </div>
                            <div className="col-md-12 mb-3">
                                <Form.Label htmlFor="Text9" className="form-label font-weight-bold text-muted text-uppercase">Qo'shimcha ma'lumot</Form.Label>
                                <Form.Control as="textarea" id="Text9" rows="2" placeholder="Qo'shimcha ma'lumotni kiriting..." onChange={e => setProductDescription(e.target.value)} />
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <h5 className="font-weight-bold mb-3">Maxsulot rasmi</h5>
                        <Card.Body className="bg-secondary rounded">
                            <div className="d-flex justify-content-center mt-5">                                                                                                                                  
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1"  height="120px" x="0px" y="0px" viewBox="0 0 419.2 419.2" style={{enableBackground:"new 0 0 419.2 419.2"}}  stroke="currentColor">
                                    <g>
                                        <g>
                                            <g>
                                                <circle cx="158" cy="144.4" r="28.8"/>
                                                <path d="M394.4,250.4c-13.6-12.8-30.8-21.2-49.6-23.6V80.4c0-15.6-6.4-29.6-16.4-40C318,30,304,24,288.4,24h-232     c-15.6,0-29.6,6.4-40,16.4C6,50.8,0,64.8,0,80.4v184.4V282v37.2c0,15.6,6.4,29.6,16.4,40c10.4,10.4,24.4,16.4,40,16.4h224.4     c14.8,12,33.2,19.6,53.6,19.6c23.6,0,44.8-9.6,60-24.8c15.2-15.2,24.8-36.4,24.8-60C419.2,286.8,409.6,265.6,394.4,250.4z      M21.2,80.4c0-9.6,4-18.4,10.4-24.4c6.4-6.4,15.2-10.4,24.8-10.4h232c9.6,0,18.4,4,24.8,10.4c6.4,6.4,10.4,15.2,10.4,24.8v124.8     l-59.2-59.2c-4-4-10.8-4.4-15.2,0L160,236l-60.4-60.8c-4-4-10.8-4.4-15.2,0l-63.2,64V80.4z M56,355.2v-0.8     c-9.6,0-18.4-4-24.8-10.4c-6-6.4-10-15.2-10-24.8V282v-12.4L92,198.4l60.4,60.4c4,4,10.8,4,15.2,0l89.2-89.6l58.4,58.8     c-1.2,0.4-2.4,0.8-3.6,1.2c-1.6,0.4-3.2,0.8-5.2,1.6c-1.6,0.4-3.2,1.2-4.8,1.6c-1.2,0.4-2,0.8-3.2,1.6c-1.6,0.8-2.8,1.2-4,2     c-2,1.2-4,2.4-6,3.6c-1.2,0.8-2,1.2-3.2,2c-0.8,0.4-1.2,0.8-2,1.2c-3.6,2.4-6.8,5.2-9.6,8.4c-15.2,15.2-24.8,36.4-24.8,60     c0,6,0.8,11.6,2,17.6c0.4,1.6,0.8,2.8,1.2,4.4c1.2,4,2.4,8,4,12v0.4c1.6,3.2,3.2,6.8,5.2,9.6H56z M378.8,355.2     c-11.6,11.6-27.2,18.4-44.8,18.4c-16.8,0-32.4-6.8-43.6-17.6c-1.6-1.6-3.2-3.6-4.8-5.2c-1.2-1.2-2.4-2.8-3.6-4     c-1.6-2-2.8-4.4-4-6.8c-0.8-1.6-1.6-2.8-2.4-4.4c-0.8-2-1.6-4.4-2-6.8c-0.4-1.6-1.2-3.6-1.6-5.2c-0.8-4-1.2-8.4-1.2-12.8     c0-17.6,7.2-33.2,18.4-44.8c11.2-11.6,27.2-18.4,44.8-18.4s33.2,7.2,44.8,18.4c11.6,11.6,18.4,27.2,18.4,44.8     C397.2,328,390,343.6,378.8,355.2z"/>
                                                <path d="M341.6,267.6c-0.8-0.8-2-1.6-3.6-2.4c-1.2-0.4-2.4-0.8-3.6-0.8c-0.4,0-0.4,0-0.4,0c-0.4,0-0.4,0-0.4,0     c-1.2,0-2.4,0.4-3.6,0.8c-1.2,0.4-2.4,1.2-3.6,2.4l-24.8,24.8c-4,4-4,10.8,0,15.2c4,4,10.8,4,15.2,0l6.4-6.4v44     c0,6,4.8,10.8,10.8,10.8s10.8-4.8,10.8-10.8v-44l6.4,6.4c4,4,10.8,4,15.2,0c4-4,4-10.8,0-15.2L341.6,267.6z"/>
                                            </g>
                                        </g>
                                    </g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
                                </svg>
                            </div>
                            <div className="d-flex justify-content-center mt-2 mb-5">
                                <p className="mb-0 text-muted font-weight-bold">Drop files here or click to upload</p>
                            </div>
                        </Card.Body>
                        <div className="d-flex justify-content-end mt-3">
                            <Button variant="btn btn-primary" onClick={handleAdd}>
                                Maxsulotni yaratish
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
        </>
    )
})
export default Calculateadd;