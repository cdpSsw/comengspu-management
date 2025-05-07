const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.JWT_SECRET || 'aaa7c4f04c6104474a9b30cfc558000b4e3dafa0b0be7b81921b244af1d50ae8bf96e2d37a385d341d19a269db60f3b7a71e5ff40a6a53e494dda783dbeb0d47b5f2fa557965643cadc32e396a8ac518113192fea8d2b2533a6b5fe3589b17dee94b95d765c9df6fc5796b2821490d3f4b8228f82e9c88a3b86496ae24ce08dc6ce4dd38442598512ff08d1d860f4a7ac9875353993c32c14f2beb9791e4a52c98771964e4dcf37c4f83c68585b266a2f4d7a93d334967168b5ce9ca659182338c9eb75a44ce435779f7ecd91f155571e72d8a972cd7426cac7d226c3a5cb04e';

const authorize = (roles) => {
  return (req, res, next) => {
    const token = req.cookies.token;
    // console.log("Token from cookie:", token);

    if (!token) {
      console.error("No token found in cookies.");
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      // ตรวจสอบและ Decode Token
      const decoded = jwt.verify(token, SECRET_KEY);
      // console.log("Decoded Token:", decoded);

      // เช็ค Role ว่าตรงกับที่กำหนดใน middleware หรือไม่
      if (!roles.includes(decoded.role)) {
        console.warn("🔴 Forbidden: Role does not match.");
        return res.status(403).json({ message: "Forbidden" });
      }

      req.user = decoded; // เก็บข้อมูลผู้ใช้ใน request object
      next(); // ถ้า Token และ Role ผ่านก็ให้ไปที่ route ต่อไป
    } catch (err) {
      // เช็คว่าเกิดข้อผิดพลาดจาก Token หมดอายุหรือไม่
      if (err.name === "TokenExpiredError") {
        console.error("🔴 JWT Token Expired:", err.message);
        return res
          .status(401)
          .json({ message: "Session expired. Please login again." });
      } else {
        console.error("🔴 JWT Verification Error:", err.message);
        return res.status(401).json({ message: "Invalid or Expired Token" });
      }
    }
  };
};

module.exports = authorize;
