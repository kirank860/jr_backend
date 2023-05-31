const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");

// load env vars
dotenv.config({ path: "./config/.env" });

const app = express();

const allowedOrigins = ["http://localhost:3000"];

// cors policy
app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

// connect to database
connectDB();

// static directory
app.use("/images", express.static("./public/user"));
app.use("/images", express.static("./public/franchiseLogo"));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route files
const auth = require("./routes/auth");
const menu = require("./routes/menu");
const user = require("./routes/user");
const userRole = require("./routes/userRole");
const franchise = require("./routes/franchise");
const aboutus = require("./routes/aboutUs");
const contactUs = require("./routes/contactUs");
const ourSpeciality = require("./routes/ourSpeciality");
const testimonial = require("./routes/testimonial");

// mount routers
app.use("/api/V1/auth", auth);
app.use("/api/v1/menu", menu);
app.use("/api/v1/user", user);
app.use("/api/v1/user-role", userRole);
app.use("/api/v1/franchise", franchise);
app.use("/api/v1/about-us", aboutus);
app.use("/api/v1/contact-us", contactUs);
app.use("/api/v1/our-speciality", ourSpeciality);
app.use("/api/v1/testimonial", testimonial);

const PORT = process.env.PORT || 8050;
app.listen(PORT, console.log(`port is running ${PORT}`));