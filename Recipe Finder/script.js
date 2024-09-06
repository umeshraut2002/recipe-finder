// javascript file 
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const recipeContainer = document.querySelector(".main-section");

function searchHandler() {
  const querySearch = searchInput.value.trim();

  const apiEndPoint = `https://api.edamam.com/search?q=${querySearch}&app_id=3ea6fb4f&app_key=8083ffcaf173ceb48a8057b7e99df7bc`;

  fetch(apiEndPoint)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`API request failed : ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (!data.hits || !data.hits.length) {
        clearResult();
        const noResult = document.createElement("p");
        noResult.textContent = ` No Recipe Found For Search Query`;
        recipeContainer.appendChild(noResult);
        return;
      }

      clearResult();

      data.hits.forEach((hit) => {
        const recipe = hit.recipe;

        const recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");

        const img = document.createElement("img");
        img.src = recipe.image;
        img.alt = "Recipe Image";
        recipeCard.appendChild(img);

        const title = document.createElement("h2");
        title.textContent = `Recipe: ${recipe.label}\n`;
        recipeCard.appendChild(title);

        const ingredientList = document.createElement("p");
        ingredientList.textContent = `Ingredients: ${recipe.ingredientLines.join(
          ", "
        )}\n\n`;
        recipeCard.appendChild(ingredientList);

        const quantity = document.createElement("p");
        quantity.textContent = `Health: ${recipe.healthLabels}`;
        recipeCard.appendChild(quantity);

        const calories = document.createElement("p");
        calories.textContent = `Calories Amount: ${Math.round(
          recipe.calories
        )} Kcal`;
        recipeCard.appendChild(calories);

        const weight = document.createElement("p");
        weight.textContent = `Weight: ${Math.round(recipe.totalWeight)} gm`;
        recipeCard.appendChild(weight);

        const time = document.createElement("p");
        time.textContent = `Time: ${recipe.totalTime} Minute`;
        recipeCard.appendChild(time);

        const type = document.createElement("p");
        type.textContent = `Type: ${recipe.cuisineType}`;
        recipeCard.appendChild(type);

        const meal = document.createElement("p");
        meal.textContent = `Meal Type: ${recipe.mealType}`;
        recipeCard.appendChild(meal);

        const dish = document.createElement("p");
        dish.textContent = `Dish Type: ${recipe.dishType}`;
        recipeCard.appendChild(dish);

        recipeContainer.appendChild(recipeCard);
      });
    })
    .catch((error) => {
      clearResult();
      const errorMessage = document.createElement("p");
      errorMessage.textContent = `Error: Something Went Wrong ${error}`;
      recipeContainer.appendChild(errorMessage);
    });
}

function clearResult() {
  recipeContainer.textContent = "";
}

searchBtn.addEventListener("click", searchHandler);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchHandler();
  }
});

// form submit

const form = document.querySelector("form");
const fdf = form.querySelector(".feedback-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
});
