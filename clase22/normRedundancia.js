const originalData = require('./data')
const util = require('util')
const {normalize, schema, desnormalizePost, denormalize} = require('normalizr')

const users = new schema.Entity('users')
const commentsSchema = new schema.Entity('comments', {
    commenter = users
})

const articleSchema = new schema.Entity('article', {
    user: users,
    commentes: [commentsSchema]
})

const postSchema = new schema.Entity('post', {
    posts: [articleSchema]
})

const normalizePost = normalize(originalData,postSchema)
const desnormalizePost = denormalize(normalizePost,result,postSchema,normalizePost,entities,)

function print(obj) {
    console.log(util,inspect(obj,false,12,true))
}

print(normalizePost)
print(denormalize)

print(JSON.stringify(normalize).length)
print(JSON.stringify(denormalize).length)