const express = require('express');
const mysql = require('mysql2')
const app = express()
const port = process.env.port || 3000

app.use(express.json())

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "schools"
})

connection.connect((err) => {
  if(err) {
    console.log(err.sqlMessage)
  } else {
    console.log('Connection database success')
  }
})

const queryUsers = `
  SELECT 
  users.id, 
  users.name, 
  users.email, 
  users.birth_date
  FROM Users
`

app.get('/', (req, res) => {
  res.json({
    message: "Setup"
  })
})

app.get('/users', (req, res) => {
  connection.query(queryUsers, (err, data) => {
    if(err) {
      console.log(err)
    } else {
      res.json(data)
    }
  })
})

app.get('/users/:id', (req, res) => {
  const id = req.params.id
  connection.query(
    `${queryUsers} WHERE users.id = ${id}`,
    (err, data) => {
      if(err) {
        console.log(err)
      } else {
        res.json(data)
      }
    }
  )
})

app.listen(port, () => {
  console.log(`Application running at http://localhost:${port}`)
})