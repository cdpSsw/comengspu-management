const router = require("express").Router();
const authorize = require("../middleware/authorize");
const db = require("../../config/database");

const path = require("path");
const fs = require("fs");
const multer = require("multer");

const dir = path.join(process.cwd(), "public", "images", "tools");
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const imagePath = path.join(process.cwd(), "public", "images", "tools");
const imagePathBorrowHist = path.join(imagePath, "BorrowHistory");
const imagePathReturnHist = path.join(imagePath, "ReturnHistory");

// ตรวจสอบและสร้างโฟลเดอร์ทั้งหมด
[imagePath, imagePathBorrowHist, imagePathReturnHist].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    return cb(null, imagePath);
  },
  filename: (_, file, cb) => {
    const randomString = Math.random().toString(36).substring(2, 15);
    const timestamp = Date.now();
    const fileName = `${timestamp}_${randomString}_${file.originalname}`;
    return cb(null, fileName);
  },
});

const storageBorrowHist = multer.diskStorage({
  destination: (_, __, cb) => {
    return cb(null, imagePathBorrowHist);
  },
  filename: (_, file, cb) => {
    const randomString = Math.random().toString(36).substring(2, 15);
    const timestamp = Date.now();
    const fileName = `${timestamp}_${randomString}_${file.originalname}`;
    return cb(null, fileName);
  },
});

const storageReturnHist = multer.diskStorage({
  destination: (_, __, cb) => {
    return cb(null, imagePathReturnHist);
  },
  filename: (_, file, cb) => {
    const randomString = Math.random().toString(36).substring(2, 15);
    const timestamp = Date.now();
    const fileName = `${timestamp}_${randomString}_${file.originalname}`;
    return cb(null, fileName);
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

const uploadBorrowHist = multer({
  storage: storageBorrowHist,
  fileFilter: (_, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"));
    }
    cb(null, true);
  },
});

const uploadReturnHist = multer({
  storage: storageReturnHist,
  fileFilter: (_, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"));
    }
    cb(null, true);
  },
});

router.get("/", async (_, res) => {
  try {
    const [result] = await db.query(`SELECT * FROM tools`);
    res.send(result);
  } catch (err) {
    console.error(`Error getting tools: ${err}`);
    res.status(500).send(`Error getting tools`);
  }
});

router.get("/images", async (_, res) => {
  try {
    const [results] = await db.query(
      `SELECT id, img1_data, img1_type, img2_data, img2_type, img3_data, img3_type, img4_data, img4_type FROM tools`
    );

    if (results.length === 0) {
      return res.status(200).json([]);
    }

    const images = results.map((row) => {
      const imgs = [];

      for (let i = 1; i <= 4; i++) {
        const data = row[`img${i}_data`];
        const type = row[`img${i}_type`];

        if (data && type) {
          imgs.push(`data:${type};base64,${data.toString("base64")}`);
        }
      }

      return {
        id: row.id,
        images: imgs,
      };
    });

    res.send(images);

  } catch (err) {
    console.error(err);
    res.status(500).send(`Internal server error: ${err.message}`);
  }
});

router.post(
  "/",
  authorize(["admin"]),
  upload.fields([
    { name: "img1", maxCount: 1 },
    { name: "img2", maxCount: 1 },
    { name: "img3", maxCount: 1 },
    { name: "img4", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { toolCode, name, description, quantity, available } = req.body;
      // console.log(req.body);
      // console.log(req.files);

      let imageBuffers = {};
      let mimeTypes = {};

      ["img1", "img2", "img3", "img4"].forEach((key) => {
        const file = req.files[key]?.[0];
        if (file) {
          const buffer = fs.readFileSync(file.path);
          imageBuffers[key] = buffer;
          mimeTypes[key] = file.mimetype;
          fs.unlinkSync(file.path);
        }
      });

      const insertSql = `INSERT INTO tools (
          toolCode,
          name, 
          description, 
          quantity, 
          available, 
          img1_data, 
          img1_type,
          img2_data, 
          img2_type,
          img3_data, 
          img3_type,
          img4_data, 
          img4_type
        )
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const values = [
        toolCode,
        name,
        description,
        quantity,
        available,
        imageBuffers["img1"] || null,
        mimeTypes["img1"] || null,
        imageBuffers["img2"] || null,
        mimeTypes["img2"] || null,
        imageBuffers["img3"] || null,
        mimeTypes["img3"] || null,
        imageBuffers["img4"] || null,
        mimeTypes["img4"] || null,
      ];

      const [result] = await db.query(insertSql, values);
      res.json({ insertId: result.insertId });

    } catch (err) {
      console.error(`Error inserting tools: ${err}`);
      res.status(500).send(`Error inserting tools`);
    }
  }
);

router.put(
  "/:id",
  authorize(["admin"]),
  upload.fields([
    { name: "img1", maxCount: 1 },
    { name: "img2", maxCount: 1 },
    { name: "img3", maxCount: 1 },
    { name: "img4", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, quantity, available } = req.body;

      if (!name || !description || !quantity) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // เตรียมเก็บ buffer กับ mime type
      const imageBuffers = {};
      const mimeTypes = {};

      // อ่านไฟล์ภาพที่ถูกอัปโหลด
      ["img1", "img2", "img3", "img4"].forEach((key) => {
        const file = req.files?.[key]?.[0];
        if (file) {
          imageBuffers[key] = fs.readFileSync(file.path);
          mimeTypes[key] = file.mimetype;
          fs.unlinkSync(file.path);
        }
      });

      let updateSQL = `UPDATE tools SET name = ?, description = ?, quantity = ?, available = ?`;
      let updateParams = [name, description, quantity, available];
      let paramIndex = 5;

      ["img1", "img2", "img3", "img4"].forEach((key, i) => {
        if (imageBuffers[key]) {
          updateSQL += `, ${key}_data = ?, ${key}_type = ?`;
          updateParams.push(imageBuffers[key], mimeTypes[key]);
          paramIndex += 2;
        }
      });

      updateSQL += ` WHERE id = ?`;
      updateParams.push(id);

      const [result] = await db.query(updateSQL, updateParams);

      if (result.affectedRows > 0) {
        return res.status(200).json({ message: "Update Successful" });

      } else {
        return res.status(400).json({ message: "Update failed" });
      }
    } catch (err) {
      console.error(`Error: ${err}`);
      return res.status(500).json({ error: `Internal Server Error: ${err}` });
    }
  }
);

router.delete("/:id", authorize(["admin"]), async (req, res) => {
  try {
    const { id } = req.params;

    const checkSql = `SELECT id FROM tools WHERE id = ?`;
    const [checkResult] = await db.query(checkSql, [id]);

    if (checkResult.length === 0) {
      return res.status(404).json({ error: "Data not found" });
    }

    const deleteSql = `DELETE FROM tools WHERE id = ?`;
    const [deleteResult] = await db.query(deleteSql, [id]);

    if (deleteResult.affectedRows === 0) {
      return res.status(400).json({ error: "Failed to delete from database" });
    } else {
      return res.status(200).json({ message: "Delete Successful" });
    }

  } catch (err) {
    console.error(`Error: ${err}`);
    return res.status(500).json({ error: `Internal Server Error: ${err}` });
  }
});

// ----------------------------------- student (borrow) ---------------------------------------
router.put(
  "/borrow/:id",
  authorize(["admin", "student"]),
  uploadBorrowHist.array("imgsBefore", 4),
  async (req, res) => {
    // console.log('Borrow Click!');
    // console.log(`Borrow: ${JSON.stringify(req.body)}`);

    try {
      const { id } = req.params;
      const { toolCode, borrowCode, studentID, toolName, borrowCount } = req.body;
      const count = Number(borrowCount);

      if (isNaN(count) || count < 1) {
        return res.status(400).send("Invalid borrow count.");
      }

      if (!Array.isArray(req.files)) {
        console.error("No files uploaded or multer config error");
        return res.status(400).send("No images uploaded");
      }

      const quantitySql = `SELECT quantity, available FROM tools WHERE id = ?`;
      const [quantityResult] = await db.query(quantitySql, [id]);

      const currentAvailable = quantityResult[0]?.available;

      if (currentAvailable === undefined) {
        return res.status(404).send("Tool not found.");
      }

      const newAvailable = currentAvailable - count;

      if (newAvailable < 0) {
        return res.status(400).send("Not enough tools available.");
      }

      // อัปเดตจำนวนอุปกรณ์
      const updateAvailableSql = `UPDATE tools SET available = ? WHERE id = ?`;
      const availableValues = [newAvailable, id];
      await db.query(updateAvailableSql, availableValues);

      // เตรียมรูปภาพ (เก็บสูงสุด 4 รูปใน column img1 - img4 + mimetype)
      const imageBuffers = [];
      const mimeTypes = [];

      for (let i = 0; i < 4; i++) {
        const file = req.files[i];
        if (file) {
          const buffer = fs.readFileSync(file.path);
          imageBuffers[i] = buffer;
          mimeTypes[i] = file.mimetype;
          fs.unlinkSync(file.path);
        } else {
          imageBuffers[i] = null;
          mimeTypes[i] = null;
        }
      }

      // บันทึกประวัติการยืม
      const insertBorrowSql = `INSERT INTO toolsBorrowHistory 
          (
            toolCode,
            borrowCode, 
            studentID, 
            toolName, 
            quantity, 
            img1_data, 
            img1_type, 
            img2_data, 
            img2_type, 
            img3_data, 
            img3_type, 
            img4_data, 
            img4_type
          )
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const borrowValues = [
        toolCode,
        borrowCode,
        studentID,
        toolName,
        count,
        imageBuffers[0],
        mimeTypes[0],
        imageBuffers[1],
        mimeTypes[1],
        imageBuffers[2],
        mimeTypes[2],
        imageBuffers[3],
        mimeTypes[3],
      ];
      await db.query(insertBorrowSql, borrowValues);
      return res.status(200).json({ message: "Borrowed successfully" });

    } catch (err) {
      console.error("Borrowing error:", err);
      return res.status(500).send(`Internal server error: ${err.message}`);
    }
  }
);

// ----------------------------------- student (return) ---------------------------------------
router.put(
  "/return/:id",
  authorize(["admin", "student"]),
  uploadReturnHist.array("imgsAfter", 4),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { toolCode, returnCode, studentID, toolName, returnCount } = req.body;
      const count = Number(returnCount);

      if (isNaN(count) || count < 1) {
        return res.status(400).send("Invalid return count.");
      }

      const quantitySql = `SELECT quantity, available FROM tools WHERE id = ?`;
      const [quantityResult] = await db.query(quantitySql, [id]);
      const currentAvailable = quantityResult[0]?.available;

      if (currentAvailable === undefined) {
        return res.status(404).send("Tool not found.");
      }

      const newAvailable = currentAvailable + count;

      // อัปเดตจำนวนอุปกรณ์
      const updateAvailableSql = `UPDATE tools SET available = ? WHERE id = ?`;
      const availableValues = [newAvailable, id];
      await db.query(updateAvailableSql, availableValues);

      // เตรียมรูปภาพ (เก็บสูงสุด 4 รูปใน column img1 - img4 + mimetype)
      const imageBuffers = [];
      const mimeTypes = [];

      for (let i = 0; i < 4; i++) {
        const file = req.files[i];
        if (file) {
          const buffer = fs.readFileSync(file.path);
          imageBuffers[i] = buffer;
          mimeTypes[i] = file.mimetype;
          fs.unlinkSync(file.path);
        } else {
          imageBuffers[i] = null;
          mimeTypes[i] = null;
        }
      }

      // บันทึกประวัติการคืน
      const insertReturnSql = `INSERT INTO toolsReturnHistory 
          (
            toolCode,
            returnCode, 
            studentID, 
            toolName, 
            quantity, 
            img1_data, 
            img1_type, 
            img2_data, 
            img2_type, 
            img3_data, 
            img3_type, 
            img4_data, 
            img4_type
          )
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const returnValues = [
        toolCode,
        returnCode,
        studentID,
        toolName,
        count,
        imageBuffers[0],
        mimeTypes[0],
        imageBuffers[1],
        mimeTypes[1],
        imageBuffers[2],
        mimeTypes[2],
        imageBuffers[3],
        mimeTypes[3],
      ];

      await db.query(insertReturnSql, returnValues);
      return res.status(200).json({ message: "Returned successfully" });

    } catch (err) {
      console.error("Returning error:", err);
      return res.status(500).send(`Internal server error: ${err.message}`);
    }
  }
);

module.exports = router;
