const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");
const multer = require("multer");

const errorController = require("./controllers/error");
const Staff = require("./models/staff");

const staffRoutes = require("./routes/staff");
const authRoutes = require("./routes/auth");
const managerRoutes = require("./routes/manager");

const MONGODB_URI =
  "mongodb+srv://nodejs:nodejs12345@cluster0.wyrbn.mongodb.net/Staffs";

const PORT = 3000;

const app = express();

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "session"
});

const csrfProtection = csrf();

// new Date().toISOString().replace(/:/g, "-") --> window do not accept ':'
const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "_" + file.originalname
    );
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

//set stactic
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static("images"));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

app.use(csrfProtection);

app.use((req, res, next) => {
  if (!req.session.staff) {
    res.locals.role = false;
    return next();
  }
  Staff.findById(req.session.staff._id)
    .then((staff) => {
      if (!staff) {
        return next();
      }
      req.staff = staff;
      res.locals.role = staff.role;
      if (staff.role === "manager") {
        res.locals.role = "manager";
        return next();
      }
      res.locals.role = "staff";
      next();
    })
    .catch((err) => console.error(err));
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use(authRoutes);
app.use(managerRoutes);
app.use(staffRoutes);
app.use(errorController.get404);
app.use((error, req, res, next) => {
  console.error(error);
  return res.status(500).render("500", {
    pageTitle: "Lỗi !!",
    path: "/500",
    isWork: false
  });
});

//connect to db
mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    Staff.findOne().then((staff) => {
      if (!staff) {
        const staff = new Staff({
          name: "Nguyên Văn A",
          user: "staff",
          password: "staff",
          role: "staff",
          doB: new Date(1994, 02, 20),
          salaryScale: 1.5,
          startDate: new Date(2022, 02, 02),
          department: "IT",
          annualLeave: 8,
          isConfirm: [],
          workTime: [],
          offTime: [],
          covidInfo: {
            vaccineInfo: [],
            infected: [],
            tempInfo: []
          },
          image:
            "https://www.publicdomainpictures.net/pictures/10000/velka/1-1210009435EGmE.jpg"
        });
        staff.save();
      }
    });
    app.listen(process.env.PORT || 3001, "0.0.0.0", () => {
      console.log("Server is running.");
    });
    // app.listen(PORT);
  })
  .catch((err) => {
    console.error(err);
  });
