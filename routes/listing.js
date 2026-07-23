const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");
const listingController = require("../controllers/listings");
const multer=require("multer")
const {storage}=require("../cloudConfig")
// const upload=multer({dest:"uploads/"})
const upload=multer({storage})

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

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post( 
    isLoggedIn,
    validateListing,
    upload.single('listing[image]'),
    wrapAsync(listingController.createListing),
  );
 

//new route
router.get("/new", isLoggedIn, listingController.renderNewForm);


router
  .route("/:id")
  .put(
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(listingController.updateListing),
  )
  .get(wrapAsync(listingController.showListing))
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));



//edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm),
);



module.exports = router;
