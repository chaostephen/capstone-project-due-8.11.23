const ingredientsContainer=document.querySelector('#ingredients-list')
const getIngredients=()=>{
    const id = sessionStorage.getItem("id")
    axios.get(`/api/ingredients/${id}`)
        .then(res => {
            const {ingredients,measurements} = res.data;
            // console.log(data)
            for (let i =0; i<ingredients.length;i++){
                createIngredientsCard(ingredients[i],measurements[i]);
            }
})}
function createIngredientsCard(ingredient,measurement) {
    const ingredientsCard = document.createElement('div')
    ingredientsCard.classList.add('food-card')

    ingredientsCard.innerHTML = `<p class="ingredient-name">Ingredients: <a id="ingredient-item">${ingredient} </a></p><p class="quantity-amount">Quantity:${measurement} </p>
    `
    // <div class="btns-container">
    //     <button onclick="updateFood(${food.id}, 'minus')">-</button>
    //     <p class="food-rating">${food.rating} stars</p>
    //     <button onclick="updateFood(${food.id}, 'plus')">+</button>
    // </div>
    // <button onclick="deleteFood(${food.id})">delete</button>
    ingredientsContainer.appendChild(ingredientsCard)
}
getIngredients();