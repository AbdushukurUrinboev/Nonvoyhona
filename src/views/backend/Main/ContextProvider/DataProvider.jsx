import React, {useState, createContext, useEffect} from "react";
import axios from "axios";
// import STORAGE_URL
import { STORAGE_URL, CALCULATE_URL, CUSTOMERS_URL, STAFF_URL, XAMKOR_URL, ORDERS_URL, SALE_URL } from '../../../../API';

// Mahsulotlar datasi (masalan un, yog va hokazo)
export const dataContext = createContext();

export function DataProvider(props){ 
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
            let breadNames = res.data.map(elem => elem.order)   
            setZakazBreadList(breadNames)
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