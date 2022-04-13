//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
document.querySelector('.search-btn').addEventListener('click', getDrink)

function getDrink(){
    let drink = document.querySelector('input').value

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data.drinks)
      document.querySelector('h2').innerText = data.drinks[0].strDrink
      document.querySelector('.carousel__img').src = data.drinks[0].strDrinkThumb
      document.querySelector('h3').innerText = data.drinks[0].strInstructions

      let ingredients = Object.keys(data.drinks[0])
              .filter((key)=> key.includes("strIngredient"))
              .map((key)=> data.drinks[0][key])


      function removeNull(arr){
        return arr.filter(x=> x!==null)
      }

      document.querySelector("p").innerText = removeNull(ingredients)


    })
    .catch(err => {
        console.log(`error ${err}`)
    });

}
