const moment = require("moment");
const Methods = require("../utils/methods");

//GET /registerWork
exports.getWorkTimesList = (req, res, next) => {
  try {
    const currentMonth = new Date().getMonth() + 1;
    let isConfirmed = false;
    if (req.staff.isConfirm.length > 0) {
      req.staff.isConfirm.forEach((staff) => {
        if (staff.month === currentMonth) {
          isConfirmed = true;
        }
      });
    }

    res.render("staff/workPage", {
      path: "/adttendance",
      pageTitle: "ĐĂNG KÍ LÀM VIỆC",
      staffInfo: req.staff,
      isWork: false,
      workTimes: Methods.getTotalTimesOfDay(req.staff.workTime).listWorkTime,
      totalTime: Methods.getTotalTimesOfDay(req.staff.workTime).totalTime,
      moment,
      isConfirmed
    });
  } catch (err) {
    console.error(err);
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

//POST /registerWork
exports.postStartWorkTime = (req, res, next) => {
  try {
    const workTime = {
      workSpace: req.body.workSpace,
      startTime: new Date(),
      endTime: null,
      total: 0,
      overTime: 0
    };

    req.staff
      .addWorkTime(workTime)
      .then(() => {
        res.redirect("/attendance");
        console.log("START WORK TIME!!");
      })
      .catch((err) => console.error(err));
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

//GET - /attendance
exports.getStartWorkTime = (req, res, next) => {
  try {
    const workTime = req.staff.workTime;
    res.render("staff/attendance", {
      pageTitle: "Điểm danh",
      path: "/adttendance",
      workTime: workTime[workTime.length - 1],
      staffName: req.staff.name,
      isWork: true,
      moment
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

// POST - /attendance
exports.postEndWorkTime = (req, res, next) => {
  try {
    const endTime = new Date();
    req.staff
      .updateWorkTime(endTime)
      .then(() => {
        console.log("POST END WORKTIME");
        res.redirect("/registerWork");
      })
      .catch((err) => console.log(err));
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};
