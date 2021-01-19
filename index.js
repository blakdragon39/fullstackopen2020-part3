require('dotenv').config()
const express = require('express')
const cors = require('cors')

const config = require('./utils/config')
const logger = require('./utils/logger')
const personsRouter = require('./controllers/persons')
const middleware = require('./utils/middleware')

const Person = require('./models/person')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(middleware.requestLogger)

app.get('/info', (req, res, next) => {
    Person.find({})
        .then(people => {
            res.send(`
            <div>
                <p>Phonebook has info for ${people.length} people</p>
                <p>${new Date()}</p>
            </div>
            `)
        })
        .catch(error => next(error))
})

app.use('/api/persons', personsRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
app.listen(config.PORT, () => logger.info(`Running on port ${config.PORT}`))