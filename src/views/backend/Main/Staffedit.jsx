import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import Card from '../../../components/Card'
import { Link, useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { STAFF_URL } from '../../../API';
//datepicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './StaffAdd.css'


import { base_URL } from '../../../API';



// WithAuthGuard
import { withAllRouterGuard } from "../App/guards/with-auth-guard";


const StaffEdit = withAllRouterGuard(() => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState(true);
    const [phoneCode, setPhoneCode] = useState();
    const [phone, setPhone] = useState('');
    const [phoneCode2, setPhoneCode2] = useState('');
    const [phone2, setPhone2] = useState('');
    const [typeOfWorker, setTypeOfWorker] = useState('');
    const [adress, setAdress] = useState('');
    const [group, setGroup] = useState();
    const [smena, setSmena] = useState();
    const [salary, setSalary] = useState(0);
    const [remainingDepts, setRemainingDepts] = useState(0);
    const [birthday, setBirthday] = useState('');
    const [responsibility, setResponsibility] = useState('');
    const [image, setImage] = useState('');


    const { id } = useParams();
    const history = useHistory()


    useEffect(() => {
        axios.get(`${base_URL}/staff/${id}`)
            .then(res => {
                setFirstName(res.data.firstName);
                setLastName(res.data.lastName);
                setGender(res.data.gender);
                setPhoneCode(res.data.phone.slice(0, 4));
                setPhone(res.data.phone.slice(7, res.data.phone.length));
                setPhoneCode2(res.data.phone2.slice(0, 4));
                setPhone2(res.data.phone2.slice(7, res.data.phone2.length));
                setTypeOfWorker(res.data.typeOfWorker);
                setAdress(res.data.adress);
                setGroup(res.data.group);
                setSmena(res.data.smena);
                setSalary(res.data.salary);
                setRemainingDepts(res.data.remainingDepts);
                setBirthday(res.data.birthday);
                setResponsibility(res.data.responsibility ? res.data.responsibility : "Yo'q");
                setImage(res.data.image);
            })
            .catch(err => console.log(err))
    }, [id])


    function handleChange(e) {

        e.preventDefault();
        const fd = new FormData()
        fd.append('firstName', firstName)
        fd.append('changingID', id)
        fd.append('lastName', lastName)
        fd.append('gender', gender)
        fd.append('phone', phoneCode + ' - ' + phone)
        fd.append('phone2', phoneCode2 + ' - ' + phone2)
        fd.append('typeOfWorker', typeOfWorker) //
        fd.append('adress', adress)
        fd.append('group', group)
        fd.append('smena', smena)
        fd.append('salary', salary)
        fd.append('remainingDepts', remainingDepts)
        fd.append('birthday', birthday)
        fd.append('responsibility', responsibility)
        fd.append('image', image)

        axios.put(STAFF_URL, fd)
            .then(res => {
                console.log("Data is updated", res)
                history.push('/staff')
            })
            .catch(err => console.log(err))

    }

// console.log(gender);

    return (
        <>
            <Container fluid>
                <Row>
                    <Col lg="12" className='mt-5'>
                        <div className="d-flex flex-wrap align-items-center justify-content-between">
                            <div className="d-flex align-items-center justify-content-between">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb p-0 mb-0">
                                        <li className="breadcrumb-item"><Link to="/staff">Xodimlar</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">Xodim ma'lumotlarini o'zgartirish</li>
                                    </ol>
                                </nav>
                            </div>
                            <Link to="/staff" className="btn btn-primary btn-sm d-flex align-items-center justify-content-between">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                </svg>
                                <span className="ml-2">Orqaga</span>
                            </Link>
                        </div>
                    </Col>
                    <Col lg="12" className="mb-3 d-flex justify-content-between">
                        <h4 className="font-weight-bold0 d-flex align-items-center">Xodim ma'lumotlarini o'zgartirish</h4>
                    </Col>
                    <Col lg="12">
                        <Card>
                            <Card.Body>
                                <Row>
                                    <Col md="3" className="mb-3 mt-5">
                                        <Card.Body className="staffAddStyleCardBody mx-auto">
                                            <input type="file" className='staffAddStyleInput' accept='image/png, image/jpg, image/jpeg' name='staffImage' onChange={e => setImage(e.target.files[0])} />
                                            <div className="d-flex justify-content-center align-items-center mt-5">
                                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="90px" x="0px" y="0px" viewBox="0 0 419.2 419.2" style={{ enableBackground: "new 0 0 419.2 419.2" }} stroke="currentColor">
                                                    <g>
                                                        <g>
                                                            <g>
                                                                <circle cx="158" cy="144.4" r="28.8" />
                                                                <path d="M394.4,250.4c-13.6-12.8-30.8-21.2-49.6-23.6V80.4c0-15.6-6.4-29.6-16.4-40C318,30,304,24,288.4,24h-232     c-15.6,0-29.6,6.4-40,16.4C6,50.8,0,64.8,0,80.4v184.4V282v37.2c0,15.6,6.4,29.6,16.4,40c10.4,10.4,24.4,16.4,40,16.4h224.4     c14.8,12,33.2,19.6,53.6,19.6c23.6,0,44.8-9.6,60-24.8c15.2-15.2,24.8-36.4,24.8-60C419.2,286.8,409.6,265.6,394.4,250.4z      M21.2,80.4c0-9.6,4-18.4,10.4-24.4c6.4-6.4,15.2-10.4,24.8-10.4h232c9.6,0,18.4,4,24.8,10.4c6.4,6.4,10.4,15.2,10.4,24.8v124.8     l-59.2-59.2c-4-4-10.8-4.4-15.2,0L160,236l-60.4-60.8c-4-4-10.8-4.4-15.2,0l-63.2,64V80.4z M56,355.2v-0.8     c-9.6,0-18.4-4-24.8-10.4c-6-6.4-10-15.2-10-24.8V282v-12.4L92,198.4l60.4,60.4c4,4,10.8,4,15.2,0l89.2-89.6l58.4,58.8     c-1.2,0.4-2.4,0.8-3.6,1.2c-1.6,0.4-3.2,0.8-5.2,1.6c-1.6,0.4-3.2,1.2-4.8,1.6c-1.2,0.4-2,0.8-3.2,1.6c-1.6,0.8-2.8,1.2-4,2     c-2,1.2-4,2.4-6,3.6c-1.2,0.8-2,1.2-3.2,2c-0.8,0.4-1.2,0.8-2,1.2c-3.6,2.4-6.8,5.2-9.6,8.4c-15.2,15.2-24.8,36.4-24.8,60     c0,6,0.8,11.6,2,17.6c0.4,1.6,0.8,2.8,1.2,4.4c1.2,4,2.4,8,4,12v0.4c1.6,3.2,3.2,6.8,5.2,9.6H56z M378.8,355.2     c-11.6,11.6-27.2,18.4-44.8,18.4c-16.8,0-32.4-6.8-43.6-17.6c-1.6-1.6-3.2-3.6-4.8-5.2c-1.2-1.2-2.4-2.8-3.6-4     c-1.6-2-2.8-4.4-4-6.8c-0.8-1.6-1.6-2.8-2.4-4.4c-0.8-2-1.6-4.4-2-6.8c-0.4-1.6-1.2-3.6-1.6-5.2c-0.8-4-1.2-8.4-1.2-12.8     c0-17.6,7.2-33.2,18.4-44.8c11.2-11.6,27.2-18.4,44.8-18.4s33.2,7.2,44.8,18.4c11.6,11.6,18.4,27.2,18.4,44.8     C397.2,328,390,343.6,378.8,355.2z" />
                                                                <path d="M341.6,267.6c-0.8-0.8-2-1.6-3.6-2.4c-1.2-0.4-2.4-0.8-3.6-0.8c-0.4,0-0.4,0-0.4,0c-0.4,0-0.4,0-0.4,0     c-1.2,0-2.4,0.4-3.6,0.8c-1.2,0.4-2.4,1.2-3.6,2.4l-24.8,24.8c-4,4-4,10.8,0,15.2c4,4,10.8,4,15.2,0l6.4-6.4v44     c0,6,4.8,10.8,10.8,10.8s10.8-4.8,10.8-10.8v-44l6.4,6.4c4,4,10.8,4,15.2,0c4-4,4-10.8,0-15.2L341.6,267.6z" />
                                                            </g>
                                                        </g>
                                                    </g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
                                                </svg>
                                            </div>
                                            <div className="d-flex justify-content-center mt-2 mb-5">
                                                <p className="mb-0 text-muted font-weight-bold">Rasm yuklash</p>
                                            </div>
                                        </Card.Body>
                                    </Col>
                                    <Col md="9">
                                        <Form className="row g-3 date-icon-set-modal">
                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="Text1" className="font-weight-bold text-muted text-uppercase">Ismi</Form.Label>
                                                <Form.Control type="text" id="Text1" placeholder="Ismini kiriting..." value={firstName} onChange={e => setFirstName((e.target.value).split(" ").join(""))} required='required' />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <Form.Label className="font-weight-bold text-muted text-uppercase" >Jinsi</Form.Label><br />
                                                <div className="form-check form-check-inline">
                                                    <div className="custom-control custom-radio custom-control-inline" >
                                                        <Form.Control type="radio" id="inlineRadio1" name="customRadio-1" className="custom-control-input" checked={gender === "Male"} value="Male" onChange={e => setGender(e.target.value)} />
                                                        <Form.Label className="custom-control-label" htmlFor="inlineRadio1"> Erkak </Form.Label>
                                                    </div>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <div className="custom-control custom-radio custom-control-inline">
                                                        <Form.Control type="radio" id="inlineRadio2" name="customRadio-2" className="custom-control-input" checked={gender === "Female"} value="Female" onChange={e => setGender(e.target.value)} />
                                                        <Form.Label className="custom-control-label" htmlFor="inlineRadio2"> Ayol </Form.Label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-3 position-relative">
                                                <Form.Label htmlFor="Text1" className="font-weight-bold text-muted text-uppercase">Familiya</Form.Label>
                                                <Form.Control type="text" id="Text1" placeholder="Familiyani kiriting..." value={lastName} onChange={e => setLastName((e.target.value).split(" ").join(""))} required='required' />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="Text3" className="font-weight-bold text-muted text-uppercase">Lavozimi</Form.Label>
                                                <Form.Control type="text" id="Text3" placeholder="Lavozimini kiriting..." required='required' value={typeOfWorker} onChange={e => setTypeOfWorker(e.target.value)} />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="Text3" className="font-weight-bold text-muted text-uppercase">Tug'ilgan sanasi</Form.Label>
                                                <Form.Control type="text" id="Text3" placeholder="Tug'ilgan sanasini..." required='required' value={birthday} onChange={e => setBirthday(e.target.value)} />
                                            </div>
                                            
                                            {/* <div className="col-md-6 mb-3 position-relative">
                                                <Form.Label htmlFor="Text2" className="font-weight-bold text-muted text-uppercase">Tug'ilgan sanasi</Form.Label>
                                                <DatePicker className="form-control" id="Text2" name="event_date" dateFormat="dd/MM/yyyy" autoComplete="off" value={birthday} selected={birthday} onChange={date => setBirthday(date)} />
                                                <span className="search-link">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </span>
                                            </div> */}
                                            
                                            
                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="Text5" className="font-weight-bold text-muted text-uppercase">Telefon raqami (shahsiy)</Form.Label>
                                                <div className='input-group'>
                                                    <select value={phoneCode} id="inputState" className="form-select form-control choicesjs" onChange={e => setPhoneCode(e.target.value)}>
                                                        <option value={phoneCode}>{phoneCode}</option>
                                                        <option value="(90) ">(90)</option>
                                                        <option value="(91) ">(91)</option>
                                                        <option value="(93) ">(93)</option>
                                                        <option value="(94) ">(94)</option>
                                                        <option value="(99) ">(99)</option>
                                                        <option value="(33) ">(33)</option>
                                                        <option value="(98) ">(98)</option>
                                                        <option value="(97) ">(97)</option>
                                                        <option value="(92) ">(92)</option>
                                                        <option value="(71) ">(71)</option>
                                                        <option value="(73) ">(73)</option>
                                                    </select>
                                                    <Form.Control type="text" id="Text5" placeholder="Telefon raqamini kiriting..." style={{ width: '70%', marginLeft: '8px' }} value={phone} onChange={e => setPhone(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="Text6" className="font-weight-bold text-muted text-uppercase">Yashash Manzili</Form.Label>
                                                <Form.Control type="text" id="Text6" placeholder="Yashash manzilini kiriting..." value={adress} onChange={e => setAdress(e.target.value)} />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="Text7" className="font-weight-bold text-muted text-uppercase">Telefon raqami (uy)</Form.Label>
                                                <div className='input-group'>
                                                    <select value={phoneCode2} id="inputState" className="form-select form-control choicesjs" onChange={e => setPhoneCode2(e.target.value)}>
                                                        <option value={phoneCode2}>{phoneCode2}</option>
                                                        <option value="(90) ">(90)</option>
                                                        <option value="(91) ">(91)</option>
                                                        <option value="(93) ">(93)</option>
                                                        <option value="(94) ">(94)</option>
                                                        <option value="(99) ">(99)</option>
                                                        <option value="(33) ">(33)</option>
                                                        <option value="(98) ">(98)</option>
                                                        <option value="(97) ">(97)</option>
                                                        <option value="(92) ">(92)</option>
                                                        <option value="(71) ">(71)</option>
                                                        <option value="(73) ">(73)</option>
                                                    </select>
                                                    <Form.Control type="text" id="Text5" placeholder="Telefon raqamini kiriting..." style={{ width: '70%', marginLeft: '8px' }} value={phone2} onChange={e => setPhone2(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="inputcountry" className="font-weight-bold text-muted text-uppercase">Guruhi</Form.Label>
                                                <select defaultValue="" id="inputcountry" className="form-select form-control choicesjs" value={group} onChange={e => setGroup(e.target.value)} >
                                                    <option value="" hidden disabled>Guruhni tanlang...</option>
                                                    <option value="TepaTandir">Tepa Tandir</option>
                                                    <option value="KulchaTandir">Kulcha Tandir</option>
                                                    <option value="PodvalPatir">Podval Patir</option>
                                                    <option value="D-guruh">D - guruh</option>
                                                    <option value="No">Yo'q</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="inputcountry" className="font-weight-bold text-muted text-uppercase">Ish smenasi</Form.Label>
                                                <select defaultValue="" id="inputcountry" className="form-select form-control choicesjs" value={smena} onChange={e => setSmena(e.target.value)} >
                                                    <option value="" hidden disabled>Smenani tanlang...</option>
                                                    <option value="1-smena">1 - smena</option>
                                                    <option value="2-smena">2 - smena</option>
                                                    <option value="3-smena">3 - smena</option>
                                                    <option value="4-smena">4 - smena</option>
                                                    <option value="No">Yo'q</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="Text7" className="font-weight-bold text-muted text-uppercase">Oyligi</Form.Label>
                                                <Form.Control type="text" id="Text7" value={salary} onChange={e => { setSalary (Number(e.target.value)) }} />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="Text7" className="font-weight-bold text-muted text-uppercase">Qarzdorligi</Form.Label>
                                                <Form.Control type="text" id="Text7" value={remainingDepts} onChange={e => { setRemainingDepts (Number(e.target.value)) }} />
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <Form.Label htmlFor="TextArea" className="font-weight-bold text-muted text-uppercase">Vazifasi</Form.Label>
                                                <textarea class="form-control" id="TextArea" rows="3" value={responsibility} onChange={e => { setResponsibility(e.target.value) }} />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <div className="text-right mt-2">
                                                    <Link to="/staff" className='btn myButtonStaff qushishStaff' type="button" onClick={handleChange}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                        </svg>Saqlash
                                                    </Link>
                                                </div>
                                            </div>

                                        </Form>

                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

        </>
    )
})

export default StaffEdit;

