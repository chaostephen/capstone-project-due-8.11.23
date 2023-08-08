const foodDatabase=require('./db.json');
let currentID=4;
module.exports = {

    getFoods: (req, res) => {res.status(200).send(foodDatabase)},
    addFood: (req, res) => {
        const { title, artist,rating } = req.body;
        let newFood = {
            id: currentID,
            title:title, 
            artist:artist,
            rating:rating
        }
        foodDatabase.push(newFood)
        res.status(200).send(foodDatabase)
        currentID++
    },
    deleteFood: (req, res) => {
        const id = +req.params.id;
        for(let i = 0; i<foodDatabase.length;i++){
            if(foodDatabase[i].id===id){
                foodDatabase.splice(i,1)
                res.status(200).send(foodDatabase)
                return
            }
        }
        res.status(400).send("Food not found")
    },
    updateFood: (req, res) => {
        const id = +req.params.id;
        const type = req.body.type;
        let foodIndex;
        for(let i =0; i<foodDatabase.length;i++){
            if(foodDatabase[i].id===id){
                foodIndex=i;
            }
        }
        if(foodIndex===undefined){
            res.status(400).send('food not found')
        } else if (type === 'plus'){
            if(foodDatabase[foodIndex].rating<5){
                foodDatabase[foodIndex].rating++}
            res.status(200).send(foodDatabase)
        } else if (type==='minus'){
            if(foodDatabase[foodIndex].rating>1){
                foodDatabase[foodIndex].rating--
            }
            res.status(200).send(foodDatabase)
        } else {
            res.status(400).send('invalid type constraint')
        }

    },
    
    getRestaurant: (req, res) => {
        
        const restaurants = [];
        for(let i = 0; i<foodDatabase.length;i++){
            restaurants.push(foodDatabase[i].artist)
            }
        let randomIndex = Math.floor(Math.random() * restaurants.length);
        let randomRestaurant = restaurants[randomIndex];
      
        res.status(200).send(randomRestaurant);
    },
    getDish:(req,res)=>{
        const dishes=[];
        for (let i =0; i<foodDatabase.length;i++){
            dishes.push(foodDatabase[i].title)
        }

        let randomIndex=Math.floor(Math.random()*dishes.length);
        let randomDish = dishes[randomIndex];

        res.status(200).send(`I predict that your order for this meal will be: ${randomDish}`)
    },
    getIngredients:(req,res)=>{
        let ingredients=[];
        let measurements=[];

        let id = +req.params.id
        for (let i =0; i<foodDatabase.length;i++){
            console.log(foodDatabase[i])
            if (id===foodDatabase[i].id){
                ingredients=foodDatabase[i].ingredients;
                measurements=foodDatabase[i].measurements;
            }
        }
                res.status(200).send({ingredients,measurements})
    },
    updateIngredients: (req, res) => {
        const id = +req.params.id;
        const type = req.body.type;
        let foodIndex;
        for(let i =0; i<foodDatabase.length;i++){
            if(foodDatabase[i].id===id){
                foodIndex=i;
            }
        }

        if(foodIndex===undefined){
            res.status(400).send('food not found')
        } else if (type === 'plus'){
            for( let i=0;i<foodDatabase[foodIndex].measurements.length;i++){
                let quantity=foodDatabase[foodIndex].measurements[i].split(" ");
                quantity[0]=+quantity[0]*2
                foodDatabase[foodIndex].measurements[i]=quantity.join(" ")
            }
           
            res.status(200).send(foodDatabase[foodIndex])
        } else if (type==='minus'){
            for (let i=0;i<foodDatabase[foodIndex].measurements.length;i++){
                let quantity=foodDatabase[foodIndex].measurements[i].split(" ");
                quantity[0]=+quantity[0]/2
                foodDatabase[foodIndex].measurements[i]=quantity.join(" ")
            }
            res.status(200).send(foodDatabase[foodIndex])
        } else {
            res.status(400).send('invalid type constraint')
        }

    }

}