import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import imageCompression from "browser-image-compression";

import "swiper/scss";
import "swiper/scss/pagination";

import Modal from "../../EComponents/Modal";
import notFound from "../../DAssets/svg/NotFound.svg";

import Axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const B_Tools = ({ id }) => {
  // console.log(id)
  const [isLoadingImg, setIsLoadingImg] = useState(true);

  // Overlay
  const [selectedImg, setSelectedImg] = useState(null);

  // -------------------------------------------------------- GET -------------------------------------------------------
  const [tools, setTools] = useState([]);
  // console.log('Tools: ', tools);
  const handleTools = async () => {
    try {
      setIsLoadingImg(true);
      const res = await Axios.get(`${API_URL}/tools`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setTools(res.data);
      } else {
        alert(`Getting *tools failed.`);
      }
      setIsLoadingImg(false);
    } catch (err) {
      alert(`Internal server error: ${err}`);
    }
  };

  useEffect(() => {
    document.title = "Tools | Student";
    handleTools();
  }, []);

  const [toolImages, setToolImages] = useState([]);
  // console.log(toolImages);
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

  // ------------------------------------ ยืม ------------------------------------
  const generateBorrowCode = () => {
    const date = new Date();
    const dateString = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    const randomNum = Math.floor(Math.random() * 10000);
    return `BORROW-${dateString}-${randomNum}`;
  };

  const [toolCode, setToolCode] = useState();
  const [borrowCode, setBorrowCode] = useState(generateBorrowCode);
  const [studentID, setStudentID] = useState(id);
  const [borrowCount, setBorrowCount] = useState("");
  const [toolName, setToolName] = useState();
  const [toolID, setToolID] = useState();
  const [imgsBefore, setImgsBefore] = useState([]);
  const [previewBefore, setPreviewBefore] = useState([]);

  // --> loop set state & preview imgs
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const compressedFiles = await Promise.all(
      files.map(async (file) => {
        const options = {
          maxSizeMB: 0.5, // จำกัดขนาดไฟล์แต่ละภาพไม่เกิน 0.5MB
          maxWidthOrHeight: 1024, // ปรับขนาดภาพถ้าเกิน
          useWebWorker: true,
        };
        return await imageCompression(file, options);
      })
    );

    setImgsBefore(compressedFiles);

    const previewUrls = compressedFiles.map((file) =>
      URL.createObjectURL(file)
    );
    setPreviewBefore(previewUrls);
  };

  const handleBorrow = async () => {
    try {
      const count = Number(borrowCount);

      if (isNaN(count) || count < 1) {
        alert(`Please enter a valid borrow count`);
        return;
      }

      const formData = new FormData();
      formData.append("toolCode", toolCode);
      formData.append("borrowCode", borrowCode);
      formData.append("studentID", studentID);
      formData.append("toolName", toolName);
      formData.append("borrowCount", count);

      imgsBefore.forEach((file) => {
        formData.append("imgsBefore", file);
      });

      const res = await Axios.put(
        `${API_URL}/tools/borrow/${toolID}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        alert("Borrowed successfully");
        location.reload();
      } else {
        alert("Failed to borrow the tool.");
      }
    } catch (err) {
      alert(`[Borrow] Internal server error: ${err}`);
    }
  };

  // ------------------------------------ คืน ------------------------------------
  const generateReturnCode = () => {
    const date = new Date();
    const dateString = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    const randomNum = Math.floor(Math.random() * 10000);
    return `RETURN-${dateString}-${randomNum}`;
  };

  const [returnCode, setReturnCode] = useState(generateReturnCode);
  const [returnStudentID, setReturnStudentID] = useState(id);
  const [returnCount, setReturnCount] = useState("");
  const [returnToolName, setReturnToolName] = useState();
  const [returnToolID, setReturnToolID] = useState();
  const [imgsAfter, setImgsAfter] = useState([]);
  const [previewAfter, setPreviewAfter] = useState([]);

  // --> loop set state & preview imgs
  const handleFileReturnChange = async (e) => {
    const files = Array.from(e.target.files);
    const compressedFiles = await Promise.all(
      files.map(async (file) => {
        const options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        };
        return await imageCompression(file, options);
      })
    );

    setImgsAfter(compressedFiles);

    const previewUrls = compressedFiles.map((file) =>
      URL.createObjectURL(file)
    );
    setPreviewAfter(previewUrls);
  };

  const handleReturn = async () => {
    try {
      const count = Number(returnCount);

      if (isNaN(count) || count < 1) {
        alert(`Please enter a valid return count`);
        return;
      }

      const formData = new FormData();
      formData.append("toolCode", toolCode);
      formData.append("returnCode", returnCode);
      formData.append("studentID", returnStudentID);
      formData.append("toolName", returnToolName);
      formData.append("returnCount", returnCount);

      imgsAfter.forEach((file) => {
        formData.append("imgsAfter", file);
      });

      const res = await Axios.put(
        `${API_URL}/tools/return/${returnToolID}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        alert("Returned successfully");
        location.reload();
      } else {
        alert("Failed to return the tool.");
      }
    } catch (err) {
      alert(`Internal server error: ${err}`);
    }
  };

  const handleCancel = () => {
    document.getElementById("borrowCount").value = "";
    document.getElementById("returnCount").value = "";
  };

  return (
    <main className="stu-tools-container">
      <section className="top-container">
        <h1 className="topic">Tools Management</h1>
      </section>
      <hr />

      <article className="content-container row m-0">
        {isLoadingImg ? (
          <h1 className="loader mt-3" style={{ color: "black" }}></h1>
        ) : tools.length === 0 ? (
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
                <Swiper
                  spaceBetween={10}
                  // slidesPerView={1}
                  // slidesPerGroup={1}
                  loop={true}
                  centeredSlides={true}
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 2500, disableOnInteraction: false }}
                  modules={[Autoplay, Pagination, Autoplay]}
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
                  <h1 className="name">{toolsItem.name}</h1>
                  <p className="desc">{toolsItem.description}</p>

                  <section className="borrow-return-container">
                    <button
                      className="btn btn-borrow"
                      data-bs-toggle="modal"
                      data-bs-target="#borrow-modal"
                      type="button"
                      onClick={() => [
                        setToolID(toolsItem.id),
                        setToolName(toolsItem.name),
                        setToolCode(toolsItem.toolCode),
                      ]}
                    >
                      Borrwow
                    </button>

                    <button
                      className="btn btn-return"
                      data-bs-toggle="modal"
                      data-bs-target="#return-modal"
                      type="button"
                      onClick={() => [
                        setReturnToolID(toolsItem.id),
                        setReturnToolName(toolsItem.name),
                        setToolCode(toolsItem.toolCode),
                      ]}
                    >
                      Return
                    </button>
                  </section>
                </section>
              </section>
            </section>
          ))
        )}
      </article>

      {/* ยืมจ้า */}
      {/* Borrow Modal */}
      <Modal
        modalID="borrow-modal"
        modalHeaderStyle="d-none"
        modalFooterStyle="d-none"
        modalBodyContent={
          <form className="form">
            <h1 className="topic">Borrow Tool</h1>

            {/* Tool Code */}
            <div className="input-box">
              <label htmlFor="borrowCode" className="mb-2">
                * Tool-Code
              </label>
              <input
                name="borrowCode"
                type="text"
                value={toolCode}
                className="form-control mb-3"
                disabled
              />
            </div>

            {/* Borrow Code */}
            <div className="input-box">
              <label htmlFor="borrowCode" className="mb-2">
                * Borrow Code
              </label>
              <input
                name="borrowCode"
                type="text"
                value={borrowCode}
                className="form-control mb-3"
                disabled
              />
            </div>

            {/* Student ID */}
            <div className="input-box">
              <label htmlFor="studentID" className="mb-2">
                * Student ID
              </label>
              <input
                name="studentID"
                type="text"
                value={id}
                className="form-control mb-3"
                disabled
              />
            </div>

            {/* Tool Name*/}
            <div className="input-box">
              <label htmlFor="toolName" className="mb-2">
                * Tool Name
              </label>
              <input
                name="toolName"
                type="text"
                value={toolName}
                className="form-control mb-3"
                disabled
              />
            </div>

            {/* Borrow Count */}
            <div className="input-box">
              <label htmlFor="borrowCount" className="mb-2">
                * Quantity
              </label>
              <input
                name="borrowCount"
                type="number"
                id="borrowCount"
                className="form-control mb-3"
                placeholder="ex. 1, 2, 3, ..."
                onChange={(e) => setBorrowCount(e.target.value)}
              />
            </div>

            {/* Tools Imgs */}
            <div className="input-box">
              <label htmlFor="imgsBefore" className="form-label">
                * Borrow-Images / Just 4 Image
              </label>
              <input
                type="file"
                name="imgsBefore"
                id="imgsBefore"
                className="form-control mb-3"
                onChange={handleFileChange}
                multiple
                accept="image/*"
                onInput={(e) => {
                  if (e.target.files.length > 4) {
                    alert(`Select only 4 images.`);
                    e.target.value = null;
                  }
                }}
              />

              {previewBefore.length > 0 && (
                <section className="preview-container">
                  {previewBefore.map((before, idx) => (
                    <img key={idx} src={before} className="preview-img" />
                  ))}
                </section>
              )}
            </div>

            <section className="btn-container">
              <button
                type="button"
                onClick={handleCancel}
                className="btn btn-cancel"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleBorrow}
                className="btn btn-borrow"
                disabled={borrowCount.trim() === "" || imgsBefore.length === 0}
              >
                Confirm, Borrow
              </button>
            </section>
          </form>
        }
      />

      {/* คืนจ้า */}
      <Modal
        modalID="return-modal"
        modalHeaderStyle="d-none"
        modalFooterStyle="d-none"
        modalBodyContent={
          <form className="form">
            <h1 className="topic">Return Tool</h1>
            {/* Return Code */}
            <div className="input-box">
              <label htmlFor="returnCode" className="mb-2">
                * Return Code
              </label>
              <input
                name="returnCode"
                type="text"
                value={returnCode}
                className="form-control mb-3"
                disabled
              />
            </div>

            {/* Student ID */}
            <div className="input-box">
              <label htmlFor="returnStudentID" className="mb-2">
                * Student ID
              </label>
              <input
                name="returnStudentID"
                type="text"
                value={id}
                className="form-control mb-3"
                disabled
              />
            </div>

            {/* Tool Name*/}
            <div className="input-box">
              <label htmlFor="returnToolName" className="mb-2">
                * Tool Name
              </label>
              <input
                name="returnToolName"
                type="text"
                value={returnToolName}
                className="form-control mb-3"
                disabled
              />
            </div>

            {/* Return Count */}
            <div className="input-box">
              <label htmlFor="returnCount" className="mb-2">
                * Quantity
              </label>
              <input
                name="returnCount"
                type="number"
                id="returnCount"
                className="form-control mb-3"
                placeholder="ex. 1, 2, 3, ..."
                onChange={(e) => setReturnCount(e.target.value)}
              />
            </div>

            {/* Tools Imgs */}
            <div className="input-box">
              <label htmlFor="imgsAfter" className="form-label">
                * Return-Images / Just 4 Image
              </label>
              <input
                type="file"
                name="imgsAfter"
                id="imgsAfter"
                className="form-control mb-3"
                onChange={(e) => handleFileReturnChange(e)}
                multiple
                accept="image/*"
                onInput={(e) => {
                  if (e.target.files.length > 4) {
                    alert(`Select only 4 images.`);
                    e.target.value = null;
                  }
                }}
              />

              {previewAfter ? (
                <section className="preview-container">
                  {previewAfter.map((after, idx) => (
                    <img key={idx} src={after} className="preview-img" />
                  ))}
                </section>
              ) : (
                <section className="preview-container d-none"></section>
              )}
            </div>

            <section className="btn-container">
              <button
                type="button"
                onClick={handleCancel}
                className="btn btn-cancel"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleReturn}
                className="btn btn-return"
                disabled={returnCount.trim() === "" || !imgsBefore}
              >
                Confirm, Return
              </button>
            </section>
          </form>
        }
      />

      {/* Overlay for preview image */}
      {selectedImg && (
        <div className="overlay" onClick={() => setSelectedImg(null)}>
          <div className="overlay-content">
            <img
              src={selectedImg}
              alt="Full-size preview"
              className="full-size-image"
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default B_Tools;
