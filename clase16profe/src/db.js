const knex = require("knex")({
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      port: 3306,
      user: "root",
      password: "123456",
      database: "coderTest",
    },
  
    pool: { min: 2, max: 8,  },
  });
  
  //Crear tabla users
  //Crear Tabla
  // createTable
  knex.schema
    .createTableIfNotExists("users", function (table) {
      table.increments("id").primary();
      table.string("name");
      table.string("email", 128);
      table.string("role").defaultTo("admin");
      table.string("password");
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('update_at').defaultTo(knex.fn.now())
      table.timestamp('delete_at').defaultTo(knex.fn.now())
      
    })
    .then(() => {
      console.log("Tabla Creada");
    })
    .catch((err) => {
      throw err;
    });
  
  module.exports = knex;
  