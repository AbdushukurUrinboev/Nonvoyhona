import React, { useState, useEffect, useContext } from 'react';
import { Form } from 'react-bootstrap'
import axios from 'axios';
import { STAFF_URL } from '../../../API';

// WithAuthGuard
import { withAllRouterGuard } from "../App/guards/with-auth-guard";


const StaffBonusAdd = withAllRouterGuard(() => {
    const [staffList, setStaffList] = useState([]);
    const [recipient, setRecipient] = useState('tanlanmagan');
    const [showModal, setShowModal] = useState(false);     
    const [info, setInfo] = useState('');
    const [sanaKun, setSanaKun] = useState('');
    const [sanaOy, setSanaOy] = useState('');
    const [sanaYil, setSanaYil] = useState(new Date().getFullYear());
    const [selectedColor, setSelectedColor] = useState(null);
    const [idSelectedStaff, setIdSelectedStaff] = useState('');

    
    useEffect(() => {
        axios.get(STAFF_URL)
            .then(res => {
                setStaffList(res.data)               
            })
            .catch(err => console.log(err))
    }, [])

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleRecipientChange = (event) => {  
        setIdSelectedStaff(event.target.value)
        const selectedStaff = staffList.find((staff) => staff._id === event.target.value)         
        setRecipient(selectedStaff.firstName + " " + selectedStaff.lastName);       
    };

    const handleClickSpan = (color) => {
        setSelectedColor(color);
      };

    function handleSave(e) {
        e.preventDefault();
        if (idSelectedStaff && sanaKun && sanaOy && sanaYil && selectedColor) {          
            axios.post(`${STAFF_URL}/fines/${idSelectedStaff}`, {
                fine: selectedColor,
                date: sanaYil + "-" + sanaOy + "-" + sanaKun,
                description: info
            })
                .then(res => {
                    console.log("Data is saved", res);
                    setShowModal(false);

                })
                .catch(err => console.log(err))
        }
    }

    return (
        <>
            <div style={{ textAlign: "right" }}>
                <button type="button" className="btn btn-primary" onClick={handleShowModal}>
                    Jarima / Rag'bat berish
                </button>
            </div>
            {showModal && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Xodim: <span style={{ color: "red", fontWeight: "bold" }}>{recipient}</span> </h5>
                                <button type="button" className="close" onClick={handleCloseModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="col-md-12 mb-3">
                                        <Form.Label htmlFor="Text2" className="form-label font-weight-bold text-muted text-uppercase">Mas'ul shahs</Form.Label>
                                        <select id="Text2" className="form-select form-control choicesjs" onChange={handleRecipientChange}>
                                            <option value="">Xodimlar</option>
                                            {
                                                staffList.map((staff, id) => {                                                    
                                                    return <option key={id} value={staff._id}>{staff.firstName} {staff.lastName}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <Form.Label htmlFor="Text7" className="font-weight-bold text-muted text-uppercase">Sana</Form.Label>
                                        <div className='input-group'>
                                            <Form.Control type="number" id="Text5" placeholder="Kun..." style={{ width: '10%', marginRight: '8px' }} onChange={e => setSanaKun(e.target.value)} />
                                            <select value={sanaOy} id="inputState" className="form-select form-control choicesjs" onChange={e => setSanaOy(e.target.value)}>
                                                <option value="" disabled selected>Oy...</option>
                                                <option value="1">Yanvar</option>
                                                <option value="2">Fevral</option>
                                                <option value="3">Mart</option>
                                                <option value="4">Aprel</option>
                                                <option value="5">May</option>
                                                <option value="6">Iyun</option>
                                                <option value="7">Iyul</option>
                                                <option value="8">Avgust</option>
                                                <option value="9">Sentyabr</option>
                                                <option value="10">Octyabr</option>
                                                <option value="11">Noyabr</option>
                                                <option value="12">Dekabr</option>
                                            </select>
                                            <Form.Control type="number" id="Text5" placeholder="Yil..." style={{ width: '10%', marginLeft: '8px' }} value={sanaYil} onChange={e => setSanaYil(e.target.value)} />
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <span style={{
                                            height: selectedColor === 'yellow' ? "85px" : "65px",
                                            textAlign: "center",
                                            backgroundColor: selectedColor === 'yellow' ? '#ffe135' : 'yellow',
                                            padding: '20px',
                                            marginRight: "15px",
                                            border: selectedColor === 'yellow' ? '4px solid gray' : '2px solid darkgray',
                                            borderRadius: '5px',
                                            display: 'inline-block',
                                            fontWeight: 'bold',
                                            fontSize: '16px',
                                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
                                        }} onClick={() => handleClickSpan('yellow')}></span>

                                        <span style={{
                                            height: selectedColor === 'red' ? "85px" : "65px",
                                            textAlign: "center",
                                            backgroundColor: selectedColor === 'red' ? '#f2003c' : 'red',
                                            marginRight: "15px",
                                            padding: '20px',
                                            border: selectedColor === 'red' ? '4px solid gray' : '2px solid darkgray',
                                            borderRadius: '5px',
                                            display: 'inline-block',
                                            fontWeight: 'bold',
                                            fontSize: '16px',
                                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
                                        }} onClick={() => handleClickSpan('red')}></span>

                                        <span style={{
                                            height: selectedColor === 'green' ? "85px" : "65px",
                                            textAlign: "center",
                                            backgroundColor: selectedColor === 'green' ? '#009900' : '#32cd32',
                                            marginRight: "15px",
                                            padding: '20px',
                                            border: selectedColor === 'green' ? '4px solid gray' : '2px solid darkgray',
                                            borderRadius: '5px',
                                            display: 'inline-block',
                                            fontWeight: 'bold',
                                            fontSize: '16px',
                                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
                                        }} onClick={() => handleClickSpan('green')}></span>

                                    </div>


                                    <div className="form-group">
                                        <label htmlFor="message-text" className="col-form-label">
                                            Izoh:
                                        </label>
                                        <textarea className="form-control" id="message-text" onChange={e => setInfo(e.target.value)}></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                    Bekor qilish
                                </button>
                                <button type="button" className="btn btn-primary" onClick={handleSave}>
                                    Saqlash
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
});

export default StaffBonusAdd;
