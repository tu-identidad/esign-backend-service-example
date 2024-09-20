const express = require('express')
const { errors } = require('celebrate')
const ServiceError = require('./errors/ServiceError')
const bodyParser = require('body-parser')
const logger = require('./loaders/Logger')
const app = express()

app.use(bodyParser.json({limit: '5mb', extended: true})) // For parsing application/json
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true })) // for parsing application/x-www-form-urlencode
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, apikey');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

const ESignRouter = require('./routes/ESignRouter.js')

const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./swagger-spec.js')

app.get('/', (req, res) => {
  res.redirect('/api-docs')
})
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Routes
app.use(ESignRouter)

// Celebrate and Joi error handler
// app.use(errors())
app.use((error, req, res, next) => {
  if(error.details){
    if (error.details.get('body')) { //if joi produces an error, it's likely a client-side problem   
        return res.status(400).json({
          code: "TIP-0009",
          message: error.details.get('body').details[0].message
        });
    }
    if (error.details.get('headers')) { //if joi produces an error, it's likely a client-side problem   
        return res.status(400).json({
          code: "TIP-0009",
          message: error.details.get('headers').details[0].message
        });
    }
  } //otherwise, it's probably a server-side problem.  
  next()
});

// Error handler
app.use(function (err, req, res, next) {
  // Log errors
  console.log(err)
  logger.error(err.stack)

  // Handle internal service error
  if (err instanceof ServiceError) {
    res.status(err.statusCode).json(err.toJson())
  } else {
    // Handle unexpected errors
    res.status(500).json({
      code: '001',
      message: 'Something broke!',
      url: 'unknown'
    })
  }
  return next()
})

module.exports = app
