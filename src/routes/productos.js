import { Router } from "express";
import {orm} from "../db.js";

const router = Router();

router.get('/productos', async (req, res) => {
    try {
        

        // Realiza la consulta a la base de datos para obtener los elementos
        const productos = await orm.productos.findMany({

        });

        if (productos.length !=0) {
            res.json(productos);
        }else{

            // Envía la respuesta con los elementos
            res.status(204).json({ info: "Not content" });
        }
    } catch (error) {
        console.error("Error fetching productos:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});




router.get('/productos/:id', async (req, res) => {
    try {
        const foundProduct = await orm.productos.findFirst({
            where: {
                ID_PRODUCTO: parseInt(req.params.id)
            }
        });

        if (!foundProduct) {
            return res.status(404).json({ error: "Product not found" });
        }else{
            res.json(foundProduct);
        }

        
    } catch (error) {
        console.error("Error fetching Product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.delete('/productos/:id',async (req, res) => {
    try {

        // Elimina el Product por su el ID_PRODUCTO proporcionado en la ruta
        const deleteResult = await orm.productos.delete({
            where: {
                ID_PRODUCTO: parseInt(req.params.id)
            }
        });

        if (deleteResult) {
            res.json({ info: "Product deleted successfully" });
        } else {
            res.status(404).json({ error: "Product not found" });
        }
    } catch (error) {
        console.error("Error deleting Product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});





router.put('/productos/:id', async (req, res) => {
    try {
        const ProductUpdate = await orm.productos.update({
            where: {
                ID_PRODUCTO: parseInt(req.params.id)
            },
            data: req.body
        });

        if (ProductUpdate === null) {
            return res.status(404).json({ error: "Product not found" });
        }else{
            return res.json({ info: "Product updated successfully" });
        }

        
    } catch (error) {
        console.error("Error updating Product:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/productos', async (req, res) => {
    try {
       
        const newConnection = await orm.productos.create({
            data: req.body
        });
        
        res.status(200).json({ info: "Product created!" });
    } catch (error) {
        console.error("Error creating Product:", error);
        return res.status(400).json({ error: "Product could not be created." });
    }
});
export default router;