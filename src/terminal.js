const path = require('path');
const express = require('express')
const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, '/public')))
app.use(express.static(path.join(__dirname, '/views')))

app.get('/', (req, res) => {
  res.render("index")
})

app.listen(port, () => {
  console.log("Terminal running at: http://localhost:" + port)
})