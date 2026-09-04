import express from "express"
import { createLink } from "../controllers/linkController.js"
import { Router } from "express"
import protect from "../middleware/authMiddleware.js"


const router=Router.express()

router.post('/',protect,createLink);

export default router

