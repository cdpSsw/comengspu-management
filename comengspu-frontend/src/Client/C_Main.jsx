import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import "../public/main.css";

import Modal from "../EComponents/Modal";
import emblem from "../DAssets/emblem/emblem_red_white.png";

import Axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

import Homepages from "./Homepages";
import Showcase from "./pages/showcase";
import ShowTiktok from "./pages/showTiktok";
import Youtube from "./pages/youtube";
import Contact from "./pages/Contact";

const C_Main = () => {
  useEffect(() => {
    document.title = "Homepage | Comen - SPU";
  }, []);

  const navigate = useNavigate();
  const [activeComp, setActiveComp] = useState("home");
  const navList = [
    { name: "home" },
    { name: "showcase (poster)" },
    { name: "showcase (tiktok)" },
    { name: "showcase (youtube)" },
    { name: "contact" },
  ];

  // sign in - set up
  const [enterstudentID, setEnterStudentID] = useState();
  const [enterPass, setEnterPass] = useState("");

  // sign up - set up
  const [studentID, setStudentID] = useState();
  const [role, setRole] = useState("student");
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const emailPattern = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
      const passwordPattern =
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      if (!emailPattern.test(email)) {
        alert("กรุณาใส่อีเมลที่ถูกต้อง ex. example@mail.com");
        return;
      }

      if (!passwordPattern.test(password)) {
        alert(
          "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร, ตัวพิมพ์เล็ก-ใหญ่, ตัวเลข และอักขระพิเศษ [@/$/!/%/*/?/&]"
        );
        return;
      }

      // const res = await api.post(`/SignUp`, {
      const res = await Axios.post(`${API_URL}/SignUp`, {
        studentID: String(studentID),
        role: String(role),
        fname: String(fname),
        lname: String(lname),
        email: String(email),
        password: String(password),
      });

      if (res.status === 200) {
        alert(`Successfully applied for an account, waiting for approval.`);
        location.reload();
      } else {
        alert(`Sign Up failed, try again later...`);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message;
      alert(`[Add *New Member] Error: ${errorMsg}`);
    }
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const res = await Axios.post(
        `${API_URL}/SignIn`,
        {
          studentID: enterstudentID,
          password: enterPass,
        },
        { withCredentials: true }
      );

      if (res.status === 200) {
        // alert("Login Successful");

        const token = res.data.token;
        if (token) {
          Cookies.set("token", token, { expires: 1, secure: true });
        }

        // ปิด Modal
        const modal = document.getElementById("signIn-modal");
        const modalInstance = bootstrap.Modal.getInstance(modal);
        modalInstance.hide();

        // console.log(res.data);

        // Redirect ตาม role
        if (res.data.role === "student") {
          navigate("/Student_Dashboard", {
            state: {
              student_id: enterstudentID,
              fname: res.data.fname,
              lname: res.data.lname,
            },
          });
        } else if (res.data.role === "admin") {
          window.location.href = "#/Admin_Dashboard";
        }
      } else {
        alert("Login Failed");
      }
    } catch (err) {
      alert(`[Warning] : ${err.response?.data?.error || err.response?.data?.message}`);
    }
  };

  const handleEmblem = () => {
    location.reload();
  };

  // ---------------------------------- Contact Footer -----------------------------
  const [contacts, setContactInfo] = useState([]);
  // console.log(contacts)
  const handlContactInfo = async () => {
    try {
      const res = await Axios.get(`${API_URL}/info/contact`);
      if (res.status === 200) setContactInfo(res.data);
      else alert(`Get *Contact Failed.`);
    } catch (err) {
      alert(`[Contact] Internal server ${err}`);
    }
  };

  useEffect(() => { handlContactInfo(); }, [])

  return (
    <main className="user-main-container">
      <article className="desktop-view">
        <section className="nav-left-side">
          <button onClick={handleEmblem}>
            <img src={emblem} alt="emblem" className="emblem" />
          </button>
          <ul className="nav-list">
            {navList.map((link, idx) => (
              <li key={idx}>
                <button
                  className={`
                        nav-link
                        ${activeComp === link.name ? "active" : ""}
                    `}
                  onClick={() => setActiveComp(link.name)}
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="nav-right-side btn-container">
          <button
            data-bs-toggle="modal"
            data-bs-target="#signIn-modal"
            className="btn btn-signIn"
          >
            Sign In
          </button>
          <button
            data-bs-toggle="modal"
            data-bs-target="#signUp-modal"
            className="btn btn-signUp"
          >
            Sign Up
          </button>
        </section>
      </article>

      <article className="mobile-view">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid nav">
            <section className="nav-box">
              <button onClick={handleEmblem} className="navbar-brand">
                <img src={emblem} alt="Emblem" className="emblem" />
              </button>
              <button
                className="navbar-toggler icon-btn"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarMobile"
                aria-controls="navbarMobile"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <i className="bi bi-list"></i>
              </button>
            </section>

            <section
              className="nav-side collapse navbar-collapse"
              id="navbarMobile"
            >
              <ul className="nav-list">
                {navList.map((link, idx) => (
                  <li key={idx}>
                    <button
                      className={`
                        nav-link
                        ${activeComp === link.name ? "active" : ""}
                    `}
                      onClick={() => setActiveComp(link.name)}
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>

              <section className="btn-container">
                <hr />
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#signIn-modal"
                  className="btn btn-signIn"
                >
                  Sign In
                </button>
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#signUp-modal"
                  className="btn btn-signUp"
                >
                  Sign Up
                </button>
              </section>
            </section>
          </div>
        </nav>
      </article>

      <article className="comp-container">
        {activeComp === "home" && <Homepages />}
        {activeComp === "showcase (poster)" && <Showcase />}
        {activeComp === "showcase (tiktok)" && <ShowTiktok />}
        {activeComp === "showcase (youtube)" && <Youtube />}
        {activeComp === "contact" && <Contact />}
      </article>

      <article className="footer-container row m-0 p-5">
          <ul className="nav-list">
            {navList.map((link, idx) => (
              <li key={idx}>
                <button
                  className={`
                        nav-link
                        ${activeComp === link.name ? "active" : ""}
                    `}
                    onClick={() => {
                      setActiveComp(link.name);
                      window.scrollTo({ top: 0, behavior: 'smooth' }); // scroll แบบ smooth ไปบนสุด
                    }}
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
          <hr />

          <section className="social-container">
            {
              contacts.map((contact, idx) => (
                <section key={idx}>
                  <a href={`mailto: ${contact.email}`}><i className="bi bi-envelope-fill"></i></a>
                  <a href={`tel:+66${contact.mobile}`}><i className="bi bi-telephone-fill"></i></a>
                  <a href={contact.facebook} target="_blank" className="fb">Facebook</a>
                  <a href={contact.tiktok} target="_blank" className="tt">Tiktok</a>
                </section>
              ))
            }
          </section>
      </article>

      {/* Sing In - Modal */}
      <Modal
        modalID="signIn-modal"
        modalHeaderStyle="d-none"
        modalFooterStyle="d-none"
        modalBodyContent={
          <>
            <form className="form form-signIn">
              <section className="text-top-container">
                <h1 className="topic">Sign In</h1>
                <p className="desc">
                  Don't have an account ?
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#signUp-modal"
                    className="btn btn-signUp"
                    type="button"
                  >
                    Sign Up
                  </button>
                </p>
              </section>

              {/* Student studentID */}
              <div className="input-box">
                <input
                  type="text"
                  placeholder="Student ID"
                  className="form-control mb-3"
                  onChange={(e) => setEnterStudentID(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div className="input-box">
                <input
                  type="password"
                  placeholder="Password"
                  className="form-control mb-3"
                  onChange={(e) => setEnterPass(e.target.value)}
                  required
                />
              </div>

              <section className="btn-container">
                <button
                  type="button" // Add type="button" to prevent form submission
                  className="btn btn-signIn"
                  onClick={handleSignIn}
                  disabled={!enterstudentID?.trim() || !enterPass?.trim()}
                >
                  Sign In
                </button>

                <div className="text-bottom-container">
                  <ion-icon name="information-circle-outline"></ion-icon>
                  <p>
                    Forgot Password ? <span>Contact the administrator</span>
                  </p>
                </div>
              </section>
            </form>
          </>
        }
      />

      {/* Sing Up - Modal */}
      <Modal
        modalID="signUp-modal"
        modalHeaderStyle="d-none"
        modalFooterStyle="d-none"
        modalBodyContent={
          <>
            <form className="form form-signUp">
              <section className="text-top-container">
                <h1 className="topic">Sign Up</h1>
                <p className="desc">
                  Already have an account ?
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#signIn-modal"
                    className="btn btn-signIn"
                    type="button"
                  >
                    Sign In
                  </button>
                </p>
              </section>

              {/* Student studentID or studentID & Role */}
              <section className="studentID-n-Role row">
                <div className="input-box col-md-7">
                  <input
                    type="text"
                    placeholder="Student ID"
                    className="form-control mb-3"
                    onChange={(e) => setStudentID(e.target.value)}
                    required
                  />
                </div>

                <div className="input-box col-md-5">
                  <select
                    name="role"
                    onChange={(e) => setRole(e.target.value)}
                    className="form-select mb-3"
                  >
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </section>

              {/* fname & lname */}
              <section className="studentID-n-Role row">
                <div className="input-box col-md-7">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="form-control mb-3"
                    onChange={(e) => setFname(e.target.value)}
                    required
                  />
                </div>

                <div className="input-box col-md-5">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="form-control mb-3"
                    onChange={(e) => setLname(e.target.value)}
                    required
                  />
                </div>
              </section>

              {/* Email */}
              <div className="input-box">
                <input
                  type="email"
                  placeholder="example@mail.com"
                  className="form-control mb-3"
                  onChange={(e) => setEmail(e.target.value)}
                  pattern="^[^@]+@[^@]+\.[a-zA-Z]{2,}$"
                  title="กรุณาใส่อีเมลที่ถูกต้อง เช่น example@mail.com"
                  required
                />
              </div>

              {/* Password */}
              <div className="input-box">
                <input
                  type="password"
                  placeholder="Passwrod"
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                  pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                  title="รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร, ประกอบด้วยตัวพิมพ์เล็ก, ตัวพิมพ์ใหญ่, ตัวเลข และอักขระพิเศษ"
                  required
                />
                <label
                  htmlFor="password"
                  className="form-label mb-3"
                  style={{ fontSize: "10px" }}
                >
                  *รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร, ตัวพิมพ์เล็ก-ใหญ่, ตัวเลข
                  และอักขระพิเศษ [@/$/!/%/*/?/&]
                </label>
              </div>

              <section className="btn-container">
                <button
                  className="btn btn-signUp"
                  onClick={handleSignUp}
                  disabled={
                    !studentID?.trim() ||
                    !fname?.trim() ||
                    !lname?.trim() ||
                    !email?.trim() ||
                    !password?.trim()
                  }
                >
                  Sign Up
                </button>

                {/* <div className="text-bottom-container">
                  <ion-icon name="information-circle-outline"></ion-icon>
                  <p>
                    Forgot Password ? <span>Contact the administrator</span>
                  </p>
                </div> */}
              </section>
            </form>
          </>
        }
      />
    </main>
  );
};

export default C_Main;
