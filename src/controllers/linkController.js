import nanoid from "nanoid"
import Link from "../models/Link.js"
import Link from "../models/Link.js"

export const createLink = async (req,res)=>{
    try{
        const {orignialUrl}=req.body

        if(!orignialUrl){
            return res.status(400).json({
                success:false,
                message:"Original URL required"
            })
        }
        const code = nanoid(7)

        const link= await Link.create({
            code,
            orignialUrl,
            owner:req.userId
        })


    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const redirectLink= async (req,res) =>{
    try{
        const {code}=req.params

        const link=await Link.foundOne({code})

        if(!link){
            return res.status(404).json({
                success:false,
                message:"Link not found"
            })
        }

    }
    catch(error){
        return res.status
    }


}
