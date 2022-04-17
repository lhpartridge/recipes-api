const express = require('express')
const router = express.Router()
const fetch = (...args)=> import('node-fetch').then(({default: fetch}) => fetch(...args))

let count;
 
fetch('https://api.sampleapis.com/recipes/recipes')
    .then(res => res.json())
    .then(data => {
        count = data.length
    })

//all recipes
//localhost:3000/recipes
router.get('/', (req, res) => {
    const URL = 'https://api.sampleapis.com/recipes/recipes'

    fetch(URL)
        .then(res => res.json())
        .then(data => {
            res.render('pages/recipes', {
                title: 'All Recipes',
                name: 'Recipe Box',
                data, 
                count
            })
        })

    //Ethan's code for the recipe box page
    // fetch(URL)
    // .then(res => res.json())
    // .then(data => {
    //     res.render('pages/recipes', {
    //         title: 'Recipes',
    //         name: 'Recipes',
    //         data,
    //         recipe: {
    //             Asian: '/recipes/cuisine/Asian',
    //             American: '/recipes/cuisine/American',
    //             Italian: '/recipes/cuisine/Italian',
    //             Mexican: '/recipes/cuisine/Mexican'
    //         }
    //     })
    // })

    // fetch(URL)
    //     .then(res => res.json())
    //     .then(data => {
    //         res.render('pages/recipes', {
    //             title: 'Recipes',
    //             name: 'Recipes',
    //             data,
    //             recipe: {
    //                 Asian: '/recipes/cuisine/Asian',
    //                 American: '/recipes/cuisine/American',
    //                 Italian: '/recipes/cuisine/Italian',
    //                 Mexican: '/recipes/cuisine/Mexican'
    //             }
    //         })
    //     })
})

//My cuisine route adapted from Herb's Joke type route
/**
 * Adding type path
 */
//=======================================
//localhost:3000/cuisine
router.get('/cuisine', (req, res) => {
    const cuisine = req.params.cuisine
    const URL = 'https://api.sampleapis.com/recipes/recipes/'

    //===========================================
//Ethan's code

    fetch(URL)
        .then(res => res.json())
        .then(data => {
            res.render('pages/cuisine', {
                title: 'Recipes',
                name: 'Recipes by Cuisine',
                data,
                recipe: {
                    Asian: '/recipes/cuisine/Asian',
                    American: '/recipes/cuisine/American',
                    Italian: '/recipes/cuisine/Italian',
                    Mexican: '/recipes/cuisine/Mexican'
                }
            })
        })
    //===========================================

    //My code
    // fetch(URL)
    // .then(res => res.json())
    // .then(data => {
        
    //     const cuisineArr = []

    //     data.forEach(item => {
    //         if(item.cuisine == cuisine) {
    //             cuisineArr.push(item)
    //         }
    //     })
    //     return cuisineArr
    // })
//     .then(cuisineArr => {
//         res.render('pages/recipes', {
//             title: cuisine,
//             name: `${cuisine} recipes`,
//             data: cuisineArr
//         })
//     })
})
//=======================================


// localhost:3000/:cuisine
// router.get('/cuisine/:cuisine', (req, res)=> {
//     const cuisine = req.params.cuisine
//     const URL = 'https://api.sampleapis.com/recipes/recipes/'

//     fetch(URL)
//         .then(res => res.json())
//         .then(data => {
            
//             const cuisineArr = []

//             data.forEach(item => {
//                 if(item.cuisine == cuisine) {
//                     cuisineArr.push(item)
//                 }
//             })
//             return cuisineArr
//         })
//         .then(cuisineArr => {
//             res.render('pages/recipes', {
//                 title: cuisine,
//                 name: `${cuisine} recipes`,
//                 data: cuisineArr
//             })
//         })
// })

//Ethan's section below
//all recipes
//localhost:3000/recipes
router.get('/all', (req, res) => {
    const URL = 'https://api.sampleapis.com/recipes/recipes'
    const calories = req.query.calories
    const time = req.query.time

    fetch(URL)
        .then(res => res.json())
        .then(data => {
            let outputData = []
            data.forEach(item => {
                if(!calories && !time) {
                    outputData.push(item)
                } else if (!calories && time) {
                    if(item.totalTime <= time) {
                        outputData.push(item);
                    }
                } else if (calories && !time) {
                    if(item.calories <= calories) {
                        outputData.push(item);
                    }
                } else {
                    if(item.calories <= calories && item.totalTime <= time) {
                        outputData.push(item);
                    }
                }
            })
            res.render('pages/all-recipes', {
                title: 'All Recipes',
                name: 'Recipe Cards',
                data: outputData
            })
        })
})

//recipe by cuisine
// router.get('/cuisine/:cuisine', (req, res) => {
//     const cuisine = req.params.cuisine
//     const URL = `https://api.sampleapis.com/recipes/recipes/`
//     const calories = req.query.calories
//     const time = req.query.time


//     fetch(URL)
//         .then(res => res.json())
//         .then(data => {
//             const cuisineArr = []
//             data.forEach(item => {
//                 if(item.cuisine == cuisine) {
//                     if(!calories && !time) {
//                         cuisineArr.push(item)
//                     } else if (!calories && time) {
//                         if(item.cuisine == cuisine && item.totalTime <= time) {
//                             cuisineArr.push(item);
//                         }
//                     } else if (calories && !time) {
//                         if(item.cusine == cuisine && item.calories <= calories) {
//                             cuisineArr.push(item);
//                         }
//                     } else {
//                         if(item.cuisine == cuisine && item.calories <= calories && item.totalTime <= time) {
//                             cuisineArr.push(item);
//                         }
//                     }
//                 }

//             })
//             return cuisineArr
//         })
//         .then(cuisineArr => {
//             res.render('pages/all-recipes', {
//                 title: cuisine,
//                 name: `${cuisine} recipes`,
//                 data: cuisineArr
//             })
//         })
// })




//id route must go last
 
//single-recipe
//localhost:3000/recipes/:id
router.get('/:id', (req, res) => {
    const id = req.params.id
    const URL = `https://api.sampleapis.com/recipes/recipes/${id}`
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            let count = data.length
            let nutrition = {
                calories: data.calories,
                fat: data.fat,
                cholesterol: data.cholesterol,
                sodium: data.sodium,
                sugar: data.sugar,
                carbohydrates: data.carbohydrates,
                fiber: data.fiber,
                protein: data.protein
            }

            for(let key in nutrition) {
                if(!nutrition[key]) {
                    delete nutrition[key]
                }
            }

            if(Object.keys(data).length >= 1) {
                res.render('pages/single-recipe', {
                    title: `${data.title}`,
                    name: `${data.title}`,
                    data,
                    nutrition,
                    count
                })
            } else {
                res.render('pages/404', {
                    title: '404 Error - Page not found',
                    name: '404 Error'
                })
            }
        })

    .catch(error => {
        console.log('ERROR', error)
    })
})

//<!-- title, photoURL, cuisine, course, total time -->
 
//by cuisine

// =============================================================
// router.get('/type/:type', (req, res)=> {
    //     const type = req.params.type
    //     const URL = 'https://api.sampleapis.com/jokes/goodJokes'
    
    //     fetch(URL)
    //         .then(res => res.json())
    //         .then(data => {
                
    //             const typeArr = []
    
    //             data.forEach(item => {
    //                 if(item.type == type) {
    //                     typeArr.push(item)
    //                 }
    //             })
    //             return typeArr
    //         })
    //         .then(typeArr => {
    //             res.render('pages/jokes', {
    //                 title: type,
    //                 name: `${type} jokes`,
    //                 data: typeArr,
    //             })
    //         })
    // })
    
 
 
//by course

//by total time

//by calories
 
module.exports = router