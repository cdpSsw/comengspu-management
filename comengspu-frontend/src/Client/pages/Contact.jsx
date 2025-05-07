import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";

import Axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const contactsA = [
    {
      title: "Contact",
      topic: "Contact Details",
      description:
        "หากคุณมีคำถาม หรือข้อสงสัยใด ๆ โปรดอย่าลังเลที่จะติดต่อเราผ่านช่องทางด้านล่าง หรือกรอกฟอร์มเพื่อส่งข้อความถึงเรา ทีมงานยินดีที่จะช่วยเหลือคุณทุกเมื่อ!",
      address: "Building 5, Floor 8, Computer Engineering Room",
      mobile: "022 222 2222",
      availability: "Daily 09 am - 05 pm",
      email: "example@email.com",
    },
  ];

  const [contacts, setContactInfo] = useState([]);
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
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMail = async () => {
    setIsLoading(true); // เริ่มต้นการโหลด
    try {
      const res = await Axios.post(
        `${API_URL}/contact`,
        {
          name,
          email,
          message,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        alert("Send Mail Successful.");
        location.reload();

      } else {
        alert("Send Mail Failed.");
      }
    } catch (err) {
      alert(`Internal Server Error: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="contact-container">
      {contacts.map((contact, idx) => (
        <aritcle key={idx} className="content-container row m-0">
          <section className="contact-deatils col-md-6 py-5">
            <h1 className="topic">{contact.topic}</h1>
            <p className="desc">{contact.description}</p>

            <article className="contact-box-container row">
              {/* Location */}
              <section className="col-lg-5 contact-box address">
                <i className="bi bi-geo-alt-fill"></i>
                <div className="text-container">
                  <h5 className="title-box">Address</h5>
                  <p className="desc-box">{contact.address}</p>
                </div>
              </section>

              {/* mobile */}
              <section className="col-lg-5 contact-box mobile">
                <i className="bi bi-telephone-fill"></i>
                <div className="text-container">
                  <h5 className="title-box">Mobile</h5>
                  <p className="desc-box">{contact.mobile}</p>
                </div>
              </section>

              {/* availability */}
              <section className="col-lg-5 contact-box mobile">
                <i className="bi bi-clock-fill"></i>
                <div className="text-container">
                  <h5 className="title-box">Availability</h5>
                  <p className="desc-box">{contact.available}</p>
                </div>
              </section>

              {/* email */}
              <section className="col-lg-5 contact-box mobile">
                <i className="bi bi-envelope-fill"></i>
                <div className="text-container">
                  <h5 className="title-box">Email</h5>
                  <p className="desc-box">{contact.email}</p>
                </div>
              </section>
            </article>
          </section>

          {/* <div class="vl"></div> */}

          <form className="get-in-touch col-md-6 py-5">
            <h1 className="topic">Get in Touch</h1>
            <hr />

            {/* form name */}
            <div className="input-box">
              <label htmlFor="name">* Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
                className="form-control mb-3 my-2"
                required
              />
            </div>

            {/* form email */}
            <div className="input-box">
            <label htmlFor="email">* Email</label>
              <input
                type="email"
                placeholder="example@email.com"
                onChange={(e) => setEmail(e.target.value)}
                className="form-control mb-3 my-2"
                required
              />
            </div>
            <div className="input-box">
              <label htmlFor="meassage">* Message</label>
              <textarea
                type="text"
                placeholder="Message"
                onChange={(e) => setMessage(e.target.value)}
                className="form-control mb-3 my-2"
                required
              ></textarea>
            </div>
            <hr className="w-100"/>
            <button
              className="send-mess-btn"
              disabled={
                name?.trim() === "" ||
                email?.trim() === "" ||
                message?.trim() === "" ||
                isLoading
              }
              onClick={handleSendMail}
            >
              {isLoading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </aritcle>
      ))}
      {/* <Footer /> */}
    </main>
  );
};

export default Contact;
