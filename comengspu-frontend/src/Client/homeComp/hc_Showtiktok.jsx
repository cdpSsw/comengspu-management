import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Navigation,
  Pagination,
  EffectCoverflow,
} from "swiper/modules";

import "swiper/scss";
import "swiper/scss/pagination";
import "swiper/scss/navigation";
import "swiper/scss/effect-coverflow";

import Orb from "../components/Orb";
import Particles from "../components/Particles";
import SplitText from "../components/SplitText";

import Axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const hc_Showtiktok = () => {
  // ------------------------------------------ GET SELECTED SHOWTIKTOK ----------------------------------------

  const [showTiktok_info, setShowTiktokInfo] = useState([]);
  const handleTiktokInfo = async () => {
    try {
      const res = await Axios.get(`${API_URL}/info/showTiktok`);
      if (res.status === 200) setShowTiktokInfo(res.data);
      else alert(`Get *ShowTiktok Failed.`);
    } catch (err) {
      alert(`[ShowTiktok] Internal server ${err}`);
    }
  };

  useEffect(() => {
    handleTiktokInfo();
  }, []);

  const [showTiktok, setShowTiktok] = useState([]);
  // console.log(showTiktok);
  const handleSelectedShowTiktok = async () => {
    try {
      const res = await Axios.get(`${API_URL}/studentShowTiktok/selected`);
      if (res.status === 200) setShowTiktok(res.data);
      else {
        alert(`Get Selected ShowTiktok Failed.`);
      }
    } catch (err) {
      alert(`Internal server ${err}`);
    }
  };

  // useEffect(() => {
  //   handleSelectedShowTiktok();
  // }, []);

  useEffect(() => {
    // document.title = "Showcase (Tiktok) | Comen - SPU";
    handleSelectedShowTiktok();
    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Load Tiktok
  // useEffect(() => {
  //   const scriptId = "tiktok-embed-script";
  //   if (!document.getElementById(scriptId)) {
  //     const script = document.createElement("script");
  //     script.id = scriptId;
  //     script.src = "https://www.tiktok.com/embed.js";
  //     script.async = true;
  //     document.body.appendChild(script);
  //   }
  // }, []);

  // ------------------------------------------ ANIMATE ---------------------------------------------------------------
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <main className="client-showTiktok-container">
      <article className="top-container">
        {showTiktok_info.map((info, idx) => (
          <section className="top-card" key={idx}>
            <h1 className="topic">
              <SplitText
                text={info.topic}
                delay={50}
                animationFrom={{
                  opacity: 0,
                  transform: "translate3d(0,80px,0)",
                }}
                animationTo={{
                  opacity: 1,
                  transform: "translate3d(0,0,0)",
                }}
                easing="easeOutCubic"
                threshold={0.2}
                rootMargin="-20px"
              />
            </h1>

            <section className="desc-container">
              <p className="desc">{info.description}</p>
            </section>
          </section>
        ))}
      </article>

      <article className="desktop content-container">
        {showTiktok.map((showTiktokItem, idx) => (
          <section key={idx} className="showTT-card">
            <section
              className="content-tiktok mx-5"
              key={idx}
              dangerouslySetInnerHTML={{ __html: showTiktokItem.embed }}
            />
          </section>
        ))}
      </article>

      <article className="mobile content-container">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          spaceBetween={0}
          centeredSlides={true}
          slidesPerView={1}
          initialSlide={1}
          autoplay={{ delay: 5500, disableOnInteraction: false }}
          coverflowEffect={{
            rotate: -30,
            stretch: 0,
            depth: 0,
            modifier: 1,
            slideShadows: false,
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          className="swiper-desktop"
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
        >
          {showTiktok.map((showTiktokItem, idx) => (
            <SwiperSlide key={idx}>
              <section className="content-card">
                <section
                  className="content-tiktok mx-5"
                  dangerouslySetInnerHTML={{ __html: showTiktokItem.embed }}
                />
              </section>
            </SwiperSlide>
          ))}
        </Swiper>
      </article>

      <Particles
        particleColors={["#2C2C2C", "#2C2C2C"]}
        particleCount={300}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={false}
        alphaParticles={false}
        disableRotation={false}
      />
      <Orb
        hue={250}
        hoverIntensity={0}
        rotateOnHover={false}
        forceHoverState={true}
      />
    </main>
  );
};

export default hc_Showtiktok;
