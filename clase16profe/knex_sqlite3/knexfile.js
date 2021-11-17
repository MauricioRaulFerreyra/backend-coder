// Update with your config settings.
// const knex = require("knex")(
//   {

//     development: {
//       client: 'sqlite3',
//       connection: {
//         filename: './data/testCoder.db3'
//       }
//     },

//     useNullAsDefault:true

//   };
// )
// module.exports =

const knex = require("knex")({
    client: "sqlite3",
    connection: {
      filename: "./data/testCoder.db3",
    },
    useNullAsDefault: true,
  
    pool: { min: 2, max: 8 },
  });
  
  module.exports = knex
  