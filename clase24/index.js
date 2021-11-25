const express = require("express");
const path = require("path");
const session = require('express-session')
const MongoStore = require('connect-mongo')

const app = express();
const PORT = process.env.PORT || 8080

app.use(express.static(__dirname + '/public'));
app.use(express.json()); 
app.use(express.urlencoded());

const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true}
app.use(session({
  store: MongoStore.create({
      mongoUrl:"mongodb+srv://MAURICIO:FERREYRA82@cluster0.oaef0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      mongoOptions: advancedOptions
  }),
  cookie: { maxAge: 60000 },
  secret:"misecreto",
  resave:false,
  saveUninitialized:false,
  rolling:true
}))


const chatRoute = require("./routes/chat")
app.use("/api/chat", chatRoute);
const productosTest = require("./routes/productosTest")
app.use("/api/productos-test", productosTest);
const login = require("./routes/login")
app.use("/api/login", login)
const logout = require("./routes/logout")
app.use("/api/logout", logout)

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

io.on("connection", (socket)=> {
  socket.emit("render", "")
  socket.on("actualizacion", ()=>{
    io.sockets.emit("render", "")
  })
})


server.listen(PORT, () => {
  console.log(`Server is run on port ${PORT}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))