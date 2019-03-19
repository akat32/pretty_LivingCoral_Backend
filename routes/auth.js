module.exports = (router, Users, randomString, passport) => {
    router.post('/signup', async (req,res)=>{
        let user = {
            id: req.body.id,
            passwd: req.body.passwd,
            name: req.body.name,
            phone: req.body.phone,
            token: randomString.generate(25)
        }
        let new_user = new Users(user);
        try {
          var result = await new_user.save();
        }catch(e){
          if(e instanceof user_duplicate) return res.status(409).json({message:"already exist"});
          if(e instanceof ValidationError) return res.status(400).json({message: e.message});
          if(e instanceof paramsError) return res.status(400).json({message: e.message});
        }
        res.status(200).json(new_user);
    })
    .post('/signin', passport.authenticate('local'), (req, res) => {
        res.status(200).json(req.user);
      }
    )
    .post('/aa', async(req,res)=>{
        let result = await Users.find()
        res.send(result)
    })
    return router;
}