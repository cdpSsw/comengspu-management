import React, { useRef, useEffect } from "react";

import Emblem from '../DAssets/emblem/emblem_red_white.png'
import EmblemUniver from '../DAssets/emblem/emblem_uni.png'
import "../public/main.css";

import Header from "./homeComp/Header";
import Highlight from "./homeComp/Highlight";
import HC_Showcase from "./homeComp/hc_Showcase";
import HC_ShowTiktok from "./homeComp/hc_Showtiktok";
import HC_YoutubeReview from "./homeComp/hc_YoutubeReview";
import HC_StudyPlan from "./homeComp/hc_StudyPlan";
import HC_Team from "./homeComp/hc_Team";

const Homepages = () => {
  
  useEffect(() => {
    document.title = "Homepage | Comen - SPU";
  }, []);

  const scrollTo = (section) => {
    const element = document.getElementById(section);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };  

  return (
    <main className="homp-container">
      <section id="hc-header">
        <Header />
      </section>

      <section id="hc-highlight">
        <Highlight />
      </section>

      <section id="hc-showcase">
        <HC_Showcase />
      </section>

      <section id="hc-tiktok">
        <HC_ShowTiktok />
      </section>

      <section id="hc-studyplan">
        <HC_StudyPlan />
      </section>

      <section id="hc-studyplan">
        <HC_YoutubeReview />
      </section>

      <section id="hc-team">
        <HC_Team />
      </section>

      {/* <section className='hc-footer-container'>
        <section className="top-container">

          <section className="emblem-container">
            <img src={Emblem} alt="Computer Engineering Emblem" />
            <img src={EmblemUniver} alt="Sripatum University Emblem" />
          </section>
        </section>

        <section className="btn-container">
          <button className="btn" onClick={() => scrollTo('hc-header')}>Header</button>
          <button className="btn" onClick={() => scrollTo('hc-highlight')}>Highlight</button>
          <button className="btn" onClick={() => scrollTo('hc-showcase')}>Showcase</button>
          <button className="btn" onClick={() => scrollTo('hc-tiktok')}>Showcase (Tiktok)</button>
          <button className="btn" onClick={() => scrollTo('hc-team')}>Team</button>
        </section>

        <div className="hr"></div>

        <section className="btn-social-container">
          <a className="social" href="https://www.facebook.com/spu.informatics" target="_blank">FACEBOOK</a>
          <a className="social" href="https://www.tiktok.com/@it_spu" target="_blank">TIKTOK</a>
        </section>

      </section> */}

    </main>
  );
};

export default Homepages;
