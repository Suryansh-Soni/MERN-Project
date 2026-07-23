const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const Reviews = require("../models/review.js");
const Listing = require("../models/listing");
const { validateReview, isLoggedIn, isAuthor } = require("../middleware");
const reviewController=require("../controllers/reviews.js")
//reviews
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview),
);

//delete review
router.delete(
  "/:reviewId",
  isLoggedIn,
  isAuthor,
  wrapAsync(reviewController.destroyReview),
);

module.exports = router;
