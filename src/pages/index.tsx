import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import styles from "../styles/Home.module.css";

interface ArrayType {
  nisn: string;
  nama: string;
  tempat: string;
  tenggal: string;
  pekern: string;
  telepon: string;
  ketgan: string;
}
const Home: NextPage = () => {
  const [file, setFile] = React.useState<Blob>({} as Blob);
  const [array, setArray] = React.useState<ArrayType[] | any>();
  const [expoArr, setExpoArr] = React.useState<[] | any>([]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files![0]);
  };

  // --- IMPORT BY SELECTING FILE ---
  const csvFileToArray = (string: string) => {
    var csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
    csvRows.pop();
    const array = csvRows.map((i) => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object: string | any, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });
    setArray(array);
  };

  // --- DELETE AN ARRAY ---
  const onDelete = (id: string) => {
    const oldArray = array;
    const newArray = oldArray.filter((arr: ArrayType) => id !== arr.nisn);
    setArray(newArray);
  };

  // --- ON SUBMIT / IMPORT BTN ---
  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fileReader = new FileReader();
    fileReader.readAsText(file);

    if (file) {
      fileReader.onload = (event: ProgressEvent<FileReader>) => {
        const text: string | any = event.target?.result?.toString();
        csvFileToArray(text);
      };
    }
  };

  // --- HEADERS FOR TABLE ---
  let headerKeys: [] | any;
  if (array) headerKeys = Object.keys(Object.assign({}, ...array));

  // --- EXPORTING
  const exportCsv = () => {
    let exportArr: any = [];

    // --- PUSH HEAD
    for (var value in array[0]) {
      exportArr.push(value);
    }

    // --- PUSH VALUES
    for (let i = 0; i < array.length; i++) {
      let objValues = Object.values(array[i]);
      exportArr.push(objValues);
    }

    // --- ADD ALL IN A STATE
    setExpoArr((p: any) => [...p, exportArr]);
  };

  console.log("expoArr", expoArr);
  return (
    <div>
      <Head>
        <title>CSV SHOW</title>
        <meta name="description" content=" UPLOAD CSV AND DONE" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ textAlign: "center" }}>
        <h1>REACTJS CSV IMPORT EXAMPLE </h1>
        <form className={styles.form} onSubmit={handleOnSubmit}>
          <input
            id={"csvFileInput"}
            type={"file"}
            accept={".csv"}
            onChange={handleOnChange}
          />
          <button type="submit">IMPORT CSV</button>
          <button onClick={exportCsv}> Expost </button>
        </form>

        <section className={styles.tableHold}>
          {headerKeys ? (
            <table className={styles.table}>
              <thead>
                <tr key={"header"}>
                  {headerKeys.map((key: string, i: any) => (
                    <th key={i}>{key}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {array.map((item: ArrayType) => (
                  <tr key={item.nisn}>
                    {Object.values(item).map((val: string | any, i: any) => (
                      <td key={i}> {val} </td>
                    ))}
                    <div
                      onClick={() => onDelete(item.nisn)}
                      className={styles.divD}
                    >
                      {" "}
                      D{" "}
                    </div>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className={styles.selectText}>
              <h1> Select CSV FILE and Import!</h1>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;
