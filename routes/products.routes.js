import { Router } from "express";
import userManager from "../src/productManager.js";
const router = Router();

router.get("/", async (req, res) => {
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
router.get("/:id", async (req, res) => {
   const { id } = req.params;
   const users = await userManager.getProductById(id);
   res.json(users);
});
router.post("/", async (req, res) => {
   const { title, description, code, price, status, stock, category, thumbnails } = req.body;

   if (!title) {
      throw new Error("Title is required");
   } 
   if (!description) {
      throw new Error("Description is required");
   }
   if (!code) {
      throw new Error("Code is required");
   }
   if (!price) {
      throw new Error("Price is required");
   }
   if (!status) {
      throw new Error("Status is required");
   }
   if (!stock) {
      throw new Error("Stock is required");
   }
   if (!category) {
      throw new Error("Category is required");
   }
   if (!thumbnails) {
      throw new Error("Thumbnails is required");
   }
   await userManager.addProduct(title, description, code, price, status, stock, category, thumbnails);
   res.send("Producto agregado con exito");
});
router.put("/:id", async (req, res) => {
   let { id } = req.params;
   id = Number(id);
   const { title, description, code, price, status, stock, category, thumbnails } = req.body;

   if (!title) {
      throw new Error("Title is required");
   }
   if (!description) {
      throw new Error("Description is required");
   }
   if (!code) {
      throw new Error("Code is required");
   }
   if (!price) {
      throw new Error("Price is required");
   }
   if (!status) {
      throw new Error("Status is required");
   }
   if (!stock) {
      throw new Error("Stock is required");
   } 
   if (!category) {
      throw new Error("Category is required");
   }
   if (!thumbnails) {
      throw new Error("Thumbnails is required");
   }
   if (!id) {
      throw new Error("Id is required");
   }
   await userManager.updateProduct(title, description, code, price, status, stock, category, thumbnails, id);
   res.send("Producto actualizado con exito");
});
router.delete("/:id", async (req, res) => {
    let { id } = req.params;
    id = Number(id);
    const users = await userManager.deleteProduct(id);
    res.send("Producto eliminado")
 });
export default router;
