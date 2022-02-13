let socket = io("79.13.78.64:8000");
let messagesDOM = document.getElementById("messages");
let form = document.querySelector("form");
let input = document.querySelector("input");
let date = new Date();
let modalElement = document.getElementById("modalUsername");
let modal = new bootstrap.Modal(modalElement);
let usernameFromCookies = localStorage.getItem("Username");
let imageFromCookies = localStorage.getItem("img");
let modalForm = document.querySelector("#identityForm");
let userContainer = document.querySelector(".userContainer")

let data = {
  username: "",
  mess: "",
  img: ""
}

let avatarType = ["male", "female", "human", "identicon", "initials", "bottts", "avataaars", "jdenticon"]
usernameModal();

function usernameModal(){
    if (usernameFromCookies !=  null && imageFromCookies != null ) return //Se usernameFromCache è settato termina la funzione
    //Altrimenti continua e fai il resto
    localStorage.setItem("img", data.img)
    modal.show();
    modalForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let username = modalForm.querySelector("input").value;
        let img = `https://avatars.dicebear.com/api/${avatarType[Math.floor(Math.random()*avatarType.length)]}/:seed.svg`
        localStorage.setItem("img", img)
    
        if (username != "") {
          modal.hide();
          localStorage.setItem("Username", username);
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

data.username = localStorage.getItem("Username")
data.img = localStorage.getItem("img")

form.addEventListener("submit", (e) => {
  //Get date object
  let date = new Date()
  e.preventDefault();
  if (input.value) {
    messagesDOM.innerHTML += `<div class="message enter-animation">
                <img class="avatar" src=${data.img}>
                <div class="my-focus">
                    <h4>${data.username}</h4>
                    <p>${input.value}</p>
                    <span>${(date.getHours()<10?"0":"")+date.getHours()+':'+ (date.getMinutes()<10?"0":"") + date.getMinutes() +":"+ (date.getSeconds()<10?"0":"") + date.getSeconds()}</span>
                </div>
            </div>`;
    data.mess = input.value
    socket.emit("data", data);
    input.value = "";
  }
  messagesDOM.scrollTop = messagesDOM.scrollHeight; //Updates height and scrolls to bottom
  removeAnimation();
});


socket.on("count", (users) => {
  console.log(users)
  for (let i = 0; i < users.length; i++) {
    userContainer.innerHTML += `
    <li class="person">
      <img class="avatar" src="https://avatars.dicebear.com/api/adventurer/finocchiello.svg">
      <div class="name">
          <h3>${data.username}</h3>
          <h4>Stato</h4>
      </div>
    </li>`
  }
})


socket.on("dati", (dati) => {
  //Get date object
  let date = new Date()
  console.log(dati)
  messagesDOM.innerHTML += `<div class="message other enter-animation">
    <div class="other-focus">
    <h4>${dati.username}</h4>
    <p>${dati.mess}</p>
    <span>${(date.getHours()<10?"0":"")+date.getHours()+':'+ (date.getMinutes()<10?"0":"") + date.getMinutes()+":"+ (date.getSeconds()<10?"0":"") + date.getSeconds()}</span>
    </div>
    <img class="avatar" src=${dati.img}>
    </div>`;
  messagesDOM.scrollTop = messagesDOM.scrollHeight; //Updates height and scrolls to bottom
  removeAnimation(); 
});

function removeAnimation() {
  setTimeout(() => {
    messagesDOM.lastChild.classList.remove("enter-animation");
  }, 300);
}

//TODO Load only the last 10 messages and unload the others
