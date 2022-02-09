const express = require('express')
const app = express()
const port = 8000
const server = require("http").createServer(app)
const io = require("socket.io")(server, {cors: { origin: "*"}})

app.use(express.static(__dirname + '/public'));

app.set("view engine", "ejs");

app.get('/', (req, res) => {
  res.render("Index")
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
  console.log(`Example app listening on port ${port}`)
})