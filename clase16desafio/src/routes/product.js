const express = require("express");
const { reset } = require("nodemon");
const Contenedor = require("../contenedor.js");
var path = require('path');

const app = express();
const { Router } = express;
const router = new Router();

let productos = new Contenedor("productos");

router.get("/", (req, res) => {
  async function getTodos(){
    try{
      let aux = await productos.getAll();
      res.send(aux);
    }   catch(error){
      throw Error("Error en todos los productos")
    }  
  }    
  getTodos();

});

router.get("/:id", (req, res) =>{
  async function getxId(){
    try{
      let ptoId = await productos.getById(parseInt(req.params.id));
      res.send(ptoId);
    }   catch(error){
      throw Error("Error en pto random");
    }
  };
  getxId();
});

router.post("/", (req, res) => {
  let { titulo, precio, thumbail } = req.body;
  let newObj = {
    titulo,
    precio,
    thumbail,
  };

  async function savePto(){
    try {
      await productos.save(newObj);
      let aux = await productos.getAll();
      res.send(aux);     
    } catch (error) {
      throw Error("Error en post productos");
    }
  }
  savePto();
});

router.put("/:id", (req, res) =>{
  let { titulo, precio, thumbail } = req.body;

  async function modfPto(){
    ptoMod = {
      titulo,
      precio,
      thumbail
    }
    try {
      await productos.update(parseInt(req.params.id), ptoMod);
      ptoMod =  await productos.getById(parseInt(req.params.id));
      res.send(ptoMod);
    } catch (error) {
      throw Error("Error en put modificacion productos");
    }
  }
  modfPto();

})

router.delete("/:id", (req,res) =>{
  async function deletexId(){
    try {
      let flag = await productos.deleteById(parseInt(req.params.id));
      if (flag != 0) {
        res.send({message: "Producto con id: " + req.params.id + "borrado correctamente"});
      } else{
        res.send({ error : 'Producto no encontrado' });
      }
    } catch (error) {
      throw Error ("Error en el delete por id");
    }
  }
  deletexId();
})

module.exports = router;