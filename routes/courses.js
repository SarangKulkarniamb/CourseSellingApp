const express = require('express')
const router=express.Router()
const { courseModel } = require("../db")

router.get('/all',  async function(req,res){

    try {
        const courses = await courseModel.find({})
        res.json({
            courses : courses
        })
    } catch (error) {
        res.status(200).json({
            "error" : error.message
        })
    }
    
})


router.get('/:id',  async function(req,res){

    try {
        const course = await courseModel.findOne({
            _id : req.params.id
        })
        res.json({
            course : course
        })
    } catch (error) {
        res.status(200).json({
            "error" : error.message
        })
    }
    
})
module.exports=router