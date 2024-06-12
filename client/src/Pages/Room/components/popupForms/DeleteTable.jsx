import Modal from 'react-bootstrap/Modal';
import React, { useState } from "react";
import axios from "axios";
import { FcEmptyTrash } from "react-icons/fc";

function DeleteTable({state}){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteTable = async () => {
        try {
          await axios.delete(`/tables/${state.tableID}`);
        } catch (err) {
        }
    }

    return (
        <>
            <div onClick={handleShow}>
                <FcEmptyTrash/>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Do You want to delete table: {state.tableName}?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            deleteTable();
                        }}
                        id="editmodal"
                        className="w-full max-w-sm"
                    >
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                >
                                    Please note that all deals in this table will be deleted
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
                        onClick={handleClose}
                        form="editmodal"
                    >
                        Delete
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )

}

export default DeleteTable;