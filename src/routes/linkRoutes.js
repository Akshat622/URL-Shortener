import express from "express"
import { createLink, getMyLinks } from "../controllers/linkController.js"
import protect from "../middleware/auth.js"
import { validateCreateLink } from "../middleware/validators.js"

const router = express.Router()

router.post("/", protect, validateCreateLink, createLink)
router.get("/", protect, getMyLinks)

export default router