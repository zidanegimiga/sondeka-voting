const express = require('express')
const app = express();
const router = express.Router();

const port = process.env.port || 4000 ;

app.get('/', (req, res)=> {res.send("<head>Success</head><h1>Hello!</h1>")})

app.listen(port, ()=>{
    console.log(`Listening to server on port ${port}`)
})