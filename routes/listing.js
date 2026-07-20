const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const { listingSchema } = require("../Schema.js");
const Listing = require("../models/listing");

const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);

  if (error) {
    const errMsg = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// router.get("/testlistings", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "Mountain House",
//     description: "Beautiful mountain stay",
//     image: {
//       filename: "listingimage",
//       url: "",
//     },
//     price: 2000,
//     location: "Manali",
//     country: "India",
//   });

//   await sampleListing.save();
//   res.send("Sample listing created and saved to the database.");
// });

router.get(
  "/",
  wrapAsync(async (req, res) => {
    const listings = await Listing.find({});

    res.render("listings/index.ejs", { listings });
  }),
);

//new route
router.get("/new", (req, res) => {
  res.render("listings/new.ejs");
});

//craete route
router.post(
  "/",
  validateListing,
  wrapAsync(async (req, res, next) => {
    // if (!req.body.listing) {
    //   throw new ExpressError(400, "Send Valid data for Listing ");
    // }
    // if (!newListing.title) {
    //   throw new ExpressError(400, "Title is missing  ");
    // }
    // if (!newListing.description) {
    //   throw new ExpressError(400, "Description is missing  ");
    // }

    const newListing = new Listing(req.body.listing);
    await newListing.save();
    req.flash("success", "New Listing Created.");
    res.redirect("/listings");
  }),
);
//edit route
router.get(
  "/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing doesn't exist .");
      req.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
  }),
);
//update route
router.put(
  "/:id",
  validateListing,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
  }),
);

//show route
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    if (!listing) {
      req.flash("error", " Listing you requested doesn't exist .");
      res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
  }),
);

router.delete(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", " Listing Deleted .");

    res.redirect("/listings");
  }),
);

module.exports = router;
