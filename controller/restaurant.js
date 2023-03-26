const express = require('express');
const Restaurant = require('../model/restaurant');

// For the searched restaurnt by the Locations+
exports.getAllRestaurantName = (req,res)=>{
    Restaurant.find()
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


// For the searched restaurnt by the city name
exports.getAllRestaurantNameByCityName = (req,res)=>{
    let criteria = {city: req.params.cName };

    Restaurant.find(criteria)
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


// for the cuisine methods  // for the sort method we use sort  and in sort 1:- is for ascending order  and -1:- is for the descending order

exports.getAllRestaurantsByFilter = (req,res)=>{
  
    // start // location filter OR Location Dropdown (location filtered by city id and city name)
    let filter={};
    if(req.body.city_id){
        filter.city = req.body.city_id;
    }
    // ends location filter OR Location Dropdown

    // Start cuisine
    if(req.body.cuisine && req.body.cuisine.length > 0){
        filter['Cuisine.name']={$in: req.body.cuisine}
    }
    // End cuisine

    // Start Costing Part
    if(req.body.lcost!= '' && req.body.lcost == 0){
        filter.cost ={
            $lte:req.body.hcost
        }
    }        


    if(req.body.lcost && req.body.hcost){
        filter.cost ={
            $lte:req.body.hcost ,
            $gt:req.body.lcost
        }
    }
    // End Costing Part


    // start sorting by (low to high) and (high to low)
    let sort = 1;
    console.log(req.body.sort);
    if (req.body.sort){
        sort = req.body.sort;
    }
    // end sorting by (low to high) and (high to low)

    Restaurant.find(filter).limit(2).skip(2*(req.params.pageNo-1)).sort({cost: sort})
    .then(
       result=>{ 
        Restaurant.find(filter).count( (err,count)=>{
            if(err)
            console.log(err)
            else
            res.status(200).json({
                Message:'Data fetched successfully',
                data: result,
                totalRecords: count
            })
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

// For the searched restaurnt by the restaurant name with city id

exports.getRestaurantDetails =(req,res)=>{
    let criteria={
        name:req.params.name
    }
    Restaurant.findOne(criteria)
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
                 Message:'Some Error Occured',
                 error: error
             })
         }
     )
}