
const loadMeals = (searchText) =>{
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
    console.log(url);
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayMeals(data.meals));

}

const displayMeals=meals =>{
     const mealsContainer = document.getElementById('meals-container')
    mealsContainer.innerText='';
    meals.forEach(meal=> {
        console.log(meal)
        const mealDiv = document.createElement('div');
          mealDiv.classList.add('col');
          mealDiv.innerHTML = `
           <div class="col">
             <div class="card h-100 ">
              <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
              <div class="card-body">
              <h5 class="card-title"><b>${meal.strMeal}</b></h5>
               <p class="card-text">Welcome to our food-corner. Fresh and delicious ${meal.strMeal} are available only from our food-corner. Please check the details and order now.</p>
               <button onclick ="loadMealsDetails(${meal.idMeal})" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
               See details
             </button>
               </div>
          </div>
          
          `;
          mealsContainer.appendChild(mealDiv);
})
    };
    //searchField.value = "";
    const searchMeals=() => {
        const searchField = document.getElementById('search-field')
         const searchText = searchField.value
         console.log(searchText);
         loadMeals(searchText);
    
    }
    
    /*const loadMealsDetails = idMeal =>{
        console.log(idMeal);
        
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
        console.log(url)
        fetch(url)
        .then(res=>res.json())
        .then(data=>displayMealsDetails(data.meals[0]))
        .catch(error =>{
          console.log(error)
        })
    
    }*/
    const loadMealsDetails = async(idMeal) => {
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
      try{
        const res = await fetch(url);
        const data = await res.json();
        displayMealsDetails(data.meals[0]);
      }
      catch(error){
        console.log(error)
      }
    }
    let price =+110;
    const displayMealsDetails = meal =>{
        price=+100;
       document.getElementById('exampleModalLabel').innerText = meal.strMeal;
         
        const mealsDetails = document.getElementById('mealsDetailsBody');
        mealsDetails.innerHTML = `
         <img class="bg-danger p-2 text-dark img-fluid bg-primary w-100" src="${meal.strMealThumb}">
         <div class="d-flex justify-content-between align-items-center"><span class="ps-3 mt-3 border-danger text-danger-emphasis"><b>Price: $</b>${price}</span>
         <span><button class= "mt-2 btn btn-danger">Order now</button></span></div>
         <button class="w-100 btn btn-danger mt-5"> Added to your Cart</button>
       `
    }

loadMeals('fish');