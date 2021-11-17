const express = require("express");
const { reset } = require("nodemon");
const Contenedor = require("../contenedor2.js");
var path = require('path');

const app = express();
const { Router } = express;
const router = new Router();

let chat = new Contenedor("message");

router.get("/", (req, res) => {
  async function getTodos(){
    try{
      let aux = await chat.getAll();
      res.send(aux);
    }
    catch(error){
      throw Error("Error en todos los chats")
    }  
  }    
  getTodos();

});

router.post("/", (req, res) => {
  const fecha = new Date();
  let fechaOK = fecha.getDate() + '/' + (fecha.getMonth()+1) + ' - ' + fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds()
  
  let { date, name, msg } = req.body;
  let newObj = {
    date : fechaOK,
    user: name,
    message: msg,
  };

  async function saveChat(){
    try {
      await chat.save(newObj);
      res.send({message:'chat agregado'});     
    } catch (error) {
      throw Error("Error en post Chat");
    }
  }
  saveChat();
});

router.delete("/:id", (req, res) => {
  async function deleteMsg() {
    try {
      let msgDelete = await chat.deleteById(parseInt(req.params.id));
      if (msgDelete != 0){
        res.send({message: "mensaje borrado"});
      }else{
        res.send({message: "mensaje no encontrado"})
      } 
    } catch (error) {
      throw(error);
    }
  }
  deleteMsg();
})

module.exports = router;