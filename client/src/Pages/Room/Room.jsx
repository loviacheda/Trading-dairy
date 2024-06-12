import React, { useEffect, useContext, useState } from "react";
import "./Room.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import MainComponent from "./components/MainComponent";
import CreateWorkspace from "./components/popupForms/CreateWorkspase";
import DeleteWorkspace from "./components/popupForms/DeleteWorkspase";
import EditWorkspase from "./components/popupForms/EditWorkspase";
import ShareWorkspase from "./components/popupForms/ShareWorkspase";
import CreateTable from "./components/popupForms/CreateTable";
import GenerateGraph from "./components/popupForms/GenerateGraph";

function Room() {
  const [err, setError] = useState(null);
  const [roomData, setRoomData] = useState(null);
  const [workspaces, setWorkspaces] = useState(null);
  const [currentWorkspace, setCurrentWorkspace] = useState(null);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mainComponentState, setMainComponentState] = useState({
    tableID: null,
    tableName: null,
    view: "workspace"
  });
  const [graphData, setGraphData] = useState({
    type: null,
    data: null,
    parameter: null
  });


  useEffect(() => {
    axios.get("/rooms").then((res) => {
      setRoomData(res.data.tables);
      setWorkspaces(res.data.workspaces);
      setCurrentWorkspace(res.data.workspaces[0]);
    }).catch((problem) => {
      setError(problem);
    })
  }, []);

  if(!err && !roomData){
    return(<div></div>);
  }

  if(err){
    return(
      <div>
        Unathorized access!
      </div>
    );
  } 
  
  const SidebarData = workspaces;

  const doLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      setError(error.response.data);
    }
  };

  const selectWorkspace = async (room_id) => {
    try {
      const res = await axios.get(`/rooms/${room_id}`);
      setRoomData(res.data);
      setCurrentWorkspace({workspace_id: room_id, name: workspaces.find(x => x.workspace_id === room_id).name});
      setMainComponentState({view: "workspace"});
    } catch (error) {
      setError(error.response.data);
    }
  };

  return(
    <div className="Room">
      <div className="Navbar">
        <div className="navBrend">
          Traing <b>Diary</b>
        </div>
        <div className="navList">
            <CreateWorkspace/>
            <CreateTable currentWorkspace={currentWorkspace}/>
            <GenerateGraph workspaces={workspaces} setMainComponentState={setMainComponentState} setGraphData={setGraphData}/>
        </div>
        <div className="action-button" onClick={doLogout}>
          Logout
        </div>
      </div>
      <div className="Body">
        <div className="Sidebar">
          <ul className="SidebarList">
          {SidebarData.map((val, key) => {
            return (
              <li 
              className="side_elem" 
              id={val.workspace_id === currentWorkspace.workspace_id ? "active_elem" : ""}
              key={key} 
              onClick={() => selectWorkspace(val.workspace_id)}>
                <div>{val.name}</div>
                  <div className="action-btns">
                  <EditWorkspase workspace_name= {val.name} workspace_id={val.workspace_id}/>
                  <ShareWorkspase workspace_name= {val.name} workspace_id={val.workspace_id}/>
                  <DeleteWorkspace workspace_name= {val.name} workspace_id={val.workspace_id}/>
                </div>
              </li>
            );
          })}
          </ul>
        </div>
        
        <div className="Main">
          <MainComponent state={mainComponentState} roomData={roomData} stateChanger={setMainComponentState} graphData={graphData}/>
        </div>

      </div>
    </div>
    
  );

}

export default Room;
