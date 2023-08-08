const express = require("express");
const cors = require("cors");
const path=require("path")
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.static(path.join(__dirname,"../client")))

const { getRestaurant, getDish, getFoods,updateFood, deleteFood, addFood, getIngredients,updateIngredients } = require('./controller')

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"../client/index.html"))
})
app.get("/ingredients",(req,res)=>{
    res.sendFile(path.join(__dirname,"../client/ingredients.html"))
})
app.get("/api/restaurant", getRestaurant);
app.get("/api/dish", getDish);
app.get("/api/ingredients/:id",getIngredients)
// app.get("/api/month",getMonth)
app.get(`/api/foods`, getFoods)
app.delete(`/api/foods/:id`, deleteFood)
app.post(`/api/foods`, addFood)
app.put(`/api/foods/:id`, updateFood)
app.put(`/api/ingredients/:id`,updateIngredients)

app.listen(4000, () => {console.log("Server running on 4000")});
