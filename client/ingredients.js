const baseURL='http://localhost:4000/api/ingredients'
const ingredientsContainer=document.querySelector('#ingredients-list')
const ingredientsCallback=({data:ingredients})=>{
    ingredientsContainer.innerHTML = ``;
    getIngredients();
}
const id = sessionStorage.getItem("id")
const getIngredients=()=>{
    // const id = sessionStorage.getItem("id")
    axios.get(`/api/ingredients/${id}`)
        .then(res => {
            const {ingredients,measurements} = res.data;
            console.log(res.data)
            for (let i =0; i<ingredients.length;i++){
                createIngredientsCard(ingredients[i],measurements[i]);
            }
})}

const updateServing=(id,type)=>axios.put(`${baseURL}/${id}`,{type}).then(ingredientsCallback).catch(err=>console.log(err))
// function updateServing(arr){

// }

function displayIngredients(arr){
    ingredientsContainer.innerHTML = ``
    for(let i =0; i<arr.length;i++){
        createIngredientsCard(arr[i])
    }

}
function displayButtons(){
    const buttonCard=document.createElement('div')
    buttonCard.innerHTML=`<div class="buttons"><button onclick="updateServing(${id},'minus')">-</button>
    <p class="serving-amount"> servings</p>
    <button onclick="updateServing(${id},'plus')">+</button></div>`
    let btnsContainer=document.querySelector("#btns-container")
    btnsContainer.appendChild(buttonCard)
}
function createIngredientsCard(ingredient,measurement) {
    

    const ingredientsCard = document.createElement('div')
    ingredientsCard.classList.add('food-card')
    
    ingredientsCard.innerHTML = `<p class="ingredient-name">Ingredients: <a id="ingredient-item">${ingredient} </a></p><p class="quantity-amount">Quantity:${measurement}</p>`
    ingredientsContainer.appendChild(ingredientsCard)

}

getIngredients();
displayButtons();