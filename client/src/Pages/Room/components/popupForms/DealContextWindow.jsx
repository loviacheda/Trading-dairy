import styled, { css } from "styled-components";
import EditDeal from "./EditDeal";
import DeleteDeal from "./DeleteDeal";

export default function DealContextWindow({top, left, setClicked, table_id, row_id}){
    const ContextMenu = styled.div`
    position: absolute;
    width: 110px;
    background-color: #383838 !important;
    color: #FFFFFF !important;
    border-radius: 5px;
    box-sizing: border-box;
    font-size: small;
    padding: 0px !important;
    ${({ top, left }) => css`
        top: ${top}px !important;
        left: ${left}px !important;
    `}
    ul {
        padding-left: 0px;
        box-sizing: border-box;
        margin: 0;
        list-style: none;
    }
    ul li {
        padding: 5px 10px;
        border-radius: 5px;
    }
    /* hover */
    ul li:hover {
        cursor: pointer;
        background-color: #000000;
    }
    `;
    return(
        <div className="context-m">
        <ContextMenu top={top} left={left}>
          <ul id="deal-context-menu">
            <li><EditDeal setClicked={setClicked} table_id={table_id} row_id={row_id}/></li>
            <li><DeleteDeal setClicked={setClicked} table_id={table_id} row_id={row_id}/></li>
          </ul>
        </ContextMenu>
        </div>
    )
}