const express = require('express')

const app = express()

app.get('/',(req,res)=>{
    res.send('<h1>Working<h1>')
})

app.listen(3000,()=>{
    console.log('Connected on port 3000.')
})