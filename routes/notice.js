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
        res.send(req.files)
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
    return router;
}