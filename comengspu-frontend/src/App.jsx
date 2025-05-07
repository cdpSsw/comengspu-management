import React, { useEffect, useRef, useState } from "react";
import Axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const App = () => {
  const [headerInfo, setHeaderInfo] = useState([]);
  console.log(headerInfo);

  const handleHeaderInfo = async () => {
    try{
      const res = await Axios.get(`${API_URL}/info/header`);
      console.log('res.data: ', res.data)
      setHeaderInfo(res.data);

    } catch(err){
      alert(`[Header] Internal Server Error: ${err.message}`);
    }
  }

  useEffect(() => {

    handleHeaderInfo();
  }, []);

  return (
    <>
    <h1>TEST API</h1>
    {headerInfo.map((header, idx) => (
      <section key={idx}>
        <section className="btn-container">
          <button className="btn apply-to-study-btn">
            <a 
              href={header.apply_to_study} 
              target="_blank" 
              className="text-decoration-none text-white"
            >
              สมัครเรียน
            </a>
          </button>
          <button className="btn scholarship-btn">
            <a 
              href="https://www.spu.ac.th/scholarship2568/" 
              target="_blank" 
              className="text-decoration-none text-white"
            >
              ทุนการศึกษา
            </a>
          </button>
        </section>
        <section className="text-container" key={idx}>
          <h1>{header.title_th}</h1>
          <h1>{header.title_en1}</h1>
          <h1>{header.title_en2}</h1>

          <section className="desc-container">
            <p className="desc">{header.description}</p>
          </section>
        </section>
      </section>
    ))}
    </>
  );
};

export default App;