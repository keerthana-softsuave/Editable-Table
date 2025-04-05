import React, { useState } from "react";
import { Button, TextField } from '@mui/material';

const EditableTable = ({ data, columns, onEdit, onDelete }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEditClick = (index, row) => {
    setEditIndex(index);
    setEditData({ ...row });
  };

  const handleSaveClick = () => {
    onEdit(editIndex, editData);
    setEditIndex(null);
  };

  const handleChange = (key, value) => {
    setEditData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div style={{ overflowX: "auto", padding: "20px" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead style={{ backgroundColor: "#f5f5f5" }}>
          <tr>
            {columns?.map((col) => (
              <th
                key={col.key}
                // style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid #ccc" }}
              >
                {col.label}
              </th>
            ))}
            <th style={{ padding: "8px", borderBottom: "1px solid #ccc" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((row, index) => (
            <tr key={index} style={{ borderBottom: "1px solid #eee" }}>
              {columns?.map((col) => (
                <td key={col.key} style={{ padding: "8px" }}>
                  {editIndex === index ? (
                    <TextField
                      size="small"
                      value={editData[col.key] ?? ""}
                      onChange={(e) => handleChange(col.key, e.target.value)}
                      variant="outlined"
                    />
                  ) : (
                    row[col.key]
                  )}
                </td>
              ))}
              <td style={{ padding: "8px" }}>
                {editIndex === index ? (
                  <>
                    <Button onClick={handleSaveClick} variant="contained" size="small" style={{ marginRight: "5px" }}>
                      Save
                    </Button>
                    <Button
                      onClick={() => setEditIndex(null)}
                      variant="outlined"
                      size="small"
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => handleEditClick(index, row)}
                      variant="contained"
                      size="small"
                      style={{ marginRight: "5px" }}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => onDelete(index)}
                      variant="contained"
                      color="error"
                      size="small"
                    >
                      Delete
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditableTable;
