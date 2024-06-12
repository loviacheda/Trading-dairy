import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from '../../../../context/authContext';

function GenerateGraph({workspaces, setMainComponentState, setGraphData}){

    const { currentUser } = useContext(AuthContext);
    const [graphType, setGraphType] = useState("Pie_chart");
    const [selectedWorkspace, setSelectedWorkspace] = useState(workspaces[0].workspace_id);

    const [tables, setTables] = useState(null);
    
    const parameters = ["market", "setup", "long_or_short", "session", "result", "plan_impuls", "emotion_before", "emotion_during"];
    const [selectedParam, setSelectedParam] = useState(parameters[0]);
    
    const [selectedTable, setSelectedTable] = useState('');

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const generateGraph = async () => {
        const res = (await axios.get(`/deals/${selectedTable}`)).data;
        
        const fields = res.map(item => item[selectedParam]).filter((param, index, array) => array.indexOf(param) === index);
        const graphData = fields.map(field => ({label: field, value: res.filter(item => item[selectedParam] === field).length}));

        setGraphData({type: graphType, data:graphData, parameter: selectedParam});

        setMainComponentState({view: "graph"});
    }

    useEffect(() => {
        axios.get(`/rooms/${selectedWorkspace}`).then((res) => {
            setTables(res.data);
            if(res.data.length !== 0){setSelectedTable(res.data[0].id)} 
        });
    }, [selectedWorkspace]);

    return (
        <>
            <div className="nav_elem" onClick={handleShow}>
                Graph
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Select Graph data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            setGraphType("Pie_chart")
                            setSelectedWorkspace(workspaces[0].workspace_id);
                            generateGraph();
                        }}
                        id="editmodal"
                        className="w-full max-w-sm"
                    >
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                >
                                    Graph type
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <select
                                    value={graphType}
                                    onChange={(e) => setGraphType(e.target.value)}
                                    >
                                    <option key="Pie_chart" value="Pie_chart"> Pie chart </option>
                                    <option key="Bar_chart" value="Bar_chart"> Bar chart </option>
                                </select>
                            </div>

                            <div className="md:w-1/3">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                >
                                    Parameter
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <select
                                    value={selectedParam}
                                    onChange={(e) => setSelectedParam(e.target.value)}
                                    >
                                    {parameters.map((option) => (
                                    <option key={option} value={option}>
                                    {option}
                                    </option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className="md:w-1/3">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                >
                                    Workspace
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <select
                                    value={selectedWorkspace}
                                    onChange={(e) => setSelectedWorkspace(e.target.value)}
                                    >
                                    {workspaces.map((option) => (
                                    <option key={option.name} value={option.workspace_id}>
                                    {option.name}
                                    </option>
                                    ))}
                                </select>
                            </div>
                            
                            {tables && (
                                <>
                                    <div className="md:w-1/3">
                                        <label
                                            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                        >
                                            Table
                                        </label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <select
                                            value={selectedTable}
                                            onChange={(e) => setSelectedTable(e.target.value)}
                                            >
                                            {tables.map((option) => (
                                            <option key={option.id} value={option.id}>
                                            {option.name}
                                            </option>
                                            ))}
                                        </select>
                                    </div>
                                </>
                            )}
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
                        Add
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )

}

export default GenerateGraph;