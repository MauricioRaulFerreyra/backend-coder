const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()
app.use(cookieParser())

app.get('/', (req,res)=> {
    res.cookie('password', '1234', { signed:true}),  //{maxAge:3000}),
    res.cookie('user', 'Camilo', {signed:true}), //{maxAge:4000}),
    res.send('cookie creada')
})

app.get('/getCookie', (req,res)=> {
    console.log(req.cookies),
    res.send({data:req.cookies.user})  //({data:req.signedCookies.user})
})

app.get('/logout', (req,res) => {
    res.clearCookie('user').clearCookie('password'),
    res.send('cookie eliminada')
})

app.listen(8080, (req,res)=> {
    console.log('server ')
})