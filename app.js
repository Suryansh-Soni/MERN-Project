const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const Path = require("path");
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}
app.set("view engine", "ejs");
app.set("views", Path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

main()
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error(err);
  });

app.get("/", (req, res) => {
  res.send("Hello World");
});

// app.get("/testlistings", async (req, res) => {
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

app.get("/listings", async (req, res) => {
  try {
    const listings = await Listing.find({});

    res.render("listings/index.ejs", { listings });
  } catch (err) {
    console.error(err);

    res.status(500).send("Error fetching listings");
  }
});

//new route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

//craete route
app.post("/listings", async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  console.log(newListing);
  res.redirect("/listings");
});
//edit route
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
});
//update route
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
});

//show route
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
});

app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
