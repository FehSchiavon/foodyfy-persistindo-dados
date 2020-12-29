const express = require('express')
const routes = express.Router()
const chefs = require('./app/controllers/chefs')
const recipes = require('./app/controllers/recipes.js')

routes.get('/', function(req, res) {
    return res.redirect('/index')
})

// RECIPES
routes.get('/recipes', recipes.index)
routes.get('/recipes/create', recipes.create)
routes.get('/recipes/:id', recipes.show)
routes.get('/recipes/:id/edit', recipes.edit)
routes.post('/recipes', recipes.post)
routes.put('/recipes', recipes.put)
routes.delete('/recipes', recipes.delete)

// CHEFS
routes.get('/chefs', chefs.index)
routes.get('/chefs/create', chefs.create)
routes.get('/chefs/:id', chefs.show)
routes.get('/chefs/:id/edit', chefs.edit)
routes.post('/chefs', chefs.post)
routes.put('/chefs', chefs.put)
routes.delete('/chefs', chefs.delete)

module.exports = routes