const express = require("express");
const app = express();
const knex = require("./db");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Crear Registro
app.post("/", (req, res) => {
  let ojbNew = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  knex("users")
    .insert(ojbNew)
    .then(() => {
      console.log("Register ok!");
      res.send({ message: "Register created!" });
    })
    .catch((err) => {
      throw err;
    });
});

//Leer informacion
app.get("/all", (req, res) => {
  knex
    .from("users")
    .select("*")
    .orderBy("id", "desc")
    .then((json) => {
      console.log(json);
      res.json({ data: json });
    })
    .catch((err) => {
      console.log("Entro al cacth");
      res.send({ error: err });
    });
});

app.get("/allName", (req, res) => {
  knex
    .from("users")
    .select("name")
    .then((json) => {
      console.log(json);
      res.json({ data: json });
    })
    .catch((err) => {
      console.log("Entro al cacth");
      res.send({ error: err });
    });
});

app.get("/specificName", (req, res) => {
  knex
    .from("users")
    .select("name", "email")
    .where({ name: "Jorge" })
    .then((json) => {
      console.log(json);
      res.json({ data: json });
    })
    .catch((err) => {
      console.log("Entro al cacth");
      res.send({ error: err });
    });
});
app.get("/userForId/:id", (req, res) => {
  knex
    .from("users")
    .select("name", "email")
    .where({ id: req.params.id  })
    .then((json) => {
      console.log(json);
      res.json({ data: json });
    })
    .catch((err) => {
      console.log("Entro al cacth");
      res.send({ error: err });
    });
});

//Actulizar usuario
app.put("/updteUser/:id", (req, res) => {
  knex("users")
    .where({ id: req.params.id })
    .update({ name: req.body.name, email: req.body.email })
    .then((json) => {
      console.log(json);
      res.json({ data: "Update success!" });
    })
    .catch((err) => {
      console.log("Entro al cacth");
      res.send({ error: err });
    });
});

//Eliminar Usuario
app.delete("/deleteUser/:id", (req, res) => {
  knex("users")
    .where({ id: req.params.id })
    .del()
    .then((json) => {
      console.log(json);
      res.json({ data: "Delete success!" });
    })
    .catch((err) => {
      console.log("Entro al cacth");
      res.send({ error: err });
    });
});

app.listen(3004, () => {
  console.log("Server run on port 3004");
});
