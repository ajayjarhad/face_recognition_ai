const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const cors  = require('cors')
const app = express()
const saltRounds = 10;
app.use(bodyParser.json())
app.use(cors())
const database = {
    users : [
        {
        id : '1',
        name: 'Ajay',
        email: 'ajay@email.com',
        password: 'pass',
        entries: 0,
        joined: new Date()
    },
    {
        id : '2',
        name: 'Bunny',
        email: 'bunny@email.com',
        password: 'bunnyTheCoolest',
        entries: 0,
        joined: new Date()
    }
]
}

app.get('/',(req,res)=>{
    res.send(database.users)
})

app.post('/signin',(req,res)=>{
    if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
        // res.json(database.users.id)
        res.json('Success')
    }else {
            res.json('Error Logging In')
        }
})

app.post('/register',(req,res)=>{
    const {name, email, password} = req.body;

    database.users.push(
        {
        id : '3',
        name: name,
        email: email,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1])
    res.json('success')
})

app.get('/profile/:id',(req, res)=>{
    console.log(req.params)
    const {id} = req.params
    let found = false
    database.users.forEach(user=>{
        if(user.id === id){
            res.json(user)
            found = true
        }
        
    })
    if(!found){
        res.json('Cannot fetch a thing')
    }
})

app.post('/image',(req,res)=>{

    database.users.forEach(user=>{
        if(user.email === req.body.email){
            user.entries++
            // console.log(user.id)
            res.json(user)
            
        }
    })
    res.json('nope')
})

app.listen(3434,()=>{
    console.log('Connected on port 3434.')
})