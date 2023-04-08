import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Accordion, Button } from 'react-bootstrap'
import Scrollbar from 'smooth-scrollbar'
import { connect } from "react-redux";
import { getDarkMode } from '../../../../store/mode'

//img
import logoDash from '../../../../../src/assets/images/bread/logoDash.png'

function mapStateToProps(state) {
    return {
        darkMode: getDarkMode(state)
    };
}


const minisidbar = () => {
    document.body.classList.toggle('sidebar-main')
}


const SidebarStyle = (props) => {

    //location
    let location = useLocation();

    const urlParams = new URLSearchParams(window.location.search);
    const sidebar = urlParams.get('sidebar');
    var variant = '';
    if (sidebar !== null) {
        variant = '';
        switch (sidebar) {
            case "0":
                variant = 'sidebar-dark';
                break;
            case "1":
                variant = 'sidebar-light';
                break;
            default:
                variant = '';
                break;
        }
    }

    // Collapse state
    const [activeMenu, setActiveMenu] = useState(false)
    const [activesubMenu, setSubmenu] = useState(false)
    useEffect(
        () => {
            Scrollbar.init(document.querySelector('#my-scrollbar'))
        }
    )
    return (
        <>
            <div className={`iq-sidebar sidebar-default ${variant}`}>
                <div className="iq-sidebar-logo d-flex align-items-end justify-content-between mt-3">
                    <Link to="/" className="header-logo">
                        <img src={logoDash} style={{ width: '35px', height: '34px' }} className={`img-fluid rounded-normal light-logo ${props.darkMode ? 'd-none' : ''}`} alt="logo" />
                        <span style={{ color: '#C37500', fontWeight: '800', fontSize: '26px', lineHeight: '30px' }}>Javdar</span>
                    </Link>
                    <div className="side-menu-bt-sidebar-1">
                        <svg onClick={minisidbar} xmlns="http://www.w3.org/2000/svg" className="text-light wrapper-menu" width="30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>
                <div className="data-scrollbar" data-scroll="1" id="my-scrollbar">
                    <nav className="iq-sidebar-menu">
                        <Accordion as="ul" id="iq-sidebar-toggle" className="side-menu" onSelect={(e) => setActiveMenu(e)}>
                            <li className={`${location.pathname === '/' ? 'active' : ''}  sidebar-layout`}>
                                <Link to="/" className="svg-icon">
                                    <i className="">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                    </i>
                                    <span className="ml-2">Umumiy</span>

                                </Link>
                            </li>

                            <li className={`${location.pathname === '/customers' ? 'active' : ''}  sidebar-layout`}>
                                <Link to="/customers" className="svg-icon ">
                                    <i className="">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </i>
                                    <span className="ml-2">Mijozlar</span>
                                </Link>
                            </li>
                            <li className={`${location.pathname === '/storage' ? 'active' : ''}  sidebar-layout`} >
                                <Link to="/storage" className="svg-icon">
                                    <i className="">
                                        <svg className="svg-icon" width="28" id="iq-ui-1-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" strokeDasharray="97, 117" strokeDashoffset="0"></path>
                                        </svg>
                                    </i>
                                    <span className="ml-2">Maxsulotlar</span>
                                </Link>
                            </li>
                            <li className={`${location.pathname === '/output' ? 'active' : ''}  sidebar-layout`} >
                                <Link to="/output" className="svg-icon">
                                    <i className="">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </i>
                                    <span className="ml-2">Chiqimlar</span>
                                </Link>
                            </li>
                            <li className={`${location.pathname === '/nasiya' ? 'active' : ''}  sidebar-layout`} >
                                <Link to="/nasiya" className="svg-icon">
                                    <i className="">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                        </svg>
                                    </i>
                                    <span className="ml-2">Nasiya</span>
                                </Link>
                            </li>
                            <li className={`${location.pathname === '/plan' ? 'active' : ''}  sidebar-layout`} >
                                <Link to="/plan" className="svg-icon">
                                    <i className="">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                    </i>
                                    <span className="ml-2">Rejalar</span>
                                </Link>
                            </li>
                            <li className={`${location.pathname === '/calculate' ? 'active' : ''}  sidebar-layout`} >
                                <Link to="/calculate" className="svg-icon">
                                    <i className="">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                                        </svg>
                                    </i>
                                    <span className="ml-2">Kalkulyatsiya</span>
                                </Link>
                            </li>
                            <li className={`${location.pathname === '/kunlik-ish' ? 'active' : ''}  sidebar-layout`} >
                                <Link to="/kunlik-ish" className="svg-icon">
                                    <i className="">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </i>
                                    <span className="ml-2">Kunlik ish</span>
                                </Link>
                            </li>
                            <li className={`${location.pathname === '/order' ? 'active' : ''}  sidebar-layout`} >
                                <Link to="/order" className="svg-icon">
                                    <i className="">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </i>
                                    <span className="ml-2">Zakazlar</span>
                                </Link>
                            </li>
                            <li className={`${location.pathname === '/staff' ? 'active' : ''}  sidebar-layout`}>
                                <Link to="/staff" className="svg-icon ">
                                    <i className="">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </i>
                                    <span className="ml-2">Xodimlar</span>
                                </Link>
                            </li>
                            <li className={`${location.pathname === '/sale' ? 'active' : ''}  sidebar-layout`}>
                                <Link to="/sale" className="svg-icon">
                                    <i className="">
                                        <svg className="icon line" width="28" id="receipt" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M17,16V3L13,5,10,3,7,5,3,3V17.83A3.13,3.13,0,0,0,5.84,21,3,3,0,0,0,9,18V17a1,1,0,0,1,1-1H20a1,1,0,0,1,1,1v1a3,3,0,0,1-3,3H6" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <line x1="8" y1="10" x2="12" y2="10" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" ></line>
                                        </svg>
                                    </i>
                                    <span className="ml-2">Sotuv</span>
                                </Link>
                            </li>

                            <li className={`${location.pathname === '/xamkorlar' ? 'active' : ''}  sidebar-layout`}>
                                <Link to="/xamkorlar" className="svg-icon">
                                    <i className="">
                                        <svg className="svg-icon" id="iq-user-1-1" xmlns="http://www.w3.org/2000/svg"
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </i>
                                    <span className="ml-2">Xamkorlar</span>
                                </Link>
                            </li>

                            {/* <li className={`${location.pathname === '/calendar' ? 'active' : ''}  sidebar-layout`}>
                                <Link to="/calendar" className="svg-icon">
                                    <i className="">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </i>
                                    <span className="ml-2">Kalendar</span>
                                    <p className="mb-0 px-2 badge badge-pill badge-success">New</p>
                                </Link>
                            </li>
                           
                            <li className={`${location.pathname === '/user-profile-edit' ? 'active' : ''}  sidebar-layout`}>
                                <Link to="/user-profile" className="svg-icon">
                                    <i className="">
                                        <svg className="svg-icon" id="iq-user-1-1" xmlns="http://www.w3.org/2000/svg"
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </i><span className="ml-2">Foydalanuvchi Profili</span>
                                </Link>
                            </li>
                            
                                <li className={`${location.pathname === '/auth/sign-in' ? 'active' : ''}  sidebar-layout`}>
                                    <Link to="/auth/sign-in" className="svg-icon">
                                        <i className=""><svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                                        </svg>
                                        </i><span className="">Login</span>
                                    </Link>
                                </li> */}
                            {/* <li className={`${location.pathname === '/pages-blank-page' ? 'active' : ''}  sidebar-layout`}>
                                <Link to="/pages-blank-page" className="svg-icon">
                                    <i className="">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                    </i><span className="ml-2">Bo'sh Blanka</span>
                                </Link>
                            </li> */}
                            <li className={`${location.pathname === '/pages-faq' ? 'active' : ''}  sidebar-layout`}>

                            </li>

                        </Accordion>
                    </nav>
                    <div className="pt-5 pb-5"></div>
                </div>
            </div>
        </>
    )
}

// export default SidebarStyle;
export default connect(mapStateToProps)(SidebarStyle)