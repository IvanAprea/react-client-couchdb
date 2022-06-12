import React, { useState, useContext } from "react";
import "./style.css";
import { DataBaseContext } from "../../context/dbContext";

const UserForm = (props: any) => {
  const { doc } = props;
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [age, setAge] = useState<number>();
  const { dbLocal } = useContext(DataBaseContext);

  const handleInsert = () => {
    dbLocal
      .post({ name: name, apellido: lastname, age: age })
      .then((res: any) => {
        console.log(`Se envio:`, res);
      })
      .catch((error: any) => console.log(error));
  };

  const handleInputChange = (target: any) => (event: any) => {
    target(event.target.value);
  };

  const handleUpdate = () => {
    if (doc._id) {
      console.log(doc);
      console.log({ _id: doc._id, name: name, apellido: lastname, age: age });
      dbLocal
        .put({
          _id: doc._id,
          _rev: doc._rev,
          name: name,
          apellido: lastname,
          age: age,
        })
        .then((res) => console.log("Se actualizo: ", res))
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="container">
      <div className="input-container">
        <label>Nombre</label>
        <input
          onChange={handleInputChange(setName)}
          placeholder="Insert username"
        />
        <label>Apellido</label>
        <input
          onChange={handleInputChange(setLastname)}
          placeholder="Insert lastname"
        />
        <label>Edad</label>
        <input onChange={handleInputChange(setAge)} placeholder="Insert age" />
      </div>
      <div className="button-container">
        <button onClick={handleUpdate}>Modify user</button>
        <button onClick={handleInsert}>Insert user</button>
      </div>
    </div>
  );
};

export default UserForm;
