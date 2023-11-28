const { Router } = require("express")
const ProductManager = require("../managers/ProductManager.js")

const prodManager = new ProductManager()
const router = Router()

router
  .get("/", async (req, res) => {
    try {
      const products = await prodManager.getProducts()
      res.send({
        status: 'Exito',
        payload: products,
      })
    } catch (error) {
      console.error(error)
      res.status(500).send({
        status: 'Error',
        message: 'Error interno al obtener los productos',
      })
    }
  })
  .get("/:pid", async (req, res) => {
    try {
      const { pid } = req.params
      const product = await prodManager.getProduct(pid)
      if (!product) {
        return res.status(400).send({
          status: 'Error',
          message: 'No existe el producto',
        })
      }
      res.send({
        status: 'Exito',
        payload: product,
      })
    } catch (error) {
      console.error(error)
      res.status(500).send({
        status: 'Error',
        message: 'Error interno al obtener el producto por ID',
      })
    }
  })
  .post("/", async (req, res) => {
    try {
      const product = req.body
      const newProduct = await prodManager.addProduct(product)
      if (!newProduct) {
        return res.status(400).send({
          status: 'Error',
          message: 'No se pudo agregar el producto',
        })
      }
      res.send({
        status: 'Exito',
        payload: newProduct,
      })
    } catch (error) {
      console.error(error)
      res.status(500).send({
        status: 'Error',
        message: 'Error interno al agregar el producto',
      })
    }
  })
  .put("/:pid", async (req, res) => {
    try {
      const { pid } = req.params
      const updProduct = await prodManager.update(pid, req.body.updateProduct)
      if (updProduct === null) {
        return res.status(400).send({
          status: 'Error',
          message: 'No existe el producto',
        })
      }
      res.send({
        status: 'Exito',
        payload: updProduct,
      })
    } catch (error) {
      console.error(error)
      res.status(500).send({
        status: 'Error',
        message: 'Error interno al actualizar el producto',
      })
    }
  })
  .delete("/:pid", async (req, res) => {
    try {
      const { pid } = req.params
      const deleteProduct = await prodManager.deleteProduct(pid)
      if (!deleteProduct) {
        return res.status(400).send({
          status: 'Error',
          message: 'No existe el producto',
        })
      }
      res.send({
        status: 'Exito',
        payload: deleteProduct,
      })
    } catch (error) {
      console.error(error)
      res.status(500).send({
        status: 'Error',
        message: 'Error interno al eliminar el producto',
      })
    }
  })

module.exports = router
