const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const db = require('../../config/database');

router.get("/", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded Token: ", decoded);

    // ตรวจสอบว่า role เป็น "admin" หรือ "student" เท่านั้น
    if (decoded.role !== "admin" && decoded.role !== "student") {
      return res
        .status(403)
        .json({ error: "Access denied! Only Admin and Student can access." });
    }

    res.status(200).json({ message: "Access granted", role: decoded.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
});

// Login Route
router.post("/", async (req, res) => {
  try {
    const { studentID, password } = req.body;
    // console.log(req.body);

    if (!studentID || !password) {
      return res.status(400).json({ error: "Missing required field" });
    }

    const insertSql = `SELECT id, studentID, fname, lname, password, status, role FROM users WHERE studentID = ?`;
    const values = [studentID];

    const [result] = await db.query(insertSql, values);

    if(result.length === 0){
      return res.status(404).json({
        success: false,
        message: "User not found. Please Sign Up an account."
      })
    }

    const user = result[0];

    // เช็คว่าสถานะถูก Approve ไหม
    if (user.status !== "Approved") {
      return res.status(403).json({ error: "Account not approved yet." });
    }

    const isMatch = await bcrypt.compare(password, user.password.trim());
    if (!isMatch) {

      console.log("Passwords do not match!");
      return res.status(401).json({ error: "Invalid studentID or password" });

    } 
    // else {
    //   console.log("Password is Match !");
    // }

    // สร้าง JWT Token
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      maxAge: 60 * 60 * 1000,
      secure: true,
      httpOnly: true,
      sameSite: "none",
    });   
    
    return res
      .status(200)
      .json({ message: "Login Successful", role: user.role, token, fname: user.fname, lname: user.lname });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
});

module.exports = router;
