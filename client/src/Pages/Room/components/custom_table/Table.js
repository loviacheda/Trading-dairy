import React, {useMemo, useState, useEffect} from "react";
import clsx from "clsx";
import {useTable, useFlexLayout, useResizeColumns, useSortBy} from "react-table";
import Cell from "./Cell";
import Header from "./Header";
import CreateDeal from "../popupForms/CreateDeal";
import DealContextWindow from "../popupForms/DealContextWindow";

const defaultColumn = {
  minWidth: 50,
  width: 150,
  maxWidth: 400,
  Cell: Cell,
  Header: Header,
  sortType: "alphanumericFalsyLast"
};

export default function Table({columns, data, dispatch: dataDispatch, skipReset, table_id}) {

  const [clicked, setClicked] = useState(false);
  const [points, setPoints] = useState({x: 0, y: 0});
  const [row_id, setRow_id] = useState(null);

  const sortTypes = useMemo(
    () => ({
      alphanumericFalsyLast(rowA, rowB, columnId, desc) {
        if (!rowA.values[columnId] && !rowB.values[columnId]) {
          return 0;
        }

        if (!rowA.values[columnId]) {
          return desc ? -1 : 1;
        }

        if (!rowB.values[columnId]) {
          return desc ? 1 : -1;
        }

        return isNaN(rowA.values[columnId])
          ? rowA.values[columnId].localeCompare(rowB.values[columnId])
          : rowA.values[columnId] - rowB.values[columnId];
      }
    }),
    []
  );

  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable(
    {
      columns,
      data,
      defaultColumn,
      dataDispatch,
      autoResetSortBy: !skipReset,
      autoResetFilters: !skipReset,
      autoResetRowState: !skipReset,
      sortTypes
    },
    useFlexLayout,
    useResizeColumns,
    useSortBy
  );

  function isTableResizing() {
    for (let headerGroup of headerGroups) {
      for (let column of headerGroup.headers) {
        if (column.isResizing) {
          return true;
        }
      }
    }
    return false;
  }

  useEffect(() => {
    const handleClick = (e) => {
      if(e.target.innerText !== "Edit" && e.target.innerText !== "Delete"){
        setClicked(false)
      }
    };
    document.getElementById('root').addEventListener("click", handleClick);
    return () => {
      document.getElementById('root').removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      <div {...getTableProps()} className={clsx("table", isTableResizing() && "noselect")}>
        <div>
          {headerGroups.map((headerGroup) => (
            <div {...headerGroup.getHeaderGroupProps()} className='tr'>
              {headerGroup.headers.map((column) => column.render("Header"))}
            </div>
          ))}
        </div>
        <div {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <div {...row.getRowProps()} className='tr' onContextMenu={(e) => {
                e.preventDefault(); 
                setPoints({
                  x: e.pageX,
                  y: e.pageY,
                });
                setRow_id(row.getRowProps().key.split('_')[1]);
                setClicked(true);            
                }}>
                {row.cells.map((cell) => (
                  <div {...cell.getCellProps()} className='td'>
                    {cell.render("Cell")}
                  </div>
                ))}
                
              </div>
            );
          })}
          {clicked && (
                  <DealContextWindow top={points.y} left={points.x} setClicked={setClicked} table_id={table_id} row_id={row_id}/>
                )}
          <CreateDeal table_id={table_id}/>
        </div>
      </div>
    </>
  );
}
