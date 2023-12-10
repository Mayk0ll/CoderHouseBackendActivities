const fs = require('fs');
const { promises: fsp} = require('fs');

class ProductManager {
    products = [];
    #rutaProduts = `${__dirname}/../db/products.json`;

    constructor(){
        const exist = fs.existsSync(this.#rutaProduts);
        if(!exist) fs.writeFileSync(this.#rutaProduts, '[\n]', 'utf-8')
    }

    async addProduct(title, description, price, thumbnail, code, stock){ 
        if(!title || !description || !price || !thumbnail || !code || !stock) return console.log('Todos los campos son obligatorios')

        const dataProducts = await this.readFile();
        const existProduct = dataProducts.some(prod => prod.code == code) 
        if(existProduct) return console.log('Se ha encontrado un producto con el mismo codigo')
        

        const id = await this.getNewId();
        dataProducts.push({id, title, description, price, thumbnail, code, stock});    
        
        await this.safeFile(dataProducts);
    }

    async getAllProducts(){
        return await this.readFile();
    }

    async getProductsById(id){
        const allProducts = await this.readFile();
        const findProduct = allProducts.find(prod => prod.id == id);
        return findProduct ? findProduct : "no se encontro un producto con ese ID";
    }

    async updateProduct(id, title, description, price, thumbnail, code, stock){
        const allProducts = await this.readFile();
        const i = allProducts.findIndex(p => p.id == id);
        if(i < 0) return console.log('no se encontro un producto con ese ID');
        const newProduct = { ...allProducts[i], title, description, price, thumbnail, code, stock };
        
        allProducts[i] = newProduct;
        await this.safeFile(allProducts)
    }

    async deleteProduct(id){
        const allProducts = await this.readFile();
        const newAllProducts = allProducts.filter(p => p.id != id)
        await this.safeFile(newAllProducts);
    }

    async getNewId() {
        try {
            const allProducts = await this.readFile();
            return allProducts.length > 0 ? Math.max(...allProducts.map(producto => producto.id)) + 1 : 1;
        } catch (error) {
            console.log(console.log(err))
        }
    }

    async readFile(){
        try {
            return JSON.parse(await fsp.readFile(this.#rutaProduts, 'utf-8'));
        } catch (err) {
            console.log(console.log(err))
        }
    }
    
    async safeFile(allProducts){
        try {
            const productsJSON = JSON.stringify(allProducts, null, 2);
            await fsp.writeFile(this.#rutaProduts, productsJSON, 'utf-8');
        } catch (err) {
            console.log(console.log(err))
        }
    }
}

module.exports = ProductManager;