const mongoose=require('mongoose');

const user=new mongoose.Schema(
    {
        email:{
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
        }
    },
    {
        timestamps:true
    }
);



const User=new mongoose.model("User",user);
module.exports=User;
