const router = require("express").Router();
const db = require("../../../config/database");

const authorize = require("../../middleware/authorize");

// -------------- admin (wait for middleware) -------------------------------------------
router.get("/", async (_, res) => {
  try {
    const [result] = await db.query("SELECT * FROM stuShowTiktok");
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

// -------------- showtiktok (only approved) ------------------------------------------
router.get("/approved", async (_, res) => {
  try {
    const getSql = `SELECT * FROM stuShowTiktok WHERE status = ?`;
    const values = "Approved";
    const [result] = await db.query(getSql, [values]);

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Not Found ShowTiktok Approved",
      });
    }

    res.send(result);
  } catch (err) {
    return res.status(500).send({ message: `Internal server error: ${err}` });
  }
});

router.put("/status/:id", authorize(["admin"]), async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updateSql = `UPDATE stuShowTiktok SET status = ? WHERE id = ?`;
    const updateValues = [status, id];
    await db.query(updateSql, updateValues);

    return res.status(200).json({ message: "Update Successful" });
  } catch (err) {
    console.error(`Error: ${err}`);
    return res.status(500).json({ error: `Internal Server Error: ${err}` });
  }
});

router.put("/all/status/", authorize(["admin"]), async (req, res) => {
  try {
    const { status, id } = req.body;
    // console.log(req.body);

    if (!Array.isArray(id) || id.length === 0) {
      return res.status(400).json({ success: false, message: "ID must be a non-empty array" });
    }

    const placeholders = id.map(() => '?').join(', '); // (?, ?, ?)
    const query = `UPDATE stuShowTiktok SET status = ? WHERE id IN (${placeholders})`;
    const values = [status, ...id];

    const [result] = await db.query(query, values);

    return res.status(200).json({
      success: true,
      message: `Updated ${result.affectedRows} students`,
    });

  } catch (err) {
    console.error(`Error updating showTiktok status: ${err}`);
    res.status(500).json({
      success: false,
      message: "Error updating showTiktok status",
      error: err.message,
    });
  }
});

// ---------------- GET Only Selected ----------------
router.get("/selected", async (_, res) => {
  try {
    const selectedSql = "SELECT * FROM stuShowTiktok WHERE `select` = ?";
    const [selectedResult] = await db.query(selectedSql, ['selected']);
    // console.log(selectedResult);
    res.json(selectedResult);

  } catch (err) {
    res.status(500).send({ message: `Internal server error: ${err}` });
  }
});

// ---------------- Update Select ----------------
router.put("/select", authorize(["admin"]), async (req, res) => {
  try {
    const ids = req.body; // รับเป็น array เช่น [6, 7, 8]

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: "กรุณาส่ง array ของ id ที่ไม่ว่าง" });
    }

    // console.log("ids received:", ids);

    // unselect showcase ที่ถูกเลือกทั้งหมดก่อน
    await db.query('UPDATE stuShowTiktok SET `select` = ? WHERE `select` = ?', ['nonSelect', 'selected']);

    // ลูปใส่ select ทีละ id
    const newUpdateSql = 'UPDATE stuShowTiktok SET `select` = ? WHERE id = ?';
    for (let id of ids) {
      await db.query(newUpdateSql, ['selected', id]);
    }

    res.status(200).json({ message: "Update Successful" });
  } catch (err) {
    console.error(`Error: ${err}`);
    res.status(500).json({ error: `Internal Server Error: ${err}` });
  }
});

// ------------------------------- student ----------------------------------------------
router.get("/:studentID", authorize(["admin", "student"]), async (req, res) => {
  try {
    const { studentID } = req.params;

    const getSql = `SELECT * FROM stuShowTiktok WHERE studentID = ?`;
    const [result] = await db.query(getSql, [studentID]);
    res.send(result);
  } catch (err) {
    res.status(500).send(`Internal server error: ${err.message}`);
  }
});

router.post("/", authorize(["admin", "student"]), async (req, res) => {
  try {
    const { studentID, topic, embed, fname, lname } = req.body;

    const insertSql = `INSERT INTO stuShowTiktok (studentID, topic, embed, fname, lname) VALUES (?, ?, ?, ?, ?)`;
    const values = [studentID, topic, embed, fname, lname];
    const [result] = await db.query(insertSql, values);

    res.status(200).send(`Insert ID: ${result.insertId}`);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).send(`Internal server error: ${err.message}`);
  }
});

router.put("/:id", authorize(["admin", "student"]), async (req, res) => {
  try {
    const { id } = req.params;
    const { topic, embed, fname, lname } = req.body;

    const updateSql = `UPDATE stuShowTiktok SET topic = ?, embed = ?, fname = ?, lname = ? WHERE id = ?`;
    const values = [topic, embed, fname, lname, id];
    await db.query(updateSql, values);
    res.status(200).send(`Update Successfully`);
  } catch (err) {
    console.error(`Error: ${err}`);
    return res.status(500).json({ error: `Internal Server Error: ${err}` });
  }
});

router.delete("/:id", authorize(["admin", "student"]), async (req, res) => {
  try {
    const { id } = req.params;

    const deleteSql = `DELETE FROM stuShowTiktok WHERE id = ?`;
    await db.query(deleteSql, [id]);
    return res.status(200).json({ message: "Delete Successful" });
  } catch (err) {
    console.error(`Error: ${err}`);
    return res.status(500).json({ error: `Internal Server Error: ${err}` });
  }
});

module.exports = router;
