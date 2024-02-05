import fs from 'fs';

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.lastId = 0;
    }

    async init() {
        try {
            if (!fs.existsSync(this.path)) {
                await fs.promises.writeFile(this.path, JSON.stringify([]));
            } else {
                let data = await fs.promises.readFile(this.path, 'utf-8');
                this.products = JSON.parse(data);
                this.lastId = this.products.length > 0 ? this.products[this.products.length - 1].id : 0;
            }
        } catch (error) {
            console.error(`Error initializing ProductManager: ${error}`);
            throw error;
        }
    }

    async addProduct(product) {
        try {
            this.lastId++;
            const newProduct = { ...product, id: this.lastId };
            this.products.push(newProduct);
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
            return newProduct;
        } catch (error) {
            console.error(`Error adding product: ${error}`);
            throw error;
        }
    }

    async getProducts() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error(`Error getting products: ${error}`);
            throw error;
        }
    }

    async getProductById(id) {
        try {
            return this.products.find(product => product.id === id);
        } catch (error) {
            console.error(`Error getting product by id: ${error}`);
            throw error;
        }
    }

    async updateProduct(id, updatedProduct) {
        try {
            const productIndex = this.products.findIndex(product => product.id === id);
            if (productIndex !== -1) {
                this.products[productIndex] = { ...this.products[productIndex], ...updatedProduct, id: id };
                await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
                return this.products[productIndex];
            }
            return null;
        } catch (error) {
            console.error(`Error updating product: ${error}`);
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            this.products = this.products.filter(product => product.id !== id);
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
            return true;
        } catch (error) {
            console.error(`Error deleting product: ${error}`);
            throw error;
        }
    }
}

export default ProductManager;

