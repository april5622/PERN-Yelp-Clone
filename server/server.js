require("dotenv").config();
const express = require('express');

const app = express();

const port = process.env.PORT || 4001;
app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});