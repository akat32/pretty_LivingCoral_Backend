module.exports = (router, Events, randomString, passport, multer)=>{
    let storage = multer.diskStorage({
        destination: (req,file,cb)=>{
          cb(null, 'C:\\Users\\parktea\\Desktop\\hanse\\server\\public\\event'); // /home/ubuntu/TVserver/public
        },
        filename: (req,file,cb)=>{
          var newStr = randomString.generate(22)
          newStr = newStr + '.PNG'
          cb(null, newStr);
        },
        limits: {
          fileSize: 5 * 1024 * 1024
        }
    })
    const upload = multer({storage : storage});

    router.post('/addEvent', upload.single('img'), async (req,res)=>{
        let new_event = {
            img: 'C:\\Users\\parktea\\Desktop\\hanse\\server\\public\\event' + req.file.filename,
            name: req.body.name,
            token: randomString.generate(22),
            html: req.body.html
        }
        new_event = new Events(new_event)
        let result = await new_event.save();
        if(!result) return res.status(500).json({message : "Failed upload"})
        else return res.status(200).json({message : "success upload!"})
    })
    .post('/delEvent', async (req,res)=>{
        let result = await Events.remove({token : req.body.token})
        if(!result.result.n) return res.status(500).json({message : "ERR!"})
        else return res.status(200).json({message : "success!"})
    })
    .post('/loadEventOne', async(req,res)=>{
        let result = await Events.findOne({token : req.body.token})
        if(!result) return res.status(404).json({message : "Failed Found Event!"})
        else return res.status(200).json({event : result})
    })
    .post('/loadEventList', async(req,res)=>{
        let result = await Events.find()
        res.status(200).json({list : result})
    })
    return router;
}