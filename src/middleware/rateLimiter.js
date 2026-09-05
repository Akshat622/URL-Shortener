import rateLimit from "express-rate-limit";

export const authLimiter= rateLimit({
    windowms:15*60*60,
    max:10,
    message:{
        success:false,
        message:"Too many attempts,Please try again Later"
    },
    standardHeaders:true,
    legacyHeaders:true

})