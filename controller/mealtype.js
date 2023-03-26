const MealType = require('../model/mealtype')

exports.getAllMealtype = (req,res)=>{
    MealType.find()
    .then(
        result=>{
            res.status(200).json({message:"MealType fetched Successfully",data:result})
        }
    )
    .catch(e=>res.status(500).json({message:"Error in DB",error:e}))
}