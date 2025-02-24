require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');

const register=require('./Routes/registerRoute.model');

const app=express();

app.get('/',(req,res)=>{
    res.send("You have connected to PSG Confessions");
})

app.use(express.json());
app.use('/v1',register);

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
