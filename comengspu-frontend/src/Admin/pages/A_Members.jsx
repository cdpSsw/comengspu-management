import React, { useEffect, useState } from "react";

import Modal from "../../EComponents/Modal";
import ModalDel from "../../EComponents/ModalDel";
import ModalApprove from "../../EComponents/ModalApprove";
import notFound from "../../DAssets/svg/NotFound.svg";

import Axios, { all } from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const A_Members = () => {
  const membersA = [
    {
      studentID: "11111111",
      fname: "aaa",
      lname: "aaa",
      email: "aaa@aaa.com",
      role: "admin",
      status: "Approved",
    },
    {
      studentID: "22222222",
      fname: "bbb",
      lname: "bbb",
      email: "bbb@bbb.com",
      role: "student",
      status: "Waiting",
    },
    {
      studentID: "3333333",
      fname: "ccc",
      lname: "cccc",
      email: "ccc@ccc.com",
      role: "student",
      status: "Waiting",
    },
  ];

  // Get *Members
  const [members, setMembers] = useState([]);
  // console.log(members)
  const handleMembers = async () => {
    try {
      const res = await Axios.get(`${API_URL}/SignUp`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setMembers(res.data);
      } else {
        alert(`Getting Members failed, check log`);
      }
    } catch (err) {
      alert(`Internal Server Error: ${err.message}`);
    }
  };

  useEffect(() => {
    document.title = "Members | Admin";
    handleMembers();
  }, []);

  // Post (Add New) - Members
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
        alert("กรุณาใส่อีเมลที่ถูกต้อง");
        return;
      }

      if (!passwordPattern.test(password)) {
        alert(
          "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร, ตัวพิมพ์เล็ก-ใหญ่, ตัวเลข และอักขระพิเศษ"
        );
        return;
      }

      const res = await Axios.post(`${API_URL}/signUp`, {
        studentID,
        role,
        fname,
        lname,
        email,
        password,
      });

      if (res.status === 200) {
        alert(`Waiting for approval.`);
        location.reload();
      } else {
        alert(`Sign Up failed, try again later...`);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message;
      alert(`[Add *New Member] Error: ${errorMsg}`);
    }
  };

  // Put (Update) - Member
  const [oldInfo, setOldInfo] = useState([]);
  // console.log(oldInfo)
  const [newStudentID, setNewStudentID] = useState();
  const [newFname, setNewFname] = useState("");
  const [newLname, setNewLname] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState("");

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      if (newEmail) {
        const emailPattern = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
        if (newEmail && !emailPattern.test(newEmail)) {
          alert("กรุณาใส่อีเมลที่ถูกต้อง");
          return;
        }
      }

      const updatedData = {
        studentID: newStudentID?.trim() || oldInfo.studentID,
        role: newRole?.trim() || oldInfo.role,
        fname: newFname?.trim() || oldInfo.fname,
        lname: newLname?.trim() || oldInfo.lname,
        email: newEmail?.trim() || oldInfo.email,
      };

      // console.log("Updating with:", updatedData);

      const res = await Axios.put(
        `${API_URL}/SignUp/${oldInfo.id}`,
        updatedData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        alert(`อัปเดตข้อมูลสำเร็จ รอการอนุมัติ`);
        location.reload();
      } else {
        alert(`อัปเดตข้อมูลล้มเหลว`);
      }
    } catch (err) {
      console.error("Update Error:", err);
      alert(`เกิดข้อผิดพลาด: ${err.message}`);
    }
  };

  // ----------------------------- Update Password
  const [newPassword, setNewPassword] = useState("");

  const handleUpdatePassword = async () => {
    try {
      if (newPassword) {
        const passwordPattern =
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (newPassword && !passwordPattern.test(newPassword)) {
          alert(
            "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร, ตัวพิมพ์เล็ก-ใหญ่, ตัวเลข และอักขระพิเศษ"
          );
          return;
        }
      }

      const updatedData = {
        password: newPassword?.trim() || oldInfo.password,
      };

      const res = await Axios.put(
        `${API_URL}/SignUp/password/${oldInfo.id}`,
        updatedData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        alert(`Update *Password Successful.`);
        location.reload();
      } else {
        alert(`Update *Password Successful.`);
      }
    } catch (err) {
      alert(`[Password] Internal server ${err}`);
    }
  };

  // Put Status (Approved)
  const [approveItem, setApproveItem] = useState([]);

  // DELETE *SHOWCASE
  const [delInfo, setDelInfo] = useState([]);

  // HANDLE *CANCEL MODAL
  const handleClosedModal = () => {
    document.getElementById("studentID").value = "";
    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
  };

  useEffect(() => {
    document.title = "Members | Admin";
  }, []);

  // ----------------------------- Approve All
  const [idWaiting, setIDwaiting] = useState([]);
  const [stuIDWaiting, setStuIDWaiting] = useState([]);
  // console.log(idWaiting[0].studentID);
  // console.log(stuIDWaiting)

  const handleApproveAll = async () => {
    if (idWaiting.length === 0) {
      alert("No students waiting for approval.");
      return;
    }

    try {
      const res = await Axios.put(
        `${API_URL}/SignUp/all/status`,
        {
          status: "Approved",
          studentID: stuIDWaiting,
        },
        { withCredentials: true }
      );

      if (res.status === 200) {
        alert(`Approve *All Status Successful.`);
        location.reload();
      } else {
        alert(`Approve Failed.`);
        location.reload();
      }
    } catch (err) {
      alert(`Internal server ${err.message}`);
    }
  };

  return (
    <main className="a-members-container">
      <section className="top-container">
        <h1 className="topic">Members Management</h1>
        <section className="add-new-container">
          <button
            className="btn btn-appv-all mx-2"
            data-bs-toggle="modal"
            data-bs-target="#modal-appv-all"
            disabled={
              members.filter((mem) => mem.status === "Waiting").length === 0
            }
            onClick={() =>[
              setIDwaiting(
                members
                  .filter((mem) => mem.status === "Waiting")
                  .map((mem) => mem)
              ),
              setStuIDWaiting(
                members
                  .filter((mem) => mem.status === "Waiting")
                  .map((mem) => mem.studentID)
              )
            ]}
          >
            Approve All
          </button>
          <button
            data-bs-toggle="modal"
            data-bs-target="#modal-add-new"
            className="btn btn-add-new-mem"
          >
            Add New
          </button>
        </section>
      </section>
      <hr />

      <article className="content-container">
        {members.length === 0 ? (
          <section className="nf-login-container">
            <img
              src={notFound}
              alt="No youtube items found"
              className="notFoundImg-login"
            />
          </section>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>No.</th>
                <th>StudetID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Optional</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{member.studentID}</td>
                  <td>
                    {member.fname} {member.lname}
                  </td>
                  <td>{member.email}</td>
                  <td>{member.role}</td>

                  <td className="option-container">
                    {member.status === "Approved" ? (
                      <button className="btn btn-approve">
                        <i className="bi bi-check-circle-fill"></i>
                        <span>Approve</span>
                      </button>
                    ) : (
                      <button
                        className="btn btn-waiting"
                        data-bs-toggle="modal"
                        data-bs-target="#modal-approve"
                        onClick={() => setApproveItem(member)}
                      >
                        <i className="bi bi-clock-fill"></i>
                        <span> Waiting </span>
                      </button>
                    )}

                    <button
                      className="btn btn-update"
                      data-bs-toggle="modal"
                      data-bs-target="#modal-update-password"
                      onClick={() => setOldInfo(member)}
                    >
                      <i className="bi bi-key"></i>
                    </button>

                    <button
                      className="btn btn-update"
                      data-bs-toggle="modal"
                      data-bs-target="#modal-update"
                      onClick={() => setOldInfo(member)}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>

                    <button
                      className="btn btn-remove"
                      data-bs-toggle="modal"
                      data-bs-target="#modal-delete"
                      onClick={() => setDelInfo(member)}
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </article>

      {/* Modal *Approve */}
      <ModalApprove
        approveItem={approveItem}
        approvePath="SignUp"
        approveTitle="Member"
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
              Approve <strong>*Member Status</strong>
            </h1>
            <p className="desc mb-1">You're going to approve</p>
            {idWaiting.map((id, idx) => (
              <>
                <p className="my-1" key={idx}>
                  Student ID: <span style={{ color: 'red'}}>{id.studentID}</span>
                </p>
                <p className="my-1" key={idx}>
                <span style={{ color: 'red'}}>{id.fname} {id.lname} ( {id.role} ) </span>
                </p>
              </>
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

      {/* Modal - Add *Member */}
      <Modal
        modalID="modal-add-new"
        modalHeaderStyle="d-none"
        modalFooterStyle="d-none"
        modalBodyContent={
          <form className="form">
            <h1 className="topic">Member</h1>

            {/* Student ID + Role */}
            <section className="name-container row m-0 d-flex justify-content-between">
              <div className="input-box col-md-6 right">
                <label htmlFor="studentID" className="mb-2">
                  * Student ID
                </label>
                <input
                  type="text"
                  name="studentID"
                  id="studentID1"
                  className="form-control mb-3"
                  placeholder="ex. 6999999"
                  onChange={(e) => setStudentID(e.target.value)}
                />
              </div>
              <div className="input-box col-md-5 left">
                <label htmlFor="role" className="mb-2">
                  * Role
                </label>
                <select
                  onChange={(e) => setRole(e.target.value)}
                  className="form-select"
                >
                  <option value="Student">Student</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </section>

            {/* Name */}
            <section className="name-container row m-0  justify-content-between">
              <div className="input-box col-md-6 right">
                <label htmlFor="fname" className="mb-2">
                  * First Name
                </label>
                <input
                  type="text"
                  name="fname"
                  id="fname1"
                  className="form-control mb-3"
                  placeholder="first name"
                  onChange={(e) => setFname(e.target.value)}
                />
              </div>
              <div className="input-box col-md-5 left">
                <label htmlFor="lname" className="mb-2">
                  * Last Name
                </label>
                <input
                  type="text"
                  name="lname1"
                  id="lname1"
                  className="form-control mb-3"
                  placeholder="last name"
                  onChange={(e) => setLname(e.target.value)}
                />
              </div>
            </section>

            {/* Email */}
            <div className="input-box">
              <label htmlFor="email" className="mb-2">
                * Email
              </label>
              <input
                type="email"
                name="email"
                id="email1"
                className="form-control mb-3"
                placeholder="ex. example@mail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="input-box">
              <label htmlFor="password" className="mb-2">
                * Password
              </label>
              <input
                type="password"
                placeholder="Password"
                className="form-control mb-3"
                onChange={(e) => setPassword(e.target.value)}
                pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                title="รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร, ประกอบด้วยตัวพิมพ์เล็ก, ตัวพิมพ์ใหญ่, ตัวเลข และอักขระพิเศษ"
                required
              />
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
                className="btn btn-add"
                onClick={handleSignUp}
                disabled={
                  !studentID?.trim() ||
                  !fname?.trim() ||
                  !lname?.trim() ||
                  !email?.trim() ||
                  !password?.trim()
                }
              >
                Add New
              </button>
            </section>
          </form>
        }
      />

      {/* Modal - Update *Member Info*/}
      <Modal
        modalID="modal-update"
        modalHeaderStyle="d-none"
        modalFooterStyle="d-none"
        modalBodyContent={
          <form className="form">
            <h1 className="topic">Member</h1>
            <hr />
            {/* Student ID + Role*/}
            <section className="name-container row d-flex justify-content-between">
              <div className="input-box col-md-7">
                <label htmlFor="studentID" className="mb-2">
                  * New Student ID
                </label>
                <input
                  type="text"
                  name="studentID2"
                  id="studentID"
                  className="form-control mb-3"
                  placeholder={oldInfo.studentID}
                  onChange={(e) => setNewStudentID(e.target.value)}
                />
              </div>
              <div className="input-box col-md-5 ">
                <label htmlFor="role" className="mb-2">
                  * New Role
                </label>
                <select
                  onChange={(e) => setNewRole(e.target.value)}
                  className="form-select"
                >
                  <option value={oldInfo.role} hidden>
                    {oldInfo.role}
                  </option>
                  <option value="student">Student</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </section>

            {/* Name */}
            <section className="name-container row d-flex justify-content-between">
              <div className="input-box col-md-7">
                <label htmlFor="fname" className="mb-2">
                  * New First Name
                </label>
                <input
                  type="text"
                  name="fname"
                  id="fname2"
                  className="form-control mb-3"
                  placeholder={oldInfo.fname}
                  onChange={(e) => setNewFname(e.target.value)}
                />
              </div>
              <div className="input-box col-md-5">
                <label htmlFor="lname" className="mb-2">
                  * New Last Name
                </label>
                <input
                  type="text"
                  name="lname"
                  id="lname2"
                  className="form-control mb-3"
                  placeholder={oldInfo.lname}
                  onChange={(e) => setNewLname(e.target.value)}
                />
              </div>
            </section>

            {/* Email */}
            <div className="input-box">
              <label htmlFor="email" className="mb-2">
                * New Email
              </label>
              <input
                type="email"
                name="email"
                id="email2"
                className="form-control mb-3"
                placeholder={oldInfo.email}
                onChange={(e) => setNewEmail(e.target.value)}
              />
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
                onClick={handleUpdate}
                className="btn btn-update"
              >
                Update
              </button>
            </section>
          </form>
        }
      />

      {/* Modal - Update *Member Password */}
      <Modal
        modalID="modal-update-password"
        modalHeaderStyle="d-none"
        modalFooterStyle="d-none"
        modalBodyContent={
          <form className="form">
            <h1 className="topic">Member *Password</h1>
            <hr />
            {/* Password */}
            <div className="input-box">
              <label htmlFor="password" className="mb-2">
                * New Password
              </label>
              <input
                type="password"
                placeholder="Password"
                className="form-control"
                onChange={(e) => setNewPassword(e.target.value)}
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
                type="button"
                data-bs-dismiss="modal"
                onClick={handleClosedModal}
                className="btn btn-cancel"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleUpdatePassword}
                className="btn btn-update"
                disabled={!newPassword.trim()}
              >
                Update
              </button>
            </section>
          </form>
        }
      />

      {/* Modal - Delete *Member */}
      <ModalDel
        modalDelID="modal-delete"
        modalDelTitle="(Admin) Member"
        modalDelContent={delInfo}
        modalDelPath="SignUp"
      />
    </main>
  );
};

export default A_Members;
