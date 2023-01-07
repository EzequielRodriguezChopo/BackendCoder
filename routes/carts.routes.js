import { Router } from "express";
import userManager from "../src/productManager.js";
const router = Router();

router.post("/", async (req, res) => {
   await userManager.createCart();
   res.send("Carrito creado con exito");
});
router.get("/:cid", async (req, res) => {
   let { cid } = req.params;
   cid = Number(cid);
   let carrito = await userManager.getCart(cid);
   res.json(carrito);
});
router.post("/:cid/product/:pid", async (req, res) => {
   let { cid, pid } = req.params;
   cid = Number(cid);
   pid = Number(pid);
   let msj = await userManager.addProductToCart(cid, pid);
   res.send(msj);
});
export default router;
