const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.get('/', (req, res, next) => {
    Person.find({})
        .then(people => res.json(people))
        .catch(error => next(error))
})

personsRouter.post('/', (req, res, next) => {
    const body = req.body
    if (!body.name) {
        return res.status(400).json({ 'error': 'Name required' })
    }
    if (!body.number) {
        return res.status(400).json({ 'error': 'Number required' })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save()
        .then(addedPerson => res.json(addedPerson))
        .catch(error => next(error))
})

personsRouter.get('/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(person)
            } else {
                res.status(404).end()
            }
        }).catch(error => next(error))
})

personsRouter.put('/:id', (req, res, next) => {
    const person = {
        name: req.body.name,
        number: req.body.number
    }

    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updatedPerson => res.json(updatedPerson))
        .catch(error => next(error))

})

personsRouter.delete('/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then(res.status(204).end())
        .catch(error => next(error))
})

module.exports = personsRouter