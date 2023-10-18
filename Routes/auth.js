const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require("cookie-parser")
const UserModel = require('../models/User')
const router = express.Router();

//register the user
router.post('/register', async (req,res) => {
    const { username,email,password } = req.body;
    if( !username,!email,!password ){
        console.log("enter data first");
        return res.json({message:"Please fill all fields"})
    }
    const user = await UserModel.findOne({email})
    if(user){
        return res.json({message:"user already exist"})
    }
    const hashPassword = await bcrypt.hash(password,10)
    const newUser = new UserModel({username,email,password:hashPassword,})
     await newUser.save();
    return res.json({message:"user register successfully"})
}) 

//login the user
router.post('/login', async(req,res) => {
    const { email,password } = req.body;
    if( !email,!password ){
        console.log("enter data first");
        return res.json({message:"Please fill all fields"})
    }
    const user = await UserModel.findOne({email});
    if(!user){
        return res.json({message:"email not found"})
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword){
        return res.json({message:"incorrect password"})
    }
    const token = jwt.sign({id: user._id},"Secret Key");
    res.cookie("token",token);
    return res.json({message:"sucessfully login", id: user._id});

})

//logout the user

router.get('/logout' , (req,res) => {
    res.clearCookie('token');
    console.log("removed cookie");
    return res.json({message:"cookie has been removed"})
})

module.exports = router