const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const cors  = require('cors')
const app = express()
const knex =require('knex')
const { response } = require('express')
const saltRounds = 10;
app.use(bodyParser.json())
app.use(cors())

const db = knex({client: 'pg',
connection: {
  host : '127.0.0.1',
  user : 'postgres',
  password : 'pass',
  database : 'face_recognition'
}})

app.post('/signin',(req,res)=>{
    const {email,password} = req.body
   db.select('hash', 'email').from('login')
   .where('email', '=',email)
   .then(data => {
       const isValid = bcrypt.compareSync(password,data[0].hash)
       if(isValid){
        return db.select('*').from('users')
        .where('email', '=', email)
        .then(user=>{
            res.json(user[0])
        })
        .catch(err=>{
            res.json('Unable to get user').status(400)
        })
       }else{res.json('Invalid credentials').status(400)}
   })
   .catch(err=> res.json('Invalid credentials').status(400))
})

app.post('/register',(req,res)=>{
    const {name, email, password} = req.body;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    
    db.transaction(trx =>{
        trx.insert({
            hash: hash,
            email:email
        })
        .into('login')
        .returning('email')
        .then(loginEmail=>{
            return trx('users').returning('*').insert({
                email:loginEmail[0],
                name:name,
                joined: new Date()
            })
            .then(user=>{
                console.log(user)
                res.json(user[0])
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.json('Unable to register'))
})

app.get('/profile/:id',(req, res)=>{
    const {id} = req.params
  db.select('*').from('users').where({id})
  .then(user => {
      if(user.length){
          res.json(user[0])
      }
      else{
          res.json('Not found').status(400)
      }
  }).catch(err=>{
      res.json('Error getting the data').status(400)
  })
})

app.put('/image',(req,res)=>{
    const {id} = req.body
    db('users').where('id', '=', id)
    .increment('entries',1)
    .returning('entries')

.then(entries=>{
     res.json(entries[0])
})
.catch(err=>{
    res.json('Error getting entries')
})
})
app.listen(3434,()=>{
    console.log('Connected on port 3434.')
})