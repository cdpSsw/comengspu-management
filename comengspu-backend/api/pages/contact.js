const router = require("express").Router();
const nodemailer = require("nodemailer");
const db = require('../../config/database');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: 'comen.spu@gmail.com',
    pass: 'rsltbjhrruvpjzrw',
  },
});

router.get("/", async (_, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM contact");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
  }
});

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send("Name, email, and message are required.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).send("Invalid email format.");
  }

  try {
    const insertSql = `INSERT INTO contact (name, email, message) VALUES (?, ?, ?)`;
    const values = [name, email, message];
    const [rows] = await db.query(insertSql, values);

    const mailOptions = {
      from: email,
      to: 'comen.spu@gmail.com',
      subject: `Get In Touch From CPE-Website : ${name} / ${email}`,
      text: message,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, insertId: rows.insertId });

  } catch (err) {
    console.error(`Error in POST /contact:`, err);
    res.status(500).send("Error saving contact or sending email.");
  }
});

module.exports = router;
