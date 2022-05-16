const moment = require("moment");
const fs = require("fs");
const deleteFile = require("../utils/file");

//GET  /staffInfo
exports.getStaffInfo = (req, res, next) => {
  try {
    const staffInfo = req.staff;
    res.render("staff/staff-info", {
      path: "/staffInfo",
      pageTitle: "Thông tin nhân viên",
      staffInfo: staffInfo,
      isWork: false,
      moment,
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    console.error(err);
    return next(error);
  }
};

//POST /staffInfo
exports.postUpdateAvatar = (req, res, next) => {
  try {
    const image = req.file;
    if (!image) {
      return res.redirect("/staffInfo");
    }
    deleteFile(req.staff.image);
    const imageUrl = image.path;

    req.staff.image = imageUrl;
    req.staff
      .save()
      .then(() => res.redirect("/registerWork"))
      .catch((error) => console.error(error));
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};
