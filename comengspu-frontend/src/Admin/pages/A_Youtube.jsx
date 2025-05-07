import React, { useEffect, useState } from "react";
import notFound from "../../DAssets/svg/NotFound.svg";

import Axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

import Modal from '../../EComponents/Modal';
import ModalDel from '../../EComponents/ModalDel';
import ModalApprove from '../../EComponents/ModalApprove';

const A_Youtube = () => {
  const [isLoading, setIsLoading] = useState(true);

  // const youtube = [
  //   {
  //     id: 1,
  //     status: "Waiting",
  //     fname: "Owner",
  //     lname: "Name",
  //     studentID: "64053441",
  //     description:
  //       "ช็อปปิ้งไฮเทคแอลมอนด์โค้ก แชมเปญไวกิ้งยาวี แบ็กโฮเอนทรานซ์สปาย แอพพริคอททรูเหมยอุปการคุณ ตะหงิด",
  //     embed: `<iframe
  //         width="560"
  //         height="315"
  //         src="https://www.youtube.com/embed/xi8klXYfGUs?si=juOqyS1yj2lNvVmf"
  //         title="YouTube video player"
  //         frameborder="0"
  //         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  //         referrerpolicy="strict-origin-when-cross-origin"
  //         allowfullscreen
  //       ></iframe>`,
  //   },
  //   {
  //     id: 2,
  //     status: "Waiting",
  //     fname: "Owner",
  //     lname: "Name",
  //     studentID: "64053441",
  //     description:
  //       "ช็อปปิ้งไฮเทคแอลมอนด์โค้ก แชมเปญไวกิ้งยาวี แบ็กโฮเอนทรานซ์สปาย แอพพริคอททรูเหมยอุปการคุณ ตะหงิด",
  //     embed: `<iframe
  //         width="560"
  //         height="315"
  //         src="https://www.youtube.com/embed/xi8klXYfGUs?si=juOqyS1yj2lNvVmf"
  //         title="YouTube video player"
  //         frameborder="0"
  //         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  //         referrerpolicy="strict-origin-when-cross-origin"
  //         allowfullscreen
  //       ></iframe>`,
  //   },
  //   {
  //     id: 3,
  //     status: "Waiting",
  //     fname: "Owner",
  //     lname: "Name",
  //     studentID: "64053441",
  //     description:
  //       "ช็อปปิ้งไฮเทคแอลมอนด์โค้ก แชมเปญไวกิ้งยาวี แบ็กโฮเอนทรานซ์สปาย แอพพริคอททรูเหมยอุปการคุณ ตะหงิด",
  //     embed: `<iframe
  //         width="560"
  //         height="315"
  //         src="https://www.youtube.com/embed/xi8klXYfGUs?si=juOqyS1yj2lNvVmf"
  //         title="YouTube video player"
  //         frameborder="0"
  //         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  //         referrerpolicy="strict-origin-when-cross-origin"
  //         allowfullscreen
  //       ></iframe>`,
  //   },
  // ];

  const [youtube, setYoutube] = useState([]);
  const handleGetYoutube = async () => {
    try {
      setIsLoading(true);
      // console.log("🔍 Cookie:", document.cookie);
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

  useEffect(() => {
    document.title = "Youtube | Admin";
    handleGetYoutube();
  }, [])
 
  // ------------------------------------------- *Add New Youtube ----------------------------------
  const [studentID, setStudentID] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [description, setDescription] = useState("");
  const [embed, setEmbed] = useState("");

  const handlePostYoutube = async () => {
    try {
      const formData = new FormData();
      formData.append("studentID", studentID);
      formData.append("fname", fname);
      formData.append("lname", lname);
      formData.append("description", description);
      formData.append("embed", embed);

      const token = localStorage.getItem("token");
      const res = await Axios.post(`${API_URL}/studentYoutube`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (res.status === 200) {
        alert(`Add New, Youtube Succesful.`);
        location.reload();

      } else {
        alert(`Add New, Youtube Failed`);
        location.reload();
      }
    } catch (err) {
      alert(`[Youtube] Internal server ${err.message}`);
    }
  };

  // ------------------------------------------- *Put Youtube ----------------------------------
  const [oldInfo, setOldInfo] = useState([]);
  const [newStudentID, setNewStudentID] = useState("");
  const [newFname, setNewFname] = useState("");
  const [newLname, setNewLname] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newEmbed, setNewEmbed] = useState("");
  // console.log(oldInfo);

  const handlePutYoutube = async () => {
    try {
        // ตรวจสอบค่าที่ได้จากการกรอกข้อมูล
        const updateStudentID = newStudentID.trim()
        ? newStudentID
        : oldInfo.studentID;
      const updatedDescription = newDescription.trim()
        ? newDescription
        : oldInfo.description;
      const updatedFname = newFname ? newFname : oldInfo.fname;
      const updatedLname = newLname ? newLname : oldInfo.lname;
      const updatedEmbed = newEmbed ? newEmbed : oldInfo.embed;

      const formData = new FormData();
      formData.append("studentID",updateStudentID);
      formData.append("fname", updatedFname);
      formData.append("lname", updatedLname);
      formData.append("description", updatedDescription);
      formData.append("embed", updatedEmbed);

      const token = localStorage.getItem("token");
      const res = await Axios.put(`${API_URL}/studentYoutube/${oldInfo.id}`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (res.status === 200) {
        alert(`Edit, Youtube Succesful.`);
        location.reload();

      } else {
        alert(`Edit, Youtube Failed`);
        location.reload();
      }
    } catch (err) {
      alert(`[Youtube] Internal server ${err.message}`);
    }
  };

  // ------------------------------------------- *Delete Youtube ----------------------------------
  const [delInfo, setDelInfo] = useState([]);

  const handleClosedModal = () => {
    document.getElementById('studentID').value = '';
    document.getElementById('fname').value = '';
    document.getElementById('lname').value = '';
    document.getElementById('description').value = '';
    document.getElementById('embed').value = '';
    return;
  }

  // Filter - Sub Menu [Status]
  const [filter, setFilter] = useState("All");
  const filteredYoutube = youtube.filter(
    (item) => filter === "All" || item.status === filter
  );
  
  // -------------------------------------------------- Approve ----------------------------------------
  // Put Status (Approved)
  const [approveItem, setApproveItem] = useState([]);

  // ----------------------------- Approve All
  const [idWaiting, setIDwaiting] = useState([]);
  // console.log(idWaiting);

  const handleApproveAll = async () => {
    if (idWaiting.length === 0) {
      alert("No Youtube waiting for approval.");
      return;
    }

    try {
      const res = await Axios.put(
        `${API_URL}/studentYoutube/all/status`,
        {
          status: "Approved",
          id: idWaiting,
        },
        { withCredentials: true }
      );

      if (res.status === 200) {
        alert(`[Youtube] Approve *All Status Successful.`);
        location.reload();
      } else {
        alert(`[Youtube] Approve Failed.`);
        location.reload();
      }
    } catch (err) {
      alert(`[Youtube] Internal server ${err.message}`);
    }
  };

  return (
    <article className="a-youtube-container">
      <section className="top-container">
        <h1 className="topic">Youtube</h1>
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
                youtube.filter((show) => show.status === "Waiting").length === 0
              }
              onClick={() =>
                setIDwaiting(
                  youtube
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
          </section>
        </section>
      </section>

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
        ) : filteredYoutube.length === 0 ? (
          <section className="nf-login-container">
            <img
              src={notFound}
              alt="No youtube items found"
              className="notFoundImg-login"
            />
          </section>
        ) : (
          filteredYoutube.map((youtubeItem, idx) => {
            const currentYoutube = youtube.filter(
              (yt) => yt.id === youtubeItem.id
            );
            return (
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
                    {youtubeItem.status === "Approved" ? (
                      <span
                        className={`status
                                ${
                                  youtubeItem.status === "Approved"
                                    ? "Approved"
                                    : ""
                                }
                              `}
                      >
                        <i className="bi bi-check-circle-fill"></i>
                        {youtubeItem.status}
                      </span>
                    ) : (
                      <span
                        className={`status
                                ${
                                  youtubeItem.status === "Waiting"
                                    ? "Waiting"
                                    : ""
                                }
                              `}
                        data-bs-toggle="modal"
                        data-bs-target="#modal-approve"
                        onClick={() => setApproveItem(youtubeItem)}
                      >
                        <i className="bi bi-clock-fill"></i>
                        {youtubeItem.status}
                      </span>
                    )}
                    <section onClick={() => handleNewSelect(youtubeItem)}>
                      <p className="id mt-3">
                        Student ID: {youtubeItem.studentID}
                      </p>
                      <p className="id mt-0">
                        By: {youtubeItem.fname} {youtubeItem.lname}
                      </p>
                      <h1 className="topic">{youtubeItem.topic}</h1>
                      <p className="desc">{youtubeItem.description}</p>
                    </section>
                  </section>

                  <section className="edit-del-container">
                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#modal-update"
                      className="btn btn-update"
                      onClick={() => setOldInfo(youtubeItem)}
                    >
                      Update
                    </button>
                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#modal-delete"
                      className="btn btn-del"
                      onClick={() => setDelInfo(youtubeItem)}
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
      
      {/* Modal - Add *Youtube */}
      <Modal
        modalID="modal-add-new"
        modalHeaderStyle="d-none"
        modalFooterStyle="d-none"
        modalBodyContent={
          <form className="form">
            <h1 className="topic">Youtube</h1>

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

            {/* Description */}
            <div className="input-box">
              <label htmlFor="description" className="mb-2">
                * Topic
              </label>
              <input
                type="text"
                name="description"
                id="description"
                className="form-control mb-3"
                placeholder="type description..."
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Emebed */}
            <div className="input-box">
              <label htmlFor="embed" className="mb-2">
                * Embed
              </label>
              <textarea
                type="text"
                name="embed"
                id="embed"
                className="form-control mb-3"
                placeholder="type emebed..."
                onChange={(e) => setEmbed(e.target.value)}
              ></textarea>
            </div>

            
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
                onClick={handlePostYoutube}
                className="btn btn-add"
              >
                Add New
              </button>
            </section>
          </form>
        }
      />
      
      {/* Modal - Put *Youtube */}
      <Modal
        modalID="modal-update"
        modalHeaderStyle="d-none"
        modalFooterStyle="d-none"
        modalBodyContent={
          <form className="form">
            <h1 className="topic">Youtube</h1>

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
                  placeholder={oldInfo.fname}
                  onChange={(e) => setNewFname(e.target.value)}
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
                  placeholder={oldInfo.lname}
                  onChange={(e) => setNewLname(e.target.value)}
                />
              </div>
            </section>

            {/* Description */}
            <div className="input-box">
              <label htmlFor="description" className="mb-2">
                * Topic
              </label>
              <input
                type="text"
                name="description"
                id="description"
                className="form-control mb-3"
                placeholder={oldInfo.description}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </div>

            {/* Emebed */}
            <div className="input-box">
              <label htmlFor="embed" className="mb-2">
                * Embed
              </label>
              <textarea
                type="text"
                name="embed"
                id="embed"
                className="form-control mb-3"
                placeholder={oldInfo.embed}
                onChange={(e) => setNewEmbed(e.target.value)}
              ></textarea>
            </div>

            
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
                onClick={handlePutYoutube}
                className="btn btn-add"
              >
                Update
              </button>
            </section>
          </form>
        }
      />

      {/* Modal - Delete *Youtube */}
      <ModalDel
        modalDelID="modal-delete"
        modalDelTitle="(Admin) Youtube"
        modalDelContent={delInfo}
        modalDelPath="studentYoutube"
      />

      {/* Modal *Approve */}
      <ModalApprove
        approveItem={approveItem}
        approvePath="studentYoutube"
        approveTitle="Youtube"
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
              Approve <strong>*Youtube Status</strong>
            </h1>
            <p className="desc mb-1">You're going to approve</p>
            {idWaiting.map((id, idx) => (
              <p className="my-1" key={idx}>
                Youtube ID: {id}
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
    </article>
  );
};

export default A_Youtube;
