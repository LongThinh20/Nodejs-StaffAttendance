exports.getIndex = (req, res, next) => {
  res.render("staff/home", {
    pageTitle: "Trang chủ",
    path: "/home",
    isWork: false
  });
};
