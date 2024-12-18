const express = require('express')
const app = express()


app.get('/', (req, res) => res.send('Hello World!'))

app.post('/users/signup',  function(req,res){
    res.json({"message" : "signup"})
})

app.post('/users/signin',  function(req,res){
    res.json({"message" : "signup"})
})

app.get('/users/purchases',  function(req,res){
    res.json({"message" : "signup"})
})

app.post('/users/buy',  function(req,res){
    res.json({"message" : "signup"})
})

app.get('/courses',  function(req,res){
    res.json({"message" : "signup"})
})

app.listen(3000, () => console.log(`App running`))