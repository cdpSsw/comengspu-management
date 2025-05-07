const router = require("express").Router();
const bcrypt = require("bcryptjs");
const db = require("../config/database");

router.get("/", async (_, res) => {
  try {
    const [result] = await db.query("SELECT * FROM users");
    res.send(result);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).send(`Internal server error: ${err.message}`);
  }
});

router.post("/", async (req, res) => {
  try {
    const { role, fname, lname, email, password, studentID } = req.body;

    if (!studentID || !email || !password || !fname || !lname || !role) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const [checkResult] = await db.query(
      `SELECT COUNT(*) FROM users WHERE studentID = $1 OR email = $2`,
      [studentID, email]
    );

    if (parseInt(checkResult[0].count) > 0) {
      return res.status(400).json({
        success: false,
        message: "Student ID or Email already exists",
      });
    }

    const saltRounds = parseInt(process.env.PASS_SALT, 10) || 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const newPassword = await bcrypt.hash(password, salt);
    
    const [insertResult] = await db.query(
      `INSERT INTO users (studentID, role, email, password, fname, lname)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [studentID, role, email, newPassword, fname, lname]
    );

    res.status(200).send(`Insert ID: ${insertResult.insertId}`);
    
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
