import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [file, setFile] = React.useState<any | null>(null);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files![0]);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fileReader = new window.FileReader();

    if (file) {
      fileReader.onload = function (event) {
        const csvOutput = event.target!.result;
        console.log(csvOutput);
      };

      fileReader.readAsText(file);
    }
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
        <form onSubmit={handleOnSubmit}>
          <input
            id={"csvFileInput"}
            type={"file"}
            accept={".csv"}
            onChange={handleOnChange}
          />
          <button type="submit">IMPORT CSV</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
