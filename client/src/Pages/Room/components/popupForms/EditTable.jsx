import Modal from 'react-bootstrap/Modal';
import React, {useEffect, useState } from "react";
import axios from "axios";
import { FcAutomatic } from "react-icons/fc";

function EditTable({table_id}){
    const [name, setName] = useState('');
    const [format, setFormat] = useState('');
    const [description, setDescription] = useState('');
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        axios.get('/tables', {params:{table_id: table_id}}).then((res) => {
            setName(res.data.name);
            setFormat(res.data.format);
            setDescription(res.data.description);
        });
    }, []);

    const editTable = async () => {
        try {
          await axios.put(`/tables/${table_id}`, {
            tableName: name,
            tableFormat: format,
            tableDescription: description,
        });
        } catch (err) {
        }
    }

    return (
        <>
            <div onClick={handleShow}>
                <FcAutomatic/>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Table</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            setName('');
                            setFormat('');
                            setDescription('');
                            editTable();
                        }}
                        id="editmodal"
                        className="w-full max-w-sm"
                    >
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                >
                                    Table Name
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="md:w-1/3">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                >
                                    Table Format
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="format"
                                    type="text"
                                    value={format}
                                    onChange={(e) => {
                                        setFormat(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="md:w-1/3">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                >
                                    Description
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="description"
                                    type="text"
                                    value={description}
                                    onChange={(e) => {
                                        setDescription(e.target.value);
                                    }}
                                />
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
                        Edit
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )

}

export default EditTable;