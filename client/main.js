const foodsContainer = document.querySelector('#foods-container')
const form = document.querySelector('form')

const baseURL='http://localhost:4000/api/foods'

const foodsCallback = ({data:foods})=> displayFoods(foods)

const errCallback = err=>console.log(err.response.data)

const getAllFoods=()=>axios.get(baseURL).then(foodsCallback).catch(errCallback)
const addFood=body=>axios.post(baseURL,body).then(foodsCallback).catch(errCallback)
const deleteFood=id=>axios.delete(`${baseURL}/${id}`).then(foodsCallback).catch(errCallback)
const updateFood=(id,type)=>axios.put(`${baseURL}/${id}`,{type}).then(foodsCallback).catch(errCallback)

function submitHandler(e){
    e.preventDefault()
    
    let title = document.querySelector('#title')
    let artist = document.querySelector('#artist')
    let rating = document.querySelector('input[name="ratings"]:checked')

    let bodyObj={
        title:title.value,
        artist:artist.value,
        rating:rating.value
    }
    addFood(bodyObj)

    title.value=''
    rating.checked=false
    artist.value=''
}

function createFoodCard(food) {
    const foodCard = document.createElement('div')
    foodCard.classList.add('food-card')

    foodCard.innerHTML = `<p class="food-name">Food: ${food.title}</p><p class="artist-name">Place: ${food.artist}</p>
    <div class="btns-container">
        <button onclick="updateFood(${food.id}, 'minus')">-</button>
        <p class="food-rating">${food.rating} stars</p>
        <button onclick="updateFood(${food.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteFood(${food.id})">delete</button>
    `
    foodsContainer.appendChild(foodCard)
}

function displayFoods(arr) {
    foodsContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createFoodCard(arr[i])
    }
}

const restaurantBtn = document.getElementById("restaurantButton")
const dishBtn=document.getElementById("dishButton")
// const monthBtn=document.getElementById("monthButton")
const foodBtn=document.getElementById("foodButton")






form.addEventListener('submit',submitHandler)
getAllFoods()


const getRestaurant = () => {
    axios.get("http://localhost:4000/api/restaurant/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

const getDish = () => {
    axios.get("http://localhost:4000/api/dish/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};
// const getMonth=()=>{
//     axios.get("http://localhost:4000/api/month/").then(res=>{
//         const data=res.data;
//         alert(data);
//     })
// }
restaurantBtn.addEventListener('click', getRestaurant)
dishBtn.addEventListener('click',getDish)
// monthBtn.addEventListener('click',getMonth)