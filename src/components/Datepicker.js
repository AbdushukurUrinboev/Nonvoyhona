import React,{useEffect, useState} from 'react'
//datepicker
import { Datepicker } from 'vanillajs-datepicker';
import { DateRangePicker } from 'vanillajs-datepicker';
import '../../node_modules/vanillajs-datepicker/dist/css/datepicker.min.css'




const Datepickers = (props) => {

    useEffect(
        () =>{
            const datepickers = document.querySelectorAll('.vanila-datepicker')
            Array.from(datepickers, (elem) => {
                return new Datepicker(elem)
            })
            const daterangePickers = document.querySelectorAll('.vanila-daterangepicker')
            Array.from(daterangePickers, (elem) => {
            return new DateRangePicker(elem)
            })
        
           
        },[]
    )
  
    return (
        <>
         <input type="text" id={props.givenID} onChange={props.onCustomChange} name={props.names} className={`form-control ${props.className}`} placeholder={props.placeholder} disabled={props.disabled}/>
        </>
    )
}

export default Datepickers
