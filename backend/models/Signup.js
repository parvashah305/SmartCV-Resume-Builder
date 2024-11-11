const mongoose=require('mongoose')

const signupSchema=mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
    }
})

const Signup=mongoose.model("Signup",signupSchema)

module.exports=Signup