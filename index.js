const express = require('express');
const data = require('./data.json');
const axios = require('axios');
const cors = require('cors');
const port = 5050;
const app = express();

app.use(express.urlencoded({
    extended: true
}));

app.get("/", (req, res) => {
    res.send("hello la team!").status(200);
});

app.get("/api/items", (req, res) => {
    res.send(data).status(200);
});

app.get("/api/items/:id", (req, res) => {
    const id = req.params.id;
    const item = data.find(element => element.id == id);
    if(item) res.send(item).status(200);
    else res.send("item not found").status(404);    
});

app.post("/api/items", (req, res) => {
    if (!req.body.name || !req.body.planet || !req.body.force ||!req.body.species){
        res.send("Missing fields").status(404);
    } else {
    const item = {
        id: data.length + 1,
        name: req.body.name,
        planet: req.body.planet,
        force: req.body.force,
        species: req.body.species
    };
    data.push(item);
    res.send ({message:"item successfully created", item: item}).status(200);
    }
});

app.patch("/api/items/:id", (req, res) => {
    const id = req.params.id;
    const item = data.find(element => element.id == id);
    if(item){
        if (req.body.name) item.name= req.body.name;
        if (req.body.planet) item.planet = req.body.planet;
        if (req.body.force) item.force = req.body.force;
        if (req.body.species) item.species = req.body.species;
        res.send ({message:"item successfully edited", item: item}).status(200);

    } else {
        res.send("Item not found").status(404);
    }      
});

app.delete("/api/items/:id", (req, res) => {
    const id = req.params.id;
    const item = data.find(element => element.id == id);
    if(item){
        data.splice(data.indexOf(item), 1);
        res.send ({message:"item successfully deleted", item: item}).status(200);
    } else {
        res.send("Item not found").status(404);
    }      
});
     
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});