import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Dropdown, Button, Form } from 'react-bootstrap'
import Card from '../../../../components/Card'
import { getDarkMode } from '../../../../store/mode'
import { connect } from "react-redux";
import { AuthContext } from '../../../../views/backend/Main/ContextProvider/DataProvider'

//img

import Admin from '../../../../assets/images/user/admin.png'
import user2 from '../../../../assets/images/user/2.jpg'

// flag
import flag1 from '../../../../assets/images/Flag/flag001.png'
import flag3 from '../../../../assets/images/Flag/flag-03.png'
import flag4 from '../../../../assets/images/Flag/flag-04.png'
import flag2 from '../../../../assets/images/Flag/flag-02.png'
import flag5 from '../../../../assets/images/Flag/flag-05.png'
import flag6 from '../../../../assets/images/Flag/flag-06.png'


//chnage-mode
import ChangeMode from '../../../Change-Mode'
function mapStateToProps(state) {
    return {
        darkMode: getDarkMode(state)
    };
}


const HeaderStyle1 = (props) => {
    const { currentUser, logout } = useContext(AuthContext);
    const minisidbar = () => {
        document.body.classList.toggle('sidebar-main')
    }
    return (
        <>

            <div className="iq-top-navbar">
                <div className="iq-navbar-custom">
                    <Navbar expand="lg" className="navbar-light p-0">
                        <div className="side-menu-bt-sidebar" onClick={minisidbar}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="text-secondary wrapper-menu" width="50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </div>
                        <div className="d-flex align-items-center">
                            <ChangeMode />
                            <Navbar.Toggle aria-controls="navbarSupportedContent">
                                <svg xmlns="http://www.w3.org/2000/svg" className="text-secondary" width="30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            </Navbar.Toggle>
                            <Navbar.Collapse id="navbarSupportedContent">
                                <Nav as="ul" className="ml-auto navbar-list align-items-center">
                                    <Dropdown as="li" bsPrefix="nav-item nav-icon search-content">
                                        <Dropdown.Toggle as={Button} href="#" variant=" search-toggle rounded" id="dropdownSearch" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <svg className="svg-icon text-secondary" id="h-suns" height="25" width="25" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className="iq-search-bar iq-sub-dropdown " aria-labelledby="dropdownSearch">
                                            <Form action="#" className="searchbox p-2">
                                                <Form.Group className="mb-0 position-relative">
                                                    <Form.Control type="text" className="text search-input font-size-12" placeholder="type here to search..." />
                                                    <Link to="#" className="search-link">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                        </svg>
                                                    </Link>
                                                </Form.Group>
                                            </Form>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Dropdown as="li" className="nav-item nav-icon">
                                        <Dropdown.Toggle as={Button} href="#" variant="nav-item nav-icon pr-0 search-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                                            <img src={Admin} className="img-fluid avatar-rounded" alt="user" style={{ width: '48px', height: '48px' }} />
                                            <span className="mb-0 ml-2 user-name" style={{ fontSize: '20px', fontWeight: '400', lineHeight: '23px', color: '#000000' }}>{currentUser.fullName} / {currentUser.role}</span>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu as="ul" className="dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                            <Dropdown.Item as="li" className="d-flex svg-icon border-top">
                                                <svg className="svg-icon mr-0 text-secondary" id="h-05-p" width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                </svg>
                                                <button className='btn border-0' onClick={logout}>Chiqish</button>
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Nav>
                            </Navbar.Collapse>
                        </div>
                    </Navbar>
                </div>
            </div>


        </>
    )
}

// export default HeaderStyle1
export default connect(mapStateToProps)(HeaderStyle1)