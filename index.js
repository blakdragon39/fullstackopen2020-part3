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

function generateId() {
    return Math.floor(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER))
}

//todo migrate
// app.get('/info', (req, res) => {
//     const count = persons.length
//     res.send(`
//     <div>
//         <p>Phonebook has info for ${count} people</p>
//         <p>${new Date()}</p>
//     </div>
//     `)
// })

app.get('/api/persons', (req, res) => {
    Person.find({}).then(people => res.json(people))
})

app.post('/api/persons', (req, res) => {
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

    person.save().then(addedPerson => {
        res.json(addedPerson)
    })
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    Person.findById(id).then(person => {
        if (person) {
            res.json(person)
        } else {
            res.status(404).end()
        }
    })
})

//todo migrate
// app.put('/api/persons/:id', (req, res) => {
//     const id = Number(req.params.id)
//     const personToUpdate = persons.find(person => person.id === id)
//
//     if (personToUpdate) {
//         personToUpdate.name = req.body.name
//         personToUpdate.number = req.body.number
//         res.json(personToUpdate)
//     } else {
//         res.status(404).end()
//     }
// })

//todo migrate
// app.delete('/api/persons/:id', (req, res) => {
//     const id = Number(req.params.id)
//     persons = persons.filter(person => person.id !== id)
//
//     res.status(204).end()
// })

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'Endpoint not found' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Running on port ${PORT}`))