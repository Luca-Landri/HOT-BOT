let socket = io("79.43.35.3:8000");
let messagesDOM = document.getElementById("messages")
let form = document.querySelector("form")
let input = document.querySelector("input")
localStorage = window.localStorage;

let messages = [];

form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (input.value) {       
        createMessageDOM();
        input.value = ''
    }
})

socket.on('message', (msg) => {
    createMessageDOM(msg)
})

//Crea e inserisce nel dom il messaggio
function createMessageDOM(message){
    item = document.createElement("div")
    item.textContent = message.msg;
    messagesDOM.appendChild(message.msg)
}


//Crea il messaggio e lo invia via websocket
function sendMessage(msg, author){
    let message = {
        "msg" : msg,
        "author" : author,
        "date" : new Date()
    }
    socket.emit('message', message)
}


//Salva il messaggio nel local storage
function saveMessage(message){
    messages.push(message);
    localStorage.setItem('messages', JSON.stringify(messages));
}
