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



server.get("/", function(req, res) {
    return res.render('index', { recipes })
})

server.get("/about", function (req, res) {
    return res.render('about')
})

server.get("/recipes", function (req, res) {
    return res.render('recipes', { recipes })
})

server.get("/recipes/:index", function (req, res) {
    const recipeIndex = req.params.index
    // console.log(recipeIndex)
    
    const recipe = recipes[recipeIndex]
    // console.log(recipe)

    // if (!recipes[recipeIndex]) {
    //     return res.render('not-found')
    // }
    
    return res.render("recipesDescription", { item: recipe })
})

server.use(function(req, res) {
    return res.status(404).render("not-found");
})

// Assim de usa Params 
// server.get("/recipes/:id", function (req, res) {
//     res.send('Criando index' + req.params.id)
// })