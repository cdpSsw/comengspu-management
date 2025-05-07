import React, { useState, useEffect } from "react";
import notFound from "../../DAssets/svg/NotFound.svg";

// Components
import Modal from "../../EComponents/Modal";

import Axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const A_Home = () => {
  // ------------------------------------- GET TEAM IMG --------------------------------------------
  const [selectedInfo, setSelectedInfo] = useState([]);
  const [selectedImage, setSelectedImage] = useState([]);
  const [teams, setTeam] = useState([]);
  const [isLoadingOurTeamImg, setIsLoadingOurTeamImg] = useState(true);
  // console.log("teams", teams);

  const handelGetAllTeam = async () => {
    try {
      setIsLoadingOurTeamImg(true);
      const res = await Axios.get(`${API_URL}/teams`, {
        withCredentials: true,
      });

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
            expLocations: (item.explocation || "").split("/"),
            expPositions: (item.expposition || "").split("/"),
          };
        })
      );

      setIsLoadingOurTeamImg(false);
    } catch (error) {
      console.error("Error fetching team data:", error.message);
    }
  };

  useEffect(() => {
    handelGetAllTeam();
  }, []);

  const [imagesTeam, setImagesTeam] = useState([]);
  const handleGetImagesTeam = async () => {
    try {
      const res = await Axios.get(`${API_URL}/teams/images`, {
        withCredentials: true,
      });
      // console.log("res", res.data);

      if (res.status === 200) {
        setImagesTeam(res.data);
      } else {
        alert(`Error to get Showcase, for this id: ${id}`);
      }
    } catch (err) {
      alert(`Internal server ${err}`);
    }
  };

  useEffect(() => {
    handleGetImagesTeam();
  }, []);

  // ------------------------------------- GETTING/POSTING INFO --------------------------------------------

  // ... sub-menu
  const [openHeader, setOpenHeader] = useState(false);
  const [openHighlight, setOpenHighlight] = useState(false);
  const [openShowFiles, setOpenShowFiles] = useState(false);
  const [openShowTiktok, setOpenShowTiktok] = useState(false);
  const [openStudyPlan, setOpenStudyPlan] = useState(false);
  const [openDegree, setOpenDegree] = useState(false);
  const [openOurTeam, setOpenOurTeam] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [openCareerPath, setOpenCareerPath] = useState(false);
  const [openYTReview, setOpenYTReview] = useState(false);
  const [openYT, setOpenYT] = useState(false);

  // ... db-info
  const [headerInfo, setHeaderInfo] = useState([]);
  const [highlightInfo, setHighlightInfo] = useState([]);
  const [showcaseInfo, setShowcaseInfo] = useState([]);
  const [showTiktokInfo, setShowTiktokInfo] = useState([]);
  const [studyPlanInfo, setStudyPlanInfo] = useState([]);
  const [careerPath_info, setCareerPathInfo] = useState([]);
  const [degreeInfo, setDegreeInfo] = useState([]);
  const [ourTeamInfo, setOurTeamInfo] = useState([]);
  const [contactInfo, setContactInfo] = useState([]);
  const [ytReviewInfo, setYtReviewInfo] = useState([]);
  const [ytInfo, setYTInfo] = useState([]);
  // console.log(ytInfo);

  // loading
  const [isLoadingHeader, setIsLoadingHeader] = useState(true);
  const [isLoadingHighlight, setIsLoadingHighlight] = useState(true);
  const [isLoadingShowcase, setIsLoadingShowcase] = useState(true);
  const [isLoadingShowTiktok, setIsLoadingShowTiktok] = useState(true);
  const [isLoadingStudyPlan, setIsLoadingStudyPlan] = useState(true);
  const [isLoadingCareerPath, setIsLoadingCareerPath] = useState(true);
  const [isLoadingDegree, setIsLoadingDegree] = useState(true);
  const [isLoadingOurTeam, setIsLoadingOurTeam] = useState(true);
  const [isLoadingContact, setIsLoadingContact] = useState(true);
  const [isLoadingYTReview, setIsLoadingYTReview] = useState(true);
  const [isLoadingYT, setIsLoadingYT] = useState(true);

  const handleHeaderInfo = async () => {
    try {
      setIsLoadingHeader(true);

      const res = await Axios.get(`${API_URL}/info/header`);
      if (res.status === 200) setHeaderInfo(res.data);
      else alert(`Get *Header Failed.`);

      setIsLoadingHeader(false);
    } catch (err) {
      alert(`[Header] Internal server ${err}`);
    }
  };

  const handleHighlightInfo = async () => {
    try {
      setIsLoadingHighlight(true);

      const res = await Axios.get(`${API_URL}/info/highlight`);
      if (res.status === 200) setHighlightInfo(res.data);
      else alert(`Get *Highlight Failed.`);

      setIsLoadingHighlight(false);
    } catch (err) {
      alert(`[Highlight] Internal server ${err}`);
    }
  };

  const handleCaseInfo = async () => {
    try {
      setIsLoadingShowcase(true);

      const res = await Axios.get(`${API_URL}/info/showcase`);
      if (res.status === 200) setShowcaseInfo(res.data);
      else alert(`Get *Showcase Failed.`);

      setIsLoadingShowcase(false);
    } catch (err) {
      alert(`[Showcase] Internal server ${err}`);
    }
  };

  const handleTiktokInfo = async () => {
    try {
      setIsLoadingShowTiktok(true);

      const res = await Axios.get(`${API_URL}/info/showTiktok`);
      if (res.status === 200) setShowTiktokInfo(res.data);
      else alert(`Get *ShowTiktok Failed.`);

      setIsLoadingShowTiktok(false);
    } catch (err) {
      alert(`[ShowTiktok] Internal server ${err}`);
    }
  };

  const handlestudyPlanInfo = async () => {
    try {
      setIsLoadingStudyPlan(true);

      const res = await Axios.get(`${API_URL}/info/studyPlan`);
      if (res.status === 200) setStudyPlanInfo(res.data);
      else alert(`Get *studyPlan Failed.`);

      setIsLoadingStudyPlan(false);
    } catch (err) {
      alert(`[studyPlan] Internal server ${err}`);
    }
  };

  const handleDegreeInfo = async () => {
    try {
      setIsLoadingDegree(true);

      const res = await Axios.get(`${API_URL}/info/degree`);
      if (res.status === 200) setDegreeInfo(res.data);
      else alert(`Get *degree Failed.`);

      setIsLoadingDegree(false);
    } catch (err) {
      alert(`[dergee] Internal server ${err}`);
    }
  };

  const handleOurTeamInfo = async () => {
    try {
      setIsLoadingOurTeam(true);

      const res = await Axios.get(`${API_URL}/info/ourTeam`);
      if (res.status === 200) setOurTeamInfo(res.data);
      else alert(`Get *Our Team Failed.`);

      setIsLoadingOurTeam(false);
    } catch (err) {
      alert(`[Our Team] Internal server ${err}`);
    }
  };

  const handlContactInfo = async () => {
    try {
      setIsLoadingContact(true);

      const res = await Axios.get(`${API_URL}/info/contact`);
      if (res.status === 200) setContactInfo(res.data);
      else alert(`Get *Contact Failed.`);

      setIsLoadingContact(false);
    } catch (err) {
      alert(`[Contact] Internal server ${err}`);
    }
  };

  const handleCareerPathInfo = async () => {
    try {
      setIsLoadingCareerPath(true);

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

      setIsLoadingCareerPath(false);
    } catch (err) {
      alert(`[caeer-path] Internal server ${err}`);
    }
  };

  const handleTYReviewInfo = async () => {
    try {
      setIsLoadingYTReview(true);

      const res = await Axios.get(`${API_URL}/info/youtubeReview`);
      if (res.status === 200) setYtReviewInfo(res.data);
      else alert(`Get *Youtube Review Failed.`);

      setIsLoadingYTReview(false);
    } catch (err) {
      alert(`[Highlight] Internal server ${err}`);
    }
  };

  const handleTYInfo = async () => {
    try {
      setIsLoadingYT(true);

      const res = await Axios.get(`${API_URL}/info/youtube`);
      if (res.status === 200) setYTInfo(res.data);
      else alert(`Get *Youtube Failed.`);

      setIsLoadingYT(false);
    } catch (err) {
      alert(`[Highlight] Internal server ${err}`);
    }
  };

  useEffect(() => {
    handleHeaderInfo();
    handleHighlightInfo();
    handleCaseInfo();
    handleTiktokInfo();
    handlestudyPlanInfo();
    handleDegreeInfo();
    handleOurTeamInfo();
    handlContactInfo();
    handleCareerPathInfo();
    handleTYReviewInfo();
    handleTYInfo();
  }, []);

  // ... modal
  const [openModal, setOpenModal] = useState("");
  const [modalInfo, setModalInfo] = useState([]);

  // console.log(modalInfo)
  const [modalHeaderInfo, setModalHeaderInfo] = useState([]);
  const [modalStudyPlanInfo, setModalStudyPlanInfo] = useState([]);
  const [modalDegreeInfo, setModalDegreeInfo] = useState([]);
  const [modalContactInfo, setModalContactInfo] = useState([]);
  const [modalYTReviewInfo, setModalYTReviewInfo] = useState([]);

  // ... new-info
  // ------------- highlight
  const [newTopicHighlight, setNewTopicHighlight] = useState("");
  const [newDescHighlight, setNewDescHighlight] = useState("");

  const handlePostHighlightInfo = async () => {
    try {
      const res = await Axios.post(`${API_URL}/info/highlight`, {
        topic: newTopicHighlight.trim() ? newTopicHighlight : modalInfo.topic,
        description: newDescHighlight.trim()
          ? newDescHighlight
          : modalInfo.description,
      });

      if (res.status === 200) {
        alert(`Post New *Highlight Information Successful.`);
        location.reload();
      } else alert(`Post *Highlight Failed.`);
    } catch (err) {
      alert(`[Highlight] Internal server ${err}`);
    }
  };

  // ------------- youtube
  const [newTopicYoutube, setNewTopicYoutube] = useState("");
  const [newDescYoutube, setNewDescYoutube] = useState("");

  const handlePostYoutubeInfo = async () => {
    try {
      const res = await Axios.post(`${API_URL}/info/youtube`, {
        topic: newTopicYoutube.trim() ? newTopicYoutube : modalInfo.topic,
        description: newDescYoutube.trim()
          ? newDescYoutube
          : modalInfo.description,
      });

      if (res.status === 200) {
        alert(`Post New *Youtube Information Successful.`);
        location.reload();
      } else alert(`Post *Youtube Failed.`);
    } catch (err) {
      alert(`[Youtube] Internal server ${err}`);
    }
  };

  // ------------- showcase
  const [newTopicCase, setNewTopicCase] = useState("");
  const [newDescCase, setNewDescCase] = useState("");

  const handlePostCaseInfo = async () => {
    try {
      const res = await Axios.post(`${API_URL}/info/showcase`, {
        // const res = await api.post('/info/showcase', {
        topic: newTopicCase.trim() ? newTopicCase : modalInfo.topic,
        description: newDescCase.trim() ? newDescCase : modalInfo.description,
      });

      if (res.status === 200) {
        alert(`Post New *Showcase Information Successful.`);
        location.reload();
      } else alert(`Post *Showcase Failed.`);
    } catch (err) {
      alert(`[Showcase] Internal server ${err}`);
    }
  };

  // ------------- showtiktok
  const [newTopicTiktok, setNewTopicTiktok] = useState("");
  const [newDescTiktok, setNewDescTiktok] = useState("");

  const handlePostTiktokInfo = async () => {
    try {
      const res = await Axios.post(`${API_URL}/info/showTiktok`, {
        // const res = await api.post('/info/showTiktok', {
        topic: newTopicTiktok.trim() ? newTopicTiktok : modalInfo.topic,
        description: newDescTiktok.trim()
          ? newDescTiktok
          : modalInfo.description,
      });

      if (res.status === 200) {
        alert(`Post New *ShowTiktok Information Successful.`);
        location.reload();
      } else alert(`Post *ShowTiktok Failed.`);
    } catch (err) {
      alert(`[ShowTiktok] Internal server ${err}`);
    }
  };

  // ------------- YTReview
  const [newTopicYTReview, setNewTopicYTReview] = useState("");
  const [newDescYTReview, setNewDescYTReview] = useState("");
  const [newEmbedYTReview, setNewEmbedYTReview] = useState("");

  const handlePostYTReviewInfo = async () => {
    try {
      const res = await Axios.post(`${API_URL}/info/youtubeReview`, {
        topic: newTopicYTReview.trim()
          ? newTopicYTReview
          : modalYTReviewInfo.topic,
        description: newDescYTReview.trim()
          ? newDescYTReview
          : modalYTReviewInfo.description,
        embed: newEmbedYTReview.trim()
          ? newEmbedYTReview
          : modalYTReviewInfo.embed,
      });

      if (res.status === 200) {
        alert(`Post New *ShowTiktok Information Successful.`);
        location.reload();
      } else alert(`Post *ShowTiktok Failed.`);
    } catch (err) {
      alert(`[ShowTiktok] Internal server ${err}`);
    }
  };

  // ------------- StudyPlan
  const [newTopicStudyPlan, setNewTopicStudyPlan] = useState("");
  const [newDesc1StudyPlan, setNewDesc1StudyPlan] = useState("");
  const [newDesc2StudyPlan, setNewDesc2StudyPlan] = useState("");

  const handlePostStudyPlanInfo = async () => {
    try {
      const res = await Axios.post(`${API_URL}/info/studyPlan`, {
        topic: newTopicStudyPlan.trim()
          ? newTopicStudyPlan
          : modalStudyPlanInfo.topic,
        description1: newDesc1StudyPlan.trim()
          ? newDesc1StudyPlan
          : modalStudyPlanInfo.description1,
        description2: newDesc2StudyPlan.trim()
          ? newDesc2StudyPlan
          : modalStudyPlanInfo.description2,
      });

      if (res.status === 200) {
        alert(`Post New *SudyPlan Information Successful.`);
        location.reload();
      } else alert(`Post *SudyPlan Failed.`);
    } catch (err) {
      alert(`[SudyPlan] Internal server ${err}`);
    }
  };

  // ------------- StudyPlan
  // ... Degree
  const [newTHDegree, setNewTHDegree] = useState("");
  const [newTHAbbre, setNewTHAbbre] = useState("");
  const [newENDegree, setNewENDegree] = useState("");
  const [newENAbbre, setNewENAbbre] = useState("");
  const [newDateTime, setNewDateTime] = useState("");

  const handlePostDegreeInfo = async () => {
    try {
      const res = await Axios.post(`${API_URL}/info/degree`, {
        thDegree: newTHDegree.trim() ? newTHDegree : modalDegreeInfo.thDegree,
        thAbbre: newTHAbbre.trim() ? newTHAbbre : modalDegreeInfo.thAbbre,
        enDegree: newENDegree.trim() ? newENDegree : modalDegreeInfo.enDegree,
        enAbbre: newENAbbre.trim() ? newENAbbre : modalDegreeInfo.enAbbre,
        studyDateTime: newDateTime.trim()
          ? newDateTime
          : modalDegreeInfo.studyDateTime,
      });

      if (res.status === 200) {
        alert(`Post New *Degree Information Successful.`);
        location.reload();
      } else alert(`Post *Degree Failed.`);
    } catch (err) {
      alert(`[Degree] Internal server ${err}`);
    }
  };

  // ------------- our Team
  const [newTopicOurTeam, setNewTopicOurTeam] = useState("");
  const [newDescOurTeam, setNewDescOurTeam] = useState("");

  const handlePostOurTeamInfo = async () => {
    try {
      const res = await Axios.post(`${API_URL}/info/ourTeam`, {
        topic: newTopicOurTeam.trim() ? newTopicOurTeam : modalInfo.topic,
        description: newDescOurTeam.trim()
          ? newDescOurTeam
          : modalInfo.description,
      });

      if (res.status === 200) {
        alert(`Post New *Our Team Information Successful.`);
        location.reload();
      } else alert(`Post *Our Team Failed.`);
    } catch (err) {
      alert(`[Our Team] Internal server ${err}`);
    }
  };

  // ------------- header
  const [newTitleTH, setNewTitleTH] = useState("");
  const [newTitleEN, setNewTitleEN] = useState("");
  const [newHeaderDesc, setNewHeaderDesc] = useState("");
  const [newLinkApply, setNewLinkApply] = useState("");
  const [newLinkScholarship, setNewLinkScholarship] = useState("");

  const handlePostHeaderInfo = async () => {
    try {
      const res = await Axios.post(`${API_URL}/info/header`, {
        // const res = await api.post('/info/header', {
        title_th: newTitleTH.trim() ? newTitleTH : modalHeaderInfo.title_th,
        title_en: newTitleEN.trim() ? newTitleEN : modalHeaderInfo.title_en,
        description: newHeaderDesc.trim()
          ? newHeaderDesc
          : modalHeaderInfo.description,
        link_scholarship: newLinkApply.trim()
          ? newLinkApply
          : modalHeaderInfo.link_scholarship,
        link_apply_to_study: newLinkScholarship.trim()
          ? newLinkScholarship
          : modalHeaderInfo.link_apply_to_study,
      });

      if (res.status === 200) {
        alert(`Post New *Header Information Successful.`);
        location.reload();
      } else alert(`Post *Header Failed.`);
    } catch (err) {
      alert(`[Header] Internal server ${err}`);
    }
  };

  // ------------- contact
  const [newContactTopic, setNewContactTopic] = useState("");
  const [newContactDesc, setNewContactDesc] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newMobile, setNewMobile] = useState("");
  const [newAvailable, setNewAvailable] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newFaceBook, setNewFacebook] = useState("");
  const [newTiktok, setNewTiktok] = useState("");

  const handlePostContactInfo = async () => {
    try {
      const res = await Axios.post(`${API_URL}/info/contact`, {
        topic: newContactTopic.trim()
          ? newContactTopic
          : modalContactInfo.topic,
        description: newContactDesc.trim()
          ? newContactDesc
          : modalContactInfo.description,
        address: newAddress.trim() ? newAddress : modalContactInfo.address,
        mobile: newMobile.trim() ? newMobile : modalContactInfo.mobile,
        available: newAvailable.trim()
          ? newAvailable
          : modalContactInfo.available,
        email: newEmail.trim() ? newEmail : modalContactInfo.email,
        facebook: newFaceBook.trim() ? newFaceBook : modalContactInfo.facebook,
        tiktok: newTiktok.trim() ? newTiktok : modalContactInfo.tiktok,
      });

      if (res.status === 200) {
        alert(`Post New *Contact Information Successful.`);
        location.reload();
      } else alert(`Post *Contact Failed.`);
    } catch (err) {
      console.error("Insert contact error:", err);
      alert(`[Contact] Internal server ${err}`);
    }
  };

  // ------------------------------------- SHOWCASE --------------------------------------------
  // GET *SELECTED SHOWCASE
  const [selectedShowcase, setSelectedShowcases] = useState([]);
  const [isLoadingShowcaseImg, setIsLoadingShowcaseImg] = useState(true);
  // console.log("selectedShowcase:", selectedShowcase);

  async function handleSelectedShowcase() {
    try {
      setIsLoadingShowcaseImg(true);
      const res = await Axios.get(`${API_URL}/studentShowcase/selected`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        setSelectedShowcases(res.data);
      } else {
        alert(`Error to get Showcase`);
      }

      setIsLoadingShowcaseImg(false);
    } catch (err) {
      alert(`Internal server error: ${err}`);
    }
  }
  useEffect(() => {
    handleSelectedShowcase();
  }, []);

  // GET *SELECTED SHOWCASE [IMAGES]
  const [images, setImages] = useState([]);
  // console.log("images:", images);

  const handleGetImages = async () => {
    try {
      const res = await Axios.get(
        `${API_URL}/studentShowcase/selected/images`,
        {
          withCredentials: true,
        }
      );
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

  // ------------------------------------- SHOWCASE --------------------------------------------

  // GET *SELECTED SHOWTIKTOK
  const [showTiktok, setShowTiktok] = useState([]);
  const [isLoadingShowTiktokLink, setIsLoadingShowShowTiktokLink] =
    useState(true);
  // console.log(showTiktok);

  const handleGetSelectedShowtiktok = async () => {
    try {
      setIsLoadingShowShowTiktokLink(true);
      const res = await Axios.get(`${API_URL}/studentShowTiktok/selected`);
      if (res.status === 200) {
        setShowTiktok(res.data);
      } else {
        alert(`Get Selected Showcase Failed.`);
      }

      setIsLoadingShowShowTiktokLink(false);
    } catch (err) {
      alert(`Internal server error ${err}`);
    }
  };

  useEffect(() => {
    handleGetSelectedShowtiktok();
  }, []);

  // Handle Cancel Button
  const handleCancel = () => {
    document.getElementById("topicCase").value = "";
    document.getElementById("descCase").value = "";
  };

  // Load Tiktok
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [showTiktok]);

  // ---------------------- CareerPath ---------------------------
  const [modalCareerPathInfo, setModalCareerPathInfo] = useState([]);
  const [newCareerPath, setNewCareerPath] = useState([{ path: "", desc: "" }]);
  // console.log("modalCareerPathInfo", modalCareerPathInfo);
  // console.log('newCareerPath: ', newCareerPath);

  useEffect(() => {
    if (
      Array.isArray(modalCareerPathInfo) &&
      modalCareerPathInfo.length > 0 &&
      modalCareerPathInfo[0].careerPathFormatted &&
      modalCareerPathInfo[0].careerDescFormatted
    ) {
      const paths = modalCareerPathInfo[0].careerPathFormatted;
      const descs = modalCareerPathInfo[0].careerDescFormatted;
  
      const combined = paths.map((path, idx) => ({
        path,
        desc: descs[idx] || "",
      }));
  
      setNewCareerPath(combined);
    }
  }, [modalCareerPathInfo]);
  
  const handleFieldChange = (index, field, value) => {
    const updated = [...newCareerPath];
    updated[index][field] = value;
    setNewCareerPath(updated);
  };

  const handleAddField = () => {
    setNewCareerPath((prev) => [...prev, { path: "", desc: "" }]);
  };

  const handleDeleteField = (index) => {
    const updated = [...newCareerPath];
    updated.splice(index, 1);
    setNewCareerPath(updated);
  };

  const handlePostCareerPath = async () => {
    try {
      const careerPaths = newCareerPath
        .map((item) => item.path.trim())
        .join(",");
      const careerDescs = newCareerPath
        .map((item) => item.desc.trim())
        .join(",");

      const res = await Axios.post(
        `${API_URL}/info/careerPath`,
        {
          careerPaths,
          careerDescs,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        alert("Add New *Career-Path Successful.");
        location.reload();
      } else {
        alert("Add New *Career-Path Failed.");
        location.reload();
      }
    } catch (err) {
      alert(`[CareerPath] Internal server error: ${err.message}`);
    }
  };

  return (
    <main className="a-home-container">
      <article className="top-container">
        <h1 className="topic">
          Welcome to <strong>Admin</strong> Dashboard
        </h1>
      </article>

      <hr />

      <article className="content-container row m-0">
        <section className="left-side col-md-6">
          <section className="header-container">
            <section className="top-container">
              <h1 className="topic">Header</h1>

              <section className="setting-container">
                <i
                  className="bi bi-three-dots"
                  onClick={() => setOpenHeader(!openHeader)}
                ></i>

                {openHeader && (
                  <ul className="setting-items">
                    <li>
                      <button
                        data-bs-toggle="modal"
                        data-bs-target="#modal-edit-header"
                        onClick={() => setModalHeaderInfo(headerInfo[0])}
                      >
                        Edit Information
                      </button>
                    </li>
                  </ul>
                )}
              </section>
            </section>
            <div className="hr"></div>
            {isLoadingHeader ? (
              <h1 className="loader" style={{ color: "black" }}></h1>
            ) : headerInfo.length > 0 ? (
              headerInfo.map((headerInfo, idx) => (
                <section key={idx}>
                  <section className="info-container">
                    <p className="title title_th">
                      Title (TH): <span>{headerInfo.title_th}</span>
                    </p>
                    <p className="title title_en">
                      Title (EN): <span>{headerInfo.title_en}</span>
                    </p>
                    <p className="desc">
                      Description: <span>{headerInfo.description}</span>
                    </p>
                    <hr />
                    <p className="link">
                      Link Apply To Study:{" "}
                      <a href={headerInfo.link_apply_to_study} target="_blank">
                        {headerInfo.link_apply_to_study}
                      </a>
                    </p>
                    <p className="link">
                      Link Scholarship:{" "}
                      <a href={headerInfo.link_scholarship} target="_blank">
                        {headerInfo.link_scholarship}
                      </a>
                    </p>
                  </section>
                </section>
              ))
            ) : null}
          </section>

          <section className="highlight-container">
            <section className="top-container">
              <h1 className="topic">Highlight</h1>
              <section className="setting-container">
                <i
                  className="bi bi-three-dots"
                  onClick={() => setOpenHighlight(!openHighlight)}
                ></i>

                {openHighlight && (
                  <ul className="setting-items">
                    <li>
                      <button
                        data-bs-toggle="modal"
                        data-bs-target="#modal-edit-highlight"
                        onClick={() => [
                          setOpenModal("modal-edit-highlight"),
                          setModalInfo(highlightInfo[0]),
                        ]}
                      >
                        Edit Information
                      </button>
                    </li>
                  </ul>
                )}
              </section>
            </section>
            <div className="hr"></div>

            {isLoadingHighlight ? (
              <h1 className="loader" style={{ color: "black" }}></h1>
            ) : highlightInfo.length > 0 ? (
              highlightInfo.map((highlightInfo, idx) => (
                <section key={idx}>
                  <section className="info-container">
                    <h1 className="topic">
                      Topic: <span>{highlightInfo.topic}</span>
                    </h1>
                    <p className="desc">
                      Description: <span>{highlightInfo.description}</span>
                    </p>
                  </section>
                </section>
              ))
            ) : null}
          </section>

          <section className="highlight-container Youtube">
            <section className="top-container">
              <h1 className="topic">Youtube</h1>
              <section className="setting-container">
                <i
                  className="bi bi-three-dots"
                  onClick={() => setOpenYT(!openYT)}
                ></i>

                {openYT && (
                  <ul className="setting-items">
                    <li>
                      <button
                        data-bs-toggle="modal"
                        data-bs-target="#modal-edit-youtube"
                        onClick={() => [
                          setOpenModal("modal-edit-youtube"),
                          setModalInfo(ytInfo[0]),
                        ]}
                      >
                        Edit Information
                      </button>
                    </li>
                  </ul>
                )}
              </section>
            </section>
            <div className="hr"></div>

            {isLoadingYT ? (
              <h1 className="loader" style={{ color: "black" }}></h1>
            ) : ytInfo.length > 0 ? (
              ytInfo.map((ytInfo, idx) => (
                <section key={idx}>
                  <section className="info-container">
                    <h1 className="topic">
                      Topic: <span>{ytInfo.topic}</span>
                    </h1>
                    <p className="desc">
                      Description: <span>{ytInfo.description}</span>
                    </p>
                  </section>
                </section>
              ))
            ) : null}
          </section>

          <section className="highlight-container study-plan">
            <section className="top-container">
              <h1 className="topic">Study-Plan</h1>

              <section className="setting-container">
                <i
                  className="bi bi-three-dots"
                  onClick={() => setOpenStudyPlan(!openStudyPlan)}
                ></i>

                {openStudyPlan && (
                  <ul className="setting-items">
                    <li>
                      <button
                        data-bs-toggle="modal"
                        data-bs-target="#modal-edit-studyPlan"
                        onClick={() => [
                          setOpenModal("modal-edit-studyPlan"),
                          setModalStudyPlanInfo(studyPlanInfo[0]),
                        ]}
                      >
                        Edit Information
                      </button>
                    </li>
                  </ul>
                )}
              </section>
            </section>
            <div className="hr"></div>

            {isLoadingStudyPlan ? (
              <h1 className="loader" style={{ color: "black" }}></h1>
            ) : studyPlanInfo.length > 0 ? (
              studyPlanInfo.map((studyPlanInfo, idx) => (
                <section key={idx}>
                  <section className="info-container">
                    <h1 className="topic">
                      Topic: <span>{studyPlanInfo.topic}</span>
                    </h1>
                    <p className="desc">
                      Description-1: <span>{studyPlanInfo.description1}</span>
                    </p>
                    <p className="desc">
                      Description-2: <span>{studyPlanInfo.description2}</span>
                    </p>
                  </section>
                </section>
              ))
            ) : null}
          </section>

          <section className="highlight-container degree">
            <section className="top-container">
              <h1 className="topic">Degree & Date - Time</h1>

              <section className="setting-container">
                <i
                  className="bi bi-three-dots"
                  onClick={() => setOpenDegree(!openDegree)}
                ></i>

                {openDegree && (
                  <ul className="setting-items">
                    <li>
                      <button
                        data-bs-toggle="modal"
                        data-bs-target="#modal-edit-degree"
                        onClick={() => [
                          setOpenModal("modal-edit-degree"),
                          setModalDegreeInfo(degreeInfo[0]),
                        ]}
                      >
                        Edit Information
                      </button>
                    </li>
                  </ul>
                )}
              </section>
            </section>
            <div className="hr"></div>

            {isLoadingDegree ? (
              <h1 className="loader" style={{ color: "black" }}></h1>
            ) : degreeInfo.length > 0 ? (
              degreeInfo.map((degreeInfo, idx) => (
                <section key={idx} className="w-100">
                  <section className="info-container">
                    <h1 className="topic">
                      ภาษาไทย ( ชื่อเต็ม ) : <span>{degreeInfo.thDegree}</span>
                    </h1>
                    <h1 className="topic">
                      ( อักษรย่อ ) : <span>{degreeInfo.thAbbre}</span>
                    </h1>
                    <h1 className="topic">
                      ภาษาอังกฤษ ( ชื่อเต็ม ) :{" "}
                      <span>{degreeInfo.enDegree}</span>
                    </h1>
                    <h1 className="topic">
                      ( อักษรย่อ ) : <span>{degreeInfo.enAbbre}</span>
                    </h1>
                    <hr />
                    <h1 className="topic">
                      เรียนในเวลาราชการ :{" "}
                      <span>{degreeInfo.studyDateTime}</span>
                    </h1>
                  </section>
                </section>
              ))
            ) : null}
          </section>

          <section className="highlight-container career-path">
            <section className="top-container">
              <h1 className="topic">Career Path</h1>

              <section className="setting-container">
                <i
                  className="bi bi-three-dots"
                  onClick={() => setOpenCareerPath(!openCareerPath)}
                ></i>

                {openCareerPath && (
                  <ul className="setting-items">
                    <li>
                      <button
                        data-bs-toggle="modal"
                        data-bs-target="#modal-edit-careerPath"
                        onClick={() => [
                          setOpenModal("modal-edit-careerPath"),
                          setModalCareerPathInfo(careerPath_info),
                        ]}
                      >
                        Edit Information
                      </button>
                    </li>
                  </ul>
                )}
              </section>
            </section>
            <div className="hr"></div>

            {isLoadingCareerPath ? (
              <h1 className="loader" style={{ color: "black" }}></h1>
            ) : careerPath_info.length > 0 ? (
              careerPath_info.map((careerPath_info, idx) => (
                <section key={idx} className="w-100">
                  <section className="info-container">
                    <section className="topic">
                      {careerPath_info.careerPathFormatted.map((path, idx) => (
                        <div key={idx}>
                          <h5 className="career-path">{path}</h5>
                          {careerPath_info.careerDescFormatted[idx] && (
                            <h5 className="career-desc">
                              - {careerPath_info.careerDescFormatted[idx]}
                            </h5>
                          )}
                        </div>
                      ))}
                    </section>
                  </section>
                </section>
              ))
            ) : null}
          </section>

          <section className="ourTeam-container">
            <section className="top-container">
              <h1 className="topic">Team</h1>

              <section className="setting-container">
                <i
                  className="bi bi-three-dots"
                  onClick={() => setOpenOurTeam(!openOurTeam)}
                ></i>

                {openOurTeam && (
                  <ul className="setting-items">
                    <li>
                      <button
                        data-bs-toggle="modal"
                        data-bs-target="#modal-edit-ourTeam"
                        onClick={() => [
                          setOpenModal("modal-edit-ourTeam"),
                          setModalInfo(ourTeamInfo[0]),
                        ]}
                      >
                        Edit Information
                      </button>
                    </li>
                  </ul>
                )}
              </section>
            </section>
            <div className="hr"></div>

            {isLoadingOurTeam ? (
              <h1 className="loader" style={{ color: "black" }}></h1>
            ) : ourTeamInfo.length > 0 ? (
              ourTeamInfo.map((ourTeamInfo, idx) => (
                <section key={idx}>
                  <section className="info-container">
                    <h1 className="topic">
                      Topic: <span>{ourTeamInfo.topic}</span>
                    </h1>
                    <p className="desc">
                      Description: <span>{ourTeamInfo.description}</span>
                    </p>
                  </section>
                </section>
              ))
            ) : null}

            <article className="content-container row m-0">
              {isLoadingOurTeamImg ? (
                <h1 className="loader" style={{ color: "black" }}></h1>
              ) : teams.length === 0 ? (
                <section className="nf-login-container">
                  <img
                    src={notFound}
                    alt="No youtube items found"
                    className="notFoundImg-login"
                  />
                </section>
              ) : (
                teams.map((team, idx) => {
                  const teamImages = imagesTeam.filter(
                    (img) => img.id === team.id
                  );

                  return (
                    <section key={idx} className="col-sm-12 col-md-6">
                      <section className="content-card">
                        {teamImages.length > 0 && (
                          <button
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#modal-preview"
                            className="content-img-btn"
                            onClick={() => [
                              setSelectedInfo(team),
                              setSelectedImage(teamImages[0]),
                            ]}
                          >
                            <img
                              key={team.id}
                              src={teamImages[0].image}
                              alt={`img-${teamImages[0].id}`}
                              className="content-img"
                            />
                          </button>
                        )}
                        <section className="text-container">
                          <p className="position">{team.position}</p>
                          <h6 className="name">{team.name}</h6>
                        </section>
                      </section>
                    </section>
                  );
                })
              )}
            </article>
          </section>

          <section className="highlight-container yt-review">
            <section className="top-container">
              <h1 className="topic">Youtube Review</h1>
              <section className="setting-container">
                <i
                  className="bi bi-three-dots"
                  onClick={() => setOpenYTReview(!openYTReview)}
                ></i>

                {openYTReview && (
                  <ul className="setting-items">
                    <li>
                      <button
                        data-bs-toggle="modal"
                        data-bs-target="#modal-edit-yt-review"
                        onClick={() => setModalYTReviewInfo(ytReviewInfo[0])}
                      >
                        Edit Information
                      </button>
                    </li>
                  </ul>
                )}
              </section>
            </section>
            <div className="hr"></div>

            {isLoadingYTReview ? (
              <h1 className="loader" style={{ color: "black" }}></h1>
            ) : ytReviewInfo.length > 0 ? (
              ytReviewInfo.map((ytReviewInfo, idx) => (
                <section key={idx}>
                  <section className="info-container">
                    <h1 className="topic">
                      Topic: <span>{ytReviewInfo.topic}</span>
                    </h1>
                    <p className="desc">
                      Description: <span>{ytReviewInfo.description}</span>
                    </p>
                    <div
                      dangerouslySetInnerHTML={{ __html: ytReviewInfo.embed }}
                    />
                  </section>
                </section>
              ))
            ) : null}
          </section>

          <section className="home-contact-container">
            <section className="top-container">
              <h1 className="topic">Contact</h1>
              <section className="setting-container">
                <i
                  className="bi bi-three-dots"
                  onClick={() => setOpenContact(!openContact)}
                ></i>

                {openContact && (
                  <ul className="setting-items">
                    <li>
                      <button
                        data-bs-toggle="modal"
                        data-bs-target="#modal-edit-contact"
                        onClick={() => setModalContactInfo(contactInfo[0])}
                      >
                        Edit Information
                      </button>
                    </li>
                  </ul>
                )}
              </section>
            </section>
            <div className="hr"></div>

            {isLoadingContact ? (
              <h1 className="loader" style={{ color: "black" }}></h1>
            ) : contactInfo.length > 0 ? (
              contactInfo.map((contactInfo, idx) => (
                <section key={idx}>
                  <section className="info-container">
                    <p className="topic">
                      Topic: <span>{contactInfo.topic}</span>
                    </p>
                    <p className="desc">
                      Description: <span>{contactInfo.description}</span>
                    </p>
                    <hr />
                    <article className="contact-box-container row">
                      {/* Location */}
                      <section className="col-lg-5 contact-box address">
                        <i className="bi bi-geo-alt-fill"></i>
                        <div className="text-container">
                          <h5 className="title-box">Address</h5>
                          <p className="desc-box">{contactInfo.address}</p>
                        </div>
                      </section>

                      {/* mobile */}
                      <section className="col-lg-5 contact-box mobile">
                        <i className="bi bi-telephone-fill"></i>
                        <div className="text-container">
                          <h5 className="title-box">Mobile</h5>
                          <p className="desc-box">{contactInfo.mobile}</p>
                        </div>
                      </section>

                      {/* availability */}
                      <section className="col-lg-5 contact-box mobile">
                        <i className="bi bi-clock-fill"></i>
                        <div className="text-container">
                          <h5 className="title-box">Availability</h5>
                          <p className="desc-box">{contactInfo.available}</p>
                        </div>
                      </section>

                      {/* email */}
                      <section className="col-lg-5 contact-box mobile">
                        <i className="bi bi-envelope-fill"></i>
                        <div className="text-container">
                          <h5 className="title-box">Email</h5>
                          <p className="desc-box">{contactInfo.email}</p>
                        </div>
                      </section>

                      <hr className="mt-3" />

                      <p className="topic">
                        Facebook:{" "}
                        <a href={contactInfo.facebook} target="_blank">
                          {contactInfo.facebook}
                        </a>
                      </p>
                      <p className="topic">
                        Tiktok:{" "}
                        <a href={contactInfo.tiktok} target="_blank">
                          {contactInfo.tiktok}
                        </a>
                      </p>
                    </article>
                  </section>
                </section>
              ))
            ) : null}
          </section>
        </section>

        <section className="right-side col-md-6">
          {/* ------------------------------SHOWCASE -------------------------------------- */}
          <section className="showcase-files-container">
            <section className="top-container">
              <h1 className="topic">Showcase (Files) Managemnet </h1>

              <section className="setting-container">
                <i
                  className="bi bi-three-dots"
                  onClick={() => setOpenShowFiles(!openShowFiles)}
                ></i>

                {openShowFiles && (
                  <ul className="setting-items">
                    <li>
                      <button
                        data-bs-toggle="modal"
                        data-bs-target="#modal-edit-showcase"
                        onClick={() => [
                          setOpenModal("modal-edit-showcase"),
                          setModalInfo(showcaseInfo[0]),
                        ]}
                      >
                        Edit Information
                      </button>
                    </li>
                  </ul>
                )}
              </section>
            </section>
            <div className="hr"></div>

            {/* ---------------- showcase info ---------------------------- */}
            {isLoadingShowcase ? (
              <h1 className="loader" style={{ color: "black" }}></h1>
            ) : showcaseInfo.length > 0 ? (
              showcaseInfo.map((showcaseInfo, idx) => (
                <section key={idx}>
                  <section className="info-container">
                    <h1 className="topic">
                      Topic: <span>{showcaseInfo.topic}</span>
                    </h1>
                    <p className="desc">
                      Description: <span>{showcaseInfo.description}</span>
                    </p>
                  </section>
                </section>
              ))
            ) : null}

            {/* ---------------- showcase image ---------------------------- */}
            <section className="showcase-container row m-0">
              {isLoadingShowcaseImg ? (
                <h1 className="loader" style={{ color: "black" }}></h1>
              ) : selectedShowcase.length === 0 ? (
                <section className="nf-login-container">
                  <img
                    src={notFound}
                    alt="No youtube items found"
                    className="notFoundImg-login"
                  />
                </section>
              ) : (
                selectedShowcase.map((showcaseItem, idx) => {
                  const showcaaseImages = images.filter(
                    (img) => img.id === showcaseItem.id
                  );
                  return (
                    <section key={idx} className="col-sm-12 col-md-6">
                      <section className="showcase-card">
                        {showcaaseImages.length > 0 && (
                          <img
                            key={showcaseItem.id}
                            src={showcaaseImages[0].image}
                            alt={`img-${showcaaseImages[0].id}`}
                            className="showcase-image"
                          />
                        )}
                        <section className="text-container">
                          {showcaseItem.status === "Approved" ? (
                            <span
                              className={`status
                                  ${
                                    showcaseItem.status === "Approved"
                                      ? "Approved"
                                      : ""
                                  }
                                `}
                            >
                              <i className="bi bi-check-circle-fill"></i>
                              {showcaseItem.status}
                            </span>
                          ) : (
                            <span
                              className={`status
                                  ${
                                    showcaseItem.status === "Waiting"
                                      ? "Waiting"
                                      : ""
                                  }
                                `}
                              data-bs-toggle="modal"
                              data-bs-target="#modal-approve"
                              onClick={() => setApproveItem(showcaseItem)}
                            >
                              <i className="bi bi-clock-fill"></i>
                              {showcaseItem.status}
                            </span>
                          )}

                          <section>
                            <p className="id">
                              Student ID: {showcaseItem.studentID}
                            </p>
                            <h1 className="topic">{showcaseItem.topic}</h1>
                            <p className="desc">{showcaseItem.description}</p>
                          </section>
                        </section>
                      </section>
                    </section>
                  );
                })
              )}
            </section>
          </section>

          {/* ------------------------------SHOWTIKTOK-------------------------------------- */}
          <section className="showtiktok-files-container">
            <section className="top-container">
              <h1 className="topic">Showcase (Tiktok) Managemnet </h1>
              <section className="setting-container">
                <i
                  className="bi bi-three-dots"
                  onClick={() => setOpenShowTiktok(!openShowTiktok)}
                ></i>

                {openShowTiktok && (
                  <ul className="setting-items">
                    <li>
                      <button
                        data-bs-toggle="modal"
                        data-bs-target="#modal-edit-showtiktok"
                        onClick={() => [
                          setOpenModal("modal-edit-showtiktok"),
                          setModalInfo(showTiktokInfo[0]),
                        ]}
                      >
                        Edit Information
                      </button>
                    </li>
                  </ul>
                )}
              </section>
            </section>
            <div className="hr"></div>

            {/* --------------------------------- tiktok info ------------------------------- */}
            {isLoadingShowTiktok ? (
              <h1 className="loader" style={{ color: "black" }}></h1>
            ) : showTiktokInfo.length > 0 ? (
              showTiktokInfo.map((showtiktokInfo, idx) => (
                <section key={idx}>
                  <section className="info-container">
                    <h1 className="topic">
                      Topic: <span>{showtiktokInfo.topic}</span>
                    </h1>
                    <p className="desc">
                      Description: <span>{showtiktokInfo.description}</span>
                    </p>
                  </section>
                </section>
              ))
            ) : null}

            {/* --------------------------------- tiktok link ------------------------------- */}
            <section className="showtiktok-container row m-0">
              {isLoadingShowTiktokLink ? (
                <h1 className="loader" style={{ color: "black" }}></h1>
              ) : showTiktok.length === 0 ? (
                <section className="nf-login-container">
                  <img
                    src={notFound}
                    alt="No youtube items found"
                    className="notFoundImg-login"
                  />
                </section>
              ) : (
                showTiktok.map((showTiktokItem, idx) => (
                  <section key={idx} className="col-lg-12">
                    <section className="showtiktok-card">
                      <section
                        className="content-tiktok"
                        key={idx}
                        dangerouslySetInnerHTML={{
                          __html: showTiktokItem.embed,
                        }}
                      />

                      <section className="text-container">
                        {showTiktokItem.status === "Approved" ? (
                          <span
                            className={`status
                                    ${
                                      showTiktokItem.status === "Approved"
                                        ? "Approved"
                                        : ""
                                    }
                                  `}
                          >
                            <i className="bi bi-check-circle-fill"></i>
                            {showTiktokItem.status}
                          </span>
                        ) : (
                          <span
                            className={`status
                                    ${
                                      showTiktokItem.status === "Waiting"
                                        ? "Waiting"
                                        : ""
                                    }
                                  `}
                            data-bs-toggle="modal"
                            data-bs-target="#modal-approve"
                            onClick={() => setApproveItem(showTiktokItem)}
                          >
                            <i className="bi bi-clock-fill"></i>
                            {showTiktokItem.status}
                          </span>
                        )}

                        <section>
                          <p className="id">
                            Student ID: {showTiktokItem.studentID}
                          </p>
                          <h1 className="topic">{showTiktokItem.topic}</h1>
                          <p className="desc">{showTiktokItem.description}</p>
                        </section>
                      </section>
                    </section>
                  </section>
                ))
              )}
            </section>
          </section>
        </section>
      </article>

      {/*  Modal Edit Info (Topic, Desc)*/}
      <Modal
        modalID={openModal}
        modalHeaderStyle="d-none"
        modalFooterStyle="d-none"
        modalBodyContent={
          <form className="a-home-form">
            <h1 className="topic">Edit Information</h1>

            <div className="input-box">
              <label htmlFor="topicCase" className="form-label mb-2">
                * Topic
              </label>
              <input
                type="text"
                name="topicCase"
                id="topicCase"
                placeholder={modalInfo.topic}
                className="form-control mb-3"
                onChange={(e) =>
                  openModal === "modal-edit-showcase"
                    ? setNewTopicCase(e.target.value)
                    : openModal === "modal-edit-showtiktok"
                    ? setNewTopicTiktok(e.target.value)
                    : openModal === "modal-edit-highlight"
                    ? setNewTopicHighlight(e.target.value)
                    : openModal === "modal-edit-ourTeam"
                    ? setNewTopicOurTeam(e.target.value)
                    : openModal === "modal-edit-youtube"
                    ? setNewTopicYoutube(e.target.value)
                    : null
                }
              />
            </div>

            <div className="input-box">
              <label htmlFor="descCase" className="form-label mb-2">
                * Description
              </label>
              <textarea
                type="text"
                name="descCase"
                id="descCase"
                placeholder={modalInfo.description}
                className="form-control mb-3"
                onChange={(e) =>
                  openModal === "modal-edit-showcase"
                    ? setNewDescCase(e.target.value)
                    : openModal === "modal-edit-showtiktok"
                    ? setNewDescTiktok(e.target.value)
                    : openModal === "modal-edit-highlight"
                    ? setNewDescHighlight(e.target.value)
                    : openModal === "modal-edit-ourTeam"
                    ? setNewDescOurTeam(e.target.value)
                    : openModal === "modal-edit-youtube"
                    ? setNewDescYoutube(e.target.value)
                    : null
                }
              ></textarea>
            </div>

            <section className="btn-container">
              <button
                data-bs-dismiss="modal"
                className="btn btn-cancel"
                onClick={handleCancel}
              >
                Cancel
              </button>

              <button
                type="button"
                className="btn btn-update"
                onClick={
                  openModal === "modal-edit-showcase"
                    ? handlePostCaseInfo
                    : openModal === "modal-edit-showtiktok"
                    ? handlePostTiktokInfo
                    : openModal === "modal-edit-highlight"
                    ? handlePostHighlightInfo
                    : openModal === "modal-edit-ourTeam"
                    ? handlePostOurTeamInfo
                    : openModal === "modal-edit-youtube"
                    ? handlePostYoutubeInfo
                    : null
                }
              >
                Update
              </button>
            </section>
          </form>
        }
      />
      {/* Modal - Header */}
      <Modal
        modalID="modal-edit-header"
        modalHeaderStyle="d-none"
        modalFooterStyle="d-none"
        modalBodyContent={
          <form className="a-home-form">
            <h1 className="topic">Edit Information</h1>

            <div className="input-box">
              <label htmlFor="titleTH" className="form-label mb-2">
                * Title (TH)
              </label>
              <input
                type="text"
                name="titleTH"
                id="titleTH"
                placeholder={modalHeaderInfo.title_th}
                className="form-control mb-3"
                onChange={(e) => setNewTitleTH(e.target.value)}
              />
            </div>

            <div className="input-box">
              <label htmlFor="titleEN" className="form-label mb-2">
                * Title (EN)
              </label>
              <input
                type="text"
                name="titleEN"
                id="titleEN"
                placeholder={modalHeaderInfo.title_en}
                className="form-control mb-3"
                onChange={(e) => setNewTitleEN(e.target.value)}
              />
            </div>

            <div className="input-box">
              <label htmlFor="headerDesc" className="form-label mb-2">
                * Description
              </label>
              <textarea
                type="text"
                name="headerDesc"
                id="headerDesc"
                placeholder={modalHeaderInfo.description}
                className="form-control mb-3"
                onChange={(e) => setNewHeaderDesc(e.target.value)}
              ></textarea>
            </div>

            <div className="input-box">
              <label htmlFor="linkApply" className="form-label mb-2">
                * Link Apply To Study
              </label>
              <input
                type="text"
                name="linkApply"
                id="linkApply"
                placeholder={modalHeaderInfo.link_apply_to_study}
                className="form-control mb-3"
                onChange={(e) => setNewLinkApply(e.target.value)}
              />
            </div>

            <div className="input-box">
              <label htmlFor="linkScholarship" className="form-label mb-2">
                * Link Scholarship
              </label>
              <input
                type="text"
                name="linkScholarship"
                id="linkScholarship"
                placeholder={modalHeaderInfo.link_scholarship}
                className="form-control mb-3"
                onChange={(e) => setNewLinkScholarship(e.target.value)}
              />
            </div>

            <section className="btn-container">
              <button
                data-bs-dismiss="modal"
                className="btn btn-cancel"
                onClick={handleCancel}
              >
                Cancel
              </button>

              <button
                type="button"
                className="btn btn-update"
                onClick={handlePostHeaderInfo}
              >
                Update
              </button>
            </section>
          </form>
        }
      />
      {/* Modal - StydyPlan*/}
      <Modal
        modalID="modal-edit-studyPlan"
        modalHeaderStyle="d-none"
        modalFooterStyle="d-none"
        modalBodyContent={
          <form className="a-home-form">
            <h1 className="topic">Edit Information</h1>

            <div className="input-box">
              <label htmlFor="studyPlanTopic" className="form-label mb-2">
                * Topic
              </label>
              <input
                type="text"
                name="Topic"
                id="studyPlanTopic"
                placeholder={modalStudyPlanInfo.topic}
                className="form-control mb-3"
                onChange={(e) => setNewTopicStudyPlan(e.target.value)}
              />
            </div>

            <div className="input-box">
              <label htmlFor="studyPlanDesc1" className="form-label mb-2">
                * Description - 1
              </label>
              <textarea
                type="text"
                name="studyPlanDesc1"
                id="studyPlanDesc1"
                placeholder={modalStudyPlanInfo.description1}
                className="form-control mb-3"
                onChange={(e) => setNewDesc1StudyPlan(e.target.value)}
              ></textarea>
            </div>

            <div className="input-box">
              <label htmlFor="studyPlanDesc2" className="form-label mb-2">
                * Description - 2
              </label>
              <textarea
                type="text"
                name="tudyPlanDesc2"
                id="studyPlanDesc2"
                placeholder={modalStudyPlanInfo.description2}
                className="form-control mb-3"
                onChange={(e) => setNewDesc2StudyPlan(e.target.value)}
              ></textarea>
            </div>

            <section className="btn-container">
              <button
                data-bs-dismiss="modal"
                className="btn btn-cancel"
                onClick={handleCancel}
              >
                Cancel
              </button>

              <button
                type="button"
                className="btn btn-update"
                onClick={handlePostStudyPlanInfo}
              >
                Update
              </button>
            </section>
          </form>
        }
      />
      {/* Modal - Degree */}
      <Modal
        modalID="modal-edit-degree"
        modalHeaderStyle="d-none"
        modalFooterStyle="d-none"
        modalBodyContent={
          <form className="a-home-form">
            <h1 className="topic">Edit Information</h1>

            <div className="input-box">
              <label htmlFor="thDegree" className="form-label mb-2">
                * ภาษาไทย ( ชื่อเต็ม )
              </label>
              <input
                type="text"
                name="thDegree"
                id="thDegree"
                placeholder={modalDegreeInfo.thDegree}
                className="form-control mb-3"
                onChange={(e) => setNewTHDegree(e.target.value)}
              />
            </div>

            <div className="input-box">
              <label htmlFor="thAbbre" className="form-label mb-2">
                * ( อักษรย่อ )
              </label>
              <input
                type="text"
                name="thAbbre"
                id="thAbbre"
                placeholder={modalDegreeInfo.thAbbre}
                className="form-control mb-3"
                onChange={(e) => setNewTHAbbre(e.target.value)}
              />
            </div>

            <div className="input-box">
              <label htmlFor="enDegree" className="form-label mb-2">
                * ภาษาอังกฤษ ( ชื่อเต็ม )
              </label>
              <input
                type="text"
                name="enDegree"
                id="enDegree"
                placeholder={modalDegreeInfo.enDegree}
                className="form-control mb-3"
                onChange={(e) => setNewENDegree(e.target.value)}
              />
            </div>

            <div className="input-box">
              <label htmlFor="enAbbre" className="form-label mb-2">
                * ( อักษรย่อ )
              </label>
              <input
                type="text"
                name="enAbbre"
                id="enAbbre"
                placeholder={modalDegreeInfo.enAbbre}
                className="form-control mb-3"
                onChange={(e) => setNewENAbbre(e.target.value)}
              />
            </div>

            <hr />

            <div className="input-box">
              <label htmlFor="studyDateTime" className="form-label mb-2">
                * วันและเวลาเรียน
              </label>
              <input
                type="text"
                name="studyDateTime"
                id="studyDateTime"
                placeholder={modalDegreeInfo.studyDateTime}
                className="form-control mb-3"
                onChange={(e) => setNewDateTime(e.target.value)}
              />
            </div>

            <section className="btn-container">
              <button
                data-bs-dismiss="modal"
                className="btn btn-cancel"
                onClick={handleCancel}
              >
                Cancel
              </button>

              <button
                type="button"
                className="btn btn-update"
                onClick={handlePostDegreeInfo}
              >
                Update
              </button>
            </section>
          </form>
        }
      />

      {/* Modal - CareerPath */}
      <Modal
        modalID="modal-edit-careerPath"
        modalHeaderStyle="d-none"
        modalFooterStyle="d-none"
        modalBodyContent={
          <form className="a-home-form">
            <h1 className="topic">Edit Information</h1>

            <div className="d-flex flex-column">
              <label className="form-label mb-2">* New Education</label>
              {newCareerPath.map((item, index) => (
                <div key={index} className="d-flex gap-2 mb-3 flex-wrap">
                  <div className="flex-grow-1">
                    <textarea
                      placeholder="Career Path"
                      className="form-control"
                      value={item.path}
                      onChange={(e) =>
                        handleFieldChange(index, "path", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex-grow-1">
                    <textarea
                      placeholder="Description"
                      className="form-control"
                      value={item.desc}
                      onChange={(e) =>
                        handleFieldChange(index, "desc", e.target.value)
                      }
                    />
                  </div>
                  {index > 0 && (
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDeleteField(index)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={handleAddField}
                className="btn btn-secondary mb-4"
              >
                Add Career-Path.
              </button>
            </div>

            <section className="btn-container">
              <button
                data-bs-dismiss="modal"
                className="btn btn-cancel"
                onClick={handleCancel}
              >
                Cancel
              </button>

              <button
                type="button"
                className="btn btn-update"
                onClick={handlePostCareerPath}
                // disabled={newCareerPath.some((e) => e.trim() === "")}
              >
                Update
              </button>
            </section>
          </form>
        }
      />

      {/* Modal - Contact */}
      <Modal
        modalID="modal-edit-contact"
        modalHeaderStyle="d-none"
        modalFooterStyle="d-none"
        modalBodyContent={
          <form className="a-home-form">
            <h1 className="topic">Edit Information</h1>

            <div className="input-box">
              <label htmlFor="contactTopic" className="form-label mb-2">
                * Topic
              </label>
              <input
                type="text"
                name="contactTopic"
                id="contactTopic"
                placeholder={modalContactInfo.topic}
                className="form-control mb-3"
                onChange={(e) => setNewContactTopic(e.target.value)}
              />
            </div>

            <div className="input-box">
              <label htmlFor="contactDesc" className="form-label mb-2">
                * Description
              </label>
              <textarea
                type="text"
                name="contactDesc"
                id="contactDesc"
                placeholder={modalContactInfo.description}
                className="form-control mb-3"
                onChange={(e) => setNewContactDesc(e.target.value)}
              ></textarea>
            </div>

            <div className="input-box">
              <label htmlFor="contactAddress" className="form-label mb-2">
                * Address
              </label>
              <input
                type="text"
                name="contactAddress"
                id="contactAddress"
                placeholder={modalContactInfo.address}
                className="form-control mb-3"
                onChange={(e) => setNewAddress(e.target.value)}
              />
            </div>

            <div className="input-box">
              <label htmlFor="contactMobile" className="form-label mb-2">
                * Mobile
              </label>
              <input
                type="text"
                name="contactMobile"
                id="contactMobile"
                placeholder={`0${modalContactInfo.mobile}`}
                className="form-control mb-3"
                onChange={(e) => setNewMobile(e.target.value)}
              />
            </div>

            <div className="input-box">
              <label htmlFor="contactAvailable" className="form-label mb-2">
                * Available
              </label>
              <input
                type="text"
                name="contactAvailable"
                id="contactAvailable"
                placeholder={modalContactInfo.available}
                className="form-control mb-3"
                onChange={(e) => setNewAvailable(e.target.value)}
              />
            </div>

            <div className="input-box">
              <label htmlFor="contactEmail" className="form-label mb-2">
                * Email
              </label>
              <input
                type="email"
                name="contactEmail"
                id="contactEmail"
                placeholder={modalContactInfo.email}
                className="form-control mb-3"
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>

            <div className="input-box">
              <label htmlFor="contactFacebook" className="form-label mb-2">
                * Facebook
              </label>
              <input
                type="text"
                name="contactFacebook"
                id="contactFacebook"
                placeholder={modalContactInfo.facebook}
                className="form-control mb-3"
                onChange={(e) => setNewFacebook(e.target.value)}
              />
            </div>

            <div className="input-box">
              <label htmlFor="contactTiktok" className="form-label mb-2">
                * Tiktok
              </label>
              <input
                type="text"
                name="contactTiktok"
                id="contactTiktok"
                placeholder={modalContactInfo.tiktok}
                className="form-control mb-3"
                onChange={(e) => setNewTiktok(e.target.value)}
              />
            </div>

            <section className="btn-container">
              <button
                data-bs-dismiss="modal"
                className="btn btn-cancel"
                onClick={handleCancel}
              >
                Cancel
              </button>

              <button
                type="button"
                className="btn btn-update"
                onClick={handlePostContactInfo}
              >
                Update
              </button>
            </section>
          </form>
        }
      />

      {/* Modal - Youtube Review */}
      <Modal
        modalID="modal-edit-yt-review"
        modalHeaderStyle="d-none"
        modalFooterStyle="d-none"
        modalBodyContent={
          <form className="a-home-form">
            <h1 className="topic">Edit Information</h1>

            <div className="input-box">
              <label htmlFor="ytReviewTopic" className="form-label mb-2">
                * Topic
              </label>
              <input
                type="text"
                name="ytReviewTopic"
                id="ytReviewTopic"
                placeholder={modalYTReviewInfo.topic}
                className="form-control mb-3"
                onChange={(e) => setNewTopicYTReview(e.target.value)}
              />
            </div>

            <div className="input-box">
              <label htmlFor="ytReviewDesc" className="form-label mb-2">
                * Description
              </label>
              <textarea
                type="text"
                name="ytReviewDesc"
                id="ytReviewDesc"
                placeholder={modalYTReviewInfo.description}
                className="form-control mb-3"
                onChange={(e) => setNewDescYTReview(e.target.value)}
              ></textarea>
            </div>

            <div className="input-box">
              <label htmlFor="ytReviewEmbed" className="form-label mb-2">
                * Embed Link
              </label>
              <input
                type="text"
                name="ytReviewEmbed"
                id="ytReviewEmbed"
                placeholder={modalYTReviewInfo.embed}
                className="form-control mb-3"
                onChange={(e) => setNewEmbedYTReview(e.target.value)}
              />
            </div>

            <section className="btn-container">
              <button
                data-bs-dismiss="modal"
                className="btn btn-cancel"
                onClick={handleCancel}
              >
                Cancel
              </button>

              <button
                type="button"
                className="btn btn-update"
                onClick={handlePostYTReviewInfo}
              >
                Update
              </button>
            </section>
          </form>
        }
      />

      {/* Modal - Preview Info */}
      <Modal
        modalID="modal-preview"
        modalHeaderStyle="preview-topic-container"
        modalTitleStyle="preview-topic"
        modalTitle={"Information Preview"}
        modalFooterStyle="d-none"
        modalSize="modal-lg"
        modalBodyContent={
          <article className="preview-info-container">
            <article className="preview-content row m-0">
              <section className="col-md-4">
                <img
                  src={selectedImage.image}
                  alt={selectedInfo.name}
                  className="content-img"
                />
              </section>
              <section className="col-md-8">
                <p className="position">{selectedInfo.position}</p>
                <h6 className="name">{selectedInfo.name}</h6>

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

                {Array.isArray(selectedInfo.expLocations) &&
                  selectedInfo.expLocations.length !== 0 &&
                  Array.isArray(selectedInfo.expPositions) &&
                  selectedInfo.expPositions.length !== 0 && (
                    <>
                      <h6 className="exp-topic">ประสบการณ์:</h6>
                      {selectedInfo.expLocations.map((expLocat, idx) => (
                        <section key={idx}>
                          <p className="exp m-0">{expLocat}</p>
                          <p className="exp">
                            {selectedInfo.expPositions[idx]}
                          </p>
                        </section>
                      ))}
                    </>
                  )}

                {Array.isArray(selectedInfo.researchs) &&
                  selectedInfo.researchs.length !== 0 && (
                    <>
                      <h6 className="res-topic">ผลงานวิจัย:</h6>
                      {selectedInfo.researchs.map((res, idx) => (
                        <p key={idx} className="res">
                          {res}
                        </p>
                      ))}
                    </>
                  )}

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
              </section>
            </article>
          </article>
        }
      />
    </main>
  );
};

export default A_Home;
