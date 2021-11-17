const express = require("express");
const Contenedor = require("../classContainer");
//const { nanoid } = require("nanoid")
const app = express();
const { Router } = express;
const router = new Router();

let carritos = new Contenedor("carritos.json")
let productos = new Contenedor("productos.json")


router.post("/", (req, res) => {

  let carrito = {
    id: 0,
    //id: nanoid(),
    timestamp: Date.now(),
    productos: []
  }
  async function saveCarrito() {
    try {
      await carritos.save(carrito)
      res.send({ id: carrito.id })
    }
    catch (error) {
      throw Error("Error")
    }
  }
  saveCarrito()
})

router.post("/:idCarrito/:idPto", (req, res) => {
  async function agregarProdId() {
    try {
      let indexCarrito = req.params.idCarrito
      let indexPto = req.params.idPto
      let prodId = await productos.getById(parseInt(indexPto))
      console.log(prodId)
      if (Object.keys(indexCarrito).length != 0) {

        let carrito = await carritos.getById(indexCarrito)

        if (carrito[0]) {
          let total = await carritos.read()
          total = JSON.parse(total)
          let auxId = parseInt(req.params.id) - 1
          carrito[0].productos.push(prodId[0])
          total.splice(auxId, 1, carrito[0])
          await carritos.write(total, "Producto agregado ")
          res.send({ carrito })
        } else {
          res.status(400)
          res.send({ error: 'carrito no encontrado' })
        }
      } else {
        res.status(400)
        res.send({ error: 'producto no encontrado' })
      }

    }
    catch (error) {
      throw Error("Error agregando prod al carrito")
    }
  }
  agregarProdId()
})


router.delete("/:id", (req, res) => {
  async function deleteId() {
    try {
      let index = parseInt(req.params.id)
      console.log(index)
      let del = await carritos.getById(index)
      console.log(del)
      if (Object.keys(del).length != 0) {

        await carritos.deleteById(index)
        res.send(await carritos.getAll())
      }

      else {
        res.status(400)
        res.send({ error: 'id no existe' })
      }
    } catch (error) {
      throw Error("Error")
    }
  }
  deleteId()
});

router.get("/:id", (req, res) => {
  async function allProd() {
    try {
      let index = parseInt(req.params.id)
      //console.log(index)
      let carrito = await carritos.getById(index)
      if (carrito[0]) {
        prod = carrito[0].productos
        res.send(prod)
      } else {
        res.status(400)
        res.send({ error: " ID no existe" })
      }
    }
    catch (error) {
      throw Error("Error carrito por ID")
    }
  }

  allProd()

})

router.get("/", (req, res) => {

  async function getTotalCarritos() {
    try {
      let aux = await carritos.getAll()
      res.send(aux)
    }
    catch (error) {
      throw Error("error en leer y mostrar carritos")
    }
  }
  getTotalCarritos()

})

module.exports = router