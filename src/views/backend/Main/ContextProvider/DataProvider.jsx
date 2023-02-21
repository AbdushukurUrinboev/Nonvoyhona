import React, {useState, createContext, useEffect} from "react";
import axios from "axios";
// import STORAGE_URL
import { STORAGE_URL, CALCULATE_URL, CUSTOMERS_URL } from '../../../../API';

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
            let breadNames = res.data.map(elem => elem.productName)
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