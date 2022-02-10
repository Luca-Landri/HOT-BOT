const express = require('express');
const path = require("path");
const favicon = require('serve-favicon');

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

app.get('/luki', (req, res) => {
  res.render("luki.ejs")
})

io.on('connection', (socket) => {
  console.log(socket.id + " connected");
  socket.on("disconnect", () => {
    console.log(socket.id + " disconnected")
  })

  socket.on('message', (msg) => {
    socket.broadcast.emit('message', msg)
  })
})


server.listen(port, () => {
  console.log(`Listening on port ${port}`)
})