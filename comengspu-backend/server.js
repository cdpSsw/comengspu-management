const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const db = require("./config/database");

require("dotenv").config();
const https = require('https');
const fs = require('fs');
const path = require('path');
const port = 8081;

// API----------------------------------------------------------------------------------------------
// admin
const info = require('./api/admin/info');
const tools = require('./api/borrowReturn/tools');
const toolsHistory = require('./api/borrowReturn/toolsHistory');
const teams = require('./api/admin/team');
const contact = require('./api/pages/contact');

// ,,, SignInUpOut
const SignIn = require('./api/SignInUpOut/SignIn');
const SignUp = require('./api/SignInUpOut/SignUp');
const SignOut = require('./api/SignInUpOut/SignOut');

// ... Student
// student
// const stu_main = require('./api/student/Stu_Main');
const stu_showcase = require('./api/student/pages/Stu_Showcase');
const stu_showtiktok = require('./api/student/pages/Stu_ShowTiktok');
const stu_youtube = require('./api/student/pages/Stu_Youtube');

const app = express();
app.use(cookieParser());
app.use(cors({
  origin: ["https://comengspu.com", "http://localhost:5173"],
  // origin: "http://localhost:5173",
  credentials: true,
}));

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/api.comengspu.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/api.comengspu.com/fullchain.pem'),
};

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.get("/", (_, res) => {
  res.send("Hello Worlds!");
});

// app.use((req, res, next) => {
//   console.log("🧪 Cookies received:", req.cookies.token);
//   next();
// });

// .... admininfo_header
app.use('/info', info);
app.use('/tools', tools);
app.use('/tools/history', toolsHistory);
app.use('/teams', teams);
app.use('/contact', contact);

// ,,, SignInUpOut
app.use('/SignIn', SignIn);
app.use('/SignUp', SignUp);
app.use('/SignOut', SignOut);

// ... student [ +admin ]
// app.use('/student', stu_main);
app.use('/studentShowcase', stu_showcase);
app.use('/studentShowTiktok', stu_showtiktok);
app.use('/studentYoutube', stu_youtube);

https.createServer(options, app).listen(port, async () => {
  try {
    console.log("Attempting to connect to MySQL...");
    console.log(`✅ MySQL connected`);
    console.log(`🚀 Server is running on port: ${port}`);

  } catch (err) {
    console.error("❌ Error starting the app: ", err);
  }
});
