const express=require("express");
const app=express();
const mongoose =require("mongoose");
const Listing = require("./models/listing");

async function main(){
    await mongoose.connect("mongodb://localhost:27017/wanderlust");
}
main().then(()=>{
    console.log("Database connection successful");
}).catch(err=>{
    console.error(err);
})

app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.get("/testlistings",async (req,res)=>{
    let samplelisting=new Listing({
        title:"Sample Listing",
        description:"This is a sample listing for testing purposes.",
        imageUrl:"",
        price:100,
        location:"Sample Location",
        country:"Sample Country"
    })
    await samplelisting.save();
    console.log("Sample listing created and saved to the database.");
    res.send("Sample listing created and saved to the database.");
})

app.listen(8080,()=>{
    console.log("Server is running on port 8080");
})