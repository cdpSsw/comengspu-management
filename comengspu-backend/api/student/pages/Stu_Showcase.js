const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const imagePath = path.join(process.cwd(), "public", "images", "stu_showcase");
const db = require("../../../config/database");
const authorize = require("../../middleware/authorize");

if (!fs.existsSync(imagePath)) {
  fs.mkdirSync(imagePath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, imagePath),
  filename: (_, file, cb) => {
    const randomString = Math.random().toString(36).substring(2, 15);
    const timestamp = Date.now();
    const fileName = `${timestamp}_${randomString}_${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({
  storage,
  fileFilter: (_, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"));
    }
    cb(null, true);
  },
});

// ---------------- GET All Showcases ----------------
router.get("/", async (_, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM stuShowcase");

    // ถ้าไม่มีข้อมูลใน rows, ให้ return เป็น array เปล่า
    if (rows.length === 0) {
      return res.json([]); // ส่ง array เปล่ากลับไป
    }

    // ถ้ามีข้อมูลก็ return rows
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
  }
});

// ---------------- GET Showcase Images (All) ----------------
router.get("/images", async (_, res) => {
  try {
    const [rows] = await db.query(`SELECT id, image_data, image_mime_type FROM stuShowcase WHERE image_data IS NOT NULL`);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Selected Showcase (Images) not found." });
    }

    const images = rows.map((row) => ({
      id: row.id,
      image: `data:${row.image_mime_type};base64,${row.image_data.toString("base64")}`,
    }));

    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(500).send(`Internal server error: ${err.message}`);
  }
});

// ---------------- Update Status ----------------
router.put("/status/:id", authorize(["admin"]), async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const approvedSql = "UPDATE stuShowcase SET status = ? WHERE id = ?"
    const approvedValues = [status, id]
    const [approvedResult] = await db.query(approvedSql, approvedValues);

    if (approvedResult.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Update Status Showcase Failed, Not found New Showcase" });
    }

    res.status(200).json({ message: "Update Successful" });
  } catch (err) {
    console.error(`Error: ${err}`);
    res.status(500).json({ error: `Internal Server Error: ${err}` });
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
    const query = `UPDATE stuShowcase SET status = ? WHERE id IN (${placeholders})`;
    const values = [status, ...id];

    const [result] = await db.query(query, values);

    return res.status(200).json({
      success: true,
      message: `Updated ${result.affectedRows} students`,
    });

  } catch (err) {
    console.error(`Error updating showcase status: ${err}`);
    res.status(500).json({
      success: false,
      message: "Error updating showcase status",
      error: err.message,
    });
  }
});

// ---------------- GET Only Approved ----------------
router.get("/approved", async (_, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM stuShowcase WHERE status = ?", ['Approved']);
    res.json(rows);
  } catch (err) {
    res.status(500).send({ message: `Internal server error: ${err}` });
  }
});

// ---------------- GET Only Selected ----------------
router.get("/selected", async (_, res) => {
  try {
    const selectedSql = "SELECT * FROM stuShowcase WHERE `select` = ?";
    const [selectedResult] = await db.query(selectedSql, ['selected']);
    // console.log(selectedResult);
    res.json(selectedResult);

  } catch (err) {
    res.status(500).send({ message: `Internal server error: ${err}` });
  }
});

router.get("/selected/images", async (_, res) => {
  try {
    const selectedImageSql = "SELECT id, image_data, image_mime_type FROM stuShowcase WHERE `select` = ?"
    const [selectedImageResult] = await db.query(selectedImageSql, ['selected']);

    if (selectedImageResult.length === 0) {
      return res.status(404).json({ success: false, message: "Selected Showcase (Images) not found." });
    }

    const images = selectedImageResult.map((row) => ({
      id: row.id,
      image: `data:${row.image_mime_type};base64,${row.image_data.toString("base64")}`,
    }));

    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(500).send(`Internal server error: ${err.message}`);
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
    await db.query('UPDATE stuShowcase SET `select` = ? WHERE `select` = ?', ['nonSelect', 'selected']);

    // ลูปใส่ select ทีละ id
    const newUpdateSql = 'UPDATE stuShowcase SET `select` = ? WHERE id = ?';
    for (let id of ids) {
      await db.query(newUpdateSql, ['selected', id]);
    }

    res.status(200).json({ message: "Update Successful" });
  } catch (err) {
    console.error(`Error: ${err}`);
    res.status(500).json({ error: `Internal Server Error: ${err}` });
  }
});

// ---------------- Get by StudentID ----------------
router.get("/:studentID", authorize(["admin", "student"]), async (req, res) => {
  try {
    const { studentID } = req.params;
    const [rows] = await db.query("SELECT * FROM stuShowcase WHERE studentID = ?", [studentID]);

    // if (rows.length === 0) {
    //   return res.status(404).json({ success: false, message: `Not Found This User id: ${studentID}` });
    // }

    res.json(rows);
  } catch (err) {
    res.status(500).send(`Internal server error: ${err.message}`);
  }
});

// const MAX_FILE_SIZE = 500 * 1024; // 500KB
// ---------------- Create Showcase ----------------
router.post("/", authorize(["admin", "student"]), upload.single("image"), async (req, res) => {
  try {
    // console.log('req.body: ', req.body);
    // console.log('req.file: ', req.file);
    const { studentID, topic, description, fname, lname } = req.body;
    const image = req.file ? req.file.filename : null;

    // if (req.file && req.file.size > MAX_FILE_SIZE) {
    //   fs.unlinkSync(req.file.path);
    //   return res.status(400).send("Image size must be less than 500 KB");
    // }

    let imageBuffer = null;
    let mimeType = null;

    if (req.file) {
      imageBuffer = fs.readFileSync(req.file.path);
      mimeType = req.file.mimetype;
      fs.unlinkSync(req.file.path);
    }

    const [result] = await db.query(
      `INSERT INTO stuShowcase (
        studentID, 
        topic, 
        description,
        fname,
        lname,
        image, 
        image_data, 
        image_mime_type
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [studentID, topic, description, fname, lname, image, imageBuffer, mimeType]
    );

    res.status(200).send(`Insert ID: ${result.insertId}`);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).send(`Internal server error: ${err.message}`);
  }
});

// ---------------- Update Showcase ----------------
router.put("/:id", authorize(["admin", "student"]), upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { studentID, topic, description, fname, lname } = req.body;
    // console.log(req.body);

    if (!studentID || !topic || !description || !fname || !lname) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    let sql, params;

    if (req.file) {
      const imageBuffer = fs.readFileSync(req.file.path);
      const mimeType = req.file.mimetype;
      fs.unlinkSync(req.file.path);

      sql = "UPDATE stuShowcase SET topic = ?, description = ?, fname = ?, lname = ?, image_data = ?, image_mime_type = ? WHERE id = ?";
      params = [topic, description, fname, lname, imageBuffer, mimeType, id];
    } else {
      sql = "UPDATE stuShowcase SET topic = ?, description = ?, fname = ?, lname = ? WHERE id = ?";
      params = [topic, description, fname, lname, id];
    }

    const [result] = await db.query(sql, params);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Update Showcase Failed, Not found New Showcase" });
    }

    res.status(200).json({ message: "Update Successful" });
  } catch (err) {
    console.error(`Error: ${err}`);
    res.status(500).json({ error: `Internal Server Error: ${err}` });
  }
});

// ---------------- Delete Showcase ----------------
router.delete("/:id", authorize(["admin", "student"]), async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query("SELECT image FROM stuShowcase WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Image not found" });
    }

    const filename = rows[0].image;
    const filePath = path.join(imagePath, filename);

    const [result] = await db.query("DELETE FROM stuShowcase WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(400).json({ error: "Failed to delete data from database" });
    }

    try {
      await fs.promises.access(filePath, fs.constants.F_OK);
      await fs.promises.unlink(filePath);
    } catch (fileErr) {
      console.error(`File not found or failed to delete: ${filePath}, error: ${fileErr}`);
    }

    res.status(200).json({ message: "Delete Successful" });
  } catch (err) {
    console.error(`Error: ${err}`);
    res.status(500).json({ error: `Internal Server Error: ${err}` });
  }
});

module.exports = router;
