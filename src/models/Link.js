import mongoose from "mongoose";

const linkSchema=new mongoose.Schema({
    code:{
       type:String,
        required:true,
        unique:true

    },
    originalUrl:{
       type: String,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    clickcount:{
        type:Number,
        default:0,
        
    }

},{timestamps:true})


linkSchema.index({owner:1,createdAt:-1})
const Link=mongoose.model("Link",linkSchema);

export default Link