import { Router } from "express";
import {orm} from "../db.js";

const router = Router();

router.get('/plagas', async (req, res) => {
    try {
        

        // Realiza la consulta a la base de datos para obtener los elementos
        const plagas = await orm.plagas.findMany({

        });

        if (plagas.length !=0) {
            res.json(plagas);
        }else{

            // Envía la respuesta con los elementos
            res.status(204).json({ info: "Not content" });
        }
    } catch (error) {
        console.error("Error fetching plagas:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});




router.get('/plagas/:id', async (req, res) => {
    try {
        const foundPlaga = await orm.plagas.findFirst({
            where: {
                ID_PLAGA: parseInt(req.params.id)
            }
        });

        if (!foundPlaga) {
            return res.status(404).json({ error: "Plaga not found" });
        }else{
            res.json(foundPlaga);
        }

        
    } catch (error) {
        console.error("Error fetching Plaga:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.delete('/plagas/:id',async (req, res) => {
    try {

        // Elimina el Plaga por su el ID_Plaga proporcionado en la ruta
        const deleteResult = await orm.plagas.delete({
            where: {
                ID_PLAGA: parseInt(req.params.id)
            }
        });

        if (deleteResult) {
            res.json({ info: "Plaga deleted successfully" });
        } else {
            res.status(404).json({ error: "Plaga not found" });
        }
    } catch (error) {
        console.error("Error deleting Plaga:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});





router.put('/plagas/:id', async (req, res) => {
    try {
        const PlagaUpdate = await orm.plagas.update({
            where: {
                ID_PLAGA: parseInt(req.params.id)
            },
            data: req.body
        });

        if (PlagaUpdate === null) {
            return res.status(404).json({ error: "Plaga not found" });
        }else{
            return res.json({ info: "Plaga updated successfully" });
        }

        
    } catch (error) {
        console.error("Error updating Plaga:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/plagas', async (req, res) => {
    try {
       
        const newPlant = await orm.plagas.create({
            data: req.body
        });
        
        res.status(200).json({ info: "Plaga created!" });
    } catch (error) {
        console.error("Error creating Plaga:", error);
        return res.status(400).json({ error: "Plaga could not be created." });
    }
});
export default router;