var SignUp = require('../model/signup')
const mongoose=require('mongoose');

exports.signup = (req,res)=>{
    console.log(req.body)
    const {name, email, phoneno, password}=req.body;
    SignUp.findOne({email:email},(err,user) =>{
        if(user){
            res.send({message: "User already Registered"})
        }else {
            const user =new SignUp ({
                name:name,
                email:email,
                phoneno:phoneno,
                password:password
            })
            user.save(err => {
                if(err){
                    res.send(err)
                }else{
                    res.send({message: "Successfully Registred"})
                }
            })

        }
    })

}