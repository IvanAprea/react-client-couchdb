import { useContext, useState, useEffect } from "react";
import "./style.css";
import { DataBaseContext } from "../../context/dbContext";

const DBInfo = (props: { setDoc: ({}: any) => void }) => {
  const { setDoc } = props;
  const { dbLocal } = useContext(DataBaseContext);
  const [dbData, setDbData] = useState<any>([]);

  const fetchDocs = () => {
    dbLocal
      .allDocs({ include_docs: true })
      .then((res) => {
        console.log(res);
        setDbData(res.rows);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const handleClick = () => {
    fetchDocs();
  };

  return (
    <div className="table-container">
      <table>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Lastname</th>
          <th>Age</th>
          <th>Select</th>
        </tr>
        {dbData &&
          dbData.map((row: any, index: number) => {
            const { _id, name, apellido, age } = row.doc;
            return (
              <tr key={index}>
                <td>{_id || "-"}</td>
                <td>{name || "-"}</td>
                <td>{apellido || "-"}</td>
                <td>{age || "-"}</td>
                <td>
                  <input
                    type="radio"
                    name="select"
                    onClick={() => setDoc(row.doc)}
                  />
                </td>
              </tr>
            );
          })}
      </table>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button onClick={handleClick}>Refresh table</button>
      </div>
    </div>
  );
};

export default DBInfo;
