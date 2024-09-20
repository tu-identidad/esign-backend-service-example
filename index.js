'use strict'

const dotenv = require('dotenv')
dotenv.config()
const PORT = process.env.PORT

const app = require('./src/app.js')

// run server
app.listen(PORT, () => console.log(`Listen port ${PORT}`))
