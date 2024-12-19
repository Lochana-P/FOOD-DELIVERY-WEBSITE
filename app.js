const express = require('express');
const { MongoClient } = require("mongodb");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.get("/", (req, res) => {
res.sendFile(__dirname + "/index.html");
});
app.post("/", (req, res) => {
const dish_name = req.body.dish;
const quantity_dish = req.body.quantity;
main(dish_name, quantity_dish);
res.send("Data received");
});
app.listen(3000);
async function main(dish_name, quantity_dish)
{
const url = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(url);
try{
await client.connect();
const dbList = await client.db("Food-app").createCollection("Order");
await client.db("Food-app").collection("Order").insertOne({Dish: dish_name, Quantity:
quantity_dish});
}
catch(e){
console.error(e);
}
finally{
await client.close();
}
}