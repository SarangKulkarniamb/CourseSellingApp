const express = require('express')
const router=express.Router()
const { adminModel } = require("../db")

router.get('/',  function(req,res){
    res.json({"message" : "welcome admin"})
})

module.exports=router