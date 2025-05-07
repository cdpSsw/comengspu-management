const router = require("express").Router();
const db = require('../../config/database');

// ---------------------------- personal information ------------------------------
router.get('/:studentID', async (req, res) => {
    try {
        const { studentID } = req.params;
        if (!studentID) return res.status(400).send("studentID is required");
        
        const selectSql = `SELECT * FROM users WHERE studentID = $1`
        const result = await db.query(selectSql, [studentID]);
        res.status(200).json(result.rows);

    } catch (err) {
        res.status(500).send(`Internal server error: ${err.message}`);
    }
});

module.exports = router;