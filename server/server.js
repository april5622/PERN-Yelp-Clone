require("dotenv").config();
const express = require('express');
const app = express();
const db = require('./db')

// MIDDLEWARE

app.use(express.json())

// GET ALL restaurants
app.get("/api/v1/restaurants", async (req, res) => {
    
    const results = await db.query("select * from restaurants")
    console.log(results)
    res.status(200).json({
        status: "success",
        data: { 
            restaurant: ["Sushi Sam", "Ultra Sushi"],
        },
        
    })
});

// GET a restaurant

app.get("/api/v1/restaurants/:id", (req, res) => {
    console.log(req.params);

    res.status(200).json({
        status: "success",
        data: { 
            restaurant: "Sushi Sam",
        },
        
    })
});

// POST Restaurants

app.post("/api/v1/restaurants", (req, res) => {
    console.log(req.body);
    res.status(201).json({
        status: "success",
        data: { 
            restaurant: "Sushi Sam",
        },
        
    });
})

//UPDATE restaurants
app.put("/api/v1/restaurants/:id", (req, res) => {
    console.log(req.params.id);
    res.status(201).json({
        status: "success",
        data: { 
            restaurant: "Sushi Sam",
        },
        
    });
});

// DELETE restaurant
app.delete("/api/v1/restaurants/:id", (req, res) => {
    res.status(200).json({
        status: "success",
    });
});

const port = process.env.PORT || 4001;
app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});