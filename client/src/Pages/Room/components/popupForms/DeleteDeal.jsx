import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from "react";
import axios from "axios";

function DeleteDeal({setClicked, table_id, row_id}){

    const [deal_id, setDeal_id] = useState(null);

    const [show, setShow] = useState(false);

    const handleClose = () => {setShow(false); setClicked(false)};
    const handleShow = () => setShow(true);

    useEffect(() => {
        axios.get(`/deals/${table_id}`).then((res) => {
            const deal = res.data[row_id];
            setDeal_id(deal.id);
        });
    }, []);

    const deleteDeal = async () => {
        try {
          await axios.delete(`/deals/${deal_id}`);
        } catch (err) {
        }

        setClicked(false);
    }

    return (
        <>
            <div onClick={(e) => {handleShow()}}>
                Delete
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Do You want to delete the Deal?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();                         
                            deleteDeal();
                            handleClose();
                        }}
                        id="editmodal"
                        className="w-full max-w-sm"
                    >
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                >
                                    Please note that all inforamtion about the deal will be deleted
                                </label>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className="font-bold py-2 px-4 rounded" style={{ backgroundColor: 'orangered', color: '#424242' }}
                        onClick={handleClose}
                    >
                        Close
                    </button>
                    <button
                        className="font-bold py-2 px-4 rounded" style={{ backgroundColor: 'limegreen', color: '#424242' }}
                        form="editmodal"
                    >
                        Confirm
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )

}

export default DeleteDeal;