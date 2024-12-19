const express = require('express')
require('dotenv').config();
const router=express.Router()
const { adminModel } =require('../db')
const jwt = require("jsonwebtoken") 
const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PW


router.post('/signup', async function(req, res) {
    const { email, password, firstName, lastName } = req.body
    try {
        await adminModel.create({
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
    
    const user = await adminModel.findOne({
        email : email,
        password : password
    })
    if(user){
        const token = jwt.sign({
            id : user._id
        } , JWT_ADMIN_PASSWORD)
        res.json({
            token : token
        })
    }
    else{
        res.status(401).json({"error" : "Incorrect Crendentials"})
    }
    
})

module.exports=router