const express = require('express');
const data = require('./data.json');
const axios = require('axios');
//const cors = require('cors');
const port = 5050;
const app = express();

app.use(express.urlencoded({
    extended: true
}));


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});