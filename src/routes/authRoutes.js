import express from "express"

import { register } from "../controllers/auth.controller.js"
import { authLimiter } from "../middleware/rateLimiter.js"
import { validateRegister } from "../middleware/validator.js"
const router=express.Router()

router.post('/login',authLimiter,login)
router.post('/register',authLimiter,validateRegister,register)

export default router