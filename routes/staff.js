const express = require("express");

const isAuth = require("../middleware/is-auth");

const staffController = require("../controllers/staff");
const attendanceController = require("../controllers/attendance");
const covidController = require("../controllers/covid");
const workTimeAndSalaryController = require("../controllers/workTimeAndSalary");
const OffTimeController = require("../controllers/offTime");
const HomeController = require("../controllers/home");

const router = express.Router();

router.get("/", HomeController.getIndex);

router.get("/registerWork", isAuth, attendanceController.getWorkTimesList);

router.post("/registerWork", isAuth, attendanceController.postStartWorkTime);

router.get("/attendance", isAuth, attendanceController.getStartWorkTime);

router.post("/attendance", isAuth, attendanceController.postEndWorkTime);

router.post("/time-off", isAuth, OffTimeController.postTimeOff);

router.get(
  "/workTime",
  isAuth,
  workTimeAndSalaryController.getWorkTimeAndSalary
);

router.post("/workTime", isAuth, workTimeAndSalaryController.postSalaryToMonth);

router.get("/covid", isAuth, covidController.getCovid);

router.get("/covid/:staffId", isAuth, covidController.getPDF);

router.post("/infected", isAuth, covidController.postInfectedInfo);

router.post("/vaccine", isAuth, covidController.postVaccineInfo);

router.post("/temperature", isAuth, covidController.postTemperatureInfo);

router.get("/staffInfo", isAuth, staffController.getStaffInfo);

router.post("/staffInfo", isAuth, staffController.postUpdateAvatar);

router.get("/pagination", isAuth, workTimeAndSalaryController.getPagination);

router.post("/pagination", isAuth, workTimeAndSalaryController.postPagination);

module.exports = router;
