import React, { useEffect, useState } from "react";

import Modal from "../../EComponents/Modal";
import ModalDel from "../../EComponents/ModalDel";
import notFound from "../../DAssets/svg/NotFound.svg";

import Axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const B_ShowTiktok = ({ id, fname, lname }) => {
  const [isLoadingLink, setIsLoadingLink] = useState(true);

  const showTiktokA = [
    {
      id: 1,
      studentID: "64053441",
      topic: "Ex Topic #1 ",
      description: "Description Support Topic",
      embed:
        '<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@impeanuts/video/7477057682168384786" data-video-id="7477057682168384786" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@impeanuts" href="https://www.tiktok.com/@impeanuts?refer=embed">@impeanuts</a> เด็กคอมรัน  เขียนโค้ด ❌ แก้โค้ด ✅ <a title="spu" target="_blank" href="https://www.tiktok.com/tag/spu?refer=embed">#spu</a> <a title="fyp" target="_blank" href="https://www.tiktok.com/tag/fyp?refer=embed">#fyp</a> <a target="_blank" title="♬ original sound - sp99d.s0ngs" href="https://www.tiktok.com/music/original-sound-7071809975861005099?refer=embed">♬ original sound - sp99d.s0ngs</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>',
      status: "Approved",
    },
    {
      id: 2,
      studentID: "64053441",
      topic: "Ex Topic #2 ",
      description: "Description Support Topic",
      embed:
        '<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@bunniebinie/video/7477156937201782024" data-video-id="7477156937201782024" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@bunniebinie" href="https://www.tiktok.com/@bunniebinie?refer=embed">@bunniebinie</a> <a title="cpe" target="_blank" href="https://www.tiktok.com/tag/cpe?refer=embed">#CPE</a> <a title="it_spu" target="_blank" href="https://www.tiktok.com/tag/it_spu?refer=embed">#it_spu</a> <a title="spu" target="_blank" href="https://www.tiktok.com/tag/spu?refer=embed">#spu</a> <a target="_blank" title="♬ original sound - Hellomello - Hellomellooo" href="https://www.tiktok.com/music/original-sound-Hellomello-7477157015078308624?refer=embed">♬ original sound - Hellomello - Hellomellooo</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>',
      status: "Approved",
    },
    {
      id: 3,
      studentID: "64053441",
      topic: "Ex Topic #1 ",
      description: "Description Support Topic",
      embed:
        '<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@sripatum.spu/video/7368684229170957576" data-video-id="7368684229170957576" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@sripatum.spu" href="https://www.tiktok.com/@sripatum.spu?refer=embed">@sripatum.spu</a> <p>สาย IT ต้องห้ามพลาด‼️ คณะเทคโนฯ มัดรวมความรู้ จัดเต็มอัดแน่นมาให้น้องๆ แล้วว ถ้าเรื่อง IT มันใช่ มาสมัครเป็น DEK IT SPU ได้เลย #คณะเทคโนโลยีสารสนเทศ #มหาวิทยาลัยศรีปทุม #SPU #SripatumUniversity #Dek67 #TCAS67 #TGAT67 #TPAT67</p> <a target="_blank" title="♬ เสียงต้นฉบับ  - Sripatum University SPU" href="https://www.tiktok.com/music/เสียงต้นฉบับ-Sripatum-University-SPU-7368684324280896257?refer=embed">♬ เสียงต้นฉบับ  - Sripatum University SPU</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>',
      status: "Waiting",
    },
    {
      id: 4,
      studentID: "64053441",
      topic: "Ex Topic #2 ",
      description: "Description Support Topic",
      embed:
        '<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@it_spu/video/7381301983308795144" data-video-id="7381301983308795144" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@it_spu" href="https://www.tiktok.com/@it_spu?refer=embed">@it_spu</a> เปิดโลกไซเบอร์!!!! ชมรม Cyber Club SPU คณะเทคโนโลยีสารสนเทศ พาไปสัมผัสประสบการณ์จริง @RPCA Cyber Club ชมรมไซเบอร์โรงเรียนนายร้อยตำรวจ  โดยมี พี่ๆจากโรงเรียนนายร้อยตำรวจพาทัวร์และให้ความรู้ -ได้เรียนรู้เทคโนโลยีล้ำสมัยที่ใช้ในงานด้านไซเบอร์ -ได้พบปะพูดคุยกับผู้เชี่ยวชาญด้านไซเบอร์ -ได้เรียนรู้กลยุทธ์การป้องกันภัยไซเบอร์ ทั้งนี้ ยังได้สร้างเครือข่ายกับนักศึกษาและผู้เชี่ยวชาญด้านไซเบอร์อีกด้วย <a title="itspu" target="_blank" href="https://www.tiktok.com/tag/itspu?refer=embed">#ITSPU</a> <a title="คณะเทคโนโลยีสารสนเทศ" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%84%E0%B8%93%E0%B8%B0%E0%B9%80%E0%B8%97%E0%B8%84%E0%B9%82%E0%B8%99%E0%B9%82%E0%B8%A5%E0%B8%A2%E0%B8%B5%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%AA%E0%B8%99%E0%B9%80%E0%B8%97%E0%B8%A8?refer=embed">#คณะเทคโนโลยีสารสนเทศ</a> <a title="มหาวิทยาลัยศรีปทุม" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%A7%E0%B8%B4%E0%B8%97%E0%B8%A2%E0%B8%B2%E0%B8%A5%E0%B8%B1%E0%B8%A2%E0%B8%A8%E0%B8%A3%E0%B8%B5%E0%B8%9B%E0%B8%97%E0%B8%B8%E0%B8%A1?refer=embed">#มหาวิทยาลัยศรีปทุม</a>  <a title="เรียนกับตัวจริงประสบการณ์จริง" target="_blank" href="https://www.tiktok.com/tag/%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%81%E0%B8%B1%E0%B8%9A%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%87%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%AA%E0%B8%9A%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%93%E0%B9%8C%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%87?refer=embed">#เรียนกับตัวจริงประสบการณ์จริง</a> <a title="dekspu" target="_blank" href="https://www.tiktok.com/tag/dekspu?refer=embed">#dekspu</a> <a target="_blank" title="♬ Nasty x Naughty Girl - Jacobdior" href="https://www.tiktok.com/music/Nasty-x-Naughty-Girl-7367898047356865322?refer=embed">♬ Nasty x Naughty Girl - Jacobdior</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>',
      status: "Waiting",
    },
  ];

  // Get *ShowTiktok
  const [showTiktok, setShowTiktok] = useState([]);
  // console.log(showTiktok)
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
      alert(`Internal server ${err.message}`);
    }
  };

  useEffect(() => {
    document.title = "Showcase (Tiktok) | Student";
    handleShowTiktok();
  }, []);

  // Post *ShowTiktok
  const [studentID, setStudentID] = useState(id);
  const [topic, setTopic] = useState("");
  const [embed, setEmbed] = useState("");

  const handlePostshowTiktok = async () => {
    try {
      const formData = new FormData();
      formData.append("studentID", studentID);
      formData.append("fname", fname);
      formData.append("lname", lname);
      formData.append("topic", topic);
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
      alert(`Internal server ${err}`);
    }
  };

  // Put *showTiktok
  const [oldShowTiktok, setOldShowTiktok] = useState([]);
  const [newTopic, setNewTopic] = useState("");
  const [newEmbed, setNewEmbed] = useState("");

  const handleUpdateShowTiktok = async () => {
    try {
      const updatedTopic = newTopic.trim() ? newTopic : oldShowTiktok.topic;
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
        alert(`Edit showTiktok (id: ${oldShowTiktok.id}) Successful.`);
        location.reload();
      } else {
        alert(`Error to get *showTiktok, [Check/Log]`);
        return;
      }
    } catch (err) {
      alert(`Internal server ${err.message}`);
    }
  };

  // Delete *showTiktok
  const [delInfo, setDelInfo] = useState([]);

  // Filter - Sub Menu [Status]
  const [filter, setFilter] = useState("All");
  const filteredShowTiktok = showTiktok.filter(
    (item) => filter === "All" || item.status === filter
  );

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
    <main className="b-ShowTiktok-container">
      <section className="top-container">
        <h1 className="topic">showTiktok (Tiktok)</h1>
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
        ) : filteredShowTiktok.length === 0 ? (
          <section className="nf-login-container">
            <img
              src={notFound}
              alt="No youtube items found"
              className="notFoundImg-login"
            />
          </section>
        ) : (
          filteredShowTiktok.map((ShowTiktokItem, idx) => (
            <section key={idx} className="col-sm-12 col-md-4 custom-col">
              <section className={`content-card`}>
                <section
                  className="content-tiktok mx-5"
                  key={idx}
                  dangerouslySetInnerHTML={{ __html: ShowTiktokItem.embed }}
                />

                <section className="text-container">
                  {ShowTiktokItem.status === "Approved" ? (
                    <span
                      className={`status
                                  ${
                                    ShowTiktokItem.status === "Approved"
                                      ? "Approved"
                                      : ""
                                  }
                                `}
                    >
                      <i class="bi bi-check-circle-fill"></i>
                      {ShowTiktokItem.status}
                    </span>
                  ) : (
                    <span
                      className={`status
                                  ${
                                    ShowTiktokItem.status === "Waiting"
                                      ? "Waiting"
                                      : ""
                                  }
                                `}
                      data-bs-toggle="modal"
                      data-bs-target="#modal-approve"
                    >
                      <i className="bi bi-clock-fill"></i>
                      {ShowTiktokItem.status}
                    </span>
                  )}
                  {/* <p className="id">Student ID: {ShowTiktokItem.studentID}</p> */}
                  <p className="id">
                    By: {fname} {lname}
                  </p>
                  <h1 className="topic">{ShowTiktokItem.topic}</h1>
                </section>

                <section className="edit-del-container">
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#modal-update"
                    className="btn btn-update"
                    onClick={() => setOldShowTiktok(ShowTiktokItem)}
                  >
                    Update
                  </button>
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#modal-delete"
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

      {/* Modal *Add New */}
      <Modal
        modalID="modal-add-new"
        modalHeaderStyle="d-none"
        modalFooterStyle="d-none"
        modalBodyContent={
          <form className="form">
            <h1 className="topic">showTiktok</h1>

            {/* Topic */}
            <div className="input-box">
              <label htmlFor="topic" className="mb-2">
                * Topic
              </label>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Ex. Topic #1"
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            {/* Embed */}
            <div className="input-box">
              <label htmlFor="embed" className="mb-2">
                * Embed
              </label>
              <textarea
                type="text"
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
        modalID="modal-update"
        modalHeaderStyle="d-none"
        modalFooterStyle="d-none"
        modalBodyContent={
          <form className="form">
            <h1 className="topic">Edit *showTiktok</h1>

            {/* New *Topic */}
            <div className="input-box">
              <label htmlFor="topic" className="mb-2">
                * New Topic
              </label>
              <input
                type="text"
                className="form-control mb-3"
                placeholder={oldShowTiktok.topic}
                onChange={(e) => setNewTopic(e.target.value)}
              />
            </div>

            {/* New *Embed */}
            <div className="input-box">
              <label htmlFor="embed" className="mb-2">
                * New Embed
              </label>
              <textarea
                type="text"
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
        modalDelID="modal-delete"
        modalDelTitle="(Admin) showTiktok"
        modalDelContent={delInfo}
        modalDelPath="studentShowTiktok"
      />
    </main>
  );
};

export default B_ShowTiktok;
