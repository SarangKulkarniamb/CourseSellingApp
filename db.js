const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId


const userSchema =new Schema({
    email : {type : String , unique : true},
    password : String,
    firstName : String,
    lastName : String,
})

const adminSchema = new Schema({
    email : {type : String , unique : true},
    password : String,
    firstName : String,
    lastName : String,
})

const purchaseSchema = new mongoose.Schema({
    userId: { type:ObjectId, ref: 'user' },
    courseId: { type:ObjectId, ref: 'course' }
});

const courseSchema =new Schema({
    title : String,
    description : String,
    price : Number ,
    imageUrl : String,
    creatorId:{ type:ObjectId, ref: 'admin' },
})

const userModel =mongoose.model("user",userSchema)
const adminModel =mongoose.model("admin",adminSchema)
const purchasesModel =mongoose.model("purchase",purchaseSchema)
const courseModel =mongoose.model("course",courseSchema)

module.exports={
    userModel,
    purchasesModel,
    adminModel,
    courseModel,
}