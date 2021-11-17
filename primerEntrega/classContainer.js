const fs = require('fs')

class Contenedor {

    constructor(file) {
        this.file = file
    }
    async read() {
        try {
            let data = await fs.promises.readFile("./" + this.file, "utf-8")
            return data

        } catch (error) {
            throw Error("Error al leer el archivo")
        }
    }
    async write(objeto, msg) {
        try {
            await fs.promises.writeFile("./" + this.file, JSON.stringify(objeto, null, 2))
            console.log(msg)
        } catch (error) {
            throw Error("Error al escribir en el archivo")
        }
    }
    async save(producto) {
        let newId = 1
        let objeto = {}

        let data = await this.read()
        let archivo = JSON.parse(data)

        if (!data) {
            producto.id = newId
            objeto = [producto]
            await this.write(objeto, 'agregado')
        } else {
            producto.id = archivo[archivo.length - 1].id + 1
            objeto = producto
            archivo.push(objeto)
            await this.write(archivo, 'agregado')
        }
        //archivo.push(objeto)

        //await this.write(archivo, "Agregado!")
    }
    async getById(num) {
        let data = await this.read()
        let object = JSON.parse(data)

        let result = object.filter(producto => producto.id == num)
        return result
    }

    async getAll() {
        let data = await this.read()
        let object = JSON.parse(data)

        return object
    }

    async deleteById(num) {
        let data = await this.read()
        let object = JSON.parse(data)

        let producto = object.find(producto => producto.id == num)

        if (producto) {
            let index = object.indexOf(producto)
            console.log(index)
            object.splice(index, 1)
            await this.write(object, `producto con ID: ${num} eliminado`)
        } else {
            console.log(`no existe el producto con ID: ${num} `)
        }
    }

    async deleteAll() {
        let array = []
        await this.write(array, "Se eliminaron todos los productos")
    }

}


//Ejemplo para verificar
/* let contenedor = new Contenedor("productos.json")

async function consultarDesafio() {
  const newProduct = {
    title: "Nike LD Waffle Sacai White Nylon",
    price: 399,
    img1: "https://stockx-360.imgix.net/Nike-LD-Waffle-Sacai-White-Nylon/Images/Nike-LD-Waffle-Sacai-White-Nylon/Lv2/img"
  }
  await contenedor.save(newProduct)
  console.log(await contenedor.getById(2))
  console.log(await contenedor.getAll())
  await contenedor.deleteById(5)
}
consultarDesafio() */

module.exports = Contenedor