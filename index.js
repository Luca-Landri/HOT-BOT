const express = require('express');
const path = require("path");
//const favicon = require('serve-favicon');
let userCount = 0

const port = 8000;
const url = "http://localhost:"+port;
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

app.get('/luca', (req, res) => {
  res.render("luki.ejs")
})

io.on('connection', (socket) => {
  console.log(socket.id + " connected")
  userCount++
  socket.on("disconnect", () => {
    console.log(socket.id + " disconnected")
    userCount--
  })
  socket.broadcast.emit("count", userCount)

  socket.on('data', (dati) => {
    console.log(dati)
    socket.broadcast.emit('dati', dati)
  })

})


server.listen(port, () => {
  console.log(`Listening on port ${port}`)
})