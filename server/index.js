const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const { getRestaurant, getDish, getFoods,updateFood, deleteFood, addFood } = require('./controller')


app.get("/api/restaurant", getRestaurant);
app.get("/api/dish", getDish);
// app.get("/api/month",getMonth)
app.get(`/api/foods`, getFoods)
app.delete(`/api/foods/:id`, deleteFood)
app.post(`/api/foods`, addFood)
app.put(`/api/foods/:id`, updateFood)

app.listen(4000, () => {console.log("Server running on 4000")});
