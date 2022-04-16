//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
document.querySelector('.search-btn').addEventListener('click', getDrink)

function getDrink() {
  let drink = document.querySelector('input').value

  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      //console.log(data.drinks)
      window.localStorage.setItem('data', JSON.stringify(data));

      if (data.drinks.length > 1) {

        document.querySelector('#prevBtn').addEventListener('click', nextDrink);
        document.querySelector('#nextBtn').addEventListener('click', nextDrink);
      }

      document.querySelector('h2').innerText = data.drinks[0].strDrink
      document.querySelector('.carousel__img').src = data.drinks[0].strDrinkThumb
      document.querySelector('h3').innerText = data.drinks[0].strInstructions
      document.querySelector("p").innerText = ingridientsList(0)





    })
    .catch(err => {
      console.log(`error ${err}`)
    });





  function ingridientsList(bevIndex) {
    if (bevIndex === null || undefined) {
      bevIndex = 0
    }
    let data = JSON.parse(window.localStorage.getItem('data'));

    let ingredients = Object.keys(data.drinks[bevIndex])
      .filter((key) => key.includes("strIngredient"))
      .map((key) => data.drinks[bevIndex][key])


    function removeNull(arr) {
      return arr.filter(x => x !== null && x !== "")
    }
    let list = removeNull(ingredients)

    return list;
  } 

  function nextDrink() {

        let data =  JSON.parse(window.localStorage.getItem('data')); 
        let bevList = data.drinks;
        let currentBev = document.querySelector('h2').innerText
        let currBevIndex = 0
        let nextBevIndex = 0
        console.log(currentBev)

        for (let i = 0; i < bevList.length; i++) { // finds curr beverage index 
          if(bevList[i].strDrink === currentBev) {
            currBevIndex = i
          }
        }
        console.log(currBevIndex)
        if (this.id === 'nextBtn') {
          if (currBevIndex === bevList.length - 1) {
            nextBevIndex = 0
          }
          else {

            nextBevIndex = currBevIndex + 1;
          }

          document.querySelector('h2').innerText = bevList[nextBevIndex].strDrink;
          document.querySelector('.carousel__img').src = bevList[nextBevIndex].strDrinkThumb
          document.querySelector('h3').innerText = bevList[nextBevIndex].strInstructions
          document.querySelector("p").innerText = ingridientsList(nextBevIndex)
        }
       if (this.id === "prevBtn") {
          if (currBevIndex === 0) {
            nextBevIndex = bevList.length - 1
          }
          else {

            nextBevIndex = currBevIndex - 1;
          }

          document.querySelector('h2').innerText = bevList[nextBevIndex].strDrink;
          document.querySelector('.carousel__img').src = bevList[nextBevIndex].strDrinkThumb
          document.querySelector('h3').innerText = bevList[nextBevIndex].strInstructions
          document.querySelector("p").innerText = ingridientsList(nextBevIndex)

        
      
      .catch(err => {
        console.log(`error ${err}`)
      })
  }
}}
