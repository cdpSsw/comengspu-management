import React, { useEffect, useState } from "react";
import SpotlightCard from "../components/SpotlightCard";

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

import Axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const hc_StudyPlan = () => {
  const [studyPlan_info, setstudyPlanInfo] = useState([]);
  // console.log(studyPlan_info);

  const handlestudyPlanInfo = async () => {
    try {
      const res = await Axios.get(`${API_URL}/info/studyPlan`);
      if (res.status === 200) setstudyPlanInfo(res.data);
      else alert(`Get *studyPlan Failed.`);
    } catch (err) {
      alert(`[studyPlan] Internal server ${err}`);
    }
  };

  const [degree_info, setDegreeInfo] = useState([]);
  // console.log(degree_info);

  const handleDegreeInfo = async () => {
    try {
      const res = await Axios.get(`${API_URL}/info/degree`);
      if (res.status === 200) setDegreeInfo(res.data);
      else alert(`Get *degree Failed.`);
    } catch (err) {
      alert(`[dergee] Internal server ${err}`);
    }
  };

  const [careerPath_info, setCareerPathInfo] = useState([]);
  // console.log(careerPath_info);

  const handleCareerPathInfo = async () => {
    try {
      const res = await Axios.get(`${API_URL}/info/careerPath`);
      if (res.status === 200) {
        setCareerPathInfo(
          res.data.map((item) => {
            return {
              ...item,
              careerPathFormatted: (item.careerPaths || "").split(","),
              careerDescFormatted: (item.careerDescs || "").split(","),
            };
          })
        );
      } else alert(`Get *caeer-path Failed.`);
    } catch (err) {
      alert(`[caeer-path] Internal server ${err}`);
    }
  };

  useEffect(() => {
    handlestudyPlanInfo();
    handleDegreeInfo();
    handleCareerPathInfo();
  }, []);

  return (
    <main className="studyPlan-container">
      <div className="hr"></div>
      {studyPlan_info.map((studyPlan, idx) => (
        <article key={idx} className="studyPlan-box">
          <section className="topic-container">
            <h1 className="topic gsap-topic">{studyPlan.topic}</h1>
          </section>

          <section className="desc-container">
            <p className="desc">{studyPlan.description1}</p>
            <p className="desc">{studyPlan.description2}</p>
          </section>

          <span className="box-type">
            <h5 className="hashtag">#</h5>
            <h5 className="type">แผนการเรียน</h5>
          </span>
        </article>
      ))}

      <div className="hr2"></div>

      <article className="degree-careerp-container">
        <section className="degree-container">
          <h1 className="topic">ชื่อปริญญา</h1>
          {degree_info.map((deg, idx) => (
            <ul className="degree-box" key={idx}>
              <h5>ภาษาไทย (ชื่อเต็ม) : {deg.thDegree}</h5>
              <h5>(อักษรย่อ) : {deg.thAbbre}</h5>
              <h5>ภาษาอังกฤษ (ชื่อเต็ม) :{deg.enDegree}</h5>
              <h5>(อักษรย่อ) : {deg.enAbbre}</h5>
            </ul>
          ))}

          <h1 className="topic">ระยะเวลาการศึกษา หลักสูตร 4 ปี (ภาคปกติ)</h1>
          {degree_info.map((dt, idx) => (
            <ul className="dateTime-box" key={idx}>
              <h5>{dt.studyDateTime}</h5>
            </ul>
          ))}
        </section>

        <section className="careerp-container">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            spaceBetween={15}
            centeredSlides={true}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              1390: {
                slidesPerView: 3,
              },
            }}
            slidesPerView={3}
            initialSlide={1}
            autoplay={{ delay: 5500, disableOnInteraction: false }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 0,
              modifier: 1,
              slideShadows: false,
            }}
            // navigation={{
            //   prevEl: prevRef.current,
            //   nextEl: nextRef.current,
            // }}
            pagination={true}
            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
            className="swiper-desktop"
            // onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            // onBeforeInit={(swiper) => {
            //   swiper.params.navigation.prevEl = prevRef.current;
            //   swiper.params.navigation.nextEl = nextRef.current;
            // }}
          >
            {careerPath_info.map((cp, idx) =>
              cp.careerPathFormatted.map((item, idx) => (
                <SwiperSlide key={idx}>
                  <SpotlightCard
                    className="custom-spotlight-card"
                    spotlightColor="rgba(12, 31, 204, 0.2)"
                  >
                    <i className="bi bi-code-slash"></i>
                    <h5 className="career-path">{item}</h5>
                    {cp.careerDescFormatted[idx] && (
                      <h5 className="career-desc">
                        - {cp.careerDescFormatted[idx]}
                      </h5>
                    )}
                  </SpotlightCard>
                </SwiperSlide>
              ))
            )}
          </Swiper>
          <span className="box-type">
            <h5 className="hashtag">#</h5>
            <h5 className="type">Career Path</h5>
          </span>
        </section>
      </article>
    </main>
  );
};

export default hc_StudyPlan;
