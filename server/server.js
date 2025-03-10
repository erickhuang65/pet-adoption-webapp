import express from "express";
import cors from 'cors';
import dotenv from  'dotenv';
import router from "./routes/api.routes.js";

const app = express();

// middleware
app.use(express.json(), cors())

dotenv.config();
const PORT = process.env.PORT;

// routes
app.use("/api", router );

app.listen(PORT, () => 
    console.log(`Server is up on PORT: ${PORT}`)
); 
