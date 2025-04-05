import React, { useState } from "react";
import EditableTable from "./EditableTable";
import _ from "lodash";
import "./Datasource.css";

const initialData = [
  { name: "Alice", age: 25, role: "Developer" },
  { name: "Bob", age: 30, role: "Designer" },
];

const columns = [
  { key: "name", label: "Name" },
  { key: "age", label: "Age" },
  { key: "role", label: "Role" },
];

const App = () => {
  const [data, setData] = useState(initialData);
  const [userData, setUserData] = useState({
    name: "",
    age: "",
    role: "",
  });

  const handleEdit = (index, updatedRow) => {
    const newData = [...data];
    newData[index] = updatedRow;
    setData(newData);
  };

  const handleDelete = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  const handleOnChange = (e) => {
    // console.log(e.target.value)
    let { name, value } = e.target;
    // console.log(name, value)
    value = _.isUndefined(value) ? "-" : value;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //initialData.push(userData);
    console.log(initialData);
    setData([...data, userData]);
    setUserData({ name: "", age: "", role: "" })
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4"> User Data </h1>

      <form>
        <input
          type="text"
          placeholder="Enter Name"
          name="name"
          onChange={handleOnChange}
          value={userData.name}

        />
        <input
          type="text"
          placeholder="Enter Age"
          name="age"
          onChange={handleOnChange}
          value={userData.age}
        />
        <input
          type="text"
          placeholder="Enter Role"
          name="role"
          onChange={handleOnChange}
          value={userData.role}
        />
        <button type="submit" onClick={handleSubmit}>
          Add User
        </button>
      </form>

      <EditableTable
        data={data}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default App;
