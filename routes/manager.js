const express = require("express");

const router = express.Router();

const staffManageController = require("../controllers/manager");

const isAuth = require("../middleware/is-auth");

const isManager = require("../middleware/is-manager");

router.get("/manager", isAuth, isManager, staffManageController.getIndex);

router.post(
  "/manager/staffDetail",
  isAuth,
  isManager,
  staffManageController.postStaffDetail
);
router.post(
  "/manager/deleteWorkTime",
  isAuth,
  isManager,
  staffManageController.deleteWorkTime
);

router.post(
  "/manager/isConfirm",
  isAuth,
  isManager,
  staffManageController.postIsConfirmed
);

module.exports = router;
