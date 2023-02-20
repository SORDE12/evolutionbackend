const express=require("express")
const app=express()
const cors=require("cors")
const { connection } = require("./db")
const { userRouter } = require("./routes/user.routes")
const { postRouter } = require("./routes/post.routes")
const { authanticate } = require("./middleware/authantification.middleware")
require("dotenv").config()

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.use("/users" , userRouter)
app.use(authanticate)
app.use("/posts",postRouter)
app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("connected to db")
    }
    catch(err){
        console.log("err")
    }
    console.log(`server run on port ${process.env.port}`)
})