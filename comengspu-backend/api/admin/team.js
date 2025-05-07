const router = require("express").Router();
const authorize = require("../middleware/authorize");
const db = require("../../config/database");

const path = require("path");
const fs = require("fs");
const multer = require("multer");

const imagePath = path.join(process.cwd(), "public", "images", "teams");
if (!fs.existsSync(imagePath)) {
  fs.mkdirSync(imagePath, { recursive: true });
}

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

const upload = multer({
  storage,
  fileFilter: (_, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"));
    }
    cb(null, true);
  },
});

// ---------------------- GET INFORMATION ---------------------------------------
router.get("/", async (_, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM ourTeam");
    res.send(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
});

// ---------------------- GET TEAM IMAGES ---------------------------------------
router.get("/images", async (_, res) => {
  try {
    const ourTeamImageSql = "SELECT id, image_data, image_mime_type FROM ourTeam"
    const [ourTeamImageResult] = await db.query(ourTeamImageSql, ['ourTeam']);

    if (ourTeamImageResult.length === 0) {
      return res.status(404).json({ success: false, message: "ourTeam Showcase (Images) not found." });
    }

    const images = ourTeamImageResult.map((row) => ({
      id: row.id,
      image: `data:${row.image_mime_type};base64,${row.image_data.toString("base64")}`,
    }));

    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(500).send(`Internal server error: ${err.message}`);
  }
});

// ---------------------- POST NEW TEAM MEMBER ---------------------------------------
router.post(
  "/",
  authorize(["admin"]),
  upload.single("image"),
  async (req, res) => {
    try {
      const {
        position,
        name,
        tel,
        email,
        website,
        education,
        expertise,
        expLocation,
        expPosition,
        research,
      } = req.body;
      console.log(req.body);
      
      const image = req.file ? req.file.filename : null;

      if (
        !position ||
        !name ||
        !tel ||
        !email ||
        !website ||
        !education ||
        !expertise ||
        !expLocation ||
        !expPosition ||
        !research
      ) {
        return res.status(400).send("Missing required fields");
      }

      let imageBuffer = null;
      let mimeType = null;

      if (req.file) {
        imageBuffer = fs.readFileSync(req.file.path);
        mimeType = req.file.mimetype;

        fs.unlinkSync(req.file.path);
      }

      const insertSql = `INSERT INTO ourTeam (position, name, tel, email, website, education, expertise, expLocation, expPosition, research, image, image_data, image_mime_type) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const insertValues = [
        position,
        name,
        tel,
        email,
        website,
        education,
        expertise,
        expLocation,
        expPosition,
        research,
        image,
        imageBuffer,
        mimeType,
      ];

      const result = await db.query(insertSql, insertValues);
      res.status(200).send(`Insert ID: ${result.insertId}`);
    } catch (err) {
      console.error(`Internal Server ${err}`);
      return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
  }
);

// ---------------------- PUT MEMBER --------------------------------------------------
router.put(
  "/:id",
  authorize(["admin"]),
  upload.single("image"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const {
        position,
        name,
        tel,
        email,
        website,
        education,
        expertise,
        expLocation,
        expPosition,
        research,
      } = req.body;

      if (
        !position ||
        !name ||
        !tel ||
        !email ||
        !website ||
        !education ||
        !expertise ||
        !expLocation ||
        !expPosition ||
        !research
      ) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const existingActivitySql = `SELECT image FROM ourTeam WHERE id = ?`;
      const [existingActivityResult] = await db.query(existingActivitySql, [
        id,
      ]);
      if (existingActivityResult.length === 0) {
        return res.status(404).json({ error: "Member not found" });

      } else {
        const oldImage = existingActivityResult[0].image;
        const newImage = req.file ? req.file.filename : oldImage;

        const updateSql = `
          UPDATE ourTeam SET 
            position = ?, 
            name = ?, 
            tel = ?, 
            email = ?, 
            website = ?, 
            education = ?, 
            expertise = ?, 
            expLocation = ?, 
            expPosition = ?, 
            research = ?, 
            image = ? 
          WHERE id = ?
        `;
        const updateValues = [
          position,
          name,
          tel,
          email,
          website,
          education,
          expertise,
          expLocation,
          expPosition,
          research,
          newImage,
          id,
        ];

        const updateResult = await db.query(updateSql, updateValues);
        if (updateResult.affectedRows > 0) {
          // ลบรูปเก่าถ้ามีอัปโหลดใหม่
          if (req.file && oldImage) {
            const oldFilePath = path.join(imagePath, oldImage);
            fs.promises
              .access(oldFilePath, fs.constants.F_OK)
              .then(() => fs.promises.unlink(oldFilePath))
              .then(() => console.log(`Deleted old image: ${oldImage}`))
              .catch((err) =>
                console.error(`Failed to delete old image: ${err}`)
              );
          }
        }

        if (req.file) {
          const imageBuffer = fs.readFileSync(req.file.path);
          const mimeType = req.file.mimetype;
        
          await db.query(
            `UPDATE ourTeam SET image_data = ?, image_mime_type = ? WHERE id = ?`,
            [imageBuffer, mimeType, id]
          );
        
          // ลบไฟล์หลังจากอ่านเข้า buffer
          fs.unlinkSync(req.file.path);
        }
        
      }
      return res.status(200).json({ message: "Update Successful" });
    } catch (err) {
      console.error(`Internal Server ${err}`);
      return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
  }
);

router.delete("/:id", authorize(["admin"]), async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(`SELECT image FROM ourTeam WHERE id = ?`, [id]);
    if (rows.length === 0) return res.status(404).json({ message: "Member not found" });

    const oldImage = rows[0].image;
    await db.query(`DELETE FROM ourTeam WHERE id = ?`, [id]);

    if (oldImage) {
      const oldPath = path.join(imagePath, oldImage);
      fs.promises.unlink(oldPath).catch(() => {});
    }

    res.status(200).json({ message: "Member deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

module.exports = router;
