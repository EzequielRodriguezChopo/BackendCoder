class ProductManager {
   constructor() {
      this.arr = [];
   }
   addProduct(title, description, price, thumbnail, code, stock) {
      let product = {
         title,
         description,
         price,
         thumbnail,
         code,
         stock,
      };
      let finded = this.arr.find((e) => e.code === product.code);
      if (this.arr.length == 0) {
         product["id"] = this.arr.length + 1;
         this.arr.push(product);
         console.log("Producto agregado con exito");
      } else {
         if (finded) {
            console.log("El producto ya existe");
         } else {
            product["id"] = this.arr[this.arr.length - 1].id + 1;
            this.arr.push(product);
            console.log("Producto agregado con exito");
         }
      }
      //console.log(this.arr);
   }
   getProducts() {
      return this.arr;
   }
   getProductById(idProduct) {
      let productFinded = this.arr.find((e) => e.id == idProduct);
      if (productFinded) {
         console.log(productFinded);
      } else {
         console.log("Not Found");
      }
   }
}

const product1 = new ProductManager();

product1.addProduct("Pan", "Hecho con harina", 500, "Imagen de Pan.jpeg", "ar025", 52);
product1.addProduct("Pan", "Hecho con harina", 500, "Imagen de Pan.jpeg", "ar025", 52);
product1.addProduct("Bizcochos", "Hecho con harina", 200, "Imagen de Bizcocho.jpeg", "ar022", 22);
product1.addProduct("Chipa", "Hecho con harina", 300, "Imagen de Chipa.jpeg", "ar021", 22);
//console.log(product1.getProducts());
product1.getProductById(3);
product1.getProductById(7);
