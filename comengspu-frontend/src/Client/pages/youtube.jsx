import React, { useEffect, useState } from "react";
import Axios from "axios";
import notFound from "../../DAssets/svg/NotFound.svg";

const API_URL = import.meta.env.VITE_API_URL;

const youtube = () => {
  const [isLoading, setIsLoading] = useState(true);

  // const ytInfo = [
  //   {
  //     topic: "Showcase (Youtube)",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint est, quisquam error aliquid odit a nihil eaque dolorum tempore pariatur asperiores enim, totam delectus, perspiciatis nam doloremque explicabo illum repudiandae.",
  //   },
  // ];

  const [ytInfo, setYTInfo] = useState([]);
  const handleTYInfo = async () => {
    try {
      setIsLoading(true);

      const res = await Axios.get(`${API_URL}/info/youtube`);
      if (res.status === 200) setYTInfo(res.data);
      else alert(`Get *Youtube Failed.`);

      setIsLoading(false);
    } catch (err) {
      alert(`[Highlight] Internal server ${err}`);
    }
  };
  useEffect(() => {
    handleTYInfo();
  }, []);

  const [youtube, setYoutube] = useState([]);
  //   console.log(youtube)
  const handleGetYoutube = async () => {
    try {
      setIsLoading(true);
      const res = await Axios.get(`${API_URL}/studentYoutube`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        setYoutube(res.data);
      } else {
        alert(`Error to get Youtube, for this id: ${id}`);
      }
      setIsLoading(false);
    } catch (err) {
      alert(`Internal server ${err}`);
    }
  };
  // console.log(youtube);

  useEffect(() => {
    document.title = "Youtube | Admin";
    handleGetYoutube();
  }, []);

  return (
    <article className="viewer-yt-container">
      <article className="top-container">
        {ytInfo.map((item, idx) => (
          <section key={idx}>
            <h1 className="topic">{item.topic}</h1>
            <p className="desc">{item.description}</p>
          </section>
        ))}
      </article>

      <article className="content-container">
        {isLoading ? (
          <h1 className="loader mt-5" style={{ color: "black" }}></h1>
        ) : youtube.length === 0 ? (
          <section className="nf-login-container">
            <img
              src={notFound}
              alt="No youtube items found"
              className="notFoundImg-login"
            />
          </section>
        ) : (
          youtube.map((youtubeItem, idx) => {
            return (
              youtubeItem.status === "Approved" && (
                <section key={idx} className="card-container">
                <section className={`content-card`}>
                  {youtube.length > 0 && (
                    <div
                      key={youtubeItem.id}
                      dangerouslySetInnerHTML={{ __html: youtubeItem.embed }}
                      className="content-yt"
                    />
                  )}

                  <section className="text-container">
                    <section onClick={() => handleNewSelect(youtubeItem)}>
                      <p className="id mt-3">
                        Student ID: {youtubeItem.studentID}
                      </p>
                      <p className="topic">{youtubeItem.description}</p>
                      <p className="id mt-0">
                        {" "}
                        By: {youtubeItem.fname} {youtubeItem.lname}{" "}
                      </p>
                    </section>
                  </section>
                </section>
              </section>
              )
            );
          })
        )}
      </article>
    </article>
  );
};

export default youtube;
