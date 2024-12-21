const express = require('express')
require('dotenv').config();
const router=express.Router()
const { adminModel } =require('../db')
const { courseModel } =require('../db')
const jwt = require("jsonwebtoken") 
const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PW
const { adminMiddleware } = require("../middleware/admin")

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

router.post("/course/create" , adminMiddleware , async function(req,res){
    const adminId=req.userId

    const { title , description , price , imageUrl }= req.body

    try {
        const course = await courseModel.create({
            title:title,
            description:description,
            price: price,
            imageUrl:imageUrl,
            creatorId:adminId
        })

        res.json({
            message : "Course created successfully",
            courseId : course._id
        })
    } catch (error) {
        console.error(error); 
        res.status(500).json({ "error": error.message });
    }
    
})

router.put("/course/update", adminMiddleware, async function(req, res) {
    const adminId = req.userId;
    const { title, description, price, imageUrl, courseId } = req.body;
    try {

        const course = await courseModel.updateOne(
            { _id: courseId, creatorId: adminId },
            { title, description, price, imageUrl }
        );

        res.json({
            course: course,
            message: "Course updated successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": error.message });
    }
});

router.get("/course/bulk", adminMiddleware, async function(req, res) {
    const adminId = req.userId;
    try {
        const courses = await courseModel.find({
            creatorId: adminId
        });
        res.status(200).json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": error.message });
    }
});

router.get("/:id", adminMiddleware, async function(req, res) {
    try {
        const course = await courseModel.findOne({
            _id:req.params.id
        });
        res.status(200).json(course);
    } catch (error) {
        console.error(error); 
        res.status(500).json({ "error": error.message });
    }
});


module.exports=router