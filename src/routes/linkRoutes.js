import express from "express"
import { createLink } from "../controllers/linkController.js"
import { Router } from "express"
import protect from "../middleware/authMiddleware.js"
import { getmyLinks } from "../controllers/linkController.js"

const router=Router.express()

router.post('/',protect,getmyLinks);

export default router

