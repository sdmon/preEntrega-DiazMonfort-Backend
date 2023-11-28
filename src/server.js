const express = require('express')
const cartRouter = require('./routes/carts.router.js')
const productsRouter = require('./routes/products.router.js')
const app = express()
const port = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)

app.get('/', (req, res) => {
    res.send('Hola')
})
app.listen(port, () => {
    console.log("http://localhost:8080")
})
