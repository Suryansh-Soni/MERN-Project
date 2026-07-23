const Listing=require("../models/listing")
module.exports.index=async (req, res) => {
    const listings = await Listing.find({});

    res.render("listings/index.ejs", { listings });
  }

module.exports.renderNewForm=(req, res) => {
  res.render("listings/new.ejs");
}

module.exports.createListing=async (req, res, next) => {
    // if (!req.body.listing) {
    //   throw new ExpressError(400, "Send Valid data for Listing ");
    // }
    // if (!newListing.title) {
    //   throw new ExpressError(400, "Title is missing  ");
    // }
    // if (!newListing.description) {
    //   throw new ExpressError(400, "Description is missing  ");
    // }
    let url=req.file.path;
    let filename=req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image={url,filename}
    await newListing.save();
    req.flash("success", "New Listing Created.");
    res.redirect("/listings");
  }

module.exports.showListing=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
      .populate({
        path: "reviews",
        populate: {
          path: "author",
        },
      })
      .populate("owner");
    if (!listing) {
      req.flash("error", " Listing you requested doesn't exist .");
      res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
  }

module.exports.renderEditForm=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing doesn't exist .");
      req.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
  }

module.exports.updateListing=async (req, res) => {
      const { id } = req.params;
  
      await Listing.findByIdAndUpdate(id, {
        ...req.body.listing,
      });
  
      req.flash("success", "Listing updated successfully!");
      res.redirect(`/listings/${id}`);
    }

module.exports.destroyListing=async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", " Listing Deleted .");

    res.redirect("/listings");
  }