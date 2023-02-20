const router=require("express")
const { PostModel } = require("../model/post.model")

const postRouter=router()

postRouter.get("/",async(req,res)=>{
    try{
        const posts=await PostModel.find()
        res.send(posts)
    }
    catch(err){
        res.send({"msg":"something went wrong" , "err":err.message})
    }
    
})

postRouter.post("/create",async(req,res)=>{
    const payload=req.body
    try{
        const posts=new PostModel(payload)
        await posts.save()        
        res.send({"msg":"added successfully"})
    }
    catch(err){
        res.send({"msg":"something went wrong" , "err":err.message})
    }
    
})



postRouter.patch("/update/:id",async(req,res)=>{
    const postID=req.params.id
    const data=req.body
    try{
        const post=new PostModel.findOne({_id:postID})
        const userID=post.userID
        const userMakingID=req.body.userID
        if(userID===userMakingID){
            await PostModel.findByIdAndUpdate({_id:postID,data})
            res.send(`post with id updated ${postID} successfully`)
        }else{
            res.send({"msg":"you are not authorised"})
        }
      
    }
    catch(err){
        res.send({"msg":"something went wrong" , "err":err.message})
    }
})


postRouter.delete("/delete/:id",async(req,res)=>{
    const postID=req.params.id

    try{
        const post=new PostModel.findOne({_id:postID})
        const userID=post.userID
        const userMakingID=req.body.userID
        if(userID===userMakingID){
            await PostModel.findByIdAndDelete({_id:postID})
            res.send(`post with id deleted ${postID} successfully`)
        }else{
            res.send({"msg":"you are not authorised"})
        }
      
    }
    catch(err){
        res.send({"msg":"something went wrong" , "err":err.message})
    }
})

module.exports={
    postRouter
}