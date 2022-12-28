import express from "express";
import userManager from "./productManager.js";
const app = express();

app.get("/products", async (req, res) => {
   let { limit } = req.query;
   const users = await userManager.getProducts();

   console.log(limit);
   if (limit) {
      let user = users.filter((e) => e.id <= limit);
      res.json(user);
   } else {
      res.json(users);
   }
});

app.get("/products/:id", async (req, res) => {
   const { id } = req.params;
   const users = await userManager.getProductById(id);
   res.json(users);
});

app.get("*",(req,res)=>{
    res.send("Error al escribir la el path")
})

app.listen(8080, () => console.log("Port is running on 8080"));
