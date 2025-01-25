const mongoose=require('mongoose');

const user=new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true 
        },
        password:{
            type:String,
            required:true
        },
        nickName:{
            type:String
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        is_login:{
            type:Boolean
        }
    },
    {
        timestamps:true
    }
);

const User=new mongoose.model("User",user);
module.exports={User};
