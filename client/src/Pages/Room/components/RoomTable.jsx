
import "./RoomTable.css";

export const Table = ({rows, stateChanger}) => {
  return (
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th className="expand">Description</th>
            {/* <th>Type</th> */}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            return (
              <tr key={idx} onClick={() => {
                stateChanger({view: "table", tableID: row.id, tableName: row.name})
                }}>
                <td>{row.name} </td>
                <td> {row.description}</td>
                {/* <td>{row.type}</td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
  );
};

export default Table;