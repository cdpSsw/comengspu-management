import React, { useEffect, useState } from "react";

import Modal from "../../EComponents/Modal";
import ModalDel from "../../EComponents/ModalDel";
import notFound from "../../DAssets/svg/NotFound.svg";
import posterSize from "../../DAssets/exposter/poster_size.png";

import Axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

// exposter
import ev1 from "../../DAssets/exposter/ev1.png";
import ev2 from "../../DAssets/exposter/ev2.png";
import ev3 from "../../DAssets/exposter/ev3.png";
import sc1 from "../../DAssets/exposter/sc1.png";
import sc2 from "../../DAssets/exposter/sc2.png";
import sc3 from "../../DAssets/exposter/sc3.png";

const B_ShowCase = ({ id, fname, lname }) => {
  const [isLoadingImg, setIsLoadingImg] = useState(true);

  const showcaseA = [
    {
      id: 1,
      studentID: "64053441",
      img: ev1,
      topic: "Main Topic #1",
      description: "Description Support Topic",
      status: "Approved",
    },
    {
      id: 2,
      studentID: "64053441",
      img: ev2,
      topic: "Main Topic #2",
      description: "Description Support Topic",
      status: "Approved",
    },
    {
      id: 3,
      studentID: "64053441",
      img: ev3,
      topic: "Main Topic #3",
      description: "Description Support Topic",
      status: "Approved",
    },
    {
      id: 4,
      studentID: "64053441",
      img: sc1,
      topic: "Main Topic #1",
      description: "Description Support Topic",
      status: "Waiting",
    },
    {
      id: 5,
      studentID: "64053441",
      img: sc2,
      topic: "Main Topic #1",
      description: "Description Support Topic",
      status: "Waiting",
    },
    {
      id: 6,
      studentID: "64053441",
      img: sc3,
      topic: "Main Topic #1",
      description: "Description Support Topic",
      status: "Waiting",
    },
  ];

  // console.log(fname, lname)
  // Overlay
  const [selectedImg, setSelectedImg] = useState(null);

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
      alert(`Internal server ${err}`);
    }
  };

  useEffect(() => {
    document.title = "Showcase (Poster) | Student";
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
      alert(`Internal server ${err}`);
    }
  };

  useEffect(() => {
    handleGetImages();
  }, []);

  // POST NEW *SHOWCASE
  const [studentID, setStudentID] = useState(id);
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();
  const [previewImage, setPreviewImage] = useState();

  const handlePostShowcase = async () => {
    try {
      const formData = new FormData();
      formData.append("studentID", studentID);
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
      alert(`Internal server ${err.message}`);
    }
  };

  // ... handleImg
  const handleImg = (e) => {
    setImage(e);
    setPreviewImage(URL.createObjectURL(e));
  };

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

      const formData = new FormData();
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
      alert(`Internal server error: ${err}`);
    }
  };

  // ... handleImg
  const handleNewImg = (e) => {
    setNewImage(e);
    setNewPreviewImage(URL.createObjectURL(e));
  };

  // DELETE *SHOWCASE
  const [delInfo, setDelInfo] = useState([]);

  // HANDLE *CANCEL MODAL
  const handleClosedModal = () => {
    document.getElementById("topic").value = "";
    document.getElementById("description").value = "";
    document.getElementById("image").value = "";
  };

  // Filter - Sub Menu [Status]
  const [filter, setFilter] = useState("All");
  const filteredShowcase = showcase.filter(
    (item) => filter === "All" || item.status === filter
  );

  return (
    <main className="b-showcase-container">
      <section className="top-container">
        <h1 className="topic">Showcase (Poster)</h1>
        <hr />

        <section className="fil-save-select-container">
          <section className="filter-container">
            <button
              className={`btn btn-all
                ${filter === "All" ? "active" : ""}
              `}
              onClick={() => setFilter("All")}
            >
              All
            </button>
            <button
              className={`btn btn-approved
                ${filter === "Approved" ? "active" : ""}
              `}
              onClick={() => setFilter("Approved")}
            >
              Approved
            </button>
            <button
              className={`btn btn-waiting
                ${filter === "Waiting" ? "active" : ""}
              `}
              onClick={() => setFilter("Waiting")}
            >
              Waiting
            </button>
          </section>

          <section className="save-select-add-new-container">
            <button
              data-bs-toggle="modal"
              data-bs-target="#modal-add-new"
              className="btn btn-add-new"
            >
              Add New
            </button>
          </section>
        </section>
      </section>

      <article className="content-container row m-0">
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
        ) : filteredShowcase.length === 0 ? (
          <section className="nf-login-container">
            <img
              src={notFound}
              alt="No youtube items found"
              className="notFoundImg-login"
            />
          </section>
        ) : (
          filteredShowcase.map((showcaseItem, idx) => {
            const showcaaseImages = images.filter(
              (img) => img.id === showcaseItem.id
            );
            return (
              <section key={idx} className="col-sm-6 col-md-3">
                <section className="content-card">
                  {showcaaseImages.length > 0 && (
                    <img
                      key={showcaseItem.id}
                      src={showcaaseImages[0].image}
                      alt={`img-${showcaaseImages[0].id}`}
                      className="content-img"
                      onClick={() => setSelectedImg(showcaaseImages[0])}
                    />
                  )}

                  <section className="text-container">
                    {showcaseItem.status === "Approved" ? (
                      <span className="status Approved">
                        <i className="bi bi-check-circle-fill"></i>
                        {showcaseItem.status}
                      </span>
                    ) : (
                      <span
                        className={`status ${
                          showcaseItem.status === "Waiting" ? "Waiting" : ""
                        }`}
                      >
                        <i className="bi bi-clock-fill"></i>
                        {showcaseItem.status}
                      </span>
                    )}
                    {/* <p className="id">Student ID: {showcaseItem.studentID}</p> */}
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
                      onClick={() => [
                        setOldInfo(showcaseItem),
                        setOldImage(showcaaseImages[0]),
                      ]}
                    >
                      Update
                    </button>
                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#modal-delete"
                      className="btn btn-del"
                      onClick={() => setDelInfo(showcaseItem)}
                    >
                      Delete
                    </button>
                  </section>
                </section>
              </section>
            );
          })
        )}
      </article>

      {/* Modal - Add *Showcase */}
      <Modal
        modalID="modal-add-new"
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
              // <img src={posterSize} className="preview-image"/>
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
                  src={oldImage.image}
                  // src={`/images/stu_showcase/${oldInfo.image}`}
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
        modalDelID="modal-delete"
        modalDelTitle="(Student) Showcase"
        modalDelContent={delInfo}
        modalDelPath="studentShowcase"
      />

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
    </main>
  );
};

export default B_ShowCase;
