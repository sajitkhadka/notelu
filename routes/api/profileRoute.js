const express = require('express');
const router = express.Router();
const checkAuth = require('../../middleware/check-auth');
const Profile = require('../../models/profile');


router.get('/',checkAuth, (req,res)=>{
    Profile.findOne({ email:req.body.email}).exec((err,profile)=>{
        if(err || !profile){
            return res.status(400).json({
                error:'Profile not found'
            });
        }
        res.json({profile});
    })
})


router.post('/update',checkAuth, (req,res)=>{
       
    Profile.findOne( { email:req.body.email} ).exec((err,profile)=>{
        if(err || !profile){
            return res.status(400).json({
                error:'Profile not found'
            });
        }
       // res.json({profile});

        let {name,email,dob,password} = profile; //this is the data pulled from db
        
        if(req.body.name) name = req.body.name;
        if(req.body.dob) dob = req.body.dob;
        if(req.body.password) password = req.body.password;

        Profile.findOneAndUpdate(
            {email:req.decoded.email},
            {name,email,dob,password},
            {new: true}
        ).exec((err,profile)=>{
            if(err){
                console.log(err)
            }
            res.json({profile})
        })
    })
})


module.exports = router;



