const router = require("express").Router();
const db = require("../../config/database");

// ------------------------------ header -----------------------------------------
router.get("/header", async (_, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM info_header");
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

router.post("/header", async (req, res) => {
  try {
    const {
      title_th,
      title_en,
      description,
      link_scholarship,
      link_apply_to_study,
    } = req.body;

    if (
      !title_th ||
      !title_en ||
      !description ||
      !link_scholarship ||
      !link_apply_to_study
    ) {
      return res.status(400).send("Missing required fields");
    }

    const [oldInfo] = await db.query("SELECT * FROM info_header");
    if (oldInfo.length > 0) {
      // If old data exists, delete it and insert new data
      await db.query("DELETE FROM info_header");

      const insertSql = `
        INSERT INTO info_header 
        (title_th, title_en, description, link_scholarship, link_apply_to_study) 
        VALUES (?, ?, ?, ?, ?)
      `;
      const insertValues = [
        title_th,
        title_en,
        description,
        link_scholarship,
        link_apply_to_study,
      ];

      const [result] = await db.query(insertSql, insertValues);
      if (result.affectedRows > 0) {
        return res
          .status(200)
          .send(
            `Update [Header] Information Successful, Insert ID: [${result.insertId}]`
          );
      } else {
        return res.status(404).send("Update [Header] Information Failed.");
      }
    } else {
      // If no data exists, insert new data
      const insertSql = `
        INSERT INTO info_header 
        (title_th, title_en, description, link_scholarship, link_apply_to_study) 
        VALUES (?, ?, ?, ?, ?)
      `;
      const insertValues = [
        title_th,
        title_en,
        description,
        link_scholarship,
        link_apply_to_study,
      ];

      const [result] = await db.query(insertSql, insertValues);
      if (result.affectedRows > 0) {
        return res
          .status(200)
          .send(
            `Insert [Header] Information Successful, Insert ID: [${result.insertId}]`
          );
      } else {
        return res.status(404).send("Insert [Header] Information Failed.");
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
});

// ------------------------------ highlight -----------------------------------------
router.get("/highlight", async (_, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM info_highlight");
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

router.post("/highlight", async (req, res) => {
  try {
    const { topic, description } = req.body;

    if (!topic || !description) {
      return res.status(400).send("Missing required fields");
    }

    const [oldInfo] = await db.query("SELECT * FROM info_highlight");
    if (oldInfo.length > 0) {
      // If old data exists, delete it and insert new data
      await db.query("DELETE FROM info_highlight");

      const insertSql = `
        INSERT INTO info_highlight 
        (topic, description) 
        VALUES (?, ?)
      `;
      const insertValues = [topic, description];

      const [result] = await db.query(insertSql, insertValues);
      if (result.affectedRows > 0) {
        return res
          .status(200)
          .send(
            `Update [Highlight] Information Successful, Insert ID: [${result.insertId}]`
          );
      } else {
        return res.status(404).send("Update [Highlight] Information Failed.");
      }
    } else {
      // If no data exists, insert new data
      const insertSql = `
        INSERT INTO info_highlight
        (topic, description) 
        VALUES (?, ?)
      `;
      const insertValues = [topic, description];

      const [result] = await db.query(insertSql, insertValues);
      if (result.affectedRows > 0) {
        return res
          .status(200)
          .send(
            `Insert [Highlight] Information Successful, Insert ID: [${result.insertId}]`
          );
      } else {
        return res.status(404).send("Insert [Highlight] Information Failed.");
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
});

// ------------------------------ showcase -----------------------------------------
router.get("/showcase", async (_, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM info_showcase");
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

router.post("/showcase", async (req, res) => {
  try {
    const { topic, description } = req.body;

    if (!topic || !description) {
      return res.status(400).send("Missing required fields");
    }

    const [oldInfo] = await db.query("SELECT * FROM info_showcase");
    if (oldInfo.length > 0) {
      // If old data exists, delete it and insert new data
      await db.query("DELETE FROM info_showcase");

      const insertSql = `
        INSERT INTO info_showcase 
        (topic, description) 
        VALUES (?, ?)
      `;
      const insertValues = [topic, description];

      const [result] = await db.query(insertSql, insertValues);
      if (result.affectedRows > 0) {
        return res
          .status(200)
          .send(
            `Update [Showcase] Information Successful, Insert ID: [${result.insertId}]`
          );
      } else {
        return res.status(404).send("Update [Showcase] Information Failed.");
      }
    } else {
      // If no data exists, insert new data
      const insertSql = `
        INSERT INTO info_showcase
        (topic, description) 
        VALUES (?, ?)
      `;
      const insertValues = [topic, description];

      const [result] = await db.query(insertSql, insertValues);
      if (result.affectedRows > 0) {
        return res
          .status(200)
          .send(
            `Insert [Showcase] Information Successful, Insert ID: [${result.insertId}]`
          );
      } else {
        return res.status(404).send("Insert [Showcase] Information Failed.");
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
});

// ------------------------------ showtiktok -----------------------------------------
router.get("/showTiktok", async (_, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM info_showTiktok");
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

router.post("/showTiktok", async (req, res) => {
  try {
    const { topic, description } = req.body;

    if (!topic || !description) {
      return res.status(400).send("Missing required fields");
    }

    const [oldInfo] = await db.query("SELECT * FROM info_showTiktok");
    if (oldInfo.length > 0) {
      // If old data exists, delete it and insert new data
      await db.query("DELETE FROM info_showTiktok");

      const insertSql = `
        INSERT INTO info_showTiktok 
        (topic, description) 
        VALUES (?, ?)
      `;
      const insertValues = [topic, description];

      const [result] = await db.query(insertSql, insertValues);
      if (result.affectedRows > 0) {
        return res
          .status(200)
          .send(
            `Update [ShowTiktok] Information Successful, Insert ID: [${result.insertId}]`
          );
      } else {
        return res.status(404).send("Update [ShowTiktok] Information Failed.");
      }
    } else {
      // If no data exists, insert new data
      const insertSql = `
        INSERT INTO info_showTiktok
        (topic, description) 
        VALUES (?, ?)
      `;
      const insertValues = [topic, description];

      const [result] = await db.query(insertSql, insertValues);
      if (result.affectedRows > 0) {
        return res
          .status(200)
          .send(
            `Insert [S] Information Successful, Insert ID: [${result.insertId}]`
          );
      } else {
        return res.status(404).send("Insert [ShowTiktok] Information Failed.");
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
});

// ------------------------------ showtiktok -----------------------------------------
router.get("/youtubeReview", async (_, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM info_youtube_review");
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

router.post("/youtubeReview", async (req, res) => {
  try {
    const { topic, description, embed } = req.body;

    if (!topic || !description || !embed) {
      return res.status(400).send("Missing required fields");
    }

    const [oldInfo] = await db.query("SELECT * FROM info_youtube_review");
    if (oldInfo.length > 0) {
      // If old data exists, delete it and insert new data
      await db.query("DELETE FROM info_youtube_review");

      const insertSql = `
        INSERT INTO info_youtube_review 
        (topic, description, embed) 
        VALUES (?, ?, ?)
      `;
      const insertValues = [topic, description, embed];

      const [result] = await db.query(insertSql, insertValues);
      if (result.affectedRows > 0) {
        return res
          .status(200)
          .send(
            `Update [Youtube-Review] Information Successful, Insert ID: [${result.insertId}]`
          );
      } else {
        return res.status(404).send("Update [Youtube-Review] Information Failed.");
      }
    } else {
      // If no data exists, insert new data
      const insertSql = `
        INSERT INTO info_youtube_review
        (topic, description, embed) 
        VALUES (?, ?, ?)
      `;
      const insertValues = [topic, description, embed];

      const [result] = await db.query(insertSql, insertValues);
      if (result.affectedRows > 0) {
        return res
          .status(200)
          .send(
            `Insert [Youtube-Review] Information Successful, Insert ID: [${result.insertId}]`
          );
      } else {
        return res.status(404).send("Insert [Youtube-Review] Information Failed.");
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
});

// ------------------------------ youtube -----------------------------------------
router.get("/youtube", async (_, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM info_youtube");
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

router.post("/youtube", async (req, res) => {
  try {
    const { topic, description } = req.body;

    if (!topic || !description) {
      return res.status(400).send("Missing required fields");
    }

    const [oldInfo] = await db.query("SELECT * FROM info_youtube");
    if (oldInfo.length > 0) {
      // If old data exists, delete it and insert new data
      await db.query("DELETE FROM info_youtube");

      const insertSql = `
        INSERT INTO info_youtube 
        (topic, description) 
        VALUES (?, ?)
      `;
      const insertValues = [topic, description];

      const [result] = await db.query(insertSql, insertValues);
      if (result.affectedRows > 0) {
        return res
          .status(200)
          .send(
            `Update [youtube] Information Successful, Insert ID: [${result.insertId}]`
          );
      } else {
        return res.status(404).send("Update [youtube] Information Failed.");
      }
    } else {
      // If no data exists, insert new data
      const insertSql = `
        INSERT INTO info_youtube
        (topic, description) 
        VALUES (?, ?)
      `;
      const insertValues = [topic, description];

      const [result] = await db.query(insertSql, insertValues);
      if (result.affectedRows > 0) {
        return res
          .status(200)
          .send(
            `Insert [youtube] Information Successful, Insert ID: [${result.insertId}]`
          );
      } else {
        return res.status(404).send("Insert [youtube] Information Failed.");
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
});

// ------------------------------ study-plan -----------------------------------------
router.get("/studyPlan", async (_, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM info_studyPlan");
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

router.post("/studyPlan", async (req, res) => {
  try {
    const { topic, description1, description2 } = req.body;

    // console.log(req.body);

    if (!topic || !description1 || !description2) {
      return res.status(400).send("Missing required fields");
    }

    const [oldInfo] = await db.query("SELECT * FROM info_studyPlan");
    if (oldInfo.length > 0) {
      // If old data exists, delete it and insert new data
      await db.query("DELETE FROM info_studyPlan");

      const insertSql = `
        INSERT INTO info_studyPlan 
        (topic, description1, description2) 
        VALUES (?, ?, ?)
      `;
      const insertValues = [topic, description1, description2];

      const [result] = await db.query(insertSql, insertValues);
      if (result.affectedRows > 0) {
        return res
          .status(200)
          .send(
            `Update [Study-Plan] Information Successful, Insert ID: [${result.insertId}]`
          );
      } else {
        return res.status(404).send("Update [Study-Plan] Information Failed.");
      }
    } else {
      // If no data exists, insert new data
      const insertSql = `
        INSERT INTO info_studyPlan
        (topic, description1, description2) 
        VALUES (?, ?, ?)
      `;
      const insertValues = [topic, description1, description2];

      const [result] = await db.query(insertSql, insertValues);
      if (result.affectedRows > 0) {
        return res
          .status(200)
          .send(
            `Insert [Study-Plan] Information Successful, Insert ID: [${result.insertId}]`
          );
      } else {
        return res.status(404).send("Insert [Study-Plan] Information Failed.");
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
});

// ------------------------------ career-path -----------------------------------------
router.get("/careerPath", async (_, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM info_careerPath");
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

router.post("/careerPath", async (req, res) => {
  try {
    const { careerPaths, careerDescs } = req.body;
    // console.log(careerPaths);

    if (!careerPaths || !careerDescs) {
      return res.status(400).send("Missing required fields");
    }

    const [oldInfo] = await db.query("SELECT * FROM info_careerPath");

    if (oldInfo.length > 0) {
      await db.query("DELETE FROM info_careerPath");

      const insertSql = `
        INSERT INTO info_careerPath (careerPaths, careerDescs) 
        VALUES (?, ?)
      `;
      const insertValues = [careerPaths, careerDescs];

      const [result] = await db.query(insertSql, insertValues);
      if (result.affectedRows > 0) {
        return res.status(200).send(
          `Update [careerPaths, careerDescs] Information Successful, Insert ID: [${result.insertId}]`
        );
      } else {
        return res.status(404).send("Update [careerPaths, careerDescs] Information Failed.");
      }
    } else {
      const insertSql = `
        INSERT INTO info_careerPath (careerPaths, careerDescs) 
        VALUES (?, ?)
      `;
      const insertValues = [careerPaths, careerDescs];

      const [result] = await db.query(insertSql, insertValues);
      if (result.affectedRows > 0) {
        return res.status(200).send(
          `Insert [careerPaths, careerDescs] Information Successful, Insert ID: [${result.insertId}]`
        );
      } else {
        return res.status(404).send("Insert [careerPaths] Information Failed.");
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
});

// ------------------------------ degree / DateTime -----------------------------------------
router.get("/degree", async (_, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM info_degree");
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

router.post("/degree", async (req, res) => {
  try {
    const { thDegree, thAbbre, enDegree, enAbbre, studyDateTime } = req.body;

    if (!thDegree || !thAbbre || !enDegree || !enAbbre || !studyDateTime) {
      return res.status(400).send("Missing required fields");
    }

    const [oldInfo] = await db.query("SELECT * FROM info_degree");
    if (oldInfo.length > 0) {
      await db.query("DELETE FROM info_degree");

      const insertSql = `
        INSERT INTO info_degree 
        (thDegree, thAbbre, enDegree, enAbbre, studyDateTime) 
        VALUES (?, ?, ?, ?, ?)
      `;
      const insertValues = [
        thDegree,
        thAbbre,
        enDegree,
        enAbbre,
        studyDateTime,
      ];

      const [result] = await db.query(insertSql, insertValues);
      if (result.affectedRows > 0) {
        return res
          .status(200)
          .send(
            `Update [Degree] Information Successful, Insert ID: [${result.insertId}]`
          );
      } else {
        return res.status(404).send("Update [Degree] Information Failed.");
      }
    } else {
      // If no data exists, insert new data
      const insertSql = `
        INSERT INTO info_degree 
        (thDegree, thAbbre, enDegree, enAbbre, studyDateTime) 
        VALUES (?, ?, ?, ?, ?)
      `;
      const insertValues = [
        thDegree,
        thAbbre,
        enDegree,
        enAbbre,
        studyDateTime,
      ];

      const [result] = await db.query(insertSql, insertValues);
      if (result.affectedRows > 0) {
        return res
          .status(200)
          .send(
            `Insert [Degree] Information Successful, Insert ID: [${result.insertId}]`
          );
      } else {
        return res.status(404).send("Insert [Degree] Information Failed.");
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
});

// ------------------------------ ourTeam -----------------------------------------
router.get("/ourTeam", async (_, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM info_ourTeam");
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

router.post("/ourTeam", async (req, res) => {
  try {
    const { topic, description } = req.body;

    if (!topic || !description) {
      return res.status(400).send("Missing required fields");
    }

    const [oldInfo] = await db.query("SELECT * FROM info_ourTeam");
    if (oldInfo.length > 0) {
      // If old data exists, delete it and insert new data
      await db.query("DELETE FROM info_ourTeam");

      const insertSql = `
        INSERT INTO info_ourTeam
        (topic, description) 
        VALUES (?, ?)
      `;
      const insertValues = [topic, description];

      const [result] = await db.query(insertSql, insertValues);
      if (result.affectedRows > 0) {
        return res
          .status(200)
          .send(
            `Update [OurTeam] Information Successful, Insert ID: [${result.insertId}]`
          );
      } else {
        return res.status(404).send("Update [OurTeam] Information Failed.");
      }
    } else {
      // If no data exists, insert new data
      const insertSql = `
        INSERT INTO info_ourTeam
        (topic, description) 
        VALUES (?, ?)
      `;
      const insertValues = [topic, description];

      const [result] = await db.query(insertSql, insertValues);
      if (result.affectedRows > 0) {
        return res
          .status(200)
          .send(
            `Insert [OurTeam] Information Successful, Insert ID: [${result.insertId}]`
          );
      } else {
        return res.status(404).send("Insert [OurTeam] Information Failed.");
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
});

// ------------------------------ contact -----------------------------------------
router.get("/contact", async (_, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM info_contact");
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

router.post("/contact", async (req, res) => {
  try {
    const { topic, description, address, mobile, available, email, facebook, tiktok } = req.body;

    // console.log(req.body);
    
    if (!topic || !description || !address || !mobile || !available || !email || !facebook || !tiktok) {
      return res.status(400).send("Missing required fields");
    }

    const [oldInfo] = await db.query("SELECT * FROM info_contact");
    if (oldInfo.length > 0) {
      // If old data exists, delete it and insert new data
      await db.query("DELETE FROM info_contact");

      const insertSql = `
        INSERT INTO info_contact
        (topic, description, address, mobile, available, email, facebook, tiktok) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const insertValues = [
        topic,
        description,
        address,
        mobile,
        available,
        email,
        facebook, 
        tiktok
      ];

      const [result] = await db.query(insertSql, insertValues);
      if (result.affectedRows > 0) {
        return res
          .status(200)
          .send(
            `Update [Contact] Information Successful, Insert ID: [${result.insertId}]`
          );
      } else {
        return res.status(404).send("Update [Contact] Information Failed.");
      }
    } else {
      // If no data exists, insert new data
      const insertSql = `
        INSERT INTO info_contact
        (topic, description, address, mobile, available, email, facebook, tiktok) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const insertValues = [
        topic,
        description,
        address,
        mobile,
        available,
        email,
        facebook, 
        tiktok
      ];

      const [result] = await db.query(insertSql, insertValues);
      if (result.affectedRows > 0) {
        return res
          .status(200)
          .send(
            `Insert [Contact] Information Successful, Insert ID: [${result.insertId}]`
          );
      } else {
        return res.status(404).send("Insert [Contact] Information Failed.");
      }
    }
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
