import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Hyperspeed from "../components/Hyperspeed";
import DecryptedText from "../components/DecryptedText";

import Axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

const Header = () => {
  const lineRef = useRef(null);
  const starRef = useRef(null);
  const headerInfoA = [
    {
      titleTH: "วิศวกรรมคอมพิวเตอร์",
      titleEN1: "COMPUTER",
      titleEN2: "ENGINEERING",
      description:
        "สร้างอนาคตด้วยเทคโนโลยีอัจฉริยะและ IoT มุ่งเน้นการเรียนรู้และพัฒนา Internet of Things (IoT), ระบบสมองกลฝังตัว และเครือข่ายอัจฉริยะ",
    },
  ];

  const [headerInfo, setHeaderInfo] = useState([]);
  // console.log(headerInfo);

  const handleHeaderInfo = async () => {
    try {
      const res = await Axios.get(`${API_URL}/info/header`);
      if (res.status === 200) {
        const updateTitle = res.data.map((item) => {
          const { title_en1, title_en2 } = fixedTitle(item.title_en);
          return {
            ...item,
            title_en1,
            title_en2
          };
        });
  
        setHeaderInfo(updateTitle);
      } else {
        alert(`Get *Header Failed.`);
      }
    } catch (err) {
      alert(`[Header] Internal server ${err}`);
    }
  };
  
  const fixedTitle = (title_en) => {
    const [title_en1, title_en2] = title_en.split(" ");
    return { title_en1, title_en2 };
  };
  
  useEffect(() => {
    handleHeaderInfo();

    if (lineRef.current && starRef.current) {
      const lineTL = gsap.timeline();
      lineTL.fromTo(
        lineRef.current,
        { strokeDasharray: 350, strokeDashoffset: 500 },
        { strokeDashoffset: 0, duration: 0.6 }
      );
  
      lineTL.fromTo(
        lineRef.current,
        { strokeDasharray: 0 },
        { strokeDashoffset: 500, strokeDasharray: 420, duration: 0.6 },
        "+=3"
      );
  
      const starTL = gsap.timeline();
      starTL.fromTo(
        starRef.current,
        { scale: 0, rotateZ: -360 },
        { scale: 1, rotateZ: 0, duration: 3, ease: "elastic.out" }
      );
  
      starTL.fromTo(
        starRef.current,
        { scale: 1, rotate: 0 },
        { scale: 0, rotate: 360, duration: 2, ease: "elastic.inOut" },
        "+=1"
      );
    }
  }, []);
  
  return (
    <main className="header-container">
      <article className="header-content">
        {headerInfo.map((header, idx) => (
          <section key={idx}>
            <section className="btn-container">
              <button className="btn apply-to-study-btn">
                <a 
                  href={header.link_apply_to_study} 
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
              <h1 className="title title-TH">{header.title_th}</h1>
              <h1 className="title title-EN">

                <DecryptedText
                  text={header.title_en1}
                  animateOn="view"
                  speed={60}
                  maxIterations={25}
                  characters=";?e2e9-0adpw,wd/D;,w;ppfkw"
                  revealDirection="center"
                />

              </h1>
              <h1 className="title title-EN">
                <DecryptedText
                  text={header.title_en2}
                  animateOn="view"
                  speed={60}
                  maxIterations={25}
                  characters=";?e2e9-0adpw,wd/D;,w;ppfkw"
                  revealDirection="center"
                />
              </h1>
              <section className="desc-container">
                <p className="desc">{header.description}</p>
              </section>
            </section>
          </section>
        ))}
      </article>

      <Hyperspeed
        effectOptions={{
          onSpeedUp: () => {},
          onSlowDown: () => {},
          distortion: "turbulentDistortion",
          length: 400,
          roadWidth: 10,
          islandWidth: 2,
          lanesPerRoad: 4,
          fov: 90,
          fovSpeedUp: 150,
          speedUp: 2,
          carLightsFade: 0.4,
          totalSideLightSticks: 20,
          lightPairsPerRoadWay: 40,
          shoulderLinesWidthPercentage: 0.05,
          brokenLinesWidthPercentage: 0.1,
          brokenLinesLengthPercentage: 0.5,
          lightStickWidth: [0.12, 0.5],
          lightStickHeight: [1.3, 1.7],
          movingAwaySpeed: [60, 80],
          movingCloserSpeed: [-120, -160],
          carLightsLength: [400 * 0.03, 400 * 0.2],
          carLightsRadius: [0.05, 0.14],
          carWidthPercentage: [0.3, 0.5],
          carShiftX: [-0.8, 0.8],
          carFloorSeparation: [0, 5],
          colors: {
            roadColor: 0x080808,
            islandColor: 0x0a0a0a,
            background: 0x000000,
            shoulderLines: 0xffffff,
            brokenLines: 0xffffff,
            leftCars: [0xb21010, 0xb21010, 0xb21010],
            rightCars: [0xffffff, 0xb21010, 0xffffff],
            sticks: 0xb21010,
          },
        }}
      />
    </main>
  );
};

export default Header;
