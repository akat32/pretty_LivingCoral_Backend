module.exports = (router, Notice, Users, passport, randomString, multer) => {
    let storage = multer.diskStorage({
        destination: (req,file,cb)=>{
          cb(null, 'C:\\Users\\TaeWook\\Desktop\\hanse\\pretty_LivingCoral_Backend\\public\\notice\\img'); // /home/ubuntu/TVserver/public
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

    router.post('/addNotice', upload.array('img'), async(req,res)=>{
        console.log(req.files)
        let new_notice = {
          title: req.body.title,
          content: req.body.content,
          date: req.body.date,
          token: randomString.generate(15),
          img: []
        }
        for( let i=0; req.files[i] != null; i++) {
          let push_img = 'localhost:3030/public/notice/' + req.files[i].filename;
          new_notice.img.push(push_img)
        }
        new_notice = new Notice(new_notice);
        let result = await new_notice.save();
        if(!result) return res.status(500).json({message : "ERR!"})
        else return res.status(200).json({message : "Upload Success!"})
        // [
        //     {
        //         "fieldname": "img",
        //         "originalname": "50196232_553646225152196_6965172369711169536_n.jpg",
        //         "encoding": "7bit",
        //         "mimetype": "image/jpeg",
        //         "destination": "C:\\Users\\TaeWook\\Desktop\\hanse\\pretty_LivingCoral_Backend\\public\\notice\\img",
        //         "filename": "DdbazBiW3TDaKMOfld5Zue.PNG",
        //         "path": "C:\\Users\\TaeWook\\Desktop\\hanse\\pretty_LivingCoral_Backend\\public\\notice\\img\\DdbazBiW3TDaKMOfld5Zue.PNG",
        //         "size": 18516
        //     },
        //     {
        //         "fieldname": "img",
        //         "originalname": "KakaoTalk_20190201_200624456 - 복사본 - 복사본 - 복사본.jpg",
        //         "encoding": "7bit",
        //         "mimetype": "image/jpeg",
        //         "destination": "C:\\Users\\TaeWook\\Desktop\\hanse\\pretty_LivingCoral_Backend\\public\\notice\\img",
        //         "filename": "dcyPVbNrIYVhrMEyPP61gr.PNG",
        //         "path": "C:\\Users\\TaeWook\\Desktop\\hanse\\pretty_LivingCoral_Backend\\public\\notice\\img\\dcyPVbNrIYVhrMEyPP61gr.PNG",
        //         "size": 91979
        //     }
        // ]
    })
    .post('/delNotice', async (req,res)=>{
      let result = await Notice.remove({token : req.body.token})
      if(!result.result.n) return res.status(500).json({message : "ERR!"})
      else return res.status(200).json({message : "success!"})
    })
    .post('/loadNoticeOne', async(req,res)=>{
      let result = await Notice.findOne({token : req.body.token})
      if(!result) return res.status(404).json({message : "Notce Not Found!"})
      else return res.status(200).json({notice : result})
    })
    .post('/loadNoticeList', async(req,res)=>{
      let result = await Notice.find()
      res.status(200).json({list : result})
    })
    return router;
}