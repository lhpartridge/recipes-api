const express = require('express')
const router = express.Router()
const fetch = (...args)=> import('node-fetch').then(({default: fetch}) => fetch(...args))
 
router.use(express.static('public'))
 
const recipeRoutes = require('./api/recipeRoutes')
 
router.use('/recipes', recipeRoutes)
 
//home route
router.get('/', (req, res) => {
    const URL = 'https://api.sampleapis.com/recipes/recipes'
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            let i = Math.floor(Math.random() * data.length)
            let singleItem = data[i]
            let nutrition = {
                calories: singleItem.calories,
                fat: singleItem.fat,
                cholesterol: singleItem.cholesterol,
                sodium: singleItem.sodium,
                sugar: singleItem.sugar,
                carbohydrates: singleItem.carbohydrates,
                fiber: singleItem.fiber,
                protein: singleItem.protein
            }

            res.render('pages/home', {
                title: 'Recipes API',
                name: "Recipes",
                data,
                singleItem,
                nutrition
        })
    })
})
 
router.get('*', (req, res) => {
    if(req.url == '/favicon.ico') {
        res.end()
    } else {
        res.render('pages/404', {
            title: '404 Error - Page not found',
            name: '404 Error'
        })
    }
 
})
 
module.exports = router