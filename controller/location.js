const express = require('express');
const Location = require('../model/location');

exports.getAllRestaurantLocation = (req,res)=>{
    Location.find()
        .then(
            result=>{
                res.status(200).json({
                    Message:'Data fetched successfully',
                    data: result
                })
            }
        )
        .catch(
            error=>{
                res.status(500).json({
                    Message:'Some Error Occurs in DB',
                    error: error
                })
            }
        )

}