const Methods = require("../utils/methods");
const Staff = require("../models/staff");
const moment = require("moment");

let ITEM_PER_PAGE = 5;

//GET /workTime
exports.getWorkTimeAndSalary = (req, res, next) => {
  try {
    Staff.find({ role: "manager" })
      .then((manager) => {
        let pageSize = ITEM_PER_PAGE;
        let page = +req.query.page || 1;
        let totalItems = +req.staff.workTime.length;
        let totalPage = Math.ceil(totalItems / pageSize);
        let itemsOfPage = req.staff.workTime.slice(
          (page - 1) * pageSize,
          pageSize * page
        );

        const salary = Methods.getSalary(req.staff, req.body.month);
        res.render("staff/workTimeAndSalary", {
          path: "/workTimeAndSalary",
          pageTitle: "Thông tin giờ làm và lương",
          moment,
          manager,
          workTimes: itemsOfPage || req.staff.workTime,
          totalTime: Methods.getTotalTimeLastDate(
            req.staff.workTime,
            req.staff.offTime
          ),
          offTimes: req.staff.offTime,
          isWork: false,
          salary,
          currentPage: page,
          hasNextPage: pageSize * page < totalItems,
          hasPreviousPage: page > 1,
          nextPage: page + 1,
          previousPage: page - 1,
          lastPage: totalPage
        });
      })
      .catch((err) => console.error(err));
  } catch (err) {
    console.error(err);
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

//POST /workTime
exports.postSalaryToMonth = (req, res, next) => {
  try {
    Staff.find({ role: "manager" })
      .then((manager) => {
        let pageSize = ITEM_PER_PAGE;
        let page = +req.query.page || 1;
        let totalItems = +req.staff.workTime.length;
        let totalPage = Math.ceil(totalItems / pageSize);
        let itemsOfPage = req.staff.workTime.slice(
          (page - 1) * pageSize,
          pageSize * page
        );

        const salary = Methods.getSalary(req.staff, req.body.month);
        res.render("staff/workTimeAndSalary", {
          path: "/workTimeAndSalary",
          pageTitle: "Thông tin giờ làm và lương",
          moment,
          manager,
          workTimes: itemsOfPage || req.staff.workTime,
          totalTime: Methods.getTotalTimeLastDate(
            req.staff.workTime,
            req.staff.offTime
          ),
          offTimes: req.staff.offTime,
          isWork: false,
          salary,
          currentPage: page,
          hasNextPage: pageSize * page < totalItems,
          hasPreviousPage: page > 1,
          nextPage: page + 1,
          previousPage: page - 1,
          lastPage: totalPage
        });
      })
      .catch((err) => console.error(err));
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

//GET /pagination"
exports.getPagination = (req, res, next) => {
  try {
    Staff.find({ role: "manager" })
      .then((manager) => {
        let pageSize = ITEM_PER_PAGE;
        let page = +req.query.page || 1;
        let totalItems = +req.staff.workTime.length;
        let totalPage = Math.ceil(totalItems / pageSize);
        let itemsOfPage = req.staff.workTime.slice(
          (page - 1) * pageSize,
          pageSize * page
        );

        const salary = Methods.getSalary(req.staff, req.body.month);
        res.render("staff/workTimeAndSalary", {
          path: "/workTimeAndSalary",
          pageTitle: "Thông tin giờ làm và lương",
          moment,
          manager,
          workTimes: itemsOfPage || req.staff.workTime,
          totalTime: Methods.getTotalTimeLastDate(
            req.staff.workTime,
            req.staff.offTime
          ),
          offTimes: req.staff.offTime,
          isWork: false,
          salary,
          currentPage: page,
          hasNextPage: pageSize * page < totalItems,
          hasPreviousPage: page > 1,
          nextPage: page + 1,
          previousPage: page - 1,
          lastPage: totalPage
        });
      })
      .catch((err) => console.error(err));
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

//POST /pagination
exports.postPagination = (req, res, next) => {
  try {
    ITEM_PER_PAGE = req.body.pageSize;
    Staff.find({ role: "manager" })
      .then((manager) => {
        let pageSize = ITEM_PER_PAGE;
        let page = +req.query.page || 1;
        let totalItems = +req.staff.workTime.length;
        let totalPage = Math.ceil(totalItems / pageSize);
        let itemsOfPage = req.staff.workTime.slice(
          (page - 1) * pageSize,
          pageSize * page
        );

        const salary = Methods.getSalary(req.staff, req.body.month);
        res.render("staff/workTimeAndSalary", {
          path: "/workTimeAndSalary",
          pageTitle: "Thông tin giờ làm và lương",
          moment,
          manager,
          workTimes: itemsOfPage || req.staff.workTime,
          totalTime: Methods.getTotalTimeLastDate(
            req.staff.workTime,
            req.staff.offTime
          ),
          offTimes: req.staff.offTime,
          isWork: false,
          salary,
          currentPage: page,
          hasNextPage: pageSize * page < totalItems,
          hasPreviousPage: page > 1,
          nextPage: page + 1,
          previousPage: page - 1,
          lastPage: totalPage
        });
      })
      .catch((err) => console.error(err));
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};
