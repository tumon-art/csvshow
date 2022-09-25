import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import styles from '../styles/Home.module.css'



const Home: NextPage = () => {
  const [file, setFile] = React.useState<object | null>(null);

  
  // const fileReader = new FileReader(); 
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
     setFile(e.target.files![0])
  };

  console.log(file)
  
  
  return (
    <div>
      <Head>
        <title>CSV SHOW</title>
        <meta name="description" content=" UPLOAD CSV AND DONE" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ textAlign: "center" }}>
            <h1>REACTJS CSV IMPORT EXAMPLE </h1>
            <form>

                <input type={"file"} accept={".csv"}   onChange={handleOnChange} />
                <button type='submit'>IMPORT CSV</button>
            </form>
        </div>
     
    </div>
  )
}

export default Home
