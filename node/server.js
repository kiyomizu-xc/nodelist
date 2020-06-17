const express = require("express");
const morty = express();
const artRouter = require("./routes/art");
const mongoose  = require("mongoose");
const db = require("./db/art");
const mo = require("method-override");




mongoose.connect("mongodb://localhost/art",{useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true});

morty.set("view engine","ejs");

morty.use(express.urlencoded({extended:false}));
morty.use(mo("_method"));


morty.use("/art",artRouter);


morty.get("/",async(req,res)=>{
    let arts = await db.find().sort({date:'desc'});
    res.render("index",{arts:arts});
});


morty.listen(3100);