import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/scss";
import "swiper/scss/pagination";

import Axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

import Modal from "../../EComponents/Modal";
import ModalDel from "../../EComponents/ModalDel";
import notFound from "../../DAssets/svg/NotFound.svg";

// ทำการตั้งค่า Axios ให้ส่ง credentials ในทุก request
Axios.defaults.withCredentials = true;

const A_Tools = () => {
  // Overlay
  const [selectedBeforeImg, setselectedBeforeImg] = useState(null);
  const [selectedAfterImg, setselectedAfterImg] = useState(null);

  const [selectedToolName, setSelectedToolName] = useState(null);

  // -------------------------------------------------------------- GET ------------------------------------------------------------
  const [tools, setTools] = useState([]);
  // console.log(tools)
  const handelGetAllTools = async () => {
    try {
      const res = await Axios.get(`${API_URL}/tools`, {
        withCredentials: true,
      });
      if (res.status === 200) setTools(res.data);
      else {
        alert(`Get all *tools failed.`);
      }
    } catch (err) {
      alert(`Internal server ${err}`);
    }
  };

  useEffect(() => {
    handelGetAllTools();
  }, []);

  const [toolImages, setToolImages] = useState([]);
  // console.log("toolImages: ", toolImages);
  const handelGetAllToolImages = async () => {
    try {
      const res = await Axios.get(`${API_URL}/tools/images`, {
        withCredentials: true,
      });
      if (res.status === 200) setToolImages(res.data);
      else {
        alert(`Get all *tools failed.`);
      }
    } catch (err) {
      alert(`Internal server ${err}`);
    }
  };

  useEffect(() => {
    handelGetAllToolImages();
  }, []);

  // -------------------------------------------------------- GET - BorrowHistory -------------------------------------------------------
  const [borrowHist, setBorrowHist] = useState([]);
  // console.log('borrowHist: ', borrowHist);

  const handleBorrowHist = async () => {
    try {
      const res = await Axios.get(`${API_URL}/tools/history/borrow`, {
        withCredentials: true,
      });
      // console.log(res.data)
      if (res.status === 200) {
        const updatedDate = res.data.map((item) => ({
          ...item,
          formattedBorrowDate: item.borrowDate
            ? newDate(item.borrowDate)
            : "Invalid Date",
        }));

        setBorrowHist(updatedDate);
      } else {
        alert(`Getting *tools failed.`);
      }
    } catch (err) {
      alert(`Internal server error: ${err}`);
    }
  };

  useEffect(() => {
    handleBorrowHist();
  }, []);

  const [borrowHistImage, setBorrowHistImage] = useState([]);
  // console.log('borrowHistImage: ', borrowHistImage);

  const handleBorrowHistImage = async () => {
    try {
      const res = await Axios.get(`${API_URL}/tools/history/borrow/images`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setBorrowHistImage(res.data);
      } else {
        alert(`Getting *tools failed.`);
      }
    } catch (err) {
      alert(`Internal server error: ${err}`);
    }
  };

  useEffect(() => {
    handleBorrowHistImage();
  }, []);

  // -------------------------------------------------------- GET - ReturnHistory -------------------------------------------------------
  const [returnHist, setReturnHist] = useState([]);
  // console.log("returnHist: ", returnHist);

  const handleReturnHist = async () => {
    try {
      const res = await Axios.get(`${API_URL}/tools/history/return`, {
        withCredentials: true,
      });

      if (res.status === 200) {
        const updatedDate = res.data.map((item) => ({
          ...item,
          formattedReturnDate: item.returnDate
            ? newDate(item.returnDate)
            : "Invalid Date",
        }));

        setReturnHist(updatedDate);
      } else {
        alert(`Getting *tools failed.`);
      }
    } catch (err) {
      alert(`Internal server error: ${err}`);
    }
  };

  useEffect(() => {
    handleReturnHist();
  }, []);

  const newDate = (e) => {
    const d = new Date(e);
    if (isNaN(d)) return "Invalid Date";
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(d);
  };

  const [returnHistImage, setReturnHistImage] = useState([]);
  // console.log(returnHistImage);

  const handleReturnHistImage = async () => {
    try {
      const res = await Axios.get(`${API_URL}/tools/history/return/images`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setReturnHistImage(res.data);
      } else {
        alert(`Getting *tools failed.`);
      }
    } catch (err) {
      alert(`Internal server error: ${err}`);
    }
  };

  useEffect(() => {
    handleReturnHistImage();
  }, []);

  // -------------------------------------------------------------- POST ------------------------------------------------------------
  // POST NEW *TOOLS
  function generateToolCodes(count) {
    const codes = new Set();
    while (codes.size < count) {
      const number = Math.floor(10000 + Math.random() * 90000); // สุ่มเลข 5 หลัก
      codes.add(`TS${number}`);
    }
    return Array.from(codes);
  }

  const toolCodes = generateToolCodes(10); // เปลี่ยนจำนวนตามต้องการ

  const [toolCode, setToolCode] = toolCodes;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [available, setAvailable] = useState(quantity);
  const [imgFront, setImgFront] = useState();
  const [imgBack, setImgBack] = useState();
  const [imgLeft, setImgLeft] = useState();
  const [imgRight, setImgRight] = useState();

  // PREVIEW IMG
  const [previewFront, setPreviewFront] = useState();
  const [previewBack, setPreviewBack] = useState();
  const [previewLeft, setPreviewLeft] = useState();
  const [previewRight, setPreviewRight] = useState();

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(previewFront);
      URL.revokeObjectURL(previewBack);
      URL.revokeObjectURL(previewLeft);
      URL.revokeObjectURL(previewRight);
    };
  }, []);

  const handlePreviewFront = (e) => {
    setImgFront(e);
    setPreviewFront(URL.createObjectURL(e));
  };
  const handlePreviewBack = (e) => {
    setImgBack(e);
    setPreviewBack(URL.createObjectURL(e));
  };
  const handlePreviewLeft = (e) => {
    setImgLeft(e);
    setPreviewLeft(URL.createObjectURL(e));
  };
  const handlePreviewRight = (e) => {
    setImgRight(e);
    setPreviewRight(URL.createObjectURL(e));
  };

  const handlePostTools = async () => {
    try {
      const formData = new FormData();
      formData.append("toolCode", toolCode);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("quantity", quantity);
      formData.append("available", quantity);
      formData.append("img1", imgFront);
      formData.append("img2", imgBack);
      formData.append("img3", imgLeft);
      formData.append("img4", imgRight);

      const res = await Axios.post(`${API_URL}/tools`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.status === 200) {
        alert(`Add New *Tool Succesful.`);
        location.reload();
      } else {
        alert(`Error to POST NEW *Tool`);
        location.reload();
      }
    } catch (err) {
      alert(`Internal server ${err}`);
    }
  };

  // -------------------------------------------------------------- PUT ------------------------------------------------------------
  // Put *Tools
  const [oldInfo, setOldInfo] = useState([]);
  const [oldImage, setOldImage] = useState([]);
  // console.log(oldInfo)
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [newAvailable, setNewAvailable] = useState(newQuantity);
  const [newImgFront, setNewImgFront] = useState();
  const [newImgBack, setNewImgBack] = useState();
  const [newImgLeft, setNewImgLeft] = useState();
  const [newImgRight, setNewImgRight] = useState();
  const [newPreviewFront, setNewPreviewFront] = useState();
  const [newPreviewBack, setNewPreviewBack] = useState();
  const [newPreviewLeft, setNewPreviewLeft] = useState();
  const [newPreviewRight, setNewPreviewRight] = useState();

  const handleNewPreviewFront = (e) => {
    setNewImgFront(e);
    setNewPreviewFront(URL.createObjectURL(e));
  };
  const handleNewPreviewBack = (e) => {
    setNewImgBack(e);
    setNewPreviewBack(URL.createObjectURL(e));
  };
  const handleNewPreviewLeft = (e) => {
    setNewImgLeft(e);
    setNewPreviewLeft(URL.createObjectURL(e));
  };
  const handleNewPreviewRight = (e) => {
    setNewImgRight(e);
    setNewPreviewRight(URL.createObjectURL(e));
  };

  const handlePutTool = async () => {
    try {
      // ตรวจสอบค่าที่ได้จากการกรอกข้อมูล
      const updatedName = newName.trim() ? newName : oldInfo.name;
      const updatedDescription = newDescription.trim()
        ? newDescription
        : oldInfo.description;
      const updatedQuantity = newQuantity.trim()
        ? newQuantity
        : oldInfo.quantity;
      const updatedAvailable = newQuantity.trim()
        ? newQuantity
        : oldInfo.quantity;
      const updatedImage1 = newImgFront ? newImgFront : oldInfo.img1;
      const updatedImage2 = newImgBack ? newImgBack : oldInfo.img2;
      const updatedImage3 = newImgLeft ? newImgLeft : oldInfo.img3;
      const updatedImage4 = newImgRight ? newImgRight : oldInfo.img4;

      const formData = new FormData();
      formData.append("name", updatedName);
      formData.append("description", updatedDescription);
      formData.append("quantity", updatedQuantity);
      formData.append("available", updatedAvailable);
      formData.append("img1", updatedImage1);
      formData.append("img2", updatedImage2);
      formData.append("img3", updatedImage3);
      formData.append("img4", updatedImage4);

      const res = await Axios.put(`${API_URL}/tools/${oldInfo.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.status === 200) {
        alert(`Update *Tool Successful.`);
        location.reload();
      } else {
        alert(`Error to Update *Tool, for this id: ${oldInfo.id}`);
        location.reload();
      }
    } catch (err) {
      alert(`Internal server error: ${err}`);
    }
  };

  // -------------------------------------------------------------- DELETE ------------------------------------------------------------
  // DELETE *SHOWCASE
  const [delInfo, setDelInfo] = useState([]);

  // HANDLE *CANCEL MODAL
  const handleClosedModal = () => {
    document.getElementById("topic").value = "";
    document.getElementById("description").value = "";
    document.getElementById("image").value = "";
  };

  useEffect(() => {
    document.title = "tools (Files) | Admin";
    // handleGettools();
  }, []);

  // Filter - Sub Menu [available]
  const [filter, setFilter] = useState("All");
  const filteredtools = tools.filter(
    (item) => filter === "All" || item.available === filter
  );

  // -------------------------------------------------------- DELETE HISTORY -------------------------------------------------------
  const [delHitsInfo, setDelHistInfo] = useState("");
  // console.log(delHitsInfo);

  const handleDelHist = async () => {
    try {
      const res = await Axios.delete(
        `${API_URL}/tools/history/${delHitsInfo}`,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        alert(`Delete history of ${delHitsInfo} successful.`);
        location.reload();
      } else {
        alert(`Delete history of ${delHitsInfo} failed.`);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message;
      alert(`[Delete *${delHitsInfo} history] Error: ${errorMsg}`);
    }
  };

  return (
    <main className="a-tools-container">
      <section className="top-container">
        <h1 className="topic">Tools Management</h1>
        <section className="add-new-container">
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

      <article className="content-container row m-0">
        {tools.length === 0 ? (
          <section className="nf-login-container">
            <img
              src={notFound}
              alt="No youtube items found"
              className="notFoundImg-login"
            />
          </section>
        ) : (
          tools.map((toolsItem, idx) => (
            <section key={idx} className="col-md-6 col-lg-3">
              <section className="content-card">
                <button
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#tool-history"
                  className="btn btn-hist"
                  onClick={(e) => [
                    e.stopPropagation(),
                    setSelectedToolName(toolsItem.name),
                    setDelHistInfo(toolsItem.toolCode),
                  ]}
                >
                  <i className="bi bi-clock-history"></i>
                </button>
                <Swiper
                  spaceBetween={10}
                  slidesPerView={1}
                  loop={true}
                  centeredSlides={true}
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 2500, disableOnInteraction: false }}
                  modules={[Autoplay, Pagination]}
                  className="swiper"
                >
                  {toolImages
                    .filter((img) => img.id === toolsItem.id)
                    .map((img, i) =>
                      img.images.map((src, j) => (
                        <SwiperSlide key={`${i}-${j}`}>
                          <img
                            src={src}
                            alt={`Tool ${i} - Image ${j}`}
                            className="swiper-img"
                          />
                        </SwiperSlide>
                      ))
                    )}
                </Swiper>

                <section className="text-container">
                  {toolsItem.available > 0 ? (
                    <p className="available">
                      Available {toolsItem.available}/{toolsItem.quantity}
                    </p>
                  ) : (
                    <p className="out-of-stock">Out Of Stock</p>
                  )}
                  <h1 className="toolCode">{toolsItem.toolCode}</h1>
                  <h1 className="name">{toolsItem.name}</h1>
                  <p className="desc">{toolsItem.description}</p>
                  <section className="edit-del-container">
                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#modal-update"
                      className="btn btn-update"
                      onClick={() => setOldInfo(toolsItem)}
                    >
                      Update
                    </button>
                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#modal-delete"
                      className="btn btn-del"
                      onClick={() => setDelInfo(toolsItem)}
                    >
                      Delete
                    </button>
                  </section>
                </section>
              </section>
            </section>
          ))
        )}
      </article>

      {/* Modal - Add *tools */}
      <Modal
        modalID="modal-add-new"
        modalHeaderStyle="d-none"
        modalFooterStyle="d-none"
        modalBodyContent={
          <form className="form">
            <h1 className="topic">tools</h1>

            {/* toolCode*/}
            <div className="input-box">
              <label htmlFor="name" className="mb-2">
                * Tool-Code
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control mb-3"
                placeholder={toolCode}
                disabled
              />
            </div>

            {/* name */}
            <div className="input-box">
              <label htmlFor="name" className="mb-2">
                * name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control mb-3"
                placeholder="ex. tools #1"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* description */}
            <div className="input-box">
              <label htmlFor="description" className="mb-2">
                * Ddescription
              </label>
              <textarea
                type="text"
                name="description"
                id="description"
                className="form-control mb-3"
                placeholder="description ..."
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            {/* quantity */}
            <div className="input-box">
              <label htmlFor="quantity" className="mb-2">
                * quantity
              </label>
              <input
                type="number"
                name="quantity"
                id="quantity"
                className="form-control mb-3"
                placeholder="quantity..."
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            {/* Image */}
            <div className="input-box">
              <label htmlFor="imageFront" className="mb-2">
                * Image Front
              </label>
              <input
                type="file"
                name="imageFront"
                id="image"
                className="form-control mb-3"
                onChange={(e) => handlePreviewFront(e.target.files[0])}
              />
            </div>

            {previewFront ? (
              <img src={previewFront} className="preview-image" />
            ) : null}

            <div className="input-box">
              <label htmlFor="imageBack" className="mb-2">
                * Image Back
              </label>
              <input
                type="file"
                name="imageBack"
                id="image"
                className="form-control mb-3"
                onChange={(e) => handlePreviewBack(e.target.files[0])}
              />
            </div>

            {previewBack ? (
              <img src={previewBack} className="preview-image" />
            ) : null}

            <div className="input-box">
              <label htmlFor="imageLeft" className="mb-2">
                * Image Left
              </label>
              <input
                type="file"
                name="imageLeft"
                id="image"
                className="form-control mb-3"
                onChange={(e) => handlePreviewLeft(e.target.files[0])}
              />
            </div>

            {previewLeft ? (
              <img src={previewLeft} className="preview-image" />
            ) : null}

            <div className="input-box">
              <label htmlFor="imageRight" className="mb-2">
                * Image Right
              </label>
              <input
                type="file"
                name="imageRight"
                id="image"
                className="form-control mb-3"
                onChange={(e) => handlePreviewRight(e.target.files[0])}
              />
            </div>

            {previewRight ? (
              <img src={previewRight} className="preview-image" />
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
                onClick={handlePostTools}
                className="btn btn-add"
              >
                Add New
              </button>
            </section>
          </form>
        }
      />

      {/* Modal - Update *tools */}
      <Modal
        modalID="modal-update"
        modalHeaderStyle="d-none"
        modalFooterStyle="d-none"
        modalBodyContent={
          <form className="form">
            <h1 className="topic">tools</h1>

            {/* name */}
            <div className="input-box">
              <label htmlFor="name" className="mb-2">
                * New Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control mb-3"
                placeholder={oldInfo.name}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>

            {/* description */}
            <div className="input-box">
              <label htmlFor="description" className="mb-2">
                * New Ddescription
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

            {/* quantity */}
            <div className="input-box">
              <label htmlFor="quantity" className="mb-2">
                * New Quantity
              </label>
              <input
                type="number"
                name="quantity"
                id="quantity"
                className="form-control mb-3"
                placeholder={oldInfo.quantity}
                onChange={(e) => setNewQuantity(e.target.value)}
              />
            </div>

            {/* Image Front */}
            <div className="input-box">
              <label htmlFor="imageFront" className="mb-2">
                * New Image Front
              </label>
              <input
                type="file"
                name="imageFront"
                id="imageFront"
                className="form-control mb-3"
                onChange={(e) => handleNewPreviewFront(e.target.files[0])}
              />
            </div>

            {newPreviewFront ? (
              <img src={newPreviewFront} className="preview-image" />
            ) : oldInfo?.img1 ? (
              <img
                // src={oldInfo.img1}
                src={`/images/tools/${oldInfo.img1}`}
                className="preview-image"
              />
            ) : null}

            {/* Image Back */}
            <div className="input-box">
              <label htmlFor="imageBack" className="mb-2">
                * New Image Back
              </label>
              <input
                type="file"
                name="imageBack"
                id="imageBack"
                className="form-control mb-3"
                onChange={(e) => handleNewPreviewBack(e.target.files[0])}
              />
            </div>

            {newPreviewBack ? (
              <img src={newPreviewBack} className="preview-image" />
            ) : oldInfo?.img2 ? (
              <img
                // src={oldInfo.img2}
                src={`/images/tools/${oldInfo.img2}`}
                className="preview-image"
              />
            ) : null}

            {/* Image Left */}
            <div className="input-box">
              <label htmlFor="imageLeft" className="mb-2">
                * New Image Left
              </label>
              <input
                type="file"
                name="imageLeft"
                id="imageLeft"
                className="form-control mb-3"
                onChange={(e) => handleNewPreviewLeft(e.target.files[0])}
              />
            </div>

            {newPreviewLeft ? (
              <img src={newPreviewLeft} className="preview-image" />
            ) : oldInfo?.img3 ? (
              <img
                // src={oldInfo.img3}
                src={`/images/tools/${oldInfo.img3}`}
                className="preview-image"
              />
            ) : null}

            {/* Image Right */}
            <div className="input-box">
              <label htmlFor="imageRight" className="mb-2">
                * New Image Right
              </label>
              <input
                type="file"
                name="imageRight"
                id="imageRight"
                className="form-control mb-3"
                onChange={(e) => handleNewPreviewRight(e.target.files[0])}
              />
            </div>

            {newPreviewRight ? (
              <img src={newPreviewRight} className="preview-image" />
            ) : oldInfo?.img4 ? (
              <img
                // src={oldInfo.img4}
                src={`/images/tools/${oldInfo.img4}`}
                className="preview-image"
              />
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
                onClick={handlePutTool}
                className="btn btn-update"
              >
                Update
              </button>
            </section>
          </form>
        }
      />

      {/* Modal - Delete *tools */}
      <ModalDel
        modalDelID="modal-delete"
        modalDelTitle="(Admin) tools"
        modalDelContent={delInfo}
        modalDelPath="tools"
      />

      {/* Modal - Tools History */}
      <Modal
        modalID="tool-history"
        modalSize="modal-lg"
        modalHeaderStyle="tools-hist-header"
        modalTitle={
          <>
            <h1 className="table-topic"> Tool History </h1>
            <button
              data-bs-toggle="modal"
              data-bs-target="#modal-del-hist"
              className="btn-del-hist"
            >
              <i className="bi bi-trash"></i>
              <span>Delete All History of {delHitsInfo}</span>
            </button>
          </>
        }
        modalFooterStyle="d-none"
        modalBodyContent={
          <article className="table-borrow-return-hist">
            <table className="table">
              <thead>
                <tr>
                  {/* <th>Tool-Code</th> */}
                  <th>Status</th>
                  <th>Borrow Code</th>
                  <th>Student ID</th>
                  <th>Image</th>
                  <th>Borrow Date</th>
                </tr>
              </thead>
              <tbody>
                {!borrowHist.some((hist) => hist.toolCode === delHitsInfo) &&
                !returnHist.some((hist) => hist.toolCode === delHitsInfo) ? (
                  <tr>
                    <td colSpan={6} className="not-found-td">
                      <img src={notFound} className="not-found-tools-hist" />
                    </td>
                  </tr>
                ) : (
                  <>
                    {borrowHist
                      .filter((hist) => hist.toolName === selectedToolName)
                      .map((hist, idx) => (
                        <tr key={idx}>
                          {/* <td>{hist.toolCode}</td> */}
                          <td className="status status-borrow">Borrow</td>
                          <td>{hist.borrowCode}</td>
                          <td>{hist.studentID}</td>

                          <td className="d-flex">
                            {borrowHistImage
                              .filter((histimg) => histimg.id === hist.id)
                              .map((img, i) =>
                                img.images.map((src, j) => (
                                  <img
                                    onClick={() => setselectedBeforeImg(src)}
                                    key={`${i}-${j}`}
                                    src={src}
                                    alt={`Tool ${i} - Image ${j}`}
                                    style={{
                                      width: "50px",
                                      aspectRatio: 1 / 1,
                                      objectFit: "cover",
                                      objectPosition: "top",
                                      margin: "0 2px",
                                      cursor: "pointer",
                                    }}
                                  />
                                ))
                              )}
                          </td>
                          <td>{hist.formattedBorrowDate}</td>
                        </tr>
                      ))}

                    {returnHist
                      .filter((hist) => hist.toolName === selectedToolName)
                      .map((hist, idx) => (
                        <tr key={idx}>
                          {/* <td>{hist.toolCode}</td> */}
                          <td className="status status-return">Return</td>
                          <td>{hist.returnCode}</td>
                          <td>{hist.studentID}</td>

                          <td className="d-flex">
                            {returnHistImage
                              .filter((histimg) => histimg.id === hist.id)
                              .map((img, i) =>
                                img.images.map((src, j) => (
                                  <img
                                    onClick={() => setselectedAfterImg(src)}
                                    key={`${i}-${j}`}
                                    src={src}
                                    alt={`Tool ${i} - Image ${j}`}
                                    style={{
                                      width: "50px",
                                      aspectRatio: 1 / 1,
                                      objectFit: "cover",
                                      objectPosition: "top",
                                      margin: "0 2px",
                                      cursor: "pointer",
                                    }}
                                  />
                                ))
                              )}
                          </td>
                          <td>{hist.formattedReturnDate}</td>
                        </tr>
                      ))}
                  </>
                )}
              </tbody>
            </table>
          </article>
        }
      />

      {/* Modal - Delete *tools Hist */}
      <Modal
        modalID="modal-del-hist"
        modalHeaderStyle="d-none"
        modalFooterStyle="d-none"
        modalContentStyle="bg-white"
        modalBodyContent={
          <section className="modal-delete-container py-3">
            <span className="del-icon">
              <i className="bi bi-trash3-fill"></i>
            </span>
            <h1 className="title">Delete Tool *History</h1>
            <span className="detail">
              <h5>You're going to delete tool histroy of</h5>
              <h5 className="delete-topic">
                "Tool-Code: {delHitsInfo}", Are you sure ?
              </h5>
            </span>
            <span className="md-btn-container">
              <button data-bs-dismiss="modal">No, Keep it.</button>
              <button onClick={handleDelHist}>Yes, Delete!</button>
            </span>
          </section>
        }
      />

      {/* Overlay *Before Imgs Hist */}
      {selectedBeforeImg && (
        <div className="overlay" onClick={() => setselectedBeforeImg(null)}>
          <div className="overlay-content">
            <span
              className="close-btn"
              onClick={() => setselectedBeforeImg(null)}
            >
              &times;
            </span>
            <img
              src={selectedBeforeImg}
              // src={`/images/tools/BorrowHistory/${selectedBeforeImg}`}
              alt="Preview"
              className="original-img"
            />
          </div>
        </div>
      )}

      {/* Overlay *After Imgs Hist */}
      {selectedAfterImg && (
        <div className="overlay" onClick={() => setselectedAfterImg(null)}>
          <div className="overlay-content">
            <span
              className="close-btn"
              onClick={() => setselectedAfterImg(null)}
            >
              &times;
            </span>
            <img
              src={selectedAfterImg}
              // src={`/images/tools/ReturnHistory/${selectedAfterImg}`}
              alt="Preview"
              className="original-img"
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default A_Tools;
