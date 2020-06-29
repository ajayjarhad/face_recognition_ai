const handleSignin = (req,res,db,bcrypt,saltRounds) =>{

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
}

module.exports = {
    handleSignin : handleSignin
}