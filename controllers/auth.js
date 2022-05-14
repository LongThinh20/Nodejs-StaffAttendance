const Staff = require("../models/staff");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Đăng nhập",
    isWork: false,
    errorMessage: null,
    oldInput: { user: "", password: "" }
  });
};

exports.postLogin = (req, res, next) => {
  const user = req.body.user.trim();
  const password = req.body.password.trim();

  Staff.findOne({ user: user, password: password })
    .then((staff) => {
      if (!staff) {
        return res.status(422).render("auth/login", {
          path: "/login",
          pageTitle: "Login",
          pageTitle: "Đăng nhập",
          isWork: false,
          errorMessage: "Tên đăng nhập hoặc mật khẩu sai",
          oldInput: { user: user, password: password }
        });
      }

      req.session.staff = staff;
      req.session.isLoggedIn = true;
      req.session.save((err) => {
        return res.redirect("/");
      });
    })
    .catch((err) => console.error(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.error(err);
    res.redirect("/");
  });
};
