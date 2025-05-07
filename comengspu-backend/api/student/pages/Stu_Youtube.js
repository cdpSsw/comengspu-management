const router = require("express").Router();
const db = require("../../../config/database");

const authorize = require("../../middleware/authorize");

// ----------------------------------------------------------------------- Youtube ------------------------------------------------------
// -------------- admin (wait for middleware) -------------------------------------------
router.get("/", async (_, res) => {
  try {
    const [result] = await db.query("SELECT * FROM studentYoutube");
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

// -------------- youtube (only approved) ------------------------------------------
router.get("/approved", async (_, res) => {
  try {
    const getSql = `SELECT * FROM studentYoutube WHERE status = ?`;
    const values = "Approved";
    const [result] = await db.query(getSql, [values]);

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Not Found youtube Approved",
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

    const updateSql = `UPDATE studentYoutube SET status = ? WHERE id = ?`;
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
    const query = `UPDATE studentYoutube SET status = ? WHERE id IN (${placeholders})`;
    const values = [status, ...id];

    const [result] = await db.query(query, values);

    return res.status(200).json({
      success: true,
      message: `Updated ${result.affectedRows} students`,
    });

  } catch (err) {
    console.error(`Error updating youtube status: ${err}`);
    res.status(500).json({
      success: false,
      message: "Error updating youtube status",
      error: err.message,
    });
  }
});

// ------------------------------- student ----------------------------------------------
router.get("/:studentID", authorize(["admin", "student"]), async (req, res) => {
  try {
    const { studentID } = req.params;

    const getSql = `SELECT * FROM studentYoutube WHERE studentID = ?`;
    const [result] = await db.query(getSql, [studentID]);
    res.send(result);
  } catch (err) {
    res.status(500).send(`Internal server error: ${err.message}`);
  }
});

router.post("/", authorize(["admin", "student"]), async (req, res) => {
  // console.log(`Clicked, Student Youtube`)
  try {
    const { fname, lname, studentID, description, embed } = req.body;
    // console.log(req.body);

    const insertSql = `INSERT INTO studentYoutube (fname, lname, studentID, description, embed) VALUES (?, ?, ?, ?, ?)`;
    const values = [fname, lname, studentID, description, embed];
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
    const { fname, lname, studentID, description, embed } = req.body;

    const updateSql = `UPDATE studentYoutube SET fname = ?, lname = ?, studentID = ?, description = ?, embed = ? WHERE id = ?`;
    const values = [fname, lname, studentID, description, embed, id];
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

    const deleteSql = `DELETE FROM studentYoutube WHERE id = ?`;
    await db.query(deleteSql, [id]);
    return res.status(200).json({ message: "Delete Successful" });
  } catch (err) {
    console.error(`Error: ${err}`);
    return res.status(500).json({ error: `Internal Server Error: ${err}` });
  }
});
 
module.exports = router;
