const express = require("express")
const Contenedor = require("../classContainer")
const { nanoid } = require("nanoid")
const app = express()
const { Router } = express
const router = new Router()

let productos = new Contenedor("productos.json")


router.get("/", (req, res) => {
    async function getTodos() {
        try {
            let todos = await productos.getAll()
            //console.log(typeof todos)
            res.send(todos)
        }
        catch (error) {
            throw Error("Error en leer y mostrar productos")
        }
    }
    getTodos()
});

router.get("/:id", (req, res) => {
    async function getxId() {
        try {
            let ptoId = await productos.getById(parseInt(req.params.id))

            if (Object.keys(ptoId).length != 0) {
                res.send(ptoId)
            } else {
                res.status(400);
                res.send({ error: `no esta el producto con el id ${ptoId}` })
            }
        }
        catch (error) {
            throw Error("Error buscando producto por id")
        }

    }
    getxId()
})

router.post("/", (req, res) => {
    let { nombre, descripcion, codigo, thumbail, precio, stock } = req.body
    let Obj = {
        id: 0,
        //id: nanoid(),
        timestamp: Date.now(),
        nombre,
        descripcion,
        codigo,
        thumbail,
        precio,
        stock
    }
    async function savePto() {
        try {
            await productos.save(Obj)
            res.send(Obj)
        } catch (error) {
            throw Error("Error en post productos")
        }
    }
    savePto()

})

router.put("/:id", (req, res) => {
    let { nombre, descripcion, codigo, thumbail, precio, stock } = req.body
    async function modfPto() {
        try {
            let prod = await productos.getById(parseInt(req.params.id))

            if (Object.keys(prod).length != 0) {
                prod = {
                    id: parseInt(req.params.id),
                    timestamp: Date.now(),
                    nombre,
                    descripcion,
                    codigo,
                    thumbail,
                    precio,
                    stock
                }
                let todosProds = await productos.read();
                todosProds = (JSON.parse(todosProds, null, 2))
                let auxId = parseInt(req.params.id) - 1
                todosProds.splice(auxId, 1, prod)
                await productos.write(todosProds, "Producto modificado correctamente")
                res.send(todosProds)
            }
            else {
                res.send({ error: 'producto no encontrado' })
            }
        } catch (error) {
            throw Error("Error en put modificacion productos")
        }
    }

    modfPto()

});

router.delete("/:id", (req, res) => {
    async function deletexId() {
        try {
            let delet = await productos.getById(parseInt(req.params.id))
            if (Object.keys(delet).length != 0) {
                await productos.deleteById(parseInt(req.params.id))
                res.send(await productos.getAll());
            } else {
                res.status(400)
                res.send({ error: 'producto no encontrado' })
            }
        } catch (error) {
            throw Error("Error en el delete por id")
        }
    }
    deletexId()
});


module.exports = router

