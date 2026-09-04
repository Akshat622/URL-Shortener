import jwt from "jsonwebtoken"

const protect = (req,res,next)=>{
    try{
        const authHeader= req.headers.authorization

        if(!authHeader || !authHeader.startsWith("Bearer "))

        return res.status(401).json({
            success:false,
            message:"No token provided"
        })

        const token=authHeader.split(" ")[1]

        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        req.userId=decoded.userId


        next()


    }
    catch(error){
        return res.status(401).json({
        succes:false,
        message : "Invalid or expired Token"})
    }
}

export default protect 