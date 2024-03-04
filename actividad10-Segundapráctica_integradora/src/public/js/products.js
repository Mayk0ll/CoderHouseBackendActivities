const changePage = (page = 1) => {
    const category = document.getElementById('categoria').value;
    const ordenar_precio = document.getElementById('ordenar_precio').value || 1;
    window.location.href = `/render/products?page=${page}&direction=${ordenar_precio}&category=${category}`;
};  

const addCart = (id) => {
    console.log(id)
    fetch(`/api/carts/65b5d0657a57b1ee8964317f/cart/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    })
};