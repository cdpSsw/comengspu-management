const router = require("express").Router();
const bcrypt = require("bcryptjs");
const db = require("../../config/database");

const authorize = require("../middleware/authorize");

router.get("/", async (_, res) => {
  try {
    const [result] = await db.query("SELECT * FROM users");
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
});

router.put("/:id", authorize(["admin"]), async (req, res) => {
  try {
    const { id } = req.params;
    const { studentID, role, email, fname, lname } = req.body;


    // SQL query ที่ใช้ parameterized queries
    const updateQuery = `
      UPDATE users
      SET studentID = ?, role = ?, email = ?, fname = ?, lname = ? WHERE id = ?`;

    const updateValues = [
      studentID,
      role,
      email,
      fname,
      lname,
      id,
    ];

    // รัน query ด้วย pg
    const [result] = await db.query(updateQuery, updateValues);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).send(`Updated ID: ${id} Successful.`);
  } catch (err) {
    console.error(`Error updating user: ${err}`);
    res.status(500).json({
      success: false,
      message: "Error updating *User",
      error: err.message,
    });
  }
});

router.put("/password/:id", authorize(["admin"]), async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    // สร้าง salt และ hash password
    const saltRounds = parseInt(process.env.PASS_SALT, 10);
    const salt = await bcrypt.genSalt(saltRounds);
    const newPassword = await bcrypt.hash(password, salt);

    // SQL query ที่ใช้ parameterized queries
    const updateQuery = `
      UPDATE users
      SET password = ? WHERE id = ?`;

    const updateValues = [
      newPassword,
      id,
    ];

    // รัน query ด้วย pg
    const [result] = await db.query(updateQuery, updateValues);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).send(`Updated Password ID: ${id} Successful.`);

  } catch (err) {
    console.error(`Error updating user: ${err}`);
    res.status(500).json({
      success: false,
      message: "Error updating *User",
      error: err.message,
    });
  }
});

// ... Approve
router.put("/status/:id", authorize(["admin"]), async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    // console.log(req.body);
    // console.log(req.params);

    const updateQuery = `UPDATE users SET status = ? WHERE id = ?`;
    const values = [status, id];
    const [result] = await db.query(updateQuery, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).send(`Updated user with ID: ${id}`);
  } catch (err) {
    console.error(`Error updating user: ${err}`);
    res.status(500).json({
      success: false,
      message: "Error updating *Status",
      error: err.message,
    });
  }
});

router.delete("/:id", authorize(["admin"]), async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(req.params);

    const deleteSql = `DELETE FROM users WHERE id = ?`;
    const values = [id];
    const [result] = await db.query(deleteSql, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Delete user failed",
      });
    }

    return res.status(200).send(`Deleted user ${id} successful.`);
  } catch (err) {
    console.error(`Inserting: users, ${err}`);
    res.status(500).send(`Error getting users`);
  }
});

// ... Approve All
router.put("/all/status/", authorize(["admin"]), async (req, res) => {
  try {
    const { status, studentID } = req.body;
    // console.log(req.body);

    if (!Array.isArray(studentID) || studentID.length === 0) {
      return res.status(400).json({ success: false, message: "studentID must be a non-empty array" });
    }

    const placeholders = studentID.map(() => '?').join(', '); // (?, ?, ?)
    const query = `UPDATE users SET status = ? WHERE studentID IN (${placeholders})`;
    const values = [status, ...studentID];

    const [result] = await db.query(query, values);

    return res.status(200).json({
      success: true,
      message: `Updated ${result.affectedRows} students`,
    });

  } catch (err) {
    console.error(`Error updating users: ${err}`);
    res.status(500).json({
      success: false,
      message: "Error updating status",
      error: err.message,
    });
  }
});

// ----------------------------- users -------------------------------------
router.post("/", async (req, res) => {
  try {
    const { role, fname, lname, email, password, studentID } = req.body;
    // console.log(req.body);

    if (!studentID || !email || !password || !fname || !lname || !role) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Check StudentID or Mail
    const [checkRows] = await db.query(
      `SELECT COUNT(*) AS count FROM users WHERE studentID = ? OR email = ?`,
      [studentID, email]
    );

    if (checkRows[0].count > 0) {
      return res.status(400).json({
        success: false,
        message: "Student ID or Email already exists",
      });
    }

    const saltRounds = parseInt(process.env.PASS_SALT, 10) || 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const newPassword = await bcrypt.hash(password, salt);

    const insertSql = `INSERT INTO users (studentID, role, email, password, fname, lname)
    VALUES (?, ?, ?, ?, ?, ?) `;
    const values = [studentID, role, email, newPassword, fname, lname];
    const [result] = await db.query(insertSql, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Not found user",
      });
    }

    res.status(200).send(`Insert ID: ${result.insertId}`);
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
