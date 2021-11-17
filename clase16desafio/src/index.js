const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));
app.use(express.json()); 
app.use(express.urlencoded());

const produtosRoute = require("./routes/product.js");
app.use("/api/products", produtosRoute);
const chatRoute = require("./routes/msg.js")
app.use("/api/chat", chatRoute);

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

io.on("connection", (socket)=> {
  console.log("Usuario conectado");

  socket.emit("render", "Hola Cliente")
  socket.on("actualizacion", ()=>{
    io.sockets.emit("render", "Actualizacion")
  })
})

app.get("/", (req, res)=>{
  res.send("Todo ok!!");
})
server.listen(PORT, () => {
  console.log(`Server is run on port ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))