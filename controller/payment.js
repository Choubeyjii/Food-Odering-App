const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const shortid = require('shortid');
const Transaction= require('../model/transaction')

const instance = new Razorpay({
    key_id: "rzp_test_cyfbOB9LBabRxL",
    key_secret: "hEe6eZZnXIgWkYjIAQirtUUo"
})

exports.createOrder = async (req, res) => {
    console.log(req.body.amount)
    console.log("Payment Initiated")
    const options = {
        amount: (req.body.amount * 100),
        currency: "INR",
        receipt: shortid.generate(),
        notes: {
            key1: "value3",
            key2: "value2"
        }
    }
    try {
        const response = await instance.orders.create(options)
        console.log(response);
        res.json(response);
    }
    catch (error) {

        console.log(error)
    }



}
 
exports.saveTransaction = (req,res)=>{
    console.log("save Transaction!!!!!!!!!")

    const generated_signature = crypto.createHmac('sha256',instance.key_secret);
    generated_signature.update(req.body.razorpay_order_id+"|"+req.body.razorpay_payment_id)

    if(req.body.razorpay_signature==generated_signature.digest('hex')){
        console.log("creating transaction object");
        // save transaction to collection
        const transaction=new Transaction({
            transaction_id:req.body.razorpay_payment_id,
            transaction_amount:req.body.razorpay_amount
        });
        transaction.save(function(err,saveTransaction){
            if(err){
                console.log(error);
                return res.status(500).send("Some problem occured",error)
            }
        console.log("transaction saved to db");
            res.send({transaction:transaction})
        })
    }
}