import fs from "fs";

class ProductManager {
   constructor(path, pathCart) {
      this.path = path;
      this.pathCart = pathCart;
      if (fs.existsSync(path)) {
         this.arr = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      } else {
         this.arr = [];
      }
      if (fs.existsSync(pathCart)) {
         this.cart = JSON.parse(fs.readFileSync(this.pathCart, "utf-8"));
      } else {
         this.cart = [];
      }
   }

   async createCart() {
      let cartNew = {
         products: [],
      };
      if (this.cart.length == 0) {
         cartNew["id"] = this.cart.length + 1;
         this.cart.push(cartNew);
         console.log("Carrito creado con exito");
         await fs.promises.writeFile(this.pathCart, JSON.stringify(this.cart, null, "\t"));
      } else {
         cartNew["id"] = this.cart[this.cart.length - 1].id + 1;
         this.cart.push(cartNew);
         console.log("Producto agregado con exito");
         await fs.promises.writeFile(this.pathCart, JSON.stringify(this.cart, null, "\t"));
      }
   }

   async getCart(idc) {
      try {
         if (fs.existsSync(this.pathCart)) {
            let carrito = this.cart;
            let cartFinded = carrito.find((e) => e.id == idc);
            if (cartFinded) {
               console.log(cartFinded);
               return cartFinded.products;
            } else {
               console.log("Not Found");
               return "No existe el carrito deseado";
            }
         }
      } catch (err) {
         throw err;
      }
   }

   async addProductToCart(idc, pid) {
      try {
         if (fs.existsSync(this.pathCart)) {       // Verifico si existe el archivo "Carrito"
            if (fs.existsSync(this.path)) {        // Verifico si exixte el archivo "Productos"
               let productos = this.arr;
               let ifProductExist = productos.find((e) => e.id === pid);
               if (ifProductExist) {               // Si existe el producto...
                  let carrito = this.cart;
                  let cartFinded = carrito.find((e) => e.id == idc);
                  if (cartFinded) {                // Si existe el carrito...
                     let productfind = cartFinded.products.find((e) => e.product === pid);
                     if (productfind) {            // Si encuento el producto dentro del carrito...
                        cartFinded.products[cartFinded.products.indexOf(productfind)] = {
                           product: pid,
                           quantity: cartFinded.products[cartFinded.products.indexOf(productfind)].quantity + 1,
                        };
                     } else {                      // Sino hay ese producto lo creo con "quantity=1"
                        cartFinded.products.push({
                           product: pid,
                           quantity: 1,
                        });
                     }
                     let index = carrito.findIndex(function (el) {   // Busco el index del carrito modificado
                        return el.id == cartFinded.id;
                     });
                     carrito.splice(index, 1, cartFinded);        // Reemplazo en mi array de objeto original, por el carrito modificado
                     console.log(carrito);
                     await fs.promises.writeFile(this.pathCart, JSON.stringify(carrito, null, "\t"));
                     return "Carrito modificado con exito";
                  } else {
                     console.log("Not Found");
                     return "No existe el carrito deseado";
                  }
               } else {
                  console.log("El producto seleccionado no existe");
                  return "El producto seleccionado no existe";
               }
            } else {
               console.log("Archivo no existe");
               return "Archivo no existe";
            }
         }
      } catch (err) {
         throw err;
      }
   }

   async addProduct(title, description, code, price, status, stock, category, thumbnails) {
      let product = {
         title,
         description,
         code,
         price,
         status,
         stock,
         category,
         thumbnails,
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
               return productFinded;
            } else {
               console.log("Not Found");
            }
         }
      } catch (err) {
         throw err;
      }
   }

   async updateProduct(title, description, code, price, status, stock, category, thumbnails, idProducto) {
      let actualizedProduct = {
         title,
         description,
         code,
         price,
         status,
         stock,
         category,
         thumbnails,
         id: idProducto,
      };
      console.log(actualizedProduct);
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
      await fs.promises.writeFile(this.path, JSON.stringify(this.arr, null, 2));
   }
}

//const product1 = new ProductManager("./database.json");

//product1.addProduct("Pan", "Hecho con harina", 500, "Imagen de Pan.jpeg", "ar025", 52);
//product1.addProduct("Pan", "Hecho con harina", 500, "Imagen de Pan.jpeg", "ar025", 52);
//product1.addProduct("Bizcochos", "Hecho con harina", 200, "Imagen de Bizcocho.jpeg", "ar022", 22);
//product1.addProduct("Chipa", "Hecho con harina", 300, "Imagen de Chipa.jpeg", "ar021", 22);
//console.log(product1.getProducts()); // Va a devolver todos los productos de mi archivo
//product1.getProductById(3); //Busca en el carrito un id=3
//product1.getProductById(7); //Busca un id que no existe
//product1.updateProduct(4, "Prod Act", "Hecho con harina", 300, "Imagen de Chipa.jpeg", "ar021", 22);
//product1.deleteProduct(4); //Elimina el producto cuyo id es el 4

export default new ProductManager("./src/productos.json", "./src/carrito.json");
