import React, { useState, useContext } from 'react'
import { Container, Col, Row, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Card from '../../../components/Card'
import { connect } from "react-redux";
import { getDarkMode } from '../../../store/mode'
//img
import logo from '../../../assets/images/login/logo.png'

import './SignIn.css'
import { AuthContext } from '../Main/ContextProvider/DataProvider';


function mapStateToProps(state) {
   return {
      darkMode: getDarkMode(state)
   };
}



const SignIn = () => {
   const { login, authError } = useContext(AuthContext);
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');

   const handleLogin = (e) => {
      e.preventDefault();
      login(username, password);

   };

   return (
      <>
         <section className="login-content p-5">
            <Container className="h-100">
               <Row className="align-items-center justify-content-center h-100">
                  <Col md="6" className='LogPadSt d-none d-md-block'>
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
                                 <h3
                                    className="font-weight-bold text-center myJaydarStLogin"
                                    style={{ color: '#C37500', fontWeight: 'bold' }}>Javdar
                                 </h3>
                              {/* <p className="text-left text-secondary mb-4">Novvoyxona dasturiga kirish uchun iltimos telefon raqamingiz va parolingizni kiriting!</p> */}

                              <div className="mb-5">
                                 <p className="line-around text-secondary mb-0"><span className="line-around-1 line-st">Dasturga login orqali kiring</span></p>
                              </div>
                              <Form>
                                 <Row>
                                    <Col lg="12">
                                       {authError && <p className='line-around-1 line-st'>Login yoki parolni hato kiritdingiz. Qaytadan harakat qiling ...</p>}
                                       <Form.Group>
                                          <Form.Label className="text-secondary">Login</Form.Label>
                                          <Form.Control
                                             type="text"
                                             placeholder="Loginni kiriting"
                                             value={username}
                                             onChange={(e) => setUsername(e.target.value)}
                                          />
                                       </Form.Group>
                                    </Col>
                                    <Col lg="12" className="mt-2">
                                       <Form.Group>
                                          <div className="d-flex justify-content-between align-items-center">
                                             <Form.Label className="text-secondary">Parol</Form.Label>
                                             {/* <Form.Label><Link to="/auth/recoverpw">Parolni unutdingizmi?</Link></Form.Label> */}
                                          </div>
                                          <Form.Control
                                             type="password"
                                             placeholder="Enter Password"
                                             value={password}
                                             onChange={e => setPassword(e.target.value)}
                                          />
                                       </Form.Group>
                                    </Col>
                                 </Row>
                                 <Button type="submit" onClick={handleLogin} variant="btn btn-block mt-2 loginStbt">Tizimga kirish</Button>

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