const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || 'aaa7c4f04c6104474a9b30cfc558000b4e3dafa0b0be7b81921b244af1d50ae8bf96e2d37a385d341d19a269db60f3b7a71e5ff40a6a53e494dda783dbeb0d47b5f2fa557965643cadc32e396a8ac518113192fea8d2b2533a6b5fe3589b17dee94b95d765c9df6fc5796b2821490d3f4b8228f82e9c88a3b86496ae24ce08dc6ce4dd38442598512ff08d1d860f4a7ac9875353993c32c14f2beb9791e4a52c98771964e4dcf37c4f83c68585b266a2f4d7a93d334967168b5ce9ca659182338c9eb75a44ce435779f7ecd91f155571e72d8a972cd7426cac7d226c3a5cb04e';
const db = require('../../config/database');

router.get("/", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Token is missing" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
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
    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, {
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
