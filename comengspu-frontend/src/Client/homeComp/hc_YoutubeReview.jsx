import React, { useEffect, useState } from "react";
import Axios from "axios";
import SplitText from "../components/SplitText";
import Particles from "../components/Particles";
const API_URL = import.meta.env.VITE_API_URL;

const hc_YoutubeReview = () => {
  const [ytReviewInfo, setYtReviewInfo] = useState([]);
  const handleTYReviewInfo = async () => {
    try {
      const res = await Axios.get(`${API_URL}/info/youtubeReview`);
      if (res.status === 200) setYtReviewInfo(res.data);
      else alert(`Get *Youtube Review Failed.`);
    } catch (err) {
      alert(`[Highlight] Internal server ${err}`);
    }
  };

  useEffect(() => {
    handleTYReviewInfo();
  }, []);

  return (
    <article className="hc-ytReviewInfo">
      {ytReviewInfo.length > 0
        ? ytReviewInfo.map((ytReviewInfo, idx) => (
            <section key={idx} className="ytReviewInfo-container">
              <section className="info-container">
                <h1 className="topic">
                  <SplitText
                    text={ytReviewInfo.topic}
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
                <p className="desc">
                  <span>{ytReviewInfo.description}</span>
                </p>
                <div dangerouslySetInnerHTML={{ __html: ytReviewInfo.embed }} />
              </section>
            </section>
          ))
        : null}

      <Particles
        particleColors={["#2C2C2C", "#2C2C2C"]}
        particleCount={300}
        particleSpread={10}
        speed={1}
        particleBaseSize={100}
        moveParticlesOnHover={false}
        alphaParticles={false}
        disableRotation={false}
      />
    </article>
  );
};

export default hc_YoutubeReview;
