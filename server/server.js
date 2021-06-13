require("dotenv").config();
const express = require('express');
const app = express();
const db = require('./db')

// MIDDLEWARE

app.use(express.json())

// GET ALL restaurants
app.get("/api/v1/restaurants", async (req, res) => {
    try {
        const results = await db.query("SELECT * FROM restaurants");
        console.log(results)
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: { 
                restaurants: results.rows,
            },
        });
    } catch(err) {
        console.log(err)
    }      
});

// GET a restaurant

app.get("/api/v1/restaurants/:id", async (req, res) => {  
    try{
        // format prevent sql injections
        const results = await db.query("SELECT * FROM restaurants WHERE id = $1",
        [req.params.id]
        );
        console.log(req.params.id);
        res.status(200).json({
            status: "success",
            data: { 
                restaurant: results.rows[0],
            },
            
        })
    } catch(err){
        console.log(err);
    }
});

// CREATE Restaurants

app.post("/api/v1/restaurants", async (req, res) => {
    try {
        const results = await db.query("INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) returning *", 
        [req.body.name, req.body.location, req.body.price_range]
        );
        console.log(results);
        res.status(201).json({
            status: "success",
            data: { 
                restaurant: results.rows[0],
            },
        
        });
    } catch(err) {
        console.log(err)
    }
});

//UPDATE restaurants
app.put("/api/v1/restaurants/:id", async (req, res) => {
    try{
        const results = await db.query("UPDATE restaurants SET name = $1, location = $2, print = $3 WHERE id = $4 returning *", 
        [req.body.name, req.body.location, req.body.price_range, req.params.id]
        );
        console.log(req.params.id);
        res.status(200).json({
            status: "success",
            data: { 
                restaurant: results.rows[0],
            },
        });
    } catch(err) {
        console.log(err)
    }
});

// DELETE restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const results = await db.query("DELETE FROM restaurants WHERE id = $1", 
        [req.params.id]
        );
        res.status(204).json({
            status: "success",
        });
    } catch (err) {
        console.log(err)
    }
});

const port = process.env.PORT || 4001;
app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});