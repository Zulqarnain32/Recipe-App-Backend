const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    description:{
        type:String,
    },
    ingredients:{
        type:String,
    },
    imageUrl:{
        type:String,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }

})
const RecipeModel = mongoose.model("recipemodal", RecipeSchema)
module.exports = RecipeModel 