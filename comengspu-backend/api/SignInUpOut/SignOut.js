const router = require("express").Router();

router.post("/", (_, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
  });

  res.status(200).json({ message: "Signed out successfully" });
});

module.exports = router;
