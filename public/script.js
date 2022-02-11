let socket = io("79.13.78.64:8000");
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
let userContainer = document.querySelector(".userContainer")

let data = {
  username: "",
  ness: ""
}

console.log(usernameFromCookies);
usernameModal();

function updateHour() {
  setInterval(() => {
    let hour = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  }, 1000);

  return hour
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
          data.username = localStorage.getItem("Username")
          socket.emit("data", data)
          
        } else {
          //Shake modal or smth
          modalElement.classList.add("errorShake");
          setTimeout(() => {
            modalElement.classList.remove("errorShake");
          }, 500);
        }
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let hour = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

  if (input.value) {
    messagesDOM.innerHTML += `<div class="message enter-animation">
                <img class="avatar" src="https://avatars.dicebear.com/api/human/finocchiello.svg">
                <div class="my-focus">
                    <h4>${data.username}</h4>
                    <p>${input.value}</p>
                    <span>${hour}</span>
                </div>
            </div>`;
    data.ness = input.value
    socket.emit("data", data);
    input.value = "";
  }
  messagesDOM.scrollTop = messagesDOM.scrollHeight; //Updates height and scrolls to bottom
  removeAnimation();
});

console.log(username)

socket.on("count", (userCount) => {
  console.log(userCount)
  for (let i = 0; i < userCount; i++) {
    console.log("ciao")
    userContainer.innerHTML += `
    <li class="person">
      <img class="avatar" src="https://avatars.dicebear.com/api/adventurer/finocchiello.svg">
      <div class="name">
          <h3>${socket.id}</h3>
          <h4>Stato</h4>
      </div>
    </li>`
  }

})

socket.on("dati", (dati) => {
  console.log(dati)
  let hour = date.getHours() + ":" + date.getMinutes();
  setInterval(() => {
    hour = date.getHours() + ":" + date.getMinutes();
  }, 1000);
  messagesDOM.innerHTML += `<div class="message other enter-animation">
    <div class="other-focus">
    <h4>${dati.username}</h4>
    <p>${dati.ness}</p>
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
