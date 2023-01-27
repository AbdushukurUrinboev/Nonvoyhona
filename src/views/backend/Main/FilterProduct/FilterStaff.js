import React from "react";


export function FilterStaff(props) {

    function onFilterValueChanged(event){
        // console.log(event.target.value);
        props.filterValueSelected(event.target.value);
    }
    return (


    <select name="group" defaultValue="" id="staff-filter" className="form-select form-control font-weight-bold choicesjs" style={{padding: "5px"}} onChange={onFilterValueChanged}>
        <option value="No"> Guruhi </option>
        <option value="A-guruh"> A-Guruh </option>
        <option value="B-guruh"> B-Guruh </option>
        <option value="C-guruh"> C-Guruh </option>
        <option value="D-guruh"> D-Guruh </option>
    </select>
      
    )
}


export function FilterStaffSmena(props) {

    function onFilterValueChangedSmena(event){
        // console.log(event.target.value);
        props.filterValueSelectedSmena(event.target.value);
    }
    return (


    <select name="smena" defaultValue="" id="staff-filter" className="form-select form-control font-weight-bold choicesjs" style={{padding: "5px"}} onChange={onFilterValueChangedSmena}>
        <option value="No"> Smena </option>
        <option value="1-smena"> 1-smena </option>
        <option value="2-smena"> 2-smena </option>
    </select>
      
    )
}

