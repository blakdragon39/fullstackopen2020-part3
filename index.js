require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens['body'](req, res),
    ].join(' ')
}))

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

app.get('/api/persons', (req, res, next) => {
    Person.find({})
        .then(people => res.json(people))
        .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
    const body = req.body
    if (!body.name) {
        return res.status(400).json({'error': 'Name required'})
    }
    if (!body.number) {
        return res.status(400).json({'error': 'Number required'})
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save()
        .then(addedPerson => res.json(addedPerson))
        .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(person)
            } else {
                res.status(404).end()
            }
        }).catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const person = {
        name: req.body.name,
        number: req.body.number
    }

    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updatedPerson => res.json(updatedPerson))
        .catch(error => next(error))

})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then(result => res.status(204).end())
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'Endpoint not found' })
}


const errorHandler = (error, request, response, next) => {
    console.error(error)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'Malformed Object ID' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

const PORT = process.env.PORT
app.use(unknownEndpoint)
app.use(errorHandler)
app.listen(PORT, () => console.log(`Running on port ${PORT}`))