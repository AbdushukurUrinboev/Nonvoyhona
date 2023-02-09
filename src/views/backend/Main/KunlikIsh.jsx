import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import Card from '../../../components/Card'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';
import { DAILY_TASKS_URL } from '../../../API';
// DatePicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './KunlikIsh.css'




const Calculate = () => {

    const [group, setGroup] = useState('');
    const [smena, setSmena] = useState('');
    const [xodim, setXodim] = useState('');
    const [qoplarSoni, setQoplarSoni] = useState('');
    const [nonTuri, setNonTuri] = useState('');
    const [nonSoni, setNonSoni] = useState('');
    const [bonusNon, setBonusNon] = useState('');
    const [bonusNonSoni, setBonusNonSoni] = useState('');
    const [jastaNonTuri, setJastaNonTuri] = useState('');
    const [jastaNonSoni, setJastaNonSoni] = useState('');
    const [tulov, setTulov] = useState('');
    const [bonusTulov, setBonusTulov] = useState('');
    const [jamiTulov, setJamiTulov] = useState('');
    const [sana, setSana] = useState(new Date());



    // const [uploadImage, setUploadImage] = useState(); // Manashu rasm console logga kelyabdi uni endi saqlashim kerak!!!!
    const history = useHistory()

    const month = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"];

    function handleChange(e) {
        e.preventDefault();
        axios.post(DAILY_TASKS_URL, {
            group,
            smena,
            xodim,
            qoplarSoni,
            nonTuri,
            nonSoni,
            bonusNon,
            bonusNonSoni,
            jastaNonTuri,
            jastaNonSoni,
            tulov,
            bonusTulov,
            jamiTulov,
            sana: sana.getDate() + "-" + month[sana.getMonth()] + "," + sana.getFullYear(),

        })
            .then(res => {
                console.log("Data is saved", res)
                // alert("Ma'lumot saqlandi")
                history.push('/kunlik-ish')
            })
            .catch(err => console.log(err))


    }



    return (
        <>
            <Container fluid>
                <Row>
                    <Col lg="12" className="mb-3 d-flex justify-content-between">
                        <h4 className="font-weight-bold0 d-flex align-items-center customerAddHead">Kunlik Ish</h4>
                    </Col>

                    <Col lg="12" className=" mb-3 d-flex justify-content-between">
                        <Link to="/customers" className="btn btn-primary btn-sm d-flex align-items-left justify-content-between">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                            <span className="ml-2">Orqaga</span>
                        </Link>
                    </Col>

                    <Col lg="12">
                        <Card>
                            <Card.Body>
                                <Row>

                                    <Col md="12">
                                        <Form className="row g-3 date-icon-set-modal myStyleCustomerAdd">
                                            <div className="col-md-6 mb-3 mt-3">
                                                <Form.Label htmlFor="inputState" className="form-label font-weight-bold text-muted text-uppercase">Gurux</Form.Label>
                                                <select id="inputState" className="form-select form-control choicesjs" onChange={e => setGroup(e.target.value)}>
                                                    <option value="no">Gurux</option>
                                                    <option value="A-Gurux">A-Gurux</option>
                                                    <option value="B-Gurux">B-Gurux</option>
                                                    <option value="C-Gurux">C-Gurux</option>
                                                    <option value="D-Gurux">D-Gurux</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6 mb-3 mt-3">
                                                <Form.Label htmlFor="inputState" className="form-label font-weight-bold text-muted text-uppercase">Smena</Form.Label>
                                                <select id="inputState" className="form-select form-control choicesjs" onChange={e => setSmena(e.target.value)}>
                                                    <option value="no">Smena</option>
                                                    <option value="1-smena">1-smena</option>
                                                    <option value="2-smena">2-smena</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="Text5" className="font-weight-bold text-muted text-uppercase">Xodim</Form.Label>
                                                <Form.Control type="text" id="Text5" placeholder="Xodimni kiriting..." onChange={e => setXodim(e.target.value)} />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="Text5" className="font-weight-bold text-muted text-uppercase">Qoplar Soni</Form.Label>
                                                <Form.Control type="number" id="Text5" placeholder="Qoplar sonini kiriting..." onChange={e => setQoplarSoni(e.target.value)} />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="inputState" className="form-label font-weight-bold text-muted text-uppercase">Non Turi</Form.Label>
                                                <select id="inputState" className="form-select form-control choicesjs" onChange={e => setNonTuri(e.target.value)}>
                                                    <option value="no">Non turi</option>
                                                    <option value="Patir">Patir</option>
                                                    <option value="Kulcha">Kulcha</option>
                                                    <option value="Kulcha">...</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="Text3" className="font-weight-bold text-muted text-uppercase">Non Soni</Form.Label>
                                                <Form.Control type="number" id="Text3" placeholder="Yopilgan nonlar sonini kiriting..." required='required' onChange={e => setNonSoni(e.target.value)} />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="inputState" className="form-label font-weight-bold text-muted text-uppercase">Bonus non Turi</Form.Label>
                                                <select id="inputState" className="form-select form-control choicesjs" onChange={e => setBonusNon(e.target.value)}>
                                                    <option value="no">Non turi</option>
                                                    <option value="Patir">Patir</option>
                                                    <option value="Kulcha">Kulcha</option>
                                                    <option value="Kulcha">...</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="Text3" className="font-weight-bold text-muted text-uppercase">Bonus non soni</Form.Label>
                                                <Form.Control type="text" id="Text3" placeholder="Bonus non sonini kiriting kiriting..." required='required' onChange={e => setBonusNonSoni(e.target.value)} />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="inputState" className="form-label font-weight-bold text-muted text-uppercase">Jasta non Turi</Form.Label>
                                                <select id="inputState" className="form-select form-control choicesjs" onChange={e => setJastaNonTuri(e.target.value)}>
                                                    <option value="no">Non turi</option>
                                                    <option value="Patir">Patir</option>
                                                    <option value="Kulcha">Kulcha</option>
                                                    <option value="Kulcha">...</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="Text3" className="font-weight-bold text-muted text-uppercase">Jasta non soni</Form.Label>
                                                <Form.Control type="text" id="Text3" placeholder="Jasta non sonini kiriting..." required='required' onChange={e => setJastaNonSoni(e.target.value)} />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="Text3" className="font-weight-bold text-muted text-uppercase">To'lov</Form.Label>
                                                <Form.Control type="text" id="Text3" placeholder="To;ovni kiriting..." required='required' onChange={e => setTulov(e.target.value)} />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="Text3" className="font-weight-bold text-muted text-uppercase">Bonus To'lov</Form.Label>
                                                <Form.Control type="text" id="Text3" placeholder="Bonus to'lovni kiriting..." required='required' onChange={e => setBonusTulov(e.target.value)} />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <Form.Label htmlFor="Text3" className="font-weight-bold text-muted text-uppercase">Jami To'lov</Form.Label>
                                                <Form.Control type="text" id="Text3" placeholder="Jami to'lovni kiriting..." required='required' onChange={e => setJamiTulov(e.target.value)} />
                                            </div>
                                            <div className="col-md-6 mb-3 position-relative">
                                                <Form.Label htmlFor="Text2" className="font-weight-bold text-muted text-uppercase">Sana</Form.Label>
                                                <DatePicker className="form-control" id="Text2" name="event_date" placeholderText="Sanani kiriting" autoComplete="off" selected={sana} onChange={date => setSana(date)} />
                                                <span className="search-link">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </span>
                                            </div>
                                        </Form>
                                        <div className="d-flex justify-content-end mt-1 ">
                                            <Button variant="btn myButtonProducts qushishProduct" onClick={handleChange}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                                Saqlash
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default Calculate;
