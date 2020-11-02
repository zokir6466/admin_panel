const express = require('express')
const { query } = require('./public/pool')
const parser = require('body-parser')
const ejs = require('ejs')
const app = express()
const PORT = 4000

app.use(parser.urlencoded( { extended: true } ) )
app.use(express.json())
app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
  const users = await query(`select * from users`)
  res.render('index', { users: users })
})
app.get('/admindashbord', async (req, res) => {
  let users = await query(`select * from users`)
  res.render('admin', { users: users })
})
app.post('/admindashbord', async (req, res) => {
  const { fname, lname, phone, email } = req.body
  const phon = parseInt(phone)
  console.log( req.body );
  let sql = await query(`INSERT INTO users (fname, lname, phone, email) VALUES ($1, $2, $3, $4)`, fname, lname, phon, email );
  let users = await query(`select * from users`)
  res.render('admin', { users: users })
})
app.delete('/admindashbord', ( req, res ) => {
  console.log(req.params)
})


app.listen(PORT, ()=>console.log(PORT))
