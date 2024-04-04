import React, { useState, useEffect, useRef } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function SaleAddModal({ saledata, show, onHide }) {
    const [quantity, setQuantity] = useState('');
    const [breadPrice, setBreadPrice] = useState('');
    const inputRef = useRef(null);


    useEffect(() => {
        if (show) {
            inputRef.current.focus();
        }
    }, [show]);

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            handleChange(e);
        }
    }

    function handleChange(e) {
        e.preventDefault();
        onHide();

        console.log("Saved");
        console.log(quantity);



        console.log(
            {
                breadName: saledata.breadName,
                quantity: quantity,
                breadPrice: Number(breadPrice)                
            }
        )
        setQuantity('');
        setBreadPrice('');

        // axios.post(SALE_URL, {
        //     order: newArrForPost,
        //     customerType: customerType,
        //     customer,
        //     avans,
        //     price ,
        //     sellerID
        // })
        //     .then(res => {

        //         console.log("Data is saved", res)
        //     })
        //     .catch(err => {
        //         console.log(err)

        //     })
    }



    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >

            {
                saledata && (
                    <div>
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter" style={{ fontSize: "30px" }}>
                                {saledata.breadName}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className='mt-4'>
                            <Form.Label htmlFor="inputnumber" style={{ fontSize: "20px" }}>Soni</Form.Label>
                            <Form.Control
                                type="number"
                                id="inputnumber"
                                aria-describedby="numberHelpBlock"
                                onKeyDown={handleKeyPress}  
                                ref={inputRef}                             
                                value={quantity}
                                onChange={(event) => {
                                    const enteredValue = event.target.value;
                                    const parsedValue = parseInt(enteredValue);
                                    if (!isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= saledata.quantity) {
                                        setQuantity(parsedValue);
                                    } else {
                                        setQuantity('');
                                    }
                                }}
                            />
                             <Form.Text id="numberHelpBlockPrice" muted>
                                Ushbu nondan {saledata.quantity} ta mavjud.
                                Siz ko'pi bilan {saledata.quantity} tagacha raqam kiritishingiz mumkin
                            </Form.Text>

                            <Form.Label htmlFor="inputnumberPrice" style={{ fontSize: "20px" }} className='mt-4'>Narxi</Form.Label>
                            <Form.Control
                                type="number"
                                id="inputnumberPrice"
                                aria-describedby="numberHelpBlockPrice"
                                onKeyDown={handleKeyPress}                              
                                value={breadPrice}
                                onChange={(e) => setBreadPrice(e.target.value)}
                            />
                           
                        </Modal.Body>
                    </div>


                )
            }


            <Modal.Footer className="justify-content-between mt-5">
                <Button variant="danger" onClick={onHide}>Bekor qilish</Button>
                <Button onClick={handleChange}>Saqlash</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default SaleAddModal;
