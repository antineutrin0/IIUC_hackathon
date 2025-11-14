import express from "express"
import 'dotenv/config'
import connectDB from "./database/db.js"
import userRoute from "./routes/userRoute.js"
import userProfile from "./routes/userProfileRoute.js"
import cors from 'cors'
import recruiterRoute from "./routes/recruiterRoute.js"
import courseProviderRoute from "./routes/courseProviderRoute.js"
import jobRoute from "./routes/jobRoute.js"
import resourceRoute from "./routes/resourceRoute.js"
import testroute from "./routes/test.js"
import geminiRoute from "./apiIntegration/gemini.js";
import roadmapRoute from "./routes/roadmapRoute.js"
import compareRouter from "./routes/compare.js";

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

// app.use('/auth', authRoute)
app.use('/user', userRoute)
app.use('/user/profile',userProfile);
app.use('/recruiter', recruiterRoute);
app.use('/course-provider', courseProviderRoute);
app.use('/jobs', jobRoute);
app.use('resource',resourceRoute);
app.use('/test',testroute);
app.use("/api/gemini", geminiRoute);
app.use('/roadmap', roadmapRoute);
app.use('/compare', compareRouter);
// http://localhost:8000/user/register


app.listen(PORT,()=>{
    connectDB()
    console.log(`Server is listening at port ${PORT}`);  
})