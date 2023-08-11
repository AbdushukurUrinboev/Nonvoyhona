import React, { useState, useContext } from 'react';
import { Form } from 'react-bootstrap'
import axios from 'axios';
import { staffDataContext } from './ContextProvider/DataProvider';

const StaffBonusAdd = () => {
    const [recipient, setRecipient] = useState('tanlanmagan');
    const [showModal, setShowModal] = useState(false);
    const [staff, setStaff] = useState('');
    const [info, setInfo] = useState('');
    const [sanaKun, setSanaKun] = useState('');
    const [sanaOy, setSanaOy] = useState('');
    const [sanaYil, setSanaYil] = useState(new Date().getFullYear());
    const [selectedColor, setSelectedColor] = useState(null);

    const staffList = useContext(staffDataContext);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleRecipientChange = (event) => {
        setRecipient(event.target.value);
        setStaff(event.target.value)
    };

    const handleClickSpan = (color) => {
        setSelectedColor(color);
      };

    function handleSave(e) {
        e.preventDefault();
        console.log(
            staff,
            sanaKun + " " + sanaOy + " " + sanaYil,
            info,
            selectedColor

        );
        // if (plan && person && status) {
        //     axios.post(PLANS_URL, {
        //         plan,
        //         deadline: deadline.getDate() + "/" + (deadline.getMonth() + 1) + "/" + deadline.getFullYear(),
        //         person,
        //         status
        //     })
        //         .then(res => {
        //             console.log("Data is saved", res);
        //             history.push('/staff')

        //         })
        //         .catch(err => console.log(err))
        // }
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
                                            <option value="Bajarildi">Xodimlar</option>
                                            {
                                                staffList.map((staff, ind) => {
                                                    return <option key={ind} value={staff}>{staff}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <Form.Label htmlFor="Text7" className="font-weight-bold text-muted text-uppercase">Sana</Form.Label>
                                        <div className='input-group'>
                                            <Form.Control type="number" id="Text5" placeholder="Kun..." style={{ width: '10%', marginRight: '8px' }} onChange={e => setSanaKun(e.target.value)} />
                                            <select value={sanaOy} id="inputState" className="form-select form-control choicesjs" onChange={e => setSanaOy(e.target.value)}>
                                                <option value="Yanvar">Yanvar</option>
                                                <option value="Fevral">Fevral</option>
                                                <option value="Mart">Mart</option>
                                                <option value="Aprel">Aprel</option>
                                                <option value="May">May</option>
                                                <option value="Iyun">Iyun</option>
                                                <option value="Iyul">Iyul</option>
                                                <option value="Avgust">Avgust</option>
                                                <option value="Sentyabr">Sentyabr</option>
                                                <option value="Octyabr">Octyabr</option>
                                                <option value="Noyabr">Noyabr</option>
                                                <option value="Dekabr">Dekabr</option>
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
};

export default StaffBonusAdd;
