import React, { useState } from "react";
import DataTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

const columns = [
  {
    dataField: "id",
    text: "ID",
    sort: true,
  },
  {
    dataField: "name",
    text: "Name",
    sort: true,
  },
  {
    dataField: "email",
    text: "Email",
    sort: true,
  },
];

const data = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
  },
];

const App = () => {
  const [datatableData, setDatatableData] = useState(data);

  const handleAddRow = (newRow) => {
    setDatatableData([...datatableData, newRow]);
  };

  const handleUpdateRow = (newRow, rowIndex) => {
    const updatedData = [...datatableData];
    updatedData[rowIndex] = newRow;
    setDatatableData(updatedData);
  };

  const handleDeleteRow = (rowIndex) => {
    const updatedData = [...datatableData];
    updatedData.splice(rowIndex, 1);
    setDatatableData(updatedData);
  };

  const cellEditProps = {
    mode: "click",
    blurToSave: true,
    afterSaveCell: (newValue, oldValue, row, column) => {
      handleUpdateRow(row, row.id - 1);
    },
  };

  const selectRow = {
    mode: "checkbox",
    clickToSelect: true,
    onSelect: (row, isSelect, rowIndex, e) => {
      console.log(row, isSelect, rowIndex, e);
    },
    onSelectAll: (isSelect, rows, e) => {
      console.log(isSelect, rows, e);
    },
  };

  return (
    <div className="container">
      <DataTable
        keyField="id"
        data={datatableData}
        columns={columns}
        cellEdit={cellEditFactory(cellEditProps)}
        selectRow={selectRow}
        striped
        hover
        condensed
        bordered
      />
      <button
        className="btn btn-primary"
        onClick={() => handleAddRow({ id: datatableData.length + 1 })}
      >
        Add Row
      </button>
      <button
        className="btn btn-danger"
        onClick={() => handleDeleteRow(datatableData.length - 1)}
      >
        Delete Row
      </button>
    </div>
  );
};

export default App;
