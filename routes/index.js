const { Router } = require("express");
const router = Router();
const characters = require("../characters.json")
const fs = require("fs")
const download = require("download")

router.post("/characters/:id", (req,res) => {
    let id = req.params.id
    let pass = req.body.key
    if(pass != process.env.REQPASS) return res.json({error:"Incorrect key"});
    if(characters[id] == null) res.status(404).json({error:"Wrong index, index (0-"+(Object.entries(characters).length-1)+")"})
    res.json(characters[id])
});

router.get("/images/:image.png", (req, res) => {
    console.log(req.params)
    if(fs.existsSync("./images/"+req.params.image+".png"))
    {
        res.sendFile("./images/"+req.params.image+".png",{root:"./routes"})
    }else{
        res.status(404).end()
    }
})

router.post("/upload", (req, res) => {
    let pass = req.body.key
    let name = req.body.name
    if(pass == process.env.UPLOADPASS)
    {
        download(req.body.url).pipe(fs.createWriteStream(`./images/${name?name+".png":"upload.png"}`));
        res.send("Uploaded")
    }else{
        res.end()
    }
})

module.exports = router;