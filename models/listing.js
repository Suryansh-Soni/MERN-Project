const mongoose = require("mongoose");
const Schema=mongoose.Schema;

const listingSchema = new Schema({
    title:{
        type:String,
        required:true},
    description:{
        type:String,
        required:true},
    imageUrl:{
        type:String,
        required:true,
        set:(v)=>v==""? "https://www.google.com/imgres?q=image%20of%20snorlax&imgurl=https%3A%2F%2Farchives.bulbagarden.net%2Fmedia%2Fupload%2Fthumb%2F5%2F56%2FSleep_Key_Art.jpg%2F640px-Sleep_Key_Art.jpg&imgrefurl=https%3A%2F%2Fbulbapedia.bulbagarden.net%2Fwiki%2FSnorlax_(Sleep)&docid=B3QvbeZhhr5JxM&tbnid=KjoO_EEYLOlINM&vet=12ahUKEwjZ8rDMo9aUAxUpzDgGHfMOFlQQnPAOegQIGRAB..i&w=640&h=640&hcb=2&ved=2ahUKEwjZ8rDMo9aUAxUpzDgGHfMOFlQQnPAOegQIGRAB" :v
    },
    price:{
        type:Number,
        required:true}, 
    location:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    }});

const Listing = mongoose.model("Listing",listingSchema);

module.exports=Listing;