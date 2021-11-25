const express = require("express");
const { reset } = require("nodemon");
const Contenedor = require("../src/daos/ChatDaoFirebase");
const { normalize, schema, denormalize } = require("normalizr");

const app = express();
const { Router } = express;
const router = new Router();


let chat = new Contenedor;

router.get("/", (req, res) => {
  async function getTodos(){
    try{
      let aux = await chat.getAll();

      const schemaAutor = new schema.Entity('author')
      const mySchema = new schema.Array({
        author: schemaAutor
      })

      const normalizedChat = normalize(aux[0].arrayChat, mySchema)

      const denormalizeChat = denormalize(normalizedChat.result, mySchema, normalizedChat.entities)

      res.send({normalizr: normalizedChat});

    }
    catch(error){
      throw Error("Error en todos los chats")
    }  
  }    
  getTodos();

});

router.post("/", (req, res) => {

  async function saveChat(){
    try {
      let aux = await chat.getAll();
      aux[0].arrayChat.push(req.body);
      await chat.update(aux[0])
      res.send('chat agregado');      
    } catch (error) {
      throw Error("Error en post Chat");
    }
  }
  saveChat();
});

module.exports = router;
