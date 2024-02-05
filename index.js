import express from "express";
import ProductManager from "./ProductManager.js";

let productManager = new ProductManager('./products.json');
const app = express();
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/products", async (req, res) => {
    let limite = req.query.limit;
    if (limite) {
        const productosObtenidos = await productManager.getProducts();

        res.send(productosObtenidos.slice(0, limite));
    } else {
        const productosObtenidos = await productManager.getProducts();

        res.send(productosObtenidos);
    }
});

app.get("/products/:id", async (req, res) => {
    let { id } = req.params;


    const producto = await productManager.getProductById(parseInt(id));
    if (producto) {
        return res.json(producto);
    } else {
        res.status(404).send({ msg: "Producto no encontrado" });
    }
});



app.listen(PORT, () => {
    console.log("listening on port ", PORT);
});


