const { Router } = require("express")
const CartManager = require("../managers/CartManager.js")

const cartManager = new CartManager()
const router = Router()

router
  /* .get("/", async (req, res) => {
    try {
      const carts = await cartManager.getCarts()
      res.send({
        status: 'Exito',
        payload: carts,
      })
    } catch (error) {
      console.error('Error', error)
      res.status(500).send({
        status: 'Error',
        message: 'Error del servidor al obtener carritos',
      })
    }
  }) */
  .get("/:cid", async (req, res) => {
    try {
      const { cid } = req.params
      const cart = await cartManager.getCartById(parseInt(cid))
      if (!cart) {
        return res.status(400).send({
          status: "Error",
          message: "El carrito no existe",
        })
      }
      res.send({
        status: "Exito",
        payload: cart,
      })
    } catch (error) {
      console.error("Error", error)
      res.status(500).send({
        status: "Error",
        message: "Error al obtener carrito por id",
      })
    }
  })
  .post("/", async (req, res) => {
    try {
      await cartManager.createCart()
      res.send({
        status: "Exito",
        message: "Carrito creado",
      })
    } catch (error) {
      console.error("Error al crear el carrito:", error)
      res.status(500).send({
        status: "Error",
        message: "Error del servidor al crear el carrito",
      })
    }
  })
  .delete("/:cid", async (req, res) => {
    try {
      const { cid } = req.params
      const deletedCart = await cartManager.deleteCart(cid)
      res.send({
        status: "Exito",
        payload: deletedCart,
      })
    } catch (error) {
      console.error("Error al borrar el carrito:", error)
      res.status(500).send({
        status: "Error",
        message: "Error del servidor al borrar el carrito",
      })
    }
  })
  .post("/:cid/product/:pid", async (req, res) => {
    try {
      const { cid, pid } = req.params
      const { quantity } = req.body

      const cart = await cartManager.getCartById(parseInt(cid))
      if (!cart) {
        return res.status(400).send({
          status: "Error",
          message: "El carrito no existe",
        })
      }

      if (!(await cartManager.getProduct(parseInt(pid)))) {
        return res.status(400).send({
          status: "Error",
          message: "El producto no existe",
        })
      }

      const result = await cartManager.addProdToCart(
        parseInt(cid),
        parseInt(pid),
        parseInt(quantity) || 1
      )
      console.log(result)
      res.send({
        status: "Exito",
        message: result,
      })
    } catch (error) {
      console.error("Error al agregar el producto al carrito:", error)
      res.status(500).send({
        status: "Error",
        message: "Error del servidor al agregar el producto al carrito",
      })
    }
  })

module.exports = router
