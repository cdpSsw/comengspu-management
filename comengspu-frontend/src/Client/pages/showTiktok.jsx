import React, { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import Axios from "axios";
import notFound from "../../DAssets/svg/NotFound.svg";

const API_URL = import.meta.env.VITE_API_URL;

// Lazy load TikTok Embed
const LazyTiktokEmbed = ({ embedHtml }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect(); // Stop observing after visible
          }
        });
      },
      { threshold: 0.25 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        if (window.tiktokEmbedLoad) {
          window.tiktokEmbedLoad();
        } else {
          // fallback reload ถ้าโหลดไม่ขึ้น
          const script = document.createElement("script");
          script.src = "https://www.tiktok.com/embed.js";
          script.async = true;
          document.body.appendChild(script);
        }
      }, 300); // เพิ่ม delay นิดเพื่อให้ DOM render ก่อน
    }
  }, [isVisible]);

  return (
    <section ref={ref} className="content-tiktok">
      {isVisible && <div dangerouslySetInnerHTML={{ __html: embedHtml }} />}
    </section>
  );
};

const ShowTiktok = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showTiktok, setShowcase] = useState([]);
  const [showTiktokInfo, setShowTiktokInfo] = useState([]);

  const handleShowTiktok = async () => {
    try {
      setIsLoading(true);
      const cached = sessionStorage.getItem("tiktokShowcase");
      if (cached) {
        setShowcase(JSON.parse(cached));
        return;
      }

      // ถ้าไม่มี cache ให้ fetch ใหม่
      const res = await Axios.get(`${API_URL}/studentShowTiktok/approved`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setShowcase(res.data);
        sessionStorage.setItem("tiktokShowcase", JSON.stringify(res.data));

        // call embed script load หลัง DOM render แล้ว
        setTimeout(() => {
          if (window.tiktokEmbedLoad) window.tiktokEmbedLoad();
        }, 500);
      } else {
        alert("Get Approved Showcase failed.");
      }

      setIsLoading(false);
    } catch (err) {
      alert(`[Page - ShowTiktok] Internal server error: ${err.message} || ${err.response?.data?.error || err.response?.data?.message}`);
    }

  };

  // Fetch Showcase Info
  const handleTiktokInfo = async () => {
    try {
      const res = await Axios.get(`${API_URL}/info/showTiktok`);
      if (res.status === 200) {
        setShowTiktokInfo(res.data);
      } else {
        alert("Get *ShowTiktok Info failed.");
      }
    } catch (err) {
      alert(`[ShowTiktok] Internal server error: ${err.message}`);
    }
  };

  // useEffect(() => {
  //   document.title = "Showcase (Tiktok) | Comen - SPU";

  //   const fetchData = async () => {
  //     await Promise.all([handleShowTiktok(), handleTiktokInfo()]);
  //   };
  //   fetchData();

  //   // โหลดสคริปต์ TikTok แค่ครั้งเดียว
  //   const script = document.createElement("script");
  //   script.src = "https://www.tiktok.com/embed.js";
  //   script.async = true;

  //   script.onload = () => {
  //     // โหลดสำเร็จ ค่อย embed
  //     if (window.tiktokEmbedLoad) window.tiktokEmbedLoad();
  //   };

  //   document.body.appendChild(script);

  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);

  useEffect(() => {
    document.title = "Showcase (Tiktok) | Comen - SPU";

    // ตรวจว่าเป็นการ reload หน้า
    const navEntries = performance.getEntriesByType("navigation");
    if (navEntries.length > 0 && navEntries[0].type === "reload") {
      sessionStorage.removeItem("tiktokShowcase");
    }

    const fetchData = async () => {
      await Promise.all([handleShowTiktok(), handleTiktokInfo()]);
    };
    fetchData();

    // โหลด script TikTok แค่ครั้งเดียว
    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    script.onload = () => {
      if (window.tiktokEmbedLoad) window.tiktokEmbedLoad();
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <main className="user-showtiktok-container">
      <article className="top-container">
        {showTiktokInfo.map((item, idx) => (
          <section key={idx}>
            <h1 className="topic">{item.topic}</h1>
            <p className="desc">{item.description}</p>
          </section>
        ))}
      </article>

      {isLoading ? (
        <h1 className="loader"></h1>
      ) : showTiktok.length == 0 ? (
        <section className="not-found-container">
          <img src={notFound} className="not-found-page" />
        </section>
      ) : (
        <article className="content-container row m-0">
          {showTiktok.map((item, idx) => (
            <section
              key={idx}
              className="content-card-container col-sm-12 col-md-4"
            >
              <section className="content-card">
                <LazyTiktokEmbed embedHtml={item.embed} />
                <section className="text-container">
                  <p className="id">By: {item.studentID}</p>
                  <h1 className="topic">{item.topic}</h1>
                </section>
              </section>
            </section>
          ))}
        </article>
      )}
      {/* <Footer /> */}
    </main>
  );
};

export default ShowTiktok;
