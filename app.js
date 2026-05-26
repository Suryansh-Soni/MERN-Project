const express=require("express");
const app=express();
const mongoose =require("mongoose");

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

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})