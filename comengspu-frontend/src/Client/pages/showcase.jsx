import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";

import Axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

import notFound from "../../DAssets/svg/NotFound.svg";

const showcase = () => {
  // Overlay
  const [selectedImg, setSelectedImg] = useState("");

  // Get *Approved Showcase
  const [showcase, setShowcase] = useState([]);
  // console.log(showcase);

  const handleShowcase = async () => {
    try {
      const res = await Axios.get(`${API_URL}/studentShowcase/approved`, {
        withCredentials: true,
      });

      if (res.status === 200) {
        setShowcase(res.data);
      } else {
        alert(`Get Approved Showcase failed.`);
      }
    } catch (err) {
      alert(`[GetShowcase] : ${err.message} || ${err.response?.data?.error || err.response?.data?.message}`);
    }
  };

  useEffect(() => {
    document.title = "Showcase (Files) | Comen - SPU";
    handleShowcase();
  }, []);

  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // console.log(images)
  const handleGetImages = async () => {
    try {
      setIsLoading(true);
      const res = await Axios.get(`${API_URL}/studentShowcase/images`, {
        withCredentials: true,
      });

      if (res.status === 200) {
        setImages(res.data);
      } else {
        alert(`Error to get Showcase, for this id: ${id}`);
      }

      setIsLoading(false);
    } catch (err) {
      alert(`[GetImage] : ${err.message} || ${err.response?.data?.error || err.response?.data?.message}`);
    }
  };

  useEffect(() => {
    handleGetImages();
  }, []);

  const [showcase_info, setShowcaseInfo] = useState([]);
  // console.log(showcase_info)
  const handleCaseInfo = async () => {
    try {
      const res = await Axios.get(`${API_URL}/info/showcase`);
      if (res.status === 200) setShowcaseInfo(res.data);
      else alert(`Get *Showcase Failed.`);
    } catch (err) {
      alert(`[Showcase] : ${err.message} || ${err.response?.data?.error || err.response?.data?.message}`);
    }
  };

  useEffect(() => {
    handleCaseInfo();
  }, []);

  return (
    <main className="user-showcase-container">
      <article className="top-container">
        {showcase_info.map((showcase_infoItem, idx) => (
          <section key={idx}>
            <h1 className="topic">{showcase_infoItem.topic}</h1>
            <p className="desc">{showcase_infoItem.description}</p>
          </section>
        ))}
      </article>

      {isLoading ? (
        <h1 className="loader"></h1>
      ) : showcase.length == 0 ? (
        <section className="not-found-container">
          <img src={notFound} className="not-found-page" />
        </section>
      ) : (
        <article className="content-container row m-0">
          {showcase.map((showcaseItem, idx) => {
            const showcaaseImages = images.filter(
              (img) => img.id === showcaseItem.id
            );
            return (
              <section key={idx} className="content-card-container col-md-3">
                <section className="content-card-1 ih-item square effect3 bottom_to_top">
                  {showcaaseImages.length > 0 && (
                    <section onClick={() => setSelectedImg(showcaaseImages[0])}>
                      <img
                        key={showcaseItem.id}
                        src={showcaaseImages[0].image}
                        alt={`img-${showcaaseImages[0].id}`}
                        className="content-img"
                      />
                      <div className="info">
                        <h3 className="topic">{showcaseItem.topic}</h3>
                        <p className="desc">{showcaseItem.description}</p>
                        <p className="name">
                          By: {showcaseItem.fname} {showcaseItem.lname}
                        </p>
                      </div>
                    </section>
                  )}
                </section>
              </section>
            );
          })}
        </article>
      )}

      {/* <Footer /> */}

      {selectedImg && (
        <div className="overlay" onClick={() => setSelectedImg(null)}>
          <div className="overlay-content">
            <span className="close-btn" onClick={() => setSelectedImg(null)}>
              &times;
            </span>
            <img
              src={selectedImg.image}
              alt="Preview"
              className="original-img"
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default showcase;
