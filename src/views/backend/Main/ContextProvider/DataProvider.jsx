import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
// import STORAGE_URL
import { USERS_URL, STORAGE_URL, CALCULATE_URL, CUSTOMERS_URL, STAFF_URL, XAMKOR_URL, ORDERS_URL, SALE_URL } from '../../../../API';
import { useHistory } from 'react-router-dom'
// Mahsulotlar datasi (masalan un, yog va hokazo)
export const dataContext = createContext();

export function DataProvider(props) {
    const [all, setAll] = useState([]);


    useEffect(() => {
        axios.get(STORAGE_URL)
            .then(res => {
                // console.log(res.data);
                let productNames = res.data.map((elem) => elem.productName)
                setAll(productNames)
            })
    }, [])


    return (
        <dataContext.Provider value={all}>
            {props.children}
        </dataContext.Provider>
    )
}




// Mahsulotlar datasi2 (masalan un, yog va hokazo)
export const dataContext2 = createContext();

export function DataProvider2(props) {
    const [all2, setAll2] = useState([]);


    useEffect(() => {
        axios.get(STORAGE_URL)
            .then(res => {
                // console.log(res.data);
                let productNames = res.data.map((elem) => elem)
                setAll2(productNames)
            })
    }, [])


    return (
        <dataContext2.Provider value={all2}>
            {props.children}
        </dataContext2.Provider>
    )
}

// Nonlar ro'yhati (masalan patir, gijda va hokazo)
export const breadDataContext = createContext()

export function BreadListData(props) {
    const [breadList, setBreadList] = useState([]);

    useEffect(() => {
        axios.get(CALCULATE_URL)
            .then(res => {
                let breadNames = res.data.map(elem => elem)
                setBreadList(breadNames)
            })
    }, [])

    return (
        <breadDataContext.Provider value={breadList}>
            {props.children}
        </breadDataContext.Provider>
    )
}


// Mijozlar ro'yhati (masalan Elbek, yana boshqa sotuvchilar)
export const customersDataContext = createContext()

export function CustomerListData(props) {
    const [customerList, setCustomerList] = useState([]);

    useEffect(() => {
        axios.get(CUSTOMERS_URL)
            .then(res => {
                setCustomerList(res.data)
            })
    }, [])

    return (
        <customersDataContext.Provider value={customerList}>
            {props.children}
        </customersDataContext.Provider>
    )
}


// Staff ro'yhati 
export const staffDataContext = createContext()

export function StaffListData(props) {
    const [staffList, setStaffList] = useState([]);

    useEffect(() => {
        axios.get(STAFF_URL)
            .then(res => {
                let staffNames = res.data.map(elem => elem.lastName + " " + elem.firstName)
                setStaffList(staffNames)
            })
    }, [])

    return (
        <staffDataContext.Provider value={staffList}>
            {props.children}
        </staffDataContext.Provider>
    )
}

// Staff ro'yhati hammasi ketgan
export const allstaffDataContext = createContext()

export function AllStaffListData(props) {
    const [allStaffList, setAllStaffList] = useState([]);

    useEffect(() => {
        axios.get(STAFF_URL)
            .then(res => {
                let staffNames = res.data.map(elem => elem)
                setAllStaffList(staffNames)
            })
    }, [])

    return (
        <allstaffDataContext.Provider value={allStaffList}>
            {props.children}
        </allstaffDataContext.Provider>
    )
}



// Xamkor

export const xamkorDataContext = createContext()

export function XamkorListData(props) {
    const [xamkorList, setXamkorList] = useState([]);

    useEffect(() => {
        axios.get(XAMKOR_URL)
            .then(res => {
                setXamkorList(res.data)
            })
    }, [])

    return (
        <xamkorDataContext.Provider value={xamkorList}>
            {props.children}
        </xamkorDataContext.Provider>
    )
}


// Zakazlardagi non ruyhati

export const zakazBreadDataContext = createContext()

export function ZakazBreadListData(props) {
    const [zakazBreadList, setZakazBreadList] = useState([]);

    useEffect(() => {
        axios.get(ORDERS_URL)
            .then(res => {
                // let breadNames = res.data.map(elem => elem.order)   
                setZakazBreadList(res.data)
            })
    }, [])

    return (
        <zakazBreadDataContext.Provider value={zakazBreadList}>
            {props.children}
        </zakazBreadDataContext.Provider>
    )
}



// Sotuvdagi non ruyhati

export const sotuvBreadDataContext = createContext()

export function SotuvBreadListData(props) {
    const [sotuvBreadList, setSotuvBreadList] = useState([]);

    useEffect(() => {
        axios.get(SALE_URL)
            .then(res => {
                let breadNames = res.data.map(elem => elem.breadName)
                setSotuvBreadList(breadNames)
            })
    }, [])

    return (
        <sotuvBreadDataContext.Provider value={sotuvBreadList}>
            {props.children}
        </sotuvBreadDataContext.Provider>
    )
}




// Kalkulyatsiyadagi Xodimlar vazifasi masalan yopuvchi, parkash, xamirkash

export const staffTaskDataContext = createContext() /// ishlatmadim uchiraver shakalad

export function StaffTaskListData(props) {
    const [tasksList, setTasksList] = useState([]);

    useEffect(() => {
        axios.get(CALCULATE_URL)
            .then(res => {
                let taskNames = res.data.map(elem => elem.staffShare) // type - turi, share-puli   
                setTasksList(taskNames)
            })
    }, [])

    return (
        <staffTaskDataContext.Provider value={tasksList}>
            {props.children}
        </staffTaskDataContext.Provider>
    )
}


// Users from API
// AuthProvider.js


export const AuthContext = createContext();

export function AuthProvider({ children }) {
    let history = useHistory()
    const storedAuthData = localStorage.getItem('authData');
    const sessionUser = localStorage.getItem('user');
    let currAuth = JSON.parse(storedAuthData);
    const [currentUser, setCurrentUser] = useState(sessionUser ? JSON.parse(sessionUser) : { role: '', fullName: '' });
    const [isAuthenticated, setIsAuthenticated] = useState(currAuth ? currAuth.isAuthenticated : false);
    const [authError, setAuthError] = useState(false);


    const login = async (username, password) => {
        // Replace this with your actual authentication logic
        try {
            const { data } = await axios.post(USERS_URL + "/login", { login: username, password });
            localStorage.setItem("user", JSON.stringify(data));
            setCurrentUser(data)
            setIsAuthenticated(true);
            setAuthError(false);
            localStorage.setItem('authData', JSON.stringify({ isAuthenticated: true }));
            history.push('/')
        } catch (err) {
            console.log("use unauth")
            setIsAuthenticated(false);
            setAuthError(true);
        }
    };
    

    const logout = () => {
        setIsAuthenticated(false);
        setAuthError(false);
        localStorage.removeItem('authData');
        history.push('/auth/sign-in');
    };

    const authContextValue = {
        currentUser,
        isAuthenticated,
        authError,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
}
