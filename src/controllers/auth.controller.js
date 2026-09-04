import bcrypt from "bcrypt"
import User from "../models/User.js"
import jwt  from "jsonwebtoken"

export const register = async (req,res)=>{
    try{
        const {email,password} = req.body

        const existingUser=await User.findOne({email})

        if(existingUser){
             res.status(400).json({
                success:"false",
                message:"User already exist"
                
            }) 
        }

        const hashedpassword = await bcrypt.hash(password,10)

        const user= await User.create({
            email,
            password:hashedpassword,
        })
         res.status(200).json({
            success:true,
            message:"User successfully registered",
            userId:user._id
        })
        
    }
    catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

export const login=async (req,res)=>{
try{
    const {email,password}=req.body

    const user = await User.findOne({email})

    if(!user){
        res.status(404).json({
            success:false,
            message:"Invalid Credentials"
        })
    }

    const isMatch=await bcrypt.compare(password,user.password)

    if(!isMatch){
        res.status(401).json({
                success:false,
                message:"Password incorrect"
        })

    }
    const token= jwt.sign(
        {userId:user._id},
       process.env.JWT_SECRET ,
       {expiresIn:"7d"}

    )

    res.status(200).json({
        success:true,
        message:"Login Successfull"
    })
}
catch(error){
    res.status(500).json({
        success:false,
        message:error.message
    })
}

}