import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import Axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

import "../public/main.css";

// icons + emblem + svg
import Emblem from "../DAssets/emblem/emblem_red.png";
import Home from "../DAssets/icons/icon-home.svg";
import ShowFiles from "../DAssets/icons/icon-showcase-files.svg";
import ShowTiktok from "../DAssets/icons/icon-showcase-tiktok.svg";
import Youtube from "../DAssets/icons/icon-youtube.svg";
import Tools from "../DAssets/icons/icon-tools.svg";
import Members from "../DAssets/icons/icon-members.svg";
import Teams from "../DAssets/icons/icon-team.svg";
import SignOut from "../DAssets/icons/icon-sign-out.svg";

// Components
import A_Home from "./pages/A_Home";
import A_ShowCase from "./pages/A_ShowCase";
import A_ShowTiktok from "./pages/A_ShowTiktok";
import A_Youtube from "./pages/A_Youtube";
import A_Tools from "./pages/A_Tools";
import A_Members from "./pages/A_Members";
import A_Teams from "./pages/A_Team";

const A_Main = () => {
  const [selectComp, setSelectComp] = useState("Admin-Home");
  const navigate = useNavigate();

  // ---------------------------------------------- CHECK ACCESS (ROLE) --------------------------------------
  useEffect(() => { 
    const checkAdminAccess = async () => {
      const token = Cookies.get("token");
      // console.log("Token from Cookie:", token);

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

        // console.log("API Response:", res.data);

        if (res.data.role !== "admin") {
          alert("Access denied! Admins only.");
          navigate("/");
          return;
        }

        setSelectComp("Admin-Home");
        console.log("Access granted for admin");
      } catch (error) {
        console.error(
          "🔴 Error checking admin access:",
          error.response?.data || error
        );
        alert("Session expired. Please login again.");
        Cookies.remove("token");
        Cookies.remove("role");
        Cookies.remove("studentID");
        navigate("/");
      }
    };

    checkAdminAccess();
  }, [navigate]);

  // ---------------------------------------------- HANDLE SIGNOUT --------------------------------------
  const handleSignOut = async (event) => {
    event.preventDefault();
    try {
      const res = await Axios.post( `${API_URL}/SignOut`,
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
      path: "Admin-Home",
    },
    {
      icon: ShowFiles,
      name: "Showcase (Poster)",
      path: "Admin-ShowFiles",
    },
    {
      icon: ShowTiktok,
      name: "Showcase (Tiktok)",
      path: "Admin-ShowTiktok",
    },
    {
      icon: Youtube,
      name: "Youtube",
      path: "Admin-Youtube",
    },
    {
      icon: Tools,
      name: "Tools",
      path: "Admin-Tools",
    },
    {
      icon: Teams,
      name: "Teams",
      path: "Admin-Teams",
    },
    {
      icon: Members,
      name: "Members",
      path: "Admin-Members",
    },
  ];
  const navListBottom = [ 
    {
      icon: SignOut,
      name: "Sign Out",
      path: "Admin-SignOut",
    },
  ];

  return (
    <main className="a-main-container row m-0">
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
        {selectComp === "Admin-Home" && <A_Home />}
        {selectComp === "Admin-ShowFiles" && <A_ShowCase />}
        {selectComp === "Admin-ShowTiktok" && <A_ShowTiktok />}
        {selectComp === "Admin-Youtube" && <A_Youtube />}
        {selectComp === "Admin-Tools" && <A_Tools />}
        {selectComp === "Admin-Members" && <A_Members />}
        {selectComp === "Admin-Teams" && <A_Teams />}
      </article>
    </main>
  );
};

export default A_Main;
