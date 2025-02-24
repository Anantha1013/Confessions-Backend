const mongoose=require('mongoose');

const counterSchema=new mongoose.Schema({
    identity:{type:String,required:true},//a random id
    seq:{type:Number,default:0}//this is actual counter
});

const Counter=mongoose.model("Counter",counterSchema);

const nickNames=new mongoose.Schema(
    {
        identity:{
            type:Number,
            required:true,
            unique:true
        },
        nickName:{
            type:String,
            required:true,
            unique:true
        }
    }
);

nickNames.pre('save',async function (next){
    if(this.isNew){//checks if the incoming document is new
        try{
            //Basically Counter collection only has one document with id ="userId" and value a sequence incrementing
            const counter=await Counter.findByIdAndUpdate(
                //searching for userId and and incrementing sequence everytime
                {identity:'userId'},
                {$inc:{seq:1}},
                {new:true,upsert:true}//this basically creates the "userId" if it does not exist the first time
            );
            this.identity=counter.seq;//assigns the new counter to nicknames id
            next();//indication to save and proceed to next operation.If this is not given will halt
        }catch(error){
            next(error);//If error is given as parameter will stop operation
        }
    }else{
        next();//If document is not new can procced to next step
    }
});

const anonNames=new mongoose.model("anonNames",nickNames);
module.exports=anonNames;
