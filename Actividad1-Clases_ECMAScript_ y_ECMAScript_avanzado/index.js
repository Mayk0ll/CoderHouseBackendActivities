class ProductManager {

    constructor(){
        this.products = [];
    }

    addProduct(title, description, price, thumbnail, code, stock){

        const existProduct = this.products.some(prod => prod.code == code)

        if(existProduct) return console.log('Se ha encontrado un producto con el mismo codigo')
        if(!title || !description || !price || !thumbnail || !code || !stock) return console.log('Todos los campos son obligatorios')

        const id = this.getNewId();
        this.products.push({id, title, description, price, thumbnail, code, stock});           
    }

    getProducts(){
        return console.log(this.products)
    }

    getProductsById(id){
        const findProduct = this.products.find(prod => prod.id == id);
        return findProduct ? console.log(findProduct) : console.log("no se encontro un producto con ese ID");
    }

    getNewId(){
        return this.products.length > 0 ? Math.max(...this.products.map(producto => producto.id))+1 : 0
    }
}


//creacion de instancias
const products = new ProductManager();

//ingreso de productos
products.addProduct('Monitor 24"', 'es un monitor', 15, 'https://monitor.jpg', 12, 1000);
products.addProduct('Monitor 22"', 'es un monitor', 10, 'https://monitor2.jpg', 34, 900);
products.addProduct('Monitor 20"', 'es un monitor', 10, 'https://monitor3.jpg', 56, 800);
products.addProduct('teclado"', 'es un teclado', 20, 'https://teclado.jpg', 78, 60);
products.addProduct('Mouse x3"', 'es un mouse', 15, 'https://mousex3.jpg', 910, 50);
products.addProduct('Mouse x4"', 'es un mouse', 25, 'https://mousex4.jpg', 1112, 70);

//consultar productos
// products.getProducts();

//consultar un producto
// products.getProductsById(3);

//producto sin un parametro
// products.addProduct('es un mouse', 2, 'https://mousex4.jpg', 1112, 70);

//pruducto con el code repetido
// products.addProduct('Mouse x4"', 'es un mouse', 2, 'https://mousex4.jpg', 1112, 70);