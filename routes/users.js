const express = require('express')
require('dotenv').config();
const router=express.Router()
const { userModel } =require('../db')
const jwt = require("jsonwebtoken") 
const JWT_USER_PASSWORD = process.env.JWT_USER_PW
const { userMiddleware } = require("../middleware/user")

router.post('/signup', async function(req, res) {
    const { email, password, firstName, lastName } = req.body
    try {
        await userModel.create({
            email, password, firstName, lastName
        })
        res.status(201).json({ "message": "signup succeeded" })
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(400).json({ "error": error.message || "An error occurred" })
    }
});

router.post('/signin',  async function(req,res){
    const { email , password} =req.body
    
    const user = await userModel.findOne({
        email : email,
        password : password
    })
    if(user){
        const token = jwt.sign({
            id : user._id
        } , JWT_USER_PASSWORD)
        res.json({
            token : token
        })
    }
    else{
        res.status(401).json({"error" : "Incorrect Crendentials"})
    }
    
})

router.get('/purchases',  function(req,res){
    res.json({"message" : "signup"})
})

router.post('/buy',  function(req,res){
    res.json({"message" : "signup"})
})
router.get('/purchases/:id',  function(req,res){
    res.json({"id" : req.params.id})
})

module.exports=router