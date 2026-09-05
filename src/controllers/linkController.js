import nanoid from "nanoid"
import Link from "../models/Link.js"
import redis from "../config/redis.js"


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

        let orignialUrl= await redis.get(`url:${code}`)


        if(!orignialUrl){

            const link=await Link.findOne({code})
            if(!link){
            return res.status(404).json({
                success:false,
                message:"Link not found"
            })}

            orignialUrl=link.originalUrl

            await redis.set(`url:{code}`,orignialUrl,'EX',3600)

            link.clickcount +=1
             await link.save()

            res.redirect(301,originalUrl)
        }

    }
    catch(error){
        return res.status(500).json({
            success:false,
            meesage:error.message
        })
    }


}

export const getmyLinks= async (req,res)=>{
    try{
        const links=await Link.find({owner:req.userId}).sort({createdAt:-1})
        res.status(200).json({
            success:true,
            count:links.length,
            data:links,
        })

}
catch(error){
    res.status(500).json({
    success:false,
    message:error.message})
}
}
