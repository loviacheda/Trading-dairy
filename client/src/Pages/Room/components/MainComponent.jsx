import WorkspaceTable from "./RoomTable";
import Table from "./custom_table/Table";
import { reducer } from "./custom_table/utils";
import React, { useEffect, useReducer, useState } from "react";
import "./custom_table/style.css";
import axios from "axios";
import CreateDeal from "./popupForms/CreateDeal";
import EditTable from "./popupForms/EditTable";
import DeleteTable from "./popupForms/DeleteTable";
import GraphSpace from "./GraphSpace";

function DealTableShell({workspaceState}){
    const [tempTable, setTempTable] = useState(null);

    useEffect(() => {
        axios.get(`/tables/${workspaceState.tableID}`).then((res) => {
            setTempTable(res.data);
          })
        
      }, [workspaceState]);

      if(tempTable === "Table is empty"){
        return(
            <div className="empty-table">
                <div className="empty-table-header">
                    There are no deals in this table yet
                </div>
                <CreateDeal table_id={workspaceState.tableID}/>
            </div>
        );
      }

      if(tempTable){
        return(
            <DealTable tempTable={tempTable} table_id={workspaceState.tableID}/>
        )
      }

    return(
        <>Loading...</>
    )
}

function DealTable({tempTable, table_id}){
    
    const [dealTableState, dispatch] = useReducer(reducer, tempTable);
    
    return(
        // <div></div>
        <Table
            columns={dealTableState.columns}
            data={dealTableState.data}
            dispatch={dispatch}
            skipReset={dealTableState.skipReset}
            table_id={table_id}
        />
    )
}

function MainComponent({state, roomData, stateChanger, graphData}) {

    if(state.view === "workspace"){
        return(
            <WorkspaceTable rows={roomData} stateChanger={stateChanger} />
        )
    }

    if(state.view === "graph"){
        return(
            <GraphSpace graphData={graphData}/>
        )
    }
    
    return(
        <>
            <div className="DealTableHeader">
                {state.tableName}
                <div className="actions">
                    <EditTable table_id={state.tableID}/>
                    <DeleteTable state={state}/>
                </div>
            </div>
            <DealTableShell workspaceState={state}/>
        </>
    )
}

export default MainComponent;