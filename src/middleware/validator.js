import { body,validationResult } from "express-validator";

export const validateRegister=[
    body("email").isEmail().withMessage("Email is required"),
    body("password").isLength("6").withMessage("Password must be at least 6 characters"),
    (req,res,next) => {
        const errors=validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                success:false,
                errors:errors.array(),
            })
        }
        next()
    }
]

export const validationCreateLink =[
    body('originalUrl').isURL().withMessage("URL Should be in correct format"),
    (req,res,next)=>{
        const errors=validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                success:false,
                errors:errors.array(),
            })
        }
        next()
    }
]
