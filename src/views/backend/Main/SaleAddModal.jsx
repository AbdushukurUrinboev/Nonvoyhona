import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function SaleAddModal({ saledata, show, onHide }) {


    function handleChange(e) {
        e.preventDefault();
        onHide();

        console.log("Saved");
        // const isValid = addInputOrder.every(elem => {
        //     const isOrderIncluded = sotuvBreadList.some(bread => bread === elem.order);
        //     return isOrderIncluded;
        // });

        // if (!isValid) {
        //     console.log("At least one order is not included in sotuvBreadList");
        //     setBreadNotIncluded(true);
        //     return;
        // }

        // const newArrForPost = addInputOrder.map((elem) => {
        //     return {
        //         name: elem.order,
        //         quantity: Number(elem.productQuantity),
        //         price: elem.price,
        //         customerID: elem.customerID
        //     };
        // });



        // console.log(
        //     {
        //         order: newArrForPost,
        //         customerType: customerType,
        //         customer,
        //         avans,
        //         price
        //     }
        // );

        // axios.post(SALE_URL, {
        //     order: newArrForPost,
        //     customerType: customerType,
        //     customer,
        //     avans,
        //     price
        // })
        //     .then(res => {

        //         console.log("Data is saved", res)
        //         window.location.reload(history.push('/sale'));
        //         history.push('/sale')
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
                            />
                            <Form.Text id="numberHelpBlock" muted>
                                Ayni paytda {saledata.breadName} nonidan {saledata.quantity} ta mavjud.
                                Siz ko'pi bilan {saledata.quantity} tagacha raqam kiritishingiz mumkin
                            </Form.Text>
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
