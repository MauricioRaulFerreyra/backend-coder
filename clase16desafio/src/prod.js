const knex = require("knex")({
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      port: 3306,
      user: "root",
      password: "",
      database: "coderejemplo",
    },
  
    pool: { min: 2, max: 8,  },
  });
  
    knex.schema
    .createTableIfNotExists("productos", function (table) {
      table.increments("id").primary();
      table.string("title");
      table.float("price");
      table.string("thumbnail");  
    })
    .then(() => {
      console.log("Table create");
    })
    .catch((err) => {
      throw err;
    });
  
  module.exports = knex;