const express = require('express')
const router=express.Router()


router.post('/signup',  function(req,res){
    res.json({"message" : "signup"})
})

router.post('/signin',  function(req,res){
    res.json({"message" : "signup"})
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