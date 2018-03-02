const express = require('express')
const path = require('path')

const app = express()
let PORT = process.env.PORT || 3001

app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'))
})

app.listen(PORT, () =>{
  console.log(`Server Running on localhost:${PORT}`)
})