import React from 'react'
import { Link } from 'react-router-dom'
import {Navbar,Nav,Dropdown,Button,Form} from 'react-bootstrap'
import  Card from '../../../../components/Card'
import {getDarkMode} from '../../../../store/mode'
import {connect} from "react-redux";


//img

import  Admin  from  '../../../../assets/images/user/admin.png'
import  user2  from '../../../../assets/images/user/2.jpg'

// flag
import flag1 from '../../../../assets/images/Flag/flag001.png'
import flag3 from  '../../../../assets/images/Flag/flag-03.png'
import flag4 from  '../../../../assets/images/Flag/flag-04.png'
import flag2 from  '../../../../assets/images/Flag/flag-02.png'
import flag5 from  '../../../../assets/images/Flag/flag-05.png'
import flag6 from  '../../../../assets/images/Flag/flag-06.png'


//chnage-mode
import ChangeMode from  '../../../Change-Mode'
function mapStateToProps(state) {
    return {
        darkMode: getDarkMode(state)
    };
}


const  HeaderStyle1 =(props) =>{
   const minisidbar =() =>{
    document.body.classList.toggle('sidebar-main')
}
    return(
         <>

<div className="iq-top-navbar">
    <div className="iq-navbar-custom">
        <Navbar  expand="lg" className="navbar-light p-0">
            <div className="side-menu-bt-sidebar"  onClick={minisidbar}>
                <svg xmlns="http://www.w3.org/2000/svg" className="text-secondary wrapper-menu" width="50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </div>
            <div className="d-flex align-items-center">
                <ChangeMode/> 
                <Navbar.Toggle  aria-controls="navbarSupportedContent">
                    <svg xmlns="http://www.w3.org/2000/svg" className="text-secondary" width="30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </Navbar.Toggle>
                <Navbar.Collapse  id="navbarSupportedContent">
                    <Nav as="ul" className="ml-auto navbar-list align-items-center">                                              
                        {/* <Dropdown as="li" className="nav-item nav-icon">
                            <Dropdown.Toggle  as={Button} href="#" variant=" search-toggle" id="dropdownMenuButton2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img src={flag1} className="img-fluid rounded-circle" alt="user" style={{height: "48px", minWidth: "60px", width: "60px"}}/>
                            <span className="bg-primary"></span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="iq-sub-dropdown" aria-labelledby="dropdownMenuButton2">
                                <Card className="shadow-none m-0 border-0">
                                    <div className=" p-0 ">
                                        <ul className="dropdown-menu-1 list-group list-group-flush">
                                            <li className="dropdown-item-1 list-group-item  px-2"><Link className="p-0" to="#"><img src={flag3} alt="img-flaf" className="img-fluid mr-2" width= "15px" height= "15px" min-width= "15px"/>Uzbek</Link></li>
                                            <li className="dropdown-item-1 list-group-item  px-2"><Link className="p-0" to="#"><img src={flag4} alt="img-flaf" className="img-fluid mr-2" width= "15px" height= "15px" min-width= "15px"/>Русский</Link></li>
                                            <li className="dropdown-item-1 list-group-item  px-2"><Link className="p-0" to="#"><img src={flag2} alt="img-flaf" className="img-fluid mr-2" width= "15px" height= "15px" min-width= "15px"/>English</Link></li>
                                        </ul>
                                    </div>
                                </Card>
                            </Dropdown.Menu>
                        </Dropdown> */}
                        <Dropdown as="li" bsPrefix="nav-item nav-icon search-content">
                            <Dropdown.Toggle as={Button} href="#" variant=" search-toggle rounded" id="dropdownSearch" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <svg className="svg-icon text-secondary" id="h-suns" height="25" width="25" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </Dropdown.Toggle>
                            <Dropdown.Menu  className="iq-search-bar iq-sub-dropdown " aria-labelledby="dropdownSearch">
                                <Form action="#" className="searchbox p-2">
                                    <Form.Group className="mb-0 position-relative">
                                    <Form.Control  type="text" className="text search-input font-size-12" placeholder="type here to search..."/>
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
                            <Dropdown.Toggle  as={Button} href="#" variant="nav-item nav-icon pr-0 search-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                                <img src={Admin} className="img-fluid avatar-rounded" alt="user" style={{width:'48px', height:'48px'}}/>
                                <span className="mb-0 ml-2 user-name" style={{fontSize:'20px', fontWeight:'400', lineHeight:'23px', color:'#000000'}}>Administrator</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu as="ul"  className="dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                {/* <Dropdown.Item as="li" className="d-flex svg-icon">
                                    <svg className="svg-icon mr-0 text-secondary" id="h-01-p" width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <Link to="/user-profile">My Profile</Link>
                                </Dropdown.Item> */}
                                <Dropdown.Item as="li" className="d-flex svg-icon">
                                    <svg className="svg-icon mr-0 text-secondary" id="h-02-p" width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    <Link to="/user-profile-edit">Profilni o'zgartirish</Link>
                                </Dropdown.Item>
                                <Dropdown.Item as="li" className="d-flex svg-icon">
                                    <svg className="svg-icon mr-0 text-secondary" id="h-03-p" width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <Link to="/user-account-setting">Foydalanuvchi qo'shish</Link>
                                </Dropdown.Item>                                
                                <Dropdown.Item as="li" className="d-flex svg-icon border-top">
                                    <svg className="svg-icon mr-0 text-secondary" id="h-05-p" width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    <Link to="/auth/sign-in">Chiqish</Link>
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