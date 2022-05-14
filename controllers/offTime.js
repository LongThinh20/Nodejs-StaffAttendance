exports.postTimeOff = (req, res, next) => {
  try {
    const offTimes = {
      offTime: req.body.offTime,
      reason: req.body.reason,
      offHours: req.body.offHours
    };

    req.staff
      .addOffTime(offTimes)
      .then(() => {
        console.log("POST OFF TIME");
        res.redirect("/registerWork");
      })
      .catch((err) => console.error(err));
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};
