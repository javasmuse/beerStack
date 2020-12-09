const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const server = express();

server.use(bodyParser.json());
server.use(cors());

server.listen(process.env.PORT || 5000);
console.log('Flamingos running on 5000');


const beerStock = [{
        bId: 1,
        name: "Mannys",
        type: "Pale Ale",
        distribution: "locals only",
        brewedIn: "Seattle"
    },
    {
        bId: 2,
        name: "Lagunitas",
        type: "IPA",
        distribution: "Nationwide",
        brewedIn: "Petaluma"
    },
    {
        bId: 3,
        name: "Mac N Jacks",
        type: "African Amber",
        distribution: "locals only",
        brewedIn: "Seattle"
    },
    {
        bId: 4,
        name: "Marble",
        type: "Pale Ale",
        distribution: "locals only",
        brewedIn: "Albuquerque"
    }

];

server.post("/beer", (req, res) => {
    beerStock.push(req.body);
    res.send(beerStock);
});

server.get("/", (req, res) => {
    res.send(beerStock);
});


server.get("/:type", (req, res) => {
    const type = req.params.type;
    let results = beerStock.filter(beer => beer.type.toLowerCase() === type.toLowerCase());
    res.send(results);
});

server.get("/dist/:distribution", (req, res) => {
    const distribution = req.params.distribution;
    let results = beerStock.filter(beer => beer.distribution.toLowerCase() === distribution.toLowerCase());

    res.send(results);
});

server.put("/name/:name", (req, res) => {
    const name = req.params.name;
    const beer = req.body;
    let results = beerStock.filter(bee => bee.name === name);
    if (beer.type !== undefined) {
        results[0].type = beer.type;
    }
    if (beer.distribution !== undefined) {
        results[0].distribution = beer.distribution;
    }
    if (beer.brewedIn !== undefined) {
        results[0].brewedIn = beer.brewedIn;
    }
    res.send(results[0]);
});

server.post("/beers", (req, res) => {
    beerStock.push(req.body);
    res.send(beerStock);
});

server.delete("/trash/:id", (req, res) => {
    let id = req.params.id;
    let beeIdx = -1;
    beerStock.map((bee, idx) => {
        if (bee.bId === id) {
            //if true, found emp to delete
            beeIdx = idx;
            return;
        }
    });

    if (beeIdx === -1) {
        return res.status(404).send("Beer not found");
    }
    beerStock.splice(beeIdx, 1);
    res.send({
        success: "Success"
    });
});