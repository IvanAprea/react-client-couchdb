import React, { createContext, ReactNode, useState } from "react";
import PouchDB from "pouchdb";

interface IContext {
  dbLocal: PouchDB.Database;
}

const DataBaseContext = createContext({} as IContext);

const DataBaseContextProvider = ({ children }: { children: ReactNode }) => {
  const dbDocker = new PouchDB("http://localhost:5984/ivan-aprea", {
    auth: { username: "admin", password: "admin" },
  });
  const dbLocal = new PouchDB('ivan-aprea');

  dbLocal.sync(dbDocker, {
    live: true, // mantiene conexión abierta
    retry: true, // si se cae la conexión vuelve a intentar conectarse
  })
    .on("change", (change) => {
      if (change.direction === "push") {
        console.log(`Se envio un cambio:`, change.change.docs);
      } else {
        console.log(`Se recibio un nuevo cambio: `, change.change.docs);
      }
    })
    .on("error", function (err: any) {
      console.log("sync error", err);
    });

  return (
    <DataBaseContext.Provider
      value={{
        dbLocal: dbLocal,
      }}
    >
      {children}
    </DataBaseContext.Provider>
  );
};

export { DataBaseContext, DataBaseContextProvider };
