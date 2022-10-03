import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import toast from "react-hot-toast";
import styles from "../styles/Home.module.css";
import { CSVLink } from "react-csv";

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
  const [nisn, setNisn] = React.useState<string>("");
  const [value, setValue] = React.useState<string>("");

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
  const handleOnSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (file.type !== "text/csv") {
      return toast.error("Select The CSV File!");
    }

    // --- READ CSV FILE
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

  // --- CLICKED FIELD ---
  const clickedFeild = (nisn: string, val: string) => {
    setNisn(nisn);
    setValue(val);
  };

  // --- INPUT ON-CHANGE ---
  const onInputChange = (e: HTMLInputElement, nisn: string, val: string) => {
    const newArray = array;
    const filterd = array.filter((each: ArrayType) => nisn == each.nisn);
    const fil = () => {
      for (let i = 0; i < array.length; i++) {
        Object.keys(array[i]).find((key) => {
          console.log(array[i].key);

          console.log(array[key] == val);
        });
      }
    };
    console.log(fil());
  };
  return (
    <div>
      <Head>
        <title>CSV SHOW</title>
        <meta name="description" content=" UPLOAD CSV AND DONE" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ textAlign: "center" }}>
        <h1>REACTJS CSV IMPORT EXAMPLE </h1>
        <form className={styles.form}>
          <input
            id={"csvFileInput"}
            type={"file"}
            accept={".csv"}
            onChange={handleOnChange}
          />
          <button onClick={(e) => handleOnSubmit(e)}>IMPORT CSV</button>

          {array && (
            <span>
              <CSVLink target="_blank" data={array} enclosingCharacter={``}>
                Export
              </CSVLink>
            </span>
          )}

          <br></br>
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
                      <td onClick={() => clickedFeild(item.nisn, val)} key={i}>
                        {nisn == item.nisn && val == value ? (
                          <input
                            type="text"
                            onChange={(e) => onInputChange(e, item.nisn, val)}
                          />
                        ) : (
                          val
                        )}
                      </td>
                    ))}
                    <span
                      onClick={() => onDelete(item.nisn)}
                      className={styles.divD}
                    >
                      D
                    </span>
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
