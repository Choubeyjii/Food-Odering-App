const Menu = require('../model/menu')

exports.getMenuByRestaurant = (req,res)=>{
    let filter={
        restaurantName:req.params.rName
    }
    Menu.find(filter)
    .then(
        result=>{
            res.status(200).json({message:"Menu fetched Successfully",data:result})
        }
    )
    .catch(e=>res.status(500).json({message:"Error in DB",error:e}))
}