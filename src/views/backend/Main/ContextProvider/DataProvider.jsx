import React, {useState, createContext, useEffect} from "react";
import axios from "axios";
// import STORAGE_URL
import { STORAGE_URL } from '../../../../API';


export const dataContext = createContext();

export default function(props){ 
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