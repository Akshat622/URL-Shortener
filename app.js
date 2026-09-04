import express from "express"
import { configDotenv } from "dotenv";
import { connectDB } from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js"
import linkRoutes from "./src/routes/linkRoutes.js"
configDotenv()
connectDB()
const app=express()

app.use(express.json())
const port=process.env.PORT||3000;

app.get("/health",(req,res)=>{
    res.status(200).json({
        success:true,
        message:"How are you baby"
    })

})
app.use('/api/links',linkRoutes)

app.listen(port,()=>{
    console.log(`Server is running on the ${port}`);
})
