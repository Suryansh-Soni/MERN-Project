const Reviews = require("../models/review.js");
const Listing = require("../models/listing");


module.exports.createReview=async (req, res) => {
    const listing = await Listing.findById(req.params.id);

    const newReview = new Reviews(req.body.review);

    // Save the logged-in user as the review author
    newReview.author = req.user._id;

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    req.flash("success", "New Review Created.");
    res.redirect(`/listings/${listing._id}`);
  }

module.exports.destroyReview=async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Reviews.findByIdAndDelete(reviewId);
    req.flash("success", " Review Deleted.");

    res.redirect(`/listings/${id}`);
  }

