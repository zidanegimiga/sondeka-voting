const express = require('express')
const app = express();

const port = process.env.port || 4000 ;

app.get('/', (req, res) =>{ 
    res.send(`<h1>API is working</h1>`); 
})

app.listen(port, ()=>{
    console.log(`Listening to server on port ${port}`)
})