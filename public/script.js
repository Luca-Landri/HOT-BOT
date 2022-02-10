let socket = io("79.43.35.3:8000")
let messagesDOM = document.getElementById("messages")
let form = document.querySelector("form")
let input = document.querySelector("input")
//localStorage = window.localStorage;

//let messages = [];

form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (input.value) {
        messagesDOM.innerHTML +=
            `<div class="message">
                <img class="avatar" src="https://avatars.dicebear.com/api/adventurer/finocchiello.svg">
                <div class="my other">
                    <h4>Luca Landriscina </h4>
                    <p>${input.value}</p>
                    <span>9:14</span>
                </div>
            </div>`;
        socket.emit('message', input.value)
        console.log(input.value)
        input.value = ''
    }
})

socket.on('message', (msg) => {
    messagesDOM.innerHTML +=
    `<div class="message">
        <img class="avatar" src="https://avatars.dicebear.com/api/adventurer/finocchiello.svg">
        <div class="my other">
            <h4>Luca Landriscina </h4>
            <p>${msg}</p>
            <span>9:14</span>
        </div>
    </div>`;
})


/*function sendMessage(msg){
    let message = {
        "msg" : msg,
        "author" : author,
        "date" : new Date()
    }
}*/

function saveMessage(message) {
    //messages.push(message);
    //localStorage.setItem('messages', JSON.stringify(messages));
}
