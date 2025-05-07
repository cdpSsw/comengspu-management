import React from "react";

import Emblem from "../../DAssets/emblem/emblem_red_white.png";
import EmblemUniver from "../../DAssets/emblem/emblem_uni.png";

const Footer = () => {
  return (
    <main className="client-footer-container">
      <section className="top-container">
        {/* <h1 className="comen-text">Computer Engineering</h1>
              <h1 className="spu-text">Sripatum University</h1> */}

        <section className="emblem-container">
          <img src={Emblem} alt="Computer Engineering Emblem" />
          <img src={EmblemUniver} alt="Sripatum University Emblem" />
        </section>
      </section>

      <section className="btn-container">
        <button className="btn" onClick={() => scrollTo("hc-header")}>
          Header
        </button>
        <button className="btn" onClick={() => scrollTo("hc-highlight")}>
          Highlight
        </button>
        <button className="btn" onClick={() => scrollTo("hc-showcase")}>
          Showcase
        </button>
        <button className="btn" onClick={() => scrollTo("hc-tiktok")}>
          Showcase (Tiktok)
        </button>
        <button className="btn" onClick={() => scrollTo("hc-team")}>
          Team
        </button>
      </section>

      <div className="hr"></div>

      <section className="btn-social-container">
        <a
          className="social"
          href="https://www.facebook.com/spu.informatics"
          target="_blank"
        >
          FACEBOOK
        </a>
        <a
          className="social"
          href="https://www.tiktok.com/@it_spu"
          target="_blank"
        >
          TIKTOK
        </a>
      </section>
    </main>
  );
};

export default Footer;
