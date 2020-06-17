const express = require("express");
const router = express.Router();
const db = require("./../db/art");

router.get('/new',(req,res)=>{
    res.render("art/new",{arts:new db()});
});
router.get('/edit/:id',async(req,res)=>{
    let artedit = await db.findById(req.params.id);
    res.render("art/edit",{arts:artedit});
});
router.get('/:slug',async(req,res)=>{
    let arttmp = await db.findOne({slug:req.params.slug});
    if(arttmp === null)res.redirect("/");
    res.render("art/show",{arttmp:arttmp});
});
router.post('/',async function(req,res,next){
   req.arts = new db();
   next();
},saveandedit("new"));

router.delete("/:id",async(req,res)=>{
    await db.findByIdAndDelete(req.params.id);
    res.redirect('/');
})
router.put('/:id',async function(req,res,next){
    req.arts =  await db.findById(req.params.id);
    next();
 },saveandedit("edit"));

function saveandedit(path){
    return async(req,res)=>{
        let arts =  req.arts;
        arts.title = req.body.title;
        arts.body = req.body.body;
        arts.md = req.body.md;
        try {
            arts = await arts.save();
            res.redirect(`/art/${arts.slug}`);
        } catch (e) {
            res.render(`art/${path}`,{arts:arts});
        }
    }
}





module.exports = router;