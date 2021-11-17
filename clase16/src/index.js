const express = require('express')
const app = express();
const knex = require('./db')
const port = process.env.PORT || 3000
app.use(express.json())

app.get("/", (req, res) => {
    knex.from("users").select("*")
    .orderBy("id", "desc")
    .then((data) => {
        res.json({data})
    })
    .catch((err) => {
        throw err
    })
})

app.get("/:id", (req, res) => {
    knex.from("users").select("name", "email").where({ id : req.params.id})
      .then((data) => {
        res.json({data})
    })
    .catch((err) => {
        throw err
    })
})

app.put("/upDateUser/:id", (req, res) => {
    knex("users").where({ id : req.params.id}).update({ name : req.body.name, email : req.body.email})
      .then(() => {
        console.log("UpDateUser ok!")
        res.send({ message : " UpDateUser  success!!"})
    })
    .catch((err) => {
        throw err
    })
})

app.post("/", (req, res) => {
    let obj = {
        name : req.body.name,
        email : req.body.email
    }
    knex("users").insert(obj)
    .then( () => {
        console.log("Registro ok!")
        res.send({ message : "Registro guardado" } )
    })
    .catch((err) =>{
        throw err
    })
})

app.delete("/deleteUser/:id", (req, res) => {
    knex("users").where({ id : req.params.id}).del()
    .then( () => {
        console.log("Register ok!!")
        res.send({ message : " Delete success!!"})
    })
    .catch( (err) => {
        throw err
    })
})



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})