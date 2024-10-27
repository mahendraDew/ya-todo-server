const express = require("express");
const connectDB = require('./config/db');
const dotenv = require("dotenv");
dotenv.config();
const cors = require('cors');

//express app
const app = express();
const port = process.env.PORT;

//importing routers
const { userRouter } = require("./routes/user");
const { todoRouter } = require("./routes/todo");

app.use(express.json());
app.use(cors());

//routes
app.get("/healthy", (req, res)=> { 
    console.log("/healthy got hit")    
    res.send("I am Healthy")
});

//  start writing your routes here
app.use("/api/v1/user", userRouter);
app.use("/api/v1/todo", todoRouter);


//app-listening-log
async function main() {
    await connectDB();
    app.listen(port, ()=> console.log(`server is running at http://localhost:${port}`));
}
main()