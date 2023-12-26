const socket = io();

socket.on('server:listProducts', products => {
    const containerCard = document.getElementById('containerCard');
    containerCard.innerHTML = ''
    products.forEach( product => {
        containerCard.innerHTML += `
        <div class="card">
            <div class="imgCard">
                <img src="/images/imgcards.png" alt="">
            </div>
            <br>
            <div class="infCard">
                <p><strong>Nombre:</strong> ${product.title}</p>
                <p><strong>Descripcion:</strong> ${product.description}</p>
                <p><strong>Precio:</strong> ${product.price}$</p>
            </div>
            <div class="alingCenter">
                <button onclick="borrar(${product.id})">Borrar</button>
            </div>
        </div>
        `
    })

    
})

const form = document.getElementById('formCreate')
form.addEventListener('submit', (e) => handleSave(e))

const handleSave = (e) => {
    e.preventDefault();

    const title = e.target[0].value
    const description = e.target[1].value
    const code = e.target[2].value
    const price = e.target[3].value
    const stock = e.target[4].value
    const category = e.target[5].value

    if(!title, !description, !code, !price, !stock, !category){
        return Swal.fire({
            title: 'Error!',
            text: 'No se puede crear el producto, porque uno de los campos esta vacio, por favor valida',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
    }
    
    Swal.fire({
        title: "Esta seguro de crear este producto?",
        showDenyButton: true,
        confirmButtonText: "Guardar",
        denyButtonText: `Cancelar`,
        allowOutsideClick: false 
      }).then(async (result) => {
        if (result.isConfirmed) {
            socket.emit('client:createNewProducts', { title, description, code, price: Number(price), stock: Number(stock), category })
            Swal.fire("Producto guardado", "", "success");
        } 
      });
}

const borrar = async (id) => {

    Swal.fire({
        title: "Esta seguro de eliminar este producto?",
        showDenyButton: true,
        confirmButtonText: "Eliminar",
        denyButtonText: `Cancelar`,
        allowOutsideClick: false 
      }).then(async (result) => {
        if (result.isConfirmed) {
            socket.emit('client:deleteProduct', id)
            Swal.fire("Producto eliminado", "", "success");
        } 
      });
    
    
}