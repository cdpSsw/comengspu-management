import React, { useState, useEffect } from "react";

import notFound from "../../DAssets/svg/NotFound.svg";
import posterSize from "../../DAssets/exposter/poster_size.png";

// Components
import Modal from "../../EComponents/Modal";
import ModalDel from "../../EComponents/ModalDel";

import Axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const B_Home = ({ id, fname, lname }) => {
  // Overlay
  const [selectedImg, setSelectedImg] = useState("");
  const [isLoadingImg, setIsLoadingImg] = useState(true);
  const [isLoadingLink, setIsLoadingLink] = useState(true);

  // -------------------------------------------------------------- GET -------------------------------------------------
  // GET ALL *SHOWCASE
  const [showcase, setShowcase] = useState([]);
  const handleGetShowcase = async () => {
    try {
      setIsLoadingImg(true);
      const res = await Axios.get(`${API_URL}/studentShowcase/${id}`, {
        withCredentials: true,
      });

      if (res.status === 200) {
        setShowcase(res.data);
      } else {
        alert(`Error to get Showcase, for this id: ${id}`);
      }

      setIsLoadingImg(false);
    } catch (err) {
      alert(
        `[Get Showcase] : ${err.message} || ${
          err.response?.data?.error || err.response?.data?.message
        }`
      );
    }
  };

  useEffect(() => {
    document.title = "Showcase (Files) | Admin";
    handleGetShowcase();
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
      alert(
        `[Get-Image] : ${err.message} || ${
          err.response?.data?.error || err.response?.data?.message
        }`
      );
    }
  };

  useEffect(() => {
    handleGetImages();
  }, []);

  // -------------------------------------------------------------- POST -------------------------------------------------
  // POST NEW *SHOWCASE
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState();

  const handlePostShowcase = async () => {
    try {
      const formData = new FormData();
      formData.append("studentID", id);
      formData.append("fname", fname);
      formData.append("lname", lname);
      formData.append("topic", topic);
      formData.append("description", description);
      formData.append("image", image);

      if (image && image.size > 500 * 1024) {
        alert("Image size must be less than 500 KB.");
        return;
      }

      const res = await Axios.post(`${API_URL}/studentShowcase`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.status === 200) {
        alert(`Add New Showcase Succesful.`);
        location.reload();
      } else {
        alert(`Error to get Showcase, for this id: ${id}`);
        location.reload();
      }
    } catch (err) {
      alert(
        `[Showcase] : ${err.message} || ${
          err.response?.data?.error || err.response?.data?.message
        }`
      );
    }
  };

  // ... handleImg
  const handleImg = (e) => {
    setImage(e);
    setPreviewImage(URL.createObjectURL(e));
  };

  // -------------------------------------------------------------- PUT -------------------------------------------------
  // PUT *SHOWCASE
  const [oldInfo, setOldInfo] = useState([]);
  const [oldImage, setOldImage] = useState([]);
  const [newTopic, setNewTopic] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newImage, setNewImage] = useState();
  const [newPreviewImage, setNewPreviewImage] = useState();

  const handlePutShowcase = async () => {
    try {
      // ตรวจสอบค่าที่ได้จากการกรอกข้อมูล
      const updatedTopic = newTopic.trim() ? newTopic : oldInfo.topic;
      const updatedDescription = newDescription.trim()
        ? newDescription
        : oldInfo.description;
      const updatedImage = newImage ? newImage : oldInfo.image;

      const formData = new FormData();;
      formData.append("studentID", id);
      formData.append("topic", updatedTopic);
      formData.append("description", updatedDescription);
      formData.append("image", updatedImage);
      formData.append("fname", fname);
      formData.append("lname", lname);

      const res = await Axios.put(
        `${API_URL}/studentShowcase/${oldInfo.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        alert(`Update Showcase Successful.`);
        location.reload();
      } else {
        alert(`Error to Update Showcase, for this id: ${oldInfo.id}`);
        location.reload();
      }
    } catch (err) {
      alert(
        `[Student-Showcase] : ${err.message} || ${
          err.response?.data?.error || err.response?.data?.message
        }`
      );
    }
  };

  // ... handleImg
  const handleNewImg = (e) => {
    setNewImage(e);
    setNewPreviewImage(URL.createObjectURL(e));
  };

  // DELETE *SHOWCASE
  const [delInfo, setDelInfo] = useState([]);

  // ----------------------------------------- TIKTOK ------------------------------------
  // Get *ShowTiktok
  const [showTiktok, setShowTiktok] = useState([]);
  const handleShowTiktok = async () => {
    try {
      setIsLoadingLink(true);
      const res = await Axios.get(`${API_URL}/studentShowTiktok/${id}`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setShowTiktok(res.data);
      } else {
        alert(`Error to get *ShowTiktok, [Check/Log]`);
        return;
      }
      setIsLoadingLink(false);
    } catch (err) {
      alert(
        `[Student-ShowTiktok] : ${err.message} || ${
          err.response?.data?.error || err.response?.data?.message
        }`
      );
    }
  };

  useEffect(() => {
    document.title = "Homepage | Student";
    handleShowTiktok();
  }, []);

  // Post *ShowTiktok
  const [topicTT, setTopicTT] = useState("");
  const [embed, setEmbed] = useState("");

  const handlePostshowTiktok = async () => {
    try {
      const formData = new FormData();
      formData.append("studentID", id);
      formData.append("fname", fname);
      formData.append("lname", lname);
      formData.append("topic", topicTT);
      formData.append("embed", embed);
      
      const res = await Axios.post(`${API_URL}/studentshowTiktok`, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.status === 200) {
        alert(`Add New showTiktok Succesful.`);
        location.reload();
      } else {
        alert(`Error to get showTiktok, for this id: ${id}`);
        location.reload();
      }
    } catch (err) {
      alert(
        `[Post-ShowTiktok] : ${err.message} || ${
          err.response?.data?.error || err.response?.data?.message
        }`
      );
    }
  };

  // Put *Showcase
  const [oldShowTiktok, setOldShowTiktok] = useState([]);
  const [newTopicTT, setNewTopicTT] = useState("");
  const [newEmbed, setNewEmbed] = useState("");

  const handleUpdateShowTiktok = async () => {
    try {
      const updatedTopic = newTopicTT.trim() ? newTopicTT : oldShowTiktok.topic;
      const updatedEmbed = newEmbed.trim() ? newEmbed : oldShowTiktok.embed;

      const res = await Axios.put(
        `${API_URL}/studentShowTiktok/${oldShowTiktok.id}`,
        { topic: updatedTopic, embed: updatedEmbed, fname: fname, lname: lname },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        alert(`Edit Showcase (id: ${oldShowTiktok.id}) Successful.`);
        location.reload();
      } else {
        alert(`Error to get *Showcase, [Check/Log]`);
        return;
      }
    } catch (err) {
      alert(
        `[Update Showcase] : ${err.message} || ${
          err.response?.data?.error || err.response?.data?.message
        }`
      );
    }
  };

  // ---------------------------------------------------------------------------------------------------
  // Handle Cancel Button
  const handleClosedModal = () => {
    document.getElementById("studentID").value = "";
    document.getElementById("topic").value = "";
    document.getElementById("description").value = "";
    document.getElementById("image").value = "";
    document.getElementById("topic-tiktok").value = "";
    document.getElementById("embed-tiktok").value = "";
    document.getElementById("new-topic-tiktok").value = "";
    document.getElementById("new-embed-tiktok").value = "";
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

  return (
    <main className="stu-home-container">
      <h1 className="topic">
        Hello, {fname} {lname}
      </h1>

      {/* ----------------------------------------- SHOWCASE ------------------------------------------------------------- */}
      <article className="content-container">
        <article className="showcase-container ">
          <section className="top-container">
            <h1 className="topic">Showcase (Poster) Management</h1>

            <section className="btn-container">
              <button
                data-bs-toggle="modal"
                data-bs-target="#modal-add-new"
                className="btn btn-add-new"
              >
                Add New
              </button>
            </section>
          </section>

          <hr />
          {isLoadingImg ? (
            <h1 className="loader mt-5" style={{ color: "black" }}></h1>
          ) : showcase.length === 0 ? (
            <section className="nf-login-container">
              <img
                src={notFound}
                alt="No youtube items found"
                className="notFoundImg-login"
              />
            </section>
          ) : (
            <section className="showcase-card-container">
              {showcase
                .slice()
                .reverse()
                .slice(0, 4)
                .map((showcaseItem, idx) => {
                  const showcaaseImages = images.filter(
                    (img) => img.id === showcaseItem.id
                  );
                  return (
                    <section className="showcase-card" key={idx}>
                      {showcaaseImages.length > 0 && (
                        <img
                          key={showcaseItem.id}
                          src={showcaaseImages[0].image}
                          alt={`img-${showcaaseImages[0].id}`}
                          className="showcase-img"
                          onClick={() => setSelectedImg(showcaaseImages[0])}
                        />
                      )}

                      <section className="text-container">
                        <span
                          className={`status ${
                            showcaseItem.status === "Approved"
                              ? "Approved"
                              : showcaseItem.status === "Waiting"
                              ? "Waiting"
                              : ""
                          }`}
                        >
                          <i
                            className={`bi ${
                              showcaseItem.status === "Approved"
                                ? "bi-check-circle-fill"
                                : "bi-clock-fill"
                            }`}
                          ></i>
                          {showcaseItem.status}
                        </span>

                        <p className="id">
                          By: {fname} {lname}
                        </p>
                        <h1 className="topic">{showcaseItem.topic}</h1>
                        <p className="desc">{showcaseItem.description}</p>
                      </section>

                      <section className="edit-del-container">
                        <button
                          data-bs-toggle="modal"
                          data-bs-target="#modal-update"
                          className="btn btn-update"
                          onClick={() => {
                            setOldInfo(showcaseItem);
                            setOldImage(showcaaseImages[0]);
                          }}
                        >
                          Update
                        </button>
                        <button
                          data-bs-toggle="modal"
                          data-bs-target="#modal-delete-showcase"
                          className="btn btn-del"
                          onClick={() => setDelInfo(showcaseItem)}
                        >
                          Delete
                        </button>
                      </section>
                    </section>
                  );
                })}
            </section>
          )}
        </article>
      </article>

      {/* Modal - Add *Showcase */}
      <Modal
        modalID="modal-add-new"
        modalHeaderStyle="d-none"
        modalFooterStyle="d-none"
        modalBodyContent={
          <form className="form">
            <h1 className="topic">Showcase</h1>

            {/* Student ID */}
            <div className="input-box">
              <label htmlFor="studentID" className="mb-2">
                * Student ID
              </label>
              <input
                type="text"
                name="studentID"
                id="studentID"
                className="form-control mb-3"
                placeholder={id}
                value={id}
                disabled
              />
            </div>

            {/* Topic */}
            <div className="input-box">
              <label htmlFor="topic" className="mb-2">
                * Topic
              </label>
              <input
                type="text"
                name="topic"
                id="topic"
                className="form-control mb-3"
                placeholder="ex. showcase #1"
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            {/* Description */}
            <div className="input-box">
              <label htmlFor="description" className="mb-2">
                * Description
              </label>
              <textarea
                type="text"
                name="description"
                id="description"
                className="form-control mb-3"
                placeholder="type description..."
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            {/* Image */}
            <div className="input-box">
              <label htmlFor="image" className="mb-2">
                * Image ( ไม่เกิน 500 KB )
              </label>
              <input
                type="file"
                name="image"
                id="image"
                className="form-control mb-3"
                onChange={(e) => handleImg(e.target.files[0])}
              />
            </div>

            {
              previewImage ? (
                <img src={previewImage} className="preview-image" />
              ) : null
              // <img src={posterSize} className="preview-image" />
            }

            <section className="btn-container">
              <button
                type="button"
                data-bs-dismiss="modal"
                onClick={handleClosedModal}
                className="btn btn-cancel"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handlePostShowcase}
                className="btn btn-add"
                disabled={
                  topic.trim() === "" || description.trim() === "" || !image
                }
              >
                Add New
              </button>
            </section>
          </form>
        }
      />

      {/* Modal - Update *Showcase */}
      <Modal
        modalID="modal-update"
        modalHeaderStyle="d-none"
        modalFooterStyle="d-none"
        modalBodyContent={
          <form className="form">
            <h1 className="topic">Showcase</h1>

            {/* Topic */}
            <div className="input-box">
              <label htmlFor="topic" className="mb-2">
                * Topic
              </label>
              <input
                type="text"
                name="topic"
                id="topic"
                className="form-control mb-3"
                placeholder={oldInfo.topic}
                onChange={(e) => setNewTopic(e.target.value)}
              />
            </div>

            {/* Description */}
            <div className="input-box">
              <label htmlFor="description" className="mb-2">
                * Description
              </label>
              <textarea
                type="text"
                name="description"
                id="description"
                className="form-control mb-3"
                placeholder={oldInfo.description}
                onChange={(e) => setNewDescription(e.target.value)}
              ></textarea>
            </div>

            {/* Image */}
            <div className="input-box">
              <label htmlFor="image" className="mb-2">
                * Image ( ไม่เกิน 500 KB )
              </label>
              <input
                type="file"
                name="image"
                id="image"
                className="form-control mb-3"
                onChange={(e) => handleNewImg(e.target.files[0])}
              />
            </div>

            {previewImage ? (
              <img src={previewImage} className="preview-image" />
            ) : null}

            {oldInfo ? (
              newPreviewImage ? (
                <img
                  src={newPreviewImage}
                  alt="New Preview"
                  className="preview-image"
                />
              ) : (
                <img
                  // src={oldInfo.image}
                  // src={`/images/stu_showcase/${oldInfo.image}`}
                  src={oldImage.image}
                  alt={oldInfo.topic}
                  className="preview-image"
                />
              )
            ) : null}

            <section className="btn-container">
              <button
                type="button"
                data-bs-dismiss="modal"
                onClick={handleClosedModal}
                className="btn btn-cancel"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handlePutShowcase}
                className="btn btn-update"
              >
                Update
              </button>
            </section>
          </form>
        }
      />

      {/* Modal - Delete *Showcase */}
      <ModalDel
        modalDelID="modal-delete-showcase"
        modalDelTitle="(Student) Showcase"
        modalDelContent={delInfo}
        modalDelPath="studentShowcase"
      />

      {/* Overlay */}
      {selectedImg && (
        <div className="overlay" onClick={() => setSelectedImg(null)}>
          <div className="overlay-content">
            <span className="close-btn" onClick={() => setSelectedImg(null)}>
              &times;
            </span>
            <img
              // src={selectedImg}
              // src={`/images/stu_showcase/${selectedImg}`}
              src={selectedImg.image}
              alt="Preview"
              className="original-img"
            />
          </div>
        </div>
      )}

      {/* ----------------------------------------- SHOWTIKTOK ------------------------------------------------------------- */}
      <article className="content-container">
        <article className="content-container">
          <article className="showTikok-container row m-0">
            <section className="top-container">
              <h1 className="topic">Showcase (Tiktok) Management</h1>

              <section className="btn-container">
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#modal-add-new-tiktok"
                  className="btn btn-add-new"
                >
                  Add New
                </button>
              </section>
            </section>
            <hr />

            {isLoadingLink ? (
              <h1 className="loader mt-5" style={{ color: "black" }}></h1>
            ) : showTiktok.length === 0 ? (
              <section className="nf-login-container">
                <img
                  src={notFound}
                  alt="No youtube items found"
                  className="notFoundImg-login"
                />
              </section>
            ) : (
              showTiktok
                .slice()
                .reverse()
                .slice(0, 3)
                .map((ShowTiktokItem, idx) => (
                  <section key={idx} className="col-sm-12 col-md-4 custom-col">
                    <section className={`showtiktok-card`}>
                      <section
                        className="showtiktok-tiktok mx-5"
                        dangerouslySetInnerHTML={{
                          __html: ShowTiktokItem.embed,
                        }}
                      />

                      <section className="text-container">
                        {ShowTiktokItem.status === "Approved" ? (
                          <span className="status Approved">
                            <i className="bi bi-check-circle-fill"></i>
                            {ShowTiktokItem.status}
                          </span>
                        ) : (
                          <span className="status Waiting">
                            <i className="bi bi-clock-fill"></i>
                            {ShowTiktokItem.status}
                          </span>
                        )}
                        {/* <p className="id">
                          Student ID: {ShowTiktokItem.studentID}
                        </p> */}
                        <p className="id">
                          By: {fname} {lname}
                        </p>
                        <h1 className="topic">{ShowTiktokItem.topic}</h1>
                      </section>

                      <section className="edit-del-container">
                        <button
                          data-bs-toggle="modal"
                          data-bs-target="#modal-update-tiktok"
                          className="btn btn-update"
                          onClick={() => setOldShowTiktok(ShowTiktokItem)}
                        >
                          Update
                        </button>
                        <button
                          data-bs-toggle="modal"
                          data-bs-target="#modal-delete-tiktok"
                          className="btn btn-del"
                          onClick={() => setDelInfo(ShowTiktokItem)}
                        >
                          Delete
                        </button>
                      </section>
                    </section>
                  </section>
                ))
            )}
          </article>
        </article>
      </article>

      {/* Modal *Add New */}
      <Modal
        modalID="modal-add-new-tiktok"
        modalHeaderStyle="d-none"
        modalFooterStyle="d-none"
        modalBodyContent={
          <form className="form">
            <h1 className="topic">Showcase</h1>

            {/* Topic */}
            <div className="input-box">
              <label htmlFor="topic" className="mb-2">
                * Topic
              </label>
              <input
                type="text"
                id="topic-tiktok"
                className="form-control mb-3"
                placeholder="Ex. Topic #1"
                onChange={(e) => setTopicTT(e.target.value)}
              />
            </div>

            {/* Embed */}
            <div className="input-box">
              <label htmlFor="embed" className="mb-2">
                * Embed
              </label>
              <textarea
                type="text"
                id="embed-tiktok"
                className="form-control mb-3"
                placeholder="Place embed..."
                onChange={(e) => setEmbed(e.target.value)}
              ></textarea>
            </div>

            <section
              className="content-tiktok"
              dangerouslySetInnerHTML={{
                __html: newEmbed ? newEmbed : embed,
              }}
            />

            <section className="btn-container">
              <button
                type="button"
                data-bs-dismiss="modal"
                className="btn btn-cancel"
                onClick={handleClosedModal}
              >
                Cancel
              </button>

              <button
                type="button"
                className="btn btn-add"
                onClick={handlePostshowTiktok}
              >
                Add New
              </button>
            </section>
          </form>
        }
      />

      {/* Modal *Edit */}
      <Modal
        modalID="modal-update-tiktok"
        modalHeaderStyle="d-none"
        modalFooterStyle="d-none"
        modalBodyContent={
          <form className="form">
            <h1 className="topic">Edit *Showcase</h1>

            {/* New *Topic */}
            <div className="input-box">
              <label htmlFor="topic" className="mb-2">
                * New Topic
              </label>
              <input
                type="text"
                id="new-topic-tiktok"
                className="form-control mb-3"
                placeholder={oldShowTiktok.topic}
                onChange={(e) => setNewTopicTT(e.target.value)}
              />
            </div>

            {/* New *Embed */}
            <div className="input-box">
              <label htmlFor="embed" className="mb-2">
                * New Embed
              </label>
              <textarea
                type="text"
                id="new-embed-tiktok"
                className="form-control mb-3"
                placeholder={oldShowTiktok.embed}
                onChange={(e) => setNewEmbed(e.target.value)}
              ></textarea>
            </div>

            <section
              className="content-tiktok"
              dangerouslySetInnerHTML={{
                __html: newEmbed ? newEmbed : oldShowTiktok.embed,
              }}
            />

            <section className="btn-container">
              <button
                type="button"
                data-bs-dismiss="modal"
                className="btn btn-cancel"
                onClick={handleClosedModal}
              >
                Cancel
              </button>

              <button
                type="button"
                className="btn btn-update"
                onClick={handleUpdateShowTiktok}
              >
                Update
              </button>
            </section>
          </form>
        }
      />

      {/* Modal *Delete */}
      <ModalDel
        modalDelID="modal-delete-tiktok"
        modalDelTitle="(Admin) Showcase"
        modalDelContent={delInfo}
        modalDelPath="studentShowTiktok"
      />
    </main>
  );
};

export default B_Home;
