const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const userController = require("../controllers/users");

router
  .route("/signup")
  .get((req, res) => {
    res.render("users/signUp.ejs");
  })
  .post(wrapAsync(userController.singup));

router
  .route("/login")
  .get(userController.getLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login,
  );

router.get("/logout", userController.logout);

module.exports = router;
