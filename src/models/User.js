import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"I need this baby"],
        unique:true,
        trim:true,
        lowercase:true

    },
    password:{
        type:String,
        reqquired:true,

    }
},{timestamps:true})

const User= new mongoose.model("User",UserSchema);

export default User