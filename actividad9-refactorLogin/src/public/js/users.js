
const login = () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if( !email || !password ) return alert('Verfica que todos los campos esten llenos')
    
    fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
    }).then(res => res.json()).then(data => {
        const {status, data: user} = data;
        if (status != 'success') return alert('Email o contraseña invalidos')
        window.location.href = 'http://localhost:8080/render/products'
    }).catch(err => console.log(err))
}

const register = () => {
    const first_name = document.getElementById('nombre').value;
    const last_name = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if( !first_name, !last_name, !email || !password ) return alert('Verfica que todos los campos esten llenos')
    
    fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({first_name, last_name, email, password})
    }).then(res => res.json()).then(data => {
        const {status, data: user} = data;
        if (status != 'success') return alert('Registro no valido')
        window.location.href = 'http://localhost:8080/render/products'
    }).catch(err => console.log(err))
}

const goRegister = () => {
    window.location.href = 'http://localhost:8080/render/register'
}

const goLogin = () => {
    window.location.href = 'http://localhost:8080/render/login'
}


const logout = async () => {
    await fetch('http://localhost:8080/api/auth/logout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
    })
    window.location.href = 'http://localhost:8080/render/login'
}