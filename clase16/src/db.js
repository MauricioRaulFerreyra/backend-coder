const knex = require('knex')({
    client: "mysql",
    connection: {
        host: "127.0.0.1",
        port: 3306,
        user: "root",
        password: "",
        database: "coderejemplo"
    },
    pool: {
        min: 2,
        max: 8
    }
})

knex.schema.createTableIfNotExists('users', function(table) {
        table.increments('id').primary();
        table.string('name');
        table.string("email", 128);
        table.string('role').default('admin')
    })
    .then(() => {
        console.log("tabla creada")
    })
    .catch(err => {
        console.log(err)
    })

module.exports = knex