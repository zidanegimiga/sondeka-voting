const express = require('express')
const app = express();
const router = express.Router();

const port = process.env.PORT || 3000 ;

app.get('/', (req, res)=> {res.send("<head>Success</head><h1>Hello!</h1>")})

app.listen(process.env.PORT, ()=>{
    console.log(`Success. Listening to server on port ${process.env.PORT}`)
});
