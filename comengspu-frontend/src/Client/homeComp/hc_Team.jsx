import React, { useEffect, useState, useRef } from "react";
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

import Modal from "../../EComponents/Modal";
import SplitText from "../components/SplitText";

import Axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

const hc_Team = () => {
  const team_infoA = [
    {
      topic: "Our Team",
      description:
        "ภาควิชาวิศวกรรมคอมพิวเตอร์ประกอบด้วยคณาจารย์ผู้ทรงคุณวุฒิที่มีความเชี่ยวชาญหลากหลายสาขา ทั้งด้านฮาร์ดแวร์ ซอฟต์แวร์ ระบบสมองกลฝังตัว เครือข่าย และปัญญาประดิษฐ์ ",
    },
  ];

  const [team_info, setOurTeamInfo] = useState([]);
  const handleOurTeamInfo = async () => {
    try {
      const res = await Axios.get(`${API_URL}/info/ourTeam`);
      if (res.status === 200) setOurTeamInfo(res.data);
      else alert(`Get *Our Team Failed.`);
    } catch (err) {
      alert(`[Our Team] Internal server ${err}`);
    }
  };

  useEffect(() => { handleOurTeamInfo(); }, [])

  const [selectedInfo, setSelectedInfo] = useState([]);
  const [selectedImage, setSelectedImage] = useState([]);

  const [team, setTeam] = useState([]);
  // console.log(team)
  const handelGetTeam = async () => {
    try {
      const res = await Axios.get(`${API_URL}/teams`, {
        withCredentials: true,
      });
      // console.log(res.data)
      if (res.status === 200) {
        setTeam(
          res.data.map((item) => {
            return {
              ...item,
              tels: (item.tel || "").split("/"),
              emails: (item.email || "").split("/"),
              websites: (item.website || "").split("/"),
              researchs: (item.research || "").split("/"),
              educations: (item.education || "").split("/"),
              expertises: (item.expertise || "").split("/"),
              expLocations: (item.expLocation || "").split("/"),
              expPositions: (item.expPosition || "").split("/"),
            };
          })
        );
      } else {
        alert(`Error to get team member.`);
      }
    } catch (err) {
      alert(`Internal server ${err}`);
    }
  };

  useEffect(() => {
    handelGetTeam();
  }, []);

  const [images, setImages] = useState([]);
  // console.log(images);
  const handleGetImages = async () => {
    try {
      const res = await Axios.get(`${API_URL}/teams/images`, {
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

  // ------------------------------------------ ANIMATE ---------------------------------------------------------------
  const [activeIndex, setActiveIndex] = useState(0);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const imgRefs = useRef([]);
  const text1Refs = useRef([]);
  const text2Refs = useRef([]);

  useEffect(() => {
    imgRefs.current.forEach((img, idx) => {
      gsap.to(img, {
        scale: idx === activeIndex ? 1 : 0.8,
        filter: idx === activeIndex ? "grayscale(0)" : "grayscale(100%)",
        duration: 0.3,
      });

      gsap.to(text1Refs.current[idx], {
        opacity: idx === activeIndex ? 1 : 0,
        y: idx === activeIndex ? 0 : 100,
        duration: 0.6,
        ease: "power2.inOut",
      });

      gsap.to(text2Refs.current[idx], {
        opacity: idx === activeIndex ? 1 : 0,
        y: idx === activeIndex ? 0 : -100,
        duration: 0.6,
        ease: "power2.inOut",
      });
    });
  }, [activeIndex]);

  return (
    <main className="client-team-container">
      {team_info.map((info, idx) => (
        <article key={idx} className="top-container">
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
          <p className="desc">{info.description}</p>
        </article>
      ))}

      <article className="desktop content-container row m-0">
        {team.map((teamItem, idx) => {
          const teamImages = images.filter((img) => img.id === teamItem.id);
          return (
            <section
              key={idx}
              className="col-md-3"
              data-bs-toggle="modal"
              data-bs-target="#modal-preview"
            >
              <section key={idx} className="content-card">
                {teamImages.length > 0 && (
                  <img
                    key={team.id}
                    src={teamImages[0].image}
                    alt={`img-${teamImages[0].id}`}
                    className="content-img"
                    onClick={() => [
                      setSelectedInfo(teamItem),
                      setSelectedImage(teamImages[0]),
                    ]}
                  />
                )}

                <section className="text-container">
                  <p className="position">{teamItem.position}</p>
                  <h1 className="name">{teamItem.name}</h1>
                </section>
              </section>
            </section>
          );
        })}
      </article>

      <section className="btn-prev-next-container">
        <button ref={prevRef} className="btn btn-prev">
          <i className="bi bi-arrow-left"></i>
        </button>
        <button ref={nextRef} className="btn btn-next">
          <i className="bi bi-arrow-right"></i>
        </button>
      </section>

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
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
        >
          {team.map((teamItem, idx) => {
            const teamImages = images.filter((img) => img.id === teamItem.id);
            return (
              <SwiperSlide key={idx}>
                <section
                  key={idx}
                  className="col-md-3"
                  data-bs-toggle="modal"
                  data-bs-target="#modal-preview"
                >
                  <section key={idx} className="content-card">
                    {/* <img
                    ref={(el) => (imgRefs.current[idx] = el)}
                    src={`/images/teams/${teamItem.image}`}
                    alt={teamItem.name}
                    className="swiper-img"
                    onClick={() => setSelectedInfo(teamItem)}
                  /> */}
                    {teamImages.length > 0 && (
                      <img
                        key={team.id}
                        src={teamImages[0].image}
                        alt={`img-${teamImages[0].id}`}
                        className="content-img w-100"
                        onClick={() => [
                          setSelectedInfo(teamItem),
                          setSelectedImage(teamImages[0]),
                        ]}
                      />
                    )}
                    <section className="text-container">
                      <section className="topic-container">
                        <p
                          ref={(el) => (text1Refs.current[idx] = el)}
                          className="position"
                        >
                          {teamItem.position}
                        </p>
                      </section>

                      <section className="desc-container">
                        <h1
                          ref={(el) => (text2Refs.current[idx] = el)}
                          className="name"
                        >
                          {teamItem.name}
                        </h1>
                      </section>
                    </section>
                  </section>
                </section>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </article>

      {/* Modal - Preview Info */}
      <Modal
        modalID="modal-preview"
        // modalHeaderStyle="d-none"
        // modalFooterStyle="d-none"
        // modalSize="modal-lg"
        modalHeaderStyle="preview-topic-container"
        modalTitleStyle="preview-topic"
        // modalTitle={selectedInfo.name}
        modalTitle={"Our Team"}
        modalBodyContent={
          <article className="client-preview-info">
            <img
              // src={selectedInfo.image}
              // src={`/images/teams/${selectedInfo.image}`}
              src={selectedImage.image}
              alt={selectedInfo.name}
              className="content-img"
            />

            <div className="personal-info-container">
              <p className="position">{selectedInfo.position}</p>
              <h6 className="name">{selectedInfo.name}</h6>
            </div>

            <div className="hr-line"></div>

            <div className="edu-container">
              <h6 className="edu-topic">วุฒิการศึกษา: </h6>
              {Array.isArray(selectedInfo.educations) ? (
                selectedInfo.educations.map((edu, idx) => (
                  <p key={idx} className="edu">
                    {edu}
                  </p>
                ))
              ) : (
                <p className="edu">{selectedInfo.educations}</p>
              )}
            </div>

            <div className="expt-container">
              {Array.isArray(selectedInfo.expertises) &&
                selectedInfo.expertises.length !== 0 && (
                  <ol className="expt-list">
                    <h6 className="expt-topic">ความถนัด:</h6>
                    {selectedInfo.expertises.map((expt, idx) => (
                      <li key={idx} className="expt">
                        {expt}
                      </li>
                    ))}
                  </ol>
                )}
            </div>

            <div className="exp-container">
              {Array.isArray(selectedInfo.expLocations) &&
                selectedInfo.expLocations.length !== 0 &&
                Array.isArray(selectedInfo.expPositions) &&
                selectedInfo.expPositions.length !== 0 && (
                  <>
                    <h6 className="exp-topic">ประสบการณ์:</h6>
                    {selectedInfo.expLocations.map((expLocat, idx) => (
                      <section key={idx}>
                        <p className="exp m-0">{expLocat}</p>
                        <p className="exp">{selectedInfo.expPositions[idx]}</p>
                      </section>
                    ))}
                  </>
                )}
            </div>

            <div className="research-container">
              {Array.isArray(selectedInfo.researchs) &&
                selectedInfo.researchs.length !== 0 && (
                  <>
                    <h6 className="research-topic">ผลงานวิจัย:</h6>
                    {selectedInfo.researchs.map((res, idx) => (
                      <p key={idx} className="res">
                        {res}
                      </p>
                    ))}
                  </>
                )}
            </div>

            <div className="hr-line"></div>
            <div className="contact-container-team">
              <p className="tels">tels: {selectedInfo.tels}</p>
              {Array.isArray(selectedInfo.emails) &&
              selectedInfo.emails.length > 1 ? (
                <>
                  <p className="emails">emails: {selectedInfo.emails[0]}</p>
                  <p className="emails">emails: {selectedInfo.emails[1]}</p>
                </>
              ) : (
                <p className="emails">
                  emails:{" "}
                  {Array.isArray(selectedInfo.emails)
                    ? selectedInfo.emails[0]
                    : selectedInfo.emails}
                </p>
              )}
              <p className="websites">websites: {selectedInfo.websites}</p>
            </div>
          </article>
        }
      />
    </main>
  );
};

export default hc_Team;
