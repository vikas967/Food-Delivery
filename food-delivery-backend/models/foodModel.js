import mongoose from "mongoose"

const foodSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:Number,
        required: true
    },
    price:{
     type: Number,
     required:true
    },
    image : {
        type: String,
        required: true
    },
    category:{
        type: String,
        required:true
    }
})

// yha dhyan dena h ek baar 

const foodModel = mongoose.models.foodModel || mongoose.model("foodModel",foodSchema)

export default foodModel;