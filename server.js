const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const morgan = require('morgan')

const db = require('./db')

const app = express()


app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json())

app.use(express.static('build'))

app.use('/api', require('./api/index'))

app.get('/.*/', (req, res) => {
  res.render('index.html')
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`app is running on port ${port}`)
})
