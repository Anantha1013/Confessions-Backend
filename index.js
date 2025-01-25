require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');

const app=express();

app.get('/',(req,res)=>{
    res.send("You have connected to PSG Confessions");
})

mongoose.connect(process.env.MONGODB)
.then(()=>{
    app.listen(process.env.PORT , ()=>{
        console.log(`Server is running on http://localhost:${process.env.PORT}`);
    });
    console.log("Connected to mongodb");
})
.catch((err)=>{
    console.log(err);
});
