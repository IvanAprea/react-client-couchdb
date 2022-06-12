import React, { useState } from "react";
import DBInfo from "../components/DBInfo/DBInfo";
import UserForm from "../components/UserForm/UserForm";
import "./style.css";
import { DataBaseContextProvider } from "../context/dbContext";

const Home = () => {
  const [doc, setDoc] = useState({});
  return (
    <DataBaseContextProvider>
      <div className="home-container">
        <DBInfo setDoc={setDoc} />
        <UserForm doc={doc} />
      </div>
    </DataBaseContextProvider>
  );
};

export default Home;
