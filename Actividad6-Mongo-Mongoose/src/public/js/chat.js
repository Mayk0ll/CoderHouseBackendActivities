const socket = io();
let email = '';

const logueo = async () => {
    Swal.fire({
        title: "Submit your Email",
        input: "text",
        inputAttributes: {
          autocapitalize: "off"
        },
        allowOutsideClick: false,
        confirmButtonText: "Join",
        showLoaderOnConfirm: true,
    }).then((result) => {
        if (result.isConfirmed) email = result.value;
        socket.emit('client:join', email);
    });
}
logueo();

const sendMsg = async (event) => {
    if(event.key !== 'Enter') return;
    const message = document.getElementById('message').value;
    socket.emit('client:sendMsg', {message, user: email});
    document.getElementById('message').value = '';
}

socket.on('server:join', (data) => {
    console.log(data);
    let containerHistoryChat = document.getElementById('containerHistoryChat');
    containerHistoryChat.innerHTML += `
        <p class="azul"><strong>${data} se ha conectado al chat</strong></p>
    `;
})

socket.on('server:historial', data => {
    let containerHistoryChat = document.getElementById('containerHistoryChat');
    containerHistoryChat.innerHTML = '';
    
    for(const msg of data) {
        containerHistoryChat.innerHTML += `<p><strong>${msg.user}:</strong> ${msg.message}</p>`
    }
})
