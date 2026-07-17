const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  image: {
    filename: {
      type: String,
      default: "listingimage",
    },
    url: {
      type: String,
      default: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      set: (v) =>
        !v || v.trim() === ""
          ? "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
          : v,
    },
  },

  price: {
    type: Number,
  },

  location: {
    type: String,
  },

  country: {
    type: String,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "review",
    },
  ],
});
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({
      _id: { $in: listing.reviews },
    });
  }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
