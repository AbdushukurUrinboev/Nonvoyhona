import React from 'react'
import { Container, Col, Row, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Card from '../../../components/Card'
import { connect } from "react-redux";
import { getDarkMode } from '../../../store/mode'
import { useHistory } from 'react-router-dom'
//img
import logo from '../../../assets/images/login/logo.png'

import './SignIn.css'


function mapStateToProps(state) {
   return {
      darkMode: getDarkMode(state)
   };
}



const SignIn = (props) => {
   let history = useHistory()

   return (
      <>
         <section className="login-content p-5">
            <Container className="h-100">
               <Row className="align-items-center justify-content-center h-100">
                  <Col md="6" className='LogPadSt'>
                     <Card className="p-3 myBg">
                        <Card.Body className="m-5">
                           <div className="bgFilter">
                              <h3 className="mb-3 myHeadStyleSignin">Novvoyxona</h3>
                              <p className="textSignInSt">boshqaruv</p>
                              <p className="mb-4 textSignInSt">tizimi</p>
                              <p className="mb-4 kirishSt">Kirish <span><img src={logo} alt="" /></span></p>

                           </div>



                        </Card.Body>
                     </Card>
                  </Col>
                  <Col md="6" className='LogPadSt'>
                     <Card className="p-3">
                        <div className='myStSignin'>
                           <Card.Body>
                              <h3 className="font-weight-bold text-center myJaydarStLogin">Javdar</h3>
                              {/* <p className="text-left text-secondary mb-4">Novvoyxona dasturiga kirish uchun iltimos telefon raqamingiz va parolingizni kiriting!</p> */}

                              <div className="mb-5">
                                 <p className="line-around text-secondary mb-0"><span className="line-around-1 line-st">Dasturga telefon raqamingiz orqali kiring</span></p>
                              </div>
                              <Form>
                                 <Row>
                                    <Col lg="12">
                                       <Form.Group>
                                          <Form.Label className="text-secondary">Telefon raqam</Form.Label>
                                          <Form.Control type="number" placeholder="90 - 633 - 55 - 99" />
                                       </Form.Group>
                                    </Col>
                                    <Col lg="12" className="mt-2">
                                       <Form.Group>
                                          <div className="d-flex justify-content-between align-items-center">
                                             <Form.Label className="text-secondary">Parol</Form.Label>
                                             <Form.Label><Link to="/auth/recoverpw">Parolni unutdingizmi?</Link></Form.Label>
                                          </div>
                                          <Form.Control type="password" placeholder="Enter Password" />
                                       </Form.Group>
                                    </Col>
                                 </Row>
                                 <Button type="submit" onClick={() => history.push('/')} variant="btn btn-block mt-2 loginStbt">Tizimga kirish</Button>

                              </Form>
                           </Card.Body>
                        </div>
                     </Card>
                  </Col>
               </Row>
            </Container>
         </section>
      </>
   )
}

export default connect(mapStateToProps)(SignIn)