const express = require('express')
require('dotenv').config();
const router=express.Router()
const { userModel , courseModel, purchasesModel} =require('../db')
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

router.get('/purchases', userMiddleware, async function(req, res) {
    const userId = req.userId;
    try {
        const purchases = await purchasesModel.find({ userId }).populate('courseId');
        const courses = purchases.map(purchase => purchase.courseId);

        res.status(200).json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": error.message });
    }
});


router.post('/buy',  userMiddleware , async function(req,res){
    const { courseId } = req.body
    const userId = req.userId
    try {
        const purchase = await purchasesModel.create({
            userId : userId , courseId : courseId
        })
        res.json({
            message : "Course bought successfully",
            purchase :purchase
        })
    } catch (error) {
        res.status(201).json({
            error : error.message
        })
    }
    
})


module.exports=router