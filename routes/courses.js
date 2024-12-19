const express = require('express')
const router=express.Router()
const { courseModel } = require("../db")

router.get('/',  function(req,res){
    res.json({"message" : "signup"})
})

module.exports=router