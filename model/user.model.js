const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    name:String,
    email:String,
    gender:String,
    password:String,
    age:Number,
    city:String,
})

const UserModel=mongoose.model("regidb" , userSchema)

module.exports={
    UserModel
}