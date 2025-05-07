const authorize = require("../middleware/authorize");
const router = require("express").Router();
const db = require("../../config/database");

const extractImages = (row) => {
  const imgs = [];
  for (let i = 1; i <= 4; i++) {
    const data = row[`img${i}_data`];
    const type = row[`img${i}_type`];
    if (data && type) {
      imgs.push(`data:${type};base64,${data.toString("base64")}`);
    }
  }
  return imgs;
};

// ----------------------------------- delete history ---------------------------------------
router.delete("/:toolCode", authorize(["admin"]), async (req, res) => {
  // console.log('delete func, cliecked!')
  try {
    const { toolCode } = req.params;
    // console.log('🧪 Deleting tool history for: ', req.params);

    const deleteBorrowSql = `DELETE FROM toolsBorrowHistory WHERE toolCode = ?`;
    const [deleteBorrowResult] = await db.query(deleteBorrowSql, [toolCode]);

    if (deleteBorrowResult.affectedRows === 0) {
      return res.status(400).json({ error: "Failed to delete from database" });
    } else {
      
      const deleteReturnSql = `DELETE FROM toolsReturnHistory WHERE toolCode = ?`;
      const [deleteReturnResult] = await db.query(deleteReturnSql, [toolCode]);

      if (deleteReturnResult.affectedRows === 0) {
        return res.status(400).json({ error: "Failed to delete from database" });
      } else {
        return res.status(200).json({ message: "Delete Successful" });
      }
    }

  } catch (err) {
    console.error(`Error: ${err}`);
    return res.status(500).json({ error: `Internal Server Error: ${err}` });
  }
});

// ----------------------------------- student (borrow) ---------------------------------------
router.get("/borrow", async (_, res) => {
  try {
    const [result] = await db.query("SELECT * FROM toolsBorrowHistory");
    res.send(result);

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
  }
});

router.get("/borrow/images", async (_, res) => {
  try {
    const [results] = await db.query(
      `SELECT id, borrowCode, img1_data, img1_type, img2_data, img2_type, img3_data, img3_type, img4_data, img4_type FROM toolsBorrowHistory`
    );

    const images = results.map((row) => ({
      id: row.id,
      images: extractImages(row),
    }));    

    res.send(images);
  } catch (err) {
    console.error(err);
    res.status(500).send(`Internal server error: ${err.message}`);
  }
});

// ----------------------------------- student (return) ---------------------------------------
router.get("/return", async (_, res) => {
  try {
    const [result] = await db.query(`SELECT * FROM toolsReturnHistory`);
    res.json(result);

  } catch (err) {
    console.error(`Error getting toolsReturnHistory: ${err}`);
    res.status(500).send(`Error getting toolsReturnHistory`);
  }
});

router.get("/return/images", async (_, res) => {
  try {
    const [results] = await db.query(
      `SELECT id, returnCode, img1_data, img1_type, img2_data, img2_type, img3_data, img3_type, img4_data, img4_type FROM toolsReturnHistory`
    );

    const images = results.map((row) => ({
      id: row.id,
      images: extractImages(row),
    }));

    res.send(images);
  } catch (err) {
    console.error(err);
    res.status(500).send(`Internal server error: ${err.message}`);
  }
});

module.exports = router;
