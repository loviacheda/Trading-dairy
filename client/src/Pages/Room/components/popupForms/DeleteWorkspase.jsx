import Modal from 'react-bootstrap/Modal';
import React, { useState } from "react";
import axios from "axios";
import { BsTrash3 } from "react-icons/bs";
import { FcEmptyTrash } from "react-icons/fc";

function DeleteWorkspace({workspace_name, workspace_id}){
    const [name, setName] = useState('');
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteWorkspace = async () => {
        try {
          await axios.delete(`/rooms/${workspace_id}`);
        } catch (err) {
        }
    }
if(workspace_name !== "My Space"){
    return (
        <>
            <div onClick={handleShow}>
                {/* <BsTrash3/> */}
                <FcEmptyTrash/>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Do You want to delete the "{workspace_name}" workspace?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            deleteWorkspace();
                        }}
                        id="editmodal"
                        className="w-full max-w-sm"
                    >
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                >
                                    Please note that all tables and deals in this workspace will be deleted
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
return(
    <></>
)
}

export default DeleteWorkspace;