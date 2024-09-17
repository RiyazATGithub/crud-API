const mongoose=require('mongoose')
const bcrypt=require("bcrypt")


const userSchema=new mongoose.Schema({
    email:{
        type:String,

unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
    },
    address:{
        type:String
    }
})

userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        try{
            const hashedPassword=await bcrypt.hash(this.password,10);
            this.password=hashedPassword;
            next();
        }catch(err){
            next(err)
        }
    }else{
        next()
    }
})

const user=mongoose.model('User',userSchema)
module.exports=user
