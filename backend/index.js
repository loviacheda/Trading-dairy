import express from "express"
import authRoutes from "./routes/auth.js"
import roomRoutes from "./routes/rooms.js"
import dealRoutes from "./routes/deals.js"
import tableRoutes from "./routes/tables.js"
import cookieParser from "cookie-parser";

const app=express()


app.use(express.json());
app.use(cookieParser());
app.use("/backend/auth", authRoutes)
app.use("/backend/rooms", roomRoutes)
app.use("/backend/deals", dealRoutes)
app.use("/backend/tables", tableRoutes)


app.get("/", (req, res)=>
    res.json("hello from the backend")
) 


app.listen(8800, ()=>{
    console.log("Connected")
})