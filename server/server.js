import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import bookRoutes from "./routes/book.routes.js";
import userRoutes from "./routes/user.routes.js"
import cors from "cors"


dotenv.config();
const app=express();

app.use(express.json());
connectDB();


app.use(cors());

app.get("/", (req, res) => {
    res.send("Welcome to the Library-Management-System");

});
// Routes
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);

  

const port =process.env.PORT;

app.listen(port,()=>{
    console.log(`server connected on PORT ${port}`)
});