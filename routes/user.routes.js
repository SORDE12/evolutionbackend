const router=require("express")

const userRouter=router()
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const { UserModel } = require("../model/user.model")


userRouter.post("/register" , async(req,res)=>{
    const {name,email,gender,password,age,city}=req.body

    try{
        bcrypt.hash(password, 5,async(err, hash)=> {
            // Store hash in your password DB.
            if(err){
                res.send(err.message)
            }else{
                const user=new UserModel({name,email,gender,password:hash,age,city})
                await user.save()
                res.send({"msg":"registered successfully"})
            }
        });

    }
    catch(err){
        res.send({"msg":"something went wrong" , "err":err.message})
    }
})

userRouter.post("/login" , async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await UserModel.find({email})
        if(user.length>0){
            bcrypt.compare(password, user[0].password, function(err, result) {

                if(result){
                    var token = jwt.sign({ userID: user[0]._id }, 'masai');
                    res.send({"msg":"login successfully", token:token})
                }else{
                    res.send({"msg":"wrong credentials"})
                }
                // result == true
            });
        }else{
            res.send({"msg":"wrong credentials"})
        }
    }
    catch(err){
        res.send({"msg":"something went wrong" , "err":err.message})
    }

})

module.exports={
    userRouter
}