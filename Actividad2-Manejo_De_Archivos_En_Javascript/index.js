const fs = require('fs');
const { promises: fsp} = require('fs');

class ProductManager {
    products = [];
    #rutaProduts = './db/products.json';

    constructor(){
        const exist = fs.existsSync(this.#rutaProduts);
        if(!exist) fs.writeFileSync(this.#rutaProduts, '[\n]', 'utf-8')
    }

    async addProduct(title, description, price, thumbnail, code, stock){ 
        if(!title || !description || !price || !thumbnail || !code || !stock) return console.log('Todos los campos son obligatorios')

        const dataProducts = await this.leerArchivo();
        const existProduct = dataProducts.some(prod => prod.code == code) 
        if(existProduct) return console.log('Se ha encontrado un producto con el mismo codigo')
        

        const id = await this.getNewId();
        dataProducts.push({id, title, description, price, thumbnail, code, stock});    
        
        await this.guardarArchivo(dataProducts);
    }

    async getProducts(){
        return console.log(await this.leerArchivo());
    }

    async getProductsById(id){
        const allProducts = await this.leerArchivo();
        const findProduct = allProducts.find(prod => prod.id == id);
        return findProduct ? console.log(findProduct) : console.log("no se encontro un producto con ese ID");
    }

    async updateProduct(id, title, description, price, thumbnail, code, stock){
        const allProducts = await this.leerArchivo();
        const i = allProducts.findIndex(p => p.id == id);
        if(i < 0) return console.log('no se encontro un producto con ese ID');
        const newProduct = { ...allProducts[i], title, description, price, thumbnail, code, stock };
        
        allProducts[i] = newProduct;
        await this.guardarArchivo(allProducts)
    }

    async deleteProduct(id){
        const allProducts = await this.leerArchivo();
        const newAllProducts = allProducts.filter(p => p.id != id)
        await this.guardarArchivo(newAllProducts);
    }

    async getNewId() {
        const allProducts = await this.leerArchivo();
        return allProducts.length > 0 ? Math.max(...allProducts.map(producto => producto.id)) + 1 : 1;
    }

    async leerArchivo(){
        try {
            return JSON.parse(await fsp.readFile(this.#rutaProduts, 'utf-8'));
        } catch (err) {
            console.log(console.log(err))
        }
    }

    async guardarArchivo(allProducts){
        const productsJSON = JSON.stringify(allProducts, null, 2);
        await fsp.writeFile(this.#rutaProduts, productsJSON, 'utf-8');
    }
}


//creacion de instancias
const products = new ProductManager();


const createProducts = async () => {
    //ingreso de productos
    await products.addProduct('Monitor 24', 'es un monitor', 15, 'https://monitor.jpg', 12, 1000);
    await products.addProduct('Monitor 22', 'es un monitor', 10, 'https://monitor2.jpg', 34, 900);
    await products.addProduct('Monitor 20', 'es un monitor', 10, 'https://monitor3.jpg', 56, 800);
    await products.addProduct('teclado', 'es un teclado', 20, 'https://teclado.jpg', 78, 60);
    await products.addProduct('Mouse x3', 'es un mouse', 15, 'https://mousex3.jpg', 910, 50);
    await products.addProduct('Mouse x4', 'es un mouse', 25, 'https://mousex4.jpg', 1112, 70);


    //consultar productos
    // await products.getProducts();

    //producto sin un parametro
    // await products.addProduct('es un mouse', 2, 'https://mousex4.jpg', 1112, 70);

    //pruducto con el code repetido
    // await products.addProduct('Mouse x4"', 'es un mouse', 2, 'https://mousex4.jpg', 1112, 70);

    //consultar un producto
    // await products.getProductsById(6);

    // producto a actualizar
    // const id = 5
    // await products.updateProduct(id, 'Mouse x10"', 'es un mouse muy poderoso', 25, 'https://mousex4.jpg', 1112, 70);
    // await products.getProductsById(id);

    //producto a eliminar
    // await products.deleteProduct(5)
    // await products.getProducts();

}
createProducts();