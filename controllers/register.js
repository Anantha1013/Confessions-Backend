const User=require('../models/users.model');
const anonNames=require('../models/nickName.model');

exports.registerStudent=async(req,res)=>{
    try{
        console.log(req.body);
        if(!req.body.email || !req.body.password){
            return res.status(402).json({
                success:false,
                message:"All fields are required"
            });
        }
        
        let regexp=/^[\d\w]{6,8}@psgtech.ac.in$/g;
        const check_email=req.body.email;
        if(check_email.search(regexp)){
            return res.status(403).json({
                success:false,
                message:"Only PSG College students allowed as of now"
            });
        }

        let num=await anonNames.countDocuments({});//count all nicknames in the nickNames collection
        let randNumber=Math.floor(Math.random()*num)+1;
        const nickNameNumber=await anonNames.findOne({identity:randNumber});


        console.log(nickNameNumber.nickName);
        const doc={
            email:req.body.email,
            password:req.body.password,
            nickName:nickNameNumber.nickName
        };

        const response=await User.create(doc);

        return res.status(200).json({
            success:true,
            message:"User registered successfully"
        });
    }
    catch(error){
        console.log(error);
        return res.status(501).json({
            success:false,
            message:"Some server side error"
        });
    }
};
