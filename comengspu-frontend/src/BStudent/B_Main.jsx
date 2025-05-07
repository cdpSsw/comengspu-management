import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";

// icons + emblem + svg
import Emblem from "../DAssets/emblem/emblem_red.png";
import Home from "../DAssets/icons/icon-home.svg";
import ShowFiles from "../DAssets/icons/icon-showcase-files.svg";
import ShowTiktok from "../DAssets/icons/icon-showcase-tiktok.svg";
import Youtube from "../DAssets/icons/icon-youtube.svg";
import Tools from "../DAssets/icons/icon-tools.svg";
import SignOut from "../DAssets/icons/icon-sign-out.svg";

// Components
import B_Home from "./pages/B_Home";
import B_ShowCase from "./pages/B_ShowCase";
import B_ShowTiktok from "./pages/B_ShowTiktok";
import B_Youtube from "./pages/B_Youtube";
import B_Tools from "./pages/B_Tools";

import Axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const B_Main = () => {
  const [selectComp, setSelectComp] = useState("Student-Home");
  const navigate = useNavigate();
  const location = useLocation();
  const student_id = location.state?.student_id;
  const fname = location.state?.fname;
  const lname = location.state?.lname;
  // console.log(`F: ${fname}, L: ${lname}`)

  // ---------------------------------------------- CHECK ACCESS (ROLE) --------------------------------------
  useEffect(() => {
    const checkStudentAccess = async () => {
      const token = Cookies.get("token");
      if (!token) {
        console.warn("🔴 Token not found! Redirecting...");
        navigate("/");
        return;
      }

      try {
        // ตรวจสอบ Token ใน API
        const res = await Axios.get(`${API_URL}/SignIn`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        if (res.data.role !== "student") {
          alert("Access denied! Students only.");
          navigate("/");
          return;
        }

        // สามารถดำเนินการต่อถ้าผ่านการตรวจสอบ
        console.log("Access granted for student");
      } catch (error) {
        console.error(
          "🔴 Error checking student access:",
          error.response?.data || error
        );
        alert("Session expired. Please login again.");
        Cookies.remove("token");
        Cookies.remove("role");
        Cookies.remove("studentID");
        navigate("/");
      }
    };

    checkStudentAccess();
  }, [navigate]);

  // ---------------------------------------------- HANDLE SIGNOUT --------------------------------------
  const handleSignOut = async (event) => {
    event.preventDefault();
    try {
      const res = await Axios.post(
        `${API_URL}/SignOut`,
        {},
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        Cookies.remove("token");
        Cookies.remove("role");
        Cookies.remove("studentID");
        navigate("/");
      } else {
        alert(`Sign Out failed, try again later...`);
      }
    } catch (err) {
      alert(`Internal server error: ${err}`);
    }
  };

  const navListTop = [
    {
      icon: Home,
      name: "Home",
      path: "Student-Home",
    },
    {
      icon: ShowFiles,
      name: "Showcase (Poster)",
      path: "Student-ShowFiles",
    },
    {
      icon: ShowTiktok,
      name: "Showcase (Tiktok)",
      path: "Student-ShowTiktok",
    },
    {
      icon: Youtube,
      name: "Youtube",
      path: "Student-Youtube",
    },
    {
      icon: Tools,
      name: "Tools",
      path: "Student-Tools",
    },
  ];

  const navListBottom = [
    {
      icon: SignOut,
      name: "Sign Out",
      path: "Student-SignOut",
    },
  ];

  return (
    <main className="b-main-container row m-0">
      {/* Sidebar - Desktop */}
      <article className="desktop-view col-md-2">
        <section className="emblem-container">
          <img src={Emblem} alt="Emblem-Comen" className="emblem" />
        </section>

        <section className="nav-container">
          <ul className="nav-list">
            {navListTop.map((list, idx) => (
              <li
                key={idx}
                className={`nav-link ${
                  list.path === selectComp ? "active" : ""
                }`}
                onClick={() => setSelectComp(list.path)}
              >
                {/* <h1>{selectComp}</h1>
              <h1>{list.path}</h1> */}
                <img src={list.icon} alt={list.name} />
                <span className="link-name">{list.name}</span>
              </li>
            ))}
          </ul>
          <hr />
          <ul className="nav-list">
            {navListBottom.map((list, idx) => (
              <li
                key={idx}
                className={`nav-link
                ${list.path === selectComp ? "active" : ""}
              `}
                onClick={handleSignOut}
              >
                <img src={list.icon} alt={list.name} />
                <span className="link-name">{list.name}</span>
              </li>
            ))}
          </ul>
        </section>
      </article>

      {/* Sidebar - Mobile */}
      <article className="mobile-view">
        <nav className="navbar navbar-expand-lg p-0">
          <div className="container">
            <section className="emblem-container">
              <img src={Emblem} alt="Emblem-Comen" className="emblem" />
            </section>
            <button
              className="navbar-toggler ms-auto"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#n_bar"
              aria-controls="navbarNavAltMarkup"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="n_bar">
              <ul className="navbar-nav">
                <li className="nav-item">
                  {navListTop.map((list, idx) => (
                    <li
                      key={idx}
                      className={`nav-link
                ${list.path === selectComp ? "active" : ""}
              `}
                      onClick={() => setSelectComp(list.path)}
                    >
                      <img
                        src={list.icon}
                        alt={list.name}
                        className="nav-icon"
                      />
                      <span className="link-name">{list.name}</span>
                    </li>
                  ))}
                </li>

                <hr />
                <li className="nav-item">
                  {navListBottom.map((list, idx) => (
                    <a
                      key={idx}
                      className={`nav-link
                ${list.path === selectComp ? "active" : ""}
              `}
                      onClick={handleSignOut}
                    >
                      <img
                        src={list.icon}
                        alt={list.name}
                        className="nav-icon"
                      />
                      <span className="link-name">{list.name}</span>
                    </a>
                  ))}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </article>

      <article className="select-comp-container col-md-10">
        {selectComp === "Student-Home" && <B_Home id={student_id} fname={fname} lname={lname}/>}
        {selectComp === "Student-ShowFiles" && <B_ShowCase id={student_id} fname={fname} lname={lname}/>}
        {selectComp === "Student-ShowTiktok" && (
          <B_ShowTiktok id={student_id} fname={fname} lname={lname}/>
        )}
        {selectComp === "Student-Youtube" && (
          <B_Youtube id={student_id} fname={fname} lname={lname}/>
        )}
        {selectComp === "Student-Tools" && <B_Tools id={student_id} fname={fname} lname={lname}/>}
      </article>
    </main>
  );
};

export default B_Main;
