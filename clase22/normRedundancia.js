const originalData = require('./data')
const util = require('util')
const {normalize, schema} = require('normalizr')
const { deserialize} = require('v8')

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

const normalizePost = new normalize(originalData,postSchema)
const desnormalizePost = new deserialize(normalizePost,entities,postSchema,normalizePost)

function print(obj) {
    console.log(util,inspect(obj,false,12,true))
}

print(normalizePost)