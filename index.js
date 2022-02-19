const express = require('express');
const path = require("path");
//const favicon = require('serve-favicon');
let userCount = 0
let users = []
let index

const port = 8000;
const url = "http://localhost:" + port;
const app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server, {cors: { origin: "*"}})

app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, '/views'));
app.engine('html', require('ejs').renderFile);
app.set("view engine", "html");

app.get('/', (req, res) => {
  res.render("index.ejs")
})

app.get('/bestemmie', (req, res) => {
  res.render('bestemmie.ejs')
})

app.get('/luca', (req, res) => {
  res.render("luki.ejs")
})

app.get('/invite', (req, res) => {
  res.render('invite.ejs')
})

io.on('connection', (socket) => {
  console.log(socket.id + " connected")
  users.push(socket.id)
  console.log(users)
  socket.on("disconnect", () => {
    console.log(socket.id + " disconnected")
    socket.broadcast.emit("count", users)
    index = users.indexOf(socket.id)
    if (index > -1) {
      users.splice(index, 1)
      console.log(userCount)
    }
  })
  
  socket.broadcast.emit("count", users)

  socket.on('data', (dati) => {
    console.log(dati)
    socket.broadcast.emit('dati', dati)
  })

})


server.listen(port, () => {
  console.log(`Listening on port ${port}`)
})