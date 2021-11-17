const knex = require("knex")

const config = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/msg.db3'
    }
  },
  useNullasdefault : true,

  pool: {min:2, max:8}
};

const dbMessage = knex(config.development)
module.exports = dbMessage;