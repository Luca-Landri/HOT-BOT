let socket = io("87.21.74.178:8000");
let messagesDOM = document.getElementById("messages");
let form = document.querySelector("form");
let input = document.querySelector("input");
let date = new Date();
let modalElement = document.getElementById("modalUsername");
let modal = new bootstrap.Modal(modalElement);
let usernameFromCookies = JSON.parse(localStorage.getItem("Username"));
let modalForm = document.querySelector("#identityForm");
let hour = ""
let username = ""

console.log(usernameFromCookies);
usernameModal();

function namePrinter() {
    socket.on("name", (name) => {
        return `<h4>${name}</h4>`
    }) 
}

function usernameModal(){
    if (usernameFromCookies !=  null ) return //Se usernameFromCache è settato termina la funzione
    //Altrimenti continua e fai il resto
    modal.show();

    modalForm.addEventListener("submit", (e) => {
        e.preventDefault();
        username = modalForm.querySelector("input").value;
    
        if (username != "") {
          modal.hide();
          localStorage.setItem("Username", JSON.stringify(username));
        } else {
          //Shake modal or smth
          modalElement.classList.add("errorShake");
          setTimeout(() => {
            modalElement.classList.remove("errorShake");
          }, 500);
        }
        console.log(username);
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let hour = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  setInterval(() => {
    hour = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  }, 1000);

  if (input.value) {
    messagesDOM.innerHTML += `<div class="message enter-animation">
                <img class="avatar" src="https://avatars.dicebear.com/api/adventurer/finocchiello.svg">
                <div class="my-focus">
                    <h4>${username}</h4>
                    <p>${input.value}</p>
                    <span>${hour}</span>
                </div>
            </div>`;
    socket.emit("message", input.value);

    input.value = "";
  }
  messagesDOM.scrollTop = messagesDOM.scrollHeight; //Updates height and scrolls to bottom
  removeAnimation();
});
socket.on("name", (name) => {
    username = name
})

console.log(username)

socket.on("message", (msg) => {
  let hour = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  setInterval(() => {
    hour = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  }, 1000);
  messagesDOM.innerHTML += `<div class="message other enter-animation">
    <div class="other-focus">
    ${namePrinter()}
    <p>${msg}</p>
    <span>${hour}</span>
    </div>
    <img class="avatar" src="https://avatars.dicebear.com/api/adventurer/finocchiello.svg">
    </div>`;
  messagesDOM.scrollTop = messagesDOM.scrollHeight;
  removeAnimation(); //Updates height and scrolls to bottom
});

function removeAnimation() {
  setTimeout(() => {
    messagesDOM.lastChild.classList.remove("enter-animation");
  }, 300);
}

//TODO Load only the last 10 messages and unload the others
