const Staff = require("../models/staff");
const moment = require("moment");
const PDFDocument = require("pdfkit");
const path = require("path");
const fs = require("fs");

exports.getCovid = (req, res, next) => {
  Staff.find({ role: "staff" })
    .then((staffs) => {
      res.render("staff/covid-info", {
        path: "/covid",
        pageTitle: "Đăng kí thông tin Covid",
        isWork: false,
        role: req.staff.role,
        staffs,
        moment
      });
    })
    .catch((err) => console.error(err));
};

exports.postVaccineInfo = (req, res, next) => {
  const { nameVaccine1, nameVaccine2, dateVaccine1, dateVaccine2 } = req.body;
  const vaccine1 = {
    name: nameVaccine1,
    date: dateVaccine1
  };
  const vaccine2 = {
    name: nameVaccine2,
    date: dateVaccine2
  };
  req.staff
    .updateVaccineInfo(vaccine1, vaccine2)
    .then(() => {
      res.render("staff/covid-info", {
        pageTitle: "Đăng kí thông tin covid",
        path: "/covid",
        isWork: false,
        role: req.staff.role
      });
    })
    .catch((err) => console.error(err));
};

exports.postInfectedInfo = (req, res, next) => {
  const { infectedDate, cureDate } = req.body;
  req.staff.covidInfo.infectedInfo = {
    infectedDate: infectedDate,
    cureDate: cureDate
  };
  req.staff
    .save()
    .then(() => {
      res.render("staff/covid-info", {
        pageTitle: "Đăng kí thông tin Covid",
        path: "/covid",
        isWork: false,
        role: req.staff.role
      });
    })
    .catch((err) => console.log(err));
};

exports.postTemperatureInfo = (req, res, next) => {
  const { temperature, timeTemperature } = req.body;
  req.staff.covidInfo.temperatureInfo = {
    temperature: temperature,
    time: timeTemperature
  };
  req.staff
    .save()
    .then(() => {
      res.render("staff/covid-info", {
        pageTitle: "Đăng kí thông tin Covid",
        path: "/covid",
        isWork: false,
        role: req.staff.role
      });
    })
    .catch((err) => console.log(err));
};

exports.getPDF = (req, res, next) => {
  Staff.findById(req.params.staffId)
    .then((staff) => {
      const pdfDoc = new PDFDocument();
      const pathDoc = path.join("data", "pdf");

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Dispositon", "inline");

      pdfDoc.pipe(fs.createWriteStream(pathDoc));
      pdfDoc.pipe(res);
      pdfDoc.text("THÔNG TIN COVID");
      pdfDoc.text("----------------");

      pdfDoc.text("Tên nhân viên : " + staff.name);
      pdfDoc.text(
        "Nhiệt độ : " +
          (staff.covidInfo.temperatureInfo.length > 0
            ? staff.covidInfo.temperatureInfo[0].temperature
            : "----")
      );
      pdfDoc.text(
        "Vaccine  1 : " +
          (staff.covidInfo.vaccineInfo.length > 0
            ? staff.covidInfo.vaccineInfo[0].name
            : "----") +
          " .Ngày tiêm : " +
          (staff.covidInfo.vaccineInfo.length > 0
            ? moment(staff.covidInfo.vaccineInfo[0].date).format("DD/MM/YYYY")
            : "----")
      );
      pdfDoc.text(
        "Vaccine  2 : " +
          (staff.covidInfo.vaccineInfo.length > 0
            ? staff.covidInfo.vaccineInfo[1].name
            : "----") +
          " .Ngày tiêm : " +
          (staff.covidInfo.vaccineInfo.length > 0
            ? moment(staff.covidInfo.vaccineInfo[1].date).format("DD/MM/YYYY")
            : "----")
      );
      pdfDoc.text(
        "Ngày nhiểm bệnh : " +
          (staff.covidInfo.infectedInfo.length > 0
            ? moment(staff.covidInfo.infectedInfo[0].infectedDate).format(
                "DD/MM/YYYY"
              )
            : "----")
      );
      pdfDoc.text(
        "Ngày khỏi bệnh :" +
          (staff.covidInfo.infectedInfo.length > 0
            ? moment(staff.covidInfo.infectedInfo[0].cureDate).format(
                "DD/MM/YYYY"
              )
            : "----")
      );
      pdfDoc.end();
    })
    .catch((err) => {
      console.error(err);
    });
};
