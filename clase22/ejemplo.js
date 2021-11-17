const { normalize, schema } = require('normalizr')
const empresa = require('./normal')
const util = require('util')

const gerenteSchema = new schema.Entity('gerente')
const encargadoSchema = new schema.Entity('encargado')
const empleadosSchema = new schema.Entity('empleados')

const empresaSchema = new schema.Entity('empresa',{
    gerente: gerenteSchema,
    encargado: encargadoSchema,
    empleados : [empleados]
} )

const normalizeEmpresa = normalize(empresa, empresaSchema)

function print(obj) {
    console.log(util,inspect(obj,false,12,true))
}

print(normalizeEmpresa)
console.log(normalizeEmpresa)