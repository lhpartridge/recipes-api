// //app.js creates a nutrition arrray from the recipe object that will loop through the keys of the object and push in the nutritional information to be displayed only if it exists;  then it creates an li to be exported to the home page and single recipe page to be displayed in an aside

// let nutArr = []
// //fetch data from api
// const URL = 'https://api.sampleapis.com/recipes/recipes'
// fetch(URL)
//     .then(res => res.json())
//     .then(data => {
//         data.forEach(item => {
//             // console.log(item)
//             for(key in item) {
//                 // console.log(key)
//                 switch(key) {
//                     case "calories" : nutArr.push(key)
//                         break
//                     case "fat" : nutArr.push(key)
//                         break
//                     case "cholesterol" : nutArr.push(key)
//                         break
//                     case "sodium" : nutArr.push(key)
//                         break
//                     case "sugar" : nutArr.push(key)
//                         break
//                     case "carbohydrate" : nutArr.push(key)
//                         break
//                     case "fiber" : nutArr.push(key)
//                         break
//                     case "protein" : nutArr.push(key)
//                         break
//                     default : 
//                         console.log("Nutritional information not available") 
//                         break   
//                 }
//             }
//             return nutArr
//         })

//     })

//     console.log(nutArr)

//     //the nutrition object stores the values for the keys in the nutrition array
//     const nutObj = {
//         nutArr: nutArr
//     }

//     //for in loop
//     //if key = nutrition time push into array



//     //add script tag to footer for app.js

// // module.exports = nutObj