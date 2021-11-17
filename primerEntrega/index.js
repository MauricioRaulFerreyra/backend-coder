const express = require('express')
const app = express()
const path = require("path")
const morgan = require('morgan')

const port = process.env.PORT || 8080

app.use(function (req, res, next) {
  console.log("se ejecuto una ruta")
  next()
})
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const productosRoute = require("./routes/productos")
const carritoRoute = require("./routes/carrito")

app.use('/api/productos', productosRoute)
app.use('/api/carrito', carritoRoute)

app.use((req, res, next) => {
  res.status(404)
  res.send({ error: -2, descripcion: `ruta ${req.originalUrl} metodo ${req.method} no implementada` })
})

const server = app.listen(port, () => {
  console.log("server is run on port " + port)
})
server.on('error', (error) => console.log(` Error en servidor ${error}`))