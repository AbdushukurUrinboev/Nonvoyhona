import React from "react";


export function FilterCustomer(props) {

    function onFilterValueChanged(event){
        // console.log(event.target.value);
        props.filterValueSelected(event.target.value);
    }
    return (


    <select name="group" defaultValue="" id="customer-filter" className="form-select form-control font-weight-bold choicesjs" style={{padding: "5px"}} onChange={onFilterValueChanged}>
        <option value="No"> Turi </option>
        <option value="Doimiy"> Doimiy </option>
        <option value="Vaqtincha"> Vaqtincha </option>
    </select>
      
    )
}


export function FilterPlans(props) {

    function onFilterValueChanged(event){
        // console.log(event.target.value);
        props.filterValueSelected(event.target.value);
    }
    return (


    <select name="group" defaultValue="" id="plans-filter" className="form-select form-control font-weight-bold choicesjs" onChange={onFilterValueChanged}>
        <option value="No"> Turi </option>
        <option value="Bajarildi"> Bajarildi </option>
        <option value="Bajarilmoqda"> Bajarilmoqda </option>
        <option value="Bajarilmadi"> Bajarilmadi </option>
    </select>
      
    )
}


