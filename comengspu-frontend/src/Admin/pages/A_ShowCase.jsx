import React, { useEffect, useState } from "react";

import Modal from "../../EComponents/Modal";
import ModalDel from "../../EComponents/ModalDel";
import ModalApprove from "../../EComponents/ModalApprove";
import notFound from "../../DAssets/svg/NotFound.svg";

import Axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const A_ShowCase = ({ id }) => {
  const [isLoadingImg, setIsLoadingImg] = useState(true);

  // Overlay
  const [selectedImg, setSelectedImg] = useState(null);

  // -------------------------------------------------------------- GET -------------------------------------------------
  // GET ALL *SHOWCASE
  const [showcase, setShowcase] = useState([]);
  // console.log(showcase)

  const handleGetShowcase = async () => {
    try {
      setIsLoadingImg(true);
      // console.log("🔍 Cookie:", document.cookie);
      const res = await Axios.get(`${API_URL}/studentShowcase`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
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

  // console.log(images)
  const [images, setImages] = useState([]);
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

  useEffect(() => {
    document.title = "Showcase (Files) | Admin";
    handleGetShowcase();
  }, []);

  // -------------------------------------------------------------- POST -------------------------------------------------
  // POST NEW *SHOWCASE
  const [studentID, setStudentID] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();
  const [previewImage, setPreviewImage] = useState();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const handleImg = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (image && image.size > 500 * 1024) {
      alert("Image size must be less than 500 KB.");
      return;
    }

    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handlePostShowcase = async () => {
    try {
      const formData = new FormData();
      formData.append("studentID", studentID);
      formData.append("topic", topic);
      formData.append("fname", fname);
      formData.append("lname", lname);
      formData.append("description", description);
      formData.append("image", image);

      if (image && image.size > 500 * 1024) {
        alert("Image size must be less than 500 KB.");
        return;
      }

      const token = localStorage.getItem("token");
      const res = await Axios.post(`${API_URL}/studentShowcase`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
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
      alert(`[Showcase] Internal server ${err}`);
    }
  };

  // -------------------------------------------------------------- SELECTED -------------------------------------------------
  // Post *Selected Showcase
  const [newSelect, setNewSelect] = useState([]);
  // console.log(newSelect);

  const handleSelectedShowcase = async () => {
    try {
      const res = await Axios.get(`${API_URL}/studentShowcase/selected`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        // console.log(res.data)
        const ids = res.data.map((item) => item.id);
        setNewSelect(ids);
      } else {
        alert(`Error to get Showcase`);
      }
    } catch (err) {
      alert(`Internal server error: ${err}`);
    }
  };

  useEffect(() => {
    handleSelectedShowcase();
  }, []);

  const handleNewSelect = (newItem) => {
    const isAlreadySelected = newSelect.includes(newItem.id);

    if (isAlreadySelected) {
      setNewSelect(newSelect.filter((id) => id !== newItem.id));
    } else {
      if (newSelect.length < 3) {
        setNewSelect([...newSelect, newItem.id]);
      } else {
        alert(`Select only 3 Showcase for 'Show'`);
      }
    }
  };

  const handleSaveNewSelect = async () => {
    try {
      const res = await Axios.put(
        `${API_URL}/studentShowcase/select`,
        newSelect,
        { withCredentials: true }
      );
      if (res.status === 200) {
        alert(`Save New "Selected Showcase" Sueccessful.`);
        location.reload();
      } else {
        alert(`Save New "Selected Showcase" Failed.`);
      }
    } catch (err) {
      alert(`Internal server error: ${err.message}`);
    }
  };

  // -------------------------------------------------------------- PUT -------------------------------------------------
  // PUT *SHOWCASE
  const [oldInfo, setOldInfo] = useState([]);
  const [newStudentID, setNewStudentID] = useState("");
  const [oldImage, setOldImage] = useState([]);
  const [newTopic, setNewTopic] = useState("");
  const [newFname, setNewFname] = useState("");
  const [newLname, setNewLname] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newImage, setNewImage] = useState();
  const [newPreviewImage, setNewPreviewImage] = useState();

  const handlePutShowcase = async () => {
    try {
      // ตรวจสอบค่าที่ได้จากการกรอกข้อมูล
      const updateStudentID = newStudentID.trim()
        ? newStudentID
        : oldInfo.studentID;
      const updatedTopic = newTopic.trim() ? newTopic : oldInfo.topic;
      const updatedDescription = newDescription.trim()
        ? newDescription
        : oldInfo.description;
      const updatedImage = newImage ? newImage : oldInfo.image;
      const updatedFname = newFname ? newFname : oldInfo.fname;
      const updatedLname = newLname ? newLname : oldInfo.lname;

      const formData = new FormData();
      formData.append("studentID", updateStudentID);
      formData.append("topic", updatedTopic);
      formData.append("description", updatedDescription);
      formData.append("image", updatedImage);
      formData.append("fname", updatedFname);
      formData.append("lname", updatedLname);

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

  // Put Status (Approved)
  const [approveItem, setApproveItem] = useState([]);

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

  // ----------------------------- Approve All
  const [idWaiting, setIDwaiting] = useState([]);
  // console.log(idWaiting);

  const handleApproveAll = async () => {
    if (idWaiting.length === 0) {
      alert("No showcase waiting for approval.");
      return;
    }

    try {
      const res = await Axios.put(
        `${API_URL}/studentShowcase/all/status`,
        {
          status: "Approved",
          id: idWaiting,
        },
        { withCredentials: true }
      );

      if (res.status === 200) {
        alert(`[Showcase] Approve *All Status Successful.`);
        location.reload();
      } else {
        alert(`[Showcase] Approve Failed.`);
        location.reload();
      }
    } catch (err) {
      alert(`[Showcase] Internal server ${err.message}`);
    }
  };

  return (
    <main className="a-showcase-container">
      <section className="top-container">
        <h1 className="topic">Showcase ( Poster )</h1>
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
              className="btn btn-appv-all mx-2"
              data-bs-toggle="modal"
              data-bs-target="#modal-appv-all"
              disabled={
                showcase.filter((show) => show.status === "Waiting").length ===
                0
              }
              onClick={() =>
                setIDwaiting(
                  showcase
                    .filter((show) => show.status === "Waiting")
                    .map((show) => show.id)
                )
              }
            >
              Approve All
            </button>

            <button
              data-bs-toggle="modal"
              data-bs-target="#modal-add-new"
              className="btn btn-add-new"
            >
              Add New
            </button>
            <button
              data-bs-toggle="modal"
              data-bs-target="#modal-save-select"
              className="btn btn-save-select"
            >
              Save Select
            </button>
          </section>
        </section>
      </section>

      <article className="content-container">
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
              <section
                key={idx}
                // className="col-sm-6 col-md-3"
              >
                <section
                  className={`content-card 
                    ${
                      newSelect && newSelect.includes(showcaseItem.id)
                        ? "selected"
                        : ""
                    }`}
                >
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
                      <span
                        className={`status
                          ${
                            showcaseItem.status === "Approved" ? "Approved" : ""
                          }
                        `}
                      >
                        <i className="bi bi-check-circle-fill"></i>
                        {showcaseItem.status}
                      </span>
                    ) : (
                      <span
                        className={`status
                          ${showcaseItem.status === "Waiting" ? "Waiting" : ""}
                        `}
                        data-bs-toggle="modal"
                        data-bs-target="#modal-approve"
                        onClick={() => setApproveItem(showcaseItem)}
                      >
                        <i className="bi bi-clock-fill"></i>
                        {showcaseItem.status}
                      </span>
                    )}
                    <section onClick={() => handleNewSelect(showcaseItem)}>
                      <p className="id mt-3">
                        Student ID: {showcaseItem.studentID}
                      </p>
                      <p className="id mt-0">
                        By: {showcaseItem.fname} {showcaseItem.lname}
                      </p>
                      <h1 className="topic">{showcaseItem.topic}</h1>
                      <p className="desc">{showcaseItem.description}</p>
                    </section>
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
                placeholder="ex. 699999999"
                onChange={(e) => setStudentID(e.target.value)}
              />
            </div>

            {/* Fname + Lname */}
            <section className="fl-name-container row d-flex justify-content-between">
              {/* Fname */}
              <div className="input-box col-md-7">
                <label htmlFor="fname" className="mb-2">
                  * First Name
                </label>
                <input
                  type="text"
                  name="fname"
                  id="fname"
                  className="form-control mb-3"
                  placeholder="First Name"
                  onChange={(e) => setFname(e.target.value)}
                />
              </div>

              {/* Lname */}
              <div className="input-box col-md-5">
                <label htmlFor="lname" className="mb-2">
                  * Last Name
                </label>
                <input
                  type="text"
                  name="lname"
                  id="lname"
                  className="form-control mb-3"
                  placeholder="Last Name"
                  onChange={(e) => setLname(e.target.value)}
                />
              </div>
            </section>

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

            {/* Image-1 */}
            <div className="input-box">
              <label htmlFor="image" className="mb-2">
                * Image ( ไม่เกิน 500 KB )
              </label>
              {/* <input
                type="file"
                name="image"
                id="image"
                className="form-control mb-3"
                onChange={(e) => handleImg(e.target.files[0])}
              /> */}
              <input
                type="file"
                name="image"
                id="image"
                className="form-control mb-3"
                accept="image/*"
                onChange={handleImg}
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
                placeholder={oldInfo.studentID}
                onChange={(e) => setNewStudentID(e.target.value)}
              />
            </div>

            {/* Fname + Lname */}
            <section className="fl-name-container row m-0 d-flex justify-content-between">
              {/* Fname */}
              <div className="input-box col-md-7 p-0">
                <label htmlFor="fname" className="mb-2">
                  * First Name
                </label>
                <input
                  type="text"
                  name="fname"
                  id="fname"
                  className="form-control mb-3"
                  placeholder={oldInfo.lname}
                  onChange={(e) => setNewFname(e.target.value)}
                />
              </div>

              {/* Lname */}
              <div className="input-box col-md-5 pe-0">
                <label htmlFor="lname" className="mb-2">
                  * Last Name
                </label>
                <input
                  type="text"
                  name="lname"
                  id="lname"
                  className="form-control mb-3"
                  placeholder={oldInfo.fname}
                  onChange={(e) => setNewLname(e.target.value)}
                />
              </div>
            </section>

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
                * Image
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
                  // src={oldInfo.img}
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
        modalDelID="modal-delete"
        modalDelTitle="(Student) Showcase"
        modalDelContent={delInfo}
        modalDelPath="studentShowcase"
      />

      {/* Modal *Approve */}
      <ModalApprove
        approveItem={approveItem}
        approvePath="studentShowcase"
        approveTitle="Showcase"
      />

      {/* Modal *Approve All */}
      <Modal
        modalID="modal-appv-all"
        modalHeaderStyle="d-none"
        modalFooterStyle="d-none"
        modalBodyContent={
          <article className="modal-approve">
            <section className="icon-container">
              <i className="bi bi-check-circle-fill"></i>
            </section>
            <h1 className="topic">
              Approve <strong>*Showcase Status</strong>
            </h1>
            <p className="desc mb-1">You're going to approve</p>
            {idWaiting.map((id, idx) => (
              <p className="my-1" key={idx}>
                Showcase ID: {id}
              </p>
            ))}
            <p className="desc mb-1">Are you sure ?</p>
            <section className="btn-container mt-3">
              <button
                type="button"
                data-bs-dismiss="modal"
                className="btn btn-cancel"
              >
                No, Cancel
              </button>
              <button
                type="button"
                onClick={handleApproveAll}
                className="btn btn-approve"
              >
                Yes, Approve!
              </button>
            </section>
          </article>
        }
      />

      {/* Modal *Save Select */}
      <Modal
        modalID="modal-save-select"
        modalHeaderStyle="d-none"
        modalFooterStyle="d-none"
        modalBodyContent={
          <article className="modal-save-select">
            <h2 className="topic">Save Select For Show</h2>
            <p className="desc">
              Are you going to save select this 'Showcase' for show
            </p>

            {newSelect.length > 0
              ? newSelect.map((newSelect, idx) => (
                  <ul key={idx} className="select-list">
                    <li className="select">[New Select] ID: {newSelect}</li>
                  </ul>
                ))
              : null}

            <section className="btn-container">
              <button className="btn btn-no" data-bs-dismiss="modal">
                No, Select New
              </button>

              <button
                className="btn btn-yes"
                type="button"
                disabled={newSelect.length !== 3}
                onClick={handleSaveNewSelect}
              >
                Yes, Select it!
              </button>
            </section>
          </article>
        }
      />

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

export default A_ShowCase;
