const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const Reviews = require("../models/review.js");
const Listing = require("../models/listing");
const { validateReview, isLoggedIn, isAuthor } = require("../middleware");

//reviews
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);

    const newReview = new Reviews(req.body.review);

    // Save the logged-in user as the review author
    newReview.author = req.user._id;

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    req.flash("success", "New Review Created.");
    res.redirect(`/listings/${listing._id}`);
  }),
);

//delete review
router.delete(
  "/:reviewId",
  isLoggedIn,
  isAuthor,
  wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Reviews.findByIdAndDelete(reviewId);
    req.flash("success", " Review Deleted.");

    res.redirect(`/listings/${id}`);
  }),
);

module.exports = router;
