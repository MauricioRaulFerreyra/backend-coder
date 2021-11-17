exports.up = function(knex) {
    knex.schema
    .createTable("message", function (table) {
      table.increments("id").primary();
      table.string("date")
      table.string("message");
      table.string("user");
    })
    .then(() => {
      console.log("Tabla Creada");
    })
    .catch((err) => {
      throw err;
    });
};

exports.down = function(knex) { };