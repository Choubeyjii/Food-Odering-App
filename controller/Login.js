const Login = require('../model/signup')  
const mongoose=require('mongoose');


exports.Login = (req,res)=>{
    console.log(req.body)
    const { email,password}=req.body;
    Login.findOne({email:email},(err,user) =>{
        if(user){
            if(password === user.password){
                res.send({message: "login successfully",user:user})
            }else{
                res.send({message:"Incorrect Password"})
            }
        }else {
            res.send({message:"user not registered"})
        }
    })

}