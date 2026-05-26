const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const Mongo_Url = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
  await mongoose.connect(Mongo_Url);
}

main()
  .then(() => {
    console.log("Database connection successful");
    initDb();
  })
  .catch((err) => {
    console.error(err);
  });

const initDb = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(initData.data);
  console.log("Database initialized with sample data");
};