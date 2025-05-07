import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

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

import SplitText from "../components/SplitText";

import Axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

const hc_Showcase = () => {
  // Overlay
  const [selectedImg, setSelectedImg] = useState("");

  const showcase_infoA = [
    { topic: "Our Showcase" },
    {
      desc: "เวทีแสดงศักยภาพ ความคิดสร้างสรรค์ และผลงานสุดโดดเด่นจากนักศึกษามหาวิทยาลัยศรีปทุม ที่นี่คือพื้นที่สำหรับการนำเสนอไอเดีย แรงบันดาลใจ และความสามารถของนักศึกษาผ่านผลงานที่หลากหลาย",
    },
  ];

  const [showcase_info, setShowcaseInfo] = useState([]);
  // console.log(showcase_info)
  const handleCaseInfo = async () => {
      try {
        const res = await Axios.get(`${API_URL}/info/showcase`);
        if (res.status === 200) setShowcaseInfo(res.data);
        else alert(`Get *Showcase Failed.`);
      } catch (err) {
        alert(`[Showcase] Internal server ${err}`);
      }
    };

  useEffect(() => { handleCaseInfo(); }, [])

  // ------------------------------------------ GET SELECTED SHOWCASE ----------------------------------------
  const [showcase, setShowcase] = useState([]);
  const handleSelectedShowcase = async () => {
    try {
      const res = await Axios.get(`${API_URL}/studentShowcase/selected`);
      if (res.status === 200) setShowcase(res.data);
      else {
        alert(`Get Selected Showcase Failed.`);
      }
    } catch (err) {
      alert(`[Selected-Showcase] Internal server ${err}`);
    }
  };

  useEffect(() => {
    handleSelectedShowcase();
  }, []);

  const [images, setImages] = useState([]);
  // console.log(images)
  const handleGetImages = async () => {
    try {
      const res = await Axios.get(`${API_URL}/studentShowcase/images`, {
        withCredentials: true,
      });
      // console.log("res", res.data);

      if (res.status === 200) {
        setImages(res.data);
      } else {
        alert(`Error to get Showcase, for this id: ${id}`);
      }
    } catch (err) {
      alert(`Internal server ${err}`);
    }
  };

  useEffect(() => {
    handleGetImages();
  }, []);

  // ----------------------------------------------- ANIMATE----------- -----------------------------------------

  const [activeIndex, setActiveIndex] = useState(0);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const imgRefs = useRef([]);
  const text1Refs = useRef([]);
  const text2Refs = useRef([]);

  useEffect(() => {
    if (
      !imgRefs.current.length ||
      !text1Refs.current.length ||
      !text2Refs.current.length
    )
      return;
  
    imgRefs.current.forEach((img, idx) => {
      if (!img) return;
  
      gsap.to(img, {
        scale: idx === activeIndex ? 1 : 0.8,
        filter: idx === activeIndex ? "grayscale(0)" : "grayscale(100%)",
        duration: 0.3,
      });
  
      if (text1Refs.current[idx]) {
        gsap.to(text1Refs.current[idx], {
          opacity: idx === activeIndex ? 1 : 0,
          y: idx === activeIndex ? 0 : 100,
          duration: 0.6,
          ease: "power2.inOut",
        });
      }
  
      if (text2Refs.current[idx]) {
        gsap.to(text2Refs.current[idx], {
          opacity: idx === activeIndex ? 1 : 0,
          y: idx === activeIndex ? 0 : -100,
          duration: 0.6,
          ease: "power2.inOut",
        });
      }
    });
  }, [activeIndex, showcase]); // 👉 add showcase as a dependency
  
  const [swiperReady, setSwiperReady] = useState(false);

  useEffect(() => {
    if (prevRef.current && nextRef.current) {
      setSwiperReady(true);
    }
  }, [prevRef.current, nextRef.current]);

  return (
    <main className="client-showcase-container">
      <article className="top-container row m-0">
        <section className="top-left col-md-8">
          {showcase_info.map((info, idx) => (
            <section className="text-top-box" key={idx}>
              <h1 className="topic">
                <SplitText
                  text={info.topic}
                  delay={50}
                  animationFrom={{
                    opacity: 0,
                    transform: "translate3d(0, 80px, 0)",
                  }}
                  animationTo={{
                    opacity: 1,
                    transform: "translate3d(0, 0, 0)",
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
        </section>

        <section className="top-right col-md-4">
          <button ref={prevRef} className="btn btn-prev">
            <i className="bi bi-arrow-left"></i>
          </button>
          <button ref={nextRef} className="btn btn-next">
            <i className="bi bi-arrow-right"></i>
          </button>
        </section>
      </article>

      <article className="content-container">
        {swiperReady && (
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            spaceBetween={0}
            centeredSlides={true}
            slidesPerView={3}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 10,
              }
            }}
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
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
          >
            {showcase.map((showcaseItem, idx) => {
              const showcaaseImages = images.filter(
                (img) => img.id === showcaseItem.id
              );
              return (
                <SwiperSlide key={idx}>
                  <section className="content-swiper">
                    {showcaaseImages.length > 0 && (
                      <img
                        ref={(el) => (imgRefs.current[idx] = el)}
                        key={showcaseItem.id}
                        src={showcaaseImages[0].image}
                        alt={`img-${showcaaseImages[0].id}`}
                        className="content-img"
                        onClick={() => setSelectedImg(showcaaseImages[0])}
                      />
                    )}
                    <section className="text-container">
                      <section className="topic-container">
                        <h1
                          ref={(el) => (text1Refs.current[idx] = el)}
                          className="topic"
                        >
                          {showcaseItem.topic}
                        </h1>
                      </section>

                      <section className="desc-container">
                        <p
                          ref={(el) => (text2Refs.current[idx] = el)}
                          className="desc"
                        >
                          {showcaseItem.description}
                        </p>
                      </section>
                    </section>
                  </section>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </article>

      {selectedImg && (
        <div className="overlay" onClick={() => setSelectedImg(null)}>
          <div className="overlay-content">
            <span className="close-btn" onClick={() => setSelectedImg(null)}>
              &times;
            </span>
            <img
              src={selectedImg.image}
              // src={`/images/stu_showcase/${selectedImg}`}
              alt="Preview"
              className="original-img"
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default hc_Showcase;
