const express = require("express");
const connectDB = require("./config/db.js");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

//database connection
connectDB();

//express app
const app=express();
app.use(cors(({ origin: "https://e-commerce-git-main-sanskarkanades-projects.vercel.app/" })));
app.use(express.json());

//routes
app.use("/api/product",require("./routes/productroutes"));
app.use("/api/user", require("./routes/userroutes"));
app.use("/api/cart", require("./routes/cartroutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
const paymentRoutes = require("./routes/paymentRoutes");
app.use("/api/payment", paymentRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{console.log(`Server running on port ${PORT}`)});