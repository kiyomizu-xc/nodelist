const mongoose  = require("mongoose");
const marked = require("marked");
const slugify = require("slugify");
const dp = require("dompurify");
const {JSDOM} = require("jsdom");
const dptmp = dp(new JSDOM().window)




const artdb = new mongoose.Schema({
    title:{
        required:true,
        type:String,
    },
    body:{
        type:String, 
    },
    md:{
        required:true,
        type:String, 
    },
    date:{
        type:Date,
        default:Date.now,
    },
    slug:{
        type:String,
        required:true,
        unique:true,
    },
    saniti:{
        type:String,
        required:true,
    }
})
artdb.pre('validate',function(next){
    if(this.title)this.slug=slugify(this.title,{lower:true,strict:true})
    if(this.md){this.saniti = dptmp.sanitize(marked(this.md));}
    next();
})

module.exports = mongoose.model("artdb",artdb);