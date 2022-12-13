const fs = require("fs");

class ProductManager {
   constructor(path) {
      this.path = path;
      if (fs.existsSync(path)) {
         this.arr = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      } else {
         this.arr = [];
      }
   }
   async addProduct(title, description, price, thumbnail, code, stock) {
      let product = {
         title,
         description,
         price,
         thumbnail,
         code,
         stock,
      };
      if (this.arr.length == 0) {
         product["id"] = this.arr.length + 1;
         this.arr.push(product);
         console.log("Producto agregado con exito");
         await fs.promises.writeFile(this.path, JSON.stringify(this.arr, null, "\t"));
      } else {
         product["id"] = this.arr[this.arr.length - 1].id + 1;
         this.arr.push(product);
         console.log("Producto agregado con exito");
         await fs.promises.writeFile(this.path, JSON.stringify(this.arr, null, "\t"));
      }
   }
   async getProducts() {
      try {
         if (fs.existsSync(this.path)) {
            let productos = this.arr;
            console.log(productos);
            return productos;
         } else {
            console.log("Archivo no existe");
            return "Archivo no existe";
         }
      } catch (err) {
         throw err;
      }
   }
   async getProductById(idProduct) {
      try {
         if (fs.existsSync(this.path)) {
            let producto = this.arr;
            let productFinded = producto.find((e) => e.id == idProduct);
            if (productFinded) {
               console.log(productFinded);
            } else {
               console.log("Not Found");
            }
         }
      } catch (err) {
         throw err;
      }
   }

   async updateProduct(idProducto, title, description, price, thumbnail, code, stock) {
      let actualizedProduct = {
         title,
         description,
         price,
         thumbnail,
         code,
         stock,
         id: idProducto,
      };
      let finded = this.arr.find((e) => e.id === idProducto);
      let posicionObj = finded.id - 1;
      this.arr[posicionObj] = actualizedProduct;
      console.log(this.arr);

      if (this.arr.length == 0) {
         console.log("No hay productos para actualizar");
      } else {
         console.log("Producto actualizado con exito");
         await fs.promises.writeFile(this.path, JSON.stringify(this.arr, null, "\t"));
      }
   }

   async deleteProduct(idProducto) {
      let finded = this.arr.find((e) => e.id === idProducto);
      let posicionObj = finded.id - 1;
      let removed = this.arr.splice(posicionObj, 1);
      console.log("Producto borrado con exito");
      await fs.promises.writeFile("./database.txt", JSON.stringify(this.arr, null, 2));
   }
}

const product1 = new ProductManager("database.json");

product1.addProduct("Pan", "Hecho con harina", 500, "Imagen de Pan.jpeg", "ar025", 52);
product1.addProduct("Pan", "Hecho con harina", 500, "Imagen de Pan.jpeg", "ar025", 52);
product1.addProduct("Bizcochos", "Hecho con harina", 200, "Imagen de Bizcocho.jpeg", "ar022", 22);
product1.addProduct("Chipa", "Hecho con harina", 300, "Imagen de Chipa.jpeg", "ar021", 22);
//console.log(product1.getProducts()); // Va a devolver todos los productos de mi archivo
product1.getProductById(3); //Busca en el carrito un id=3
product1.getProductById(7); //Busca un id que no existe
product1.updateProduct(4, "Prod Act", "Hecho con harina", 300, "Imagen de Chipa.jpeg", "ar021", 22);
//product1.deleteProduct(4); //Elimina el producto cuyo id es el 4
