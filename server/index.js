const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

const dataRes = {
    hello: 1,
    world: 2
}

app.get('/', (req, res) => {
  res.json(dataRes)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})