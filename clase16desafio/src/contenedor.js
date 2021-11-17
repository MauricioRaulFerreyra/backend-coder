const { time } = require('console');
const { title } = require('process');
const knex = require('./prod.js');

class Contenedor {

    constructor(name) {
        this.name = name
    }

    async save(product) {
        knex(this.name).insert(product)
        .then(() => {
          console.log("Register ok!");
        })
        .catch((err) => {
          throw err;
        });
    }

    async getById(num) {
        try{
            let data = await knex.from(this.name).select("*").where({ id: num  });
            data = data[0];
            data = {id:data.id, titulo: data.titulo, precio:data.precio, thumbail:data.thumbail}
            return data;
        }catch(error){
            throw(error);
        }
    }

    async getAll() {
        try{
            let data = await knex.from(this.name).select("*").orderBy("id", "ascd");
            let productos = [];
            for (const pto of data) {
                let aux = {
                    id: pto['id'],
                    titulo: pto['titulo'],
                    precio: pto['precio'],
                    thumbail: pto['thumbail']
                }
                productos.push(aux);
            }
            return productos;
            
        }catch(error){
            throw(error);
        }
        
    }

    async deleteById(num) {
        try {
            let borrado = await knex(this.name).where({ id: num }).del();
            return borrado;      
        } catch (error) {
            
        }

    }

    async deleteAll() {
        knex(this.name).del()
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    
    async update(num, pto){
        try {
            let actualizacion = await knex(this.name).where({ id: num })
            .update({ titulo: pto.titulo, precio: pto.precio, thumbail: pto.thumbail })
            return actualizacion;
            
        } catch (error) {
            
        }
    }
    
}

module.exports = Contenedor;