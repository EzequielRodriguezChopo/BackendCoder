import express from "express";
import productRoute from "../routes/products.routes.js"
import cartsRoute from "../routes/carts.routes.js"

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/products",productRoute)
app.use("/api/carts",cartsRoute)

app.get("*",(req,res)=>{
    res.send("Error al escribir la el path")
})

app.listen(8080, () => console.log("Port is running on 8080"));
