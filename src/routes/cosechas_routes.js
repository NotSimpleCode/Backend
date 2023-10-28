import { Router } from "express";
import {orm} from "../db.js"

const router = Router();
router.get('/cosechas', async (req, res) => {
    try {
        

        // Realiza la consulta a la base de datos para obtener los elementos
        const cosechas = await orm.cosechas.findMany({
            
        });
        
        if (cosechas.length !=0) {
            cosechas.forEach(cosecha => {
                cosecha.FECHA_COSECHA = cosecha.FECHA_COSECHA.toISOString().split('T')[0];});
            
            // Envía la respuesta con los elementos y fecha formateada
            res.json(cosechas);
        }else{
            res.status(204).json({ info: "Not content" });
        }
    } catch (error) {
        console.error("Error fetching cosechas:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});




router.get('/cosechas/:id', async (req, res) => {
    try {
        const foundCosecha = await orm.cosechas.findFirst({
            where: {
                ID_COSECHA: parseInt(req.params.id)
            }
        });

        if (!foundCosecha) {
            return res.status(404).json({ error: "Cosechas not found" });
        }else{
            foundCosecha.FECHA_COSECHA = foundCosecha.FECHA_COSECHA.toISOString().split('T')[0];
            res.json(foundCosecha);
        }

        
    } catch (error) {
        console.error("Error fetching Cosechas:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.delete('/cosechas/:id',async (req, res) => {
    try {

        // Elimina el Cosechas por su el ID_Cosechas proporcionado en la ruta
        const deleteResult = await orm.cosechas.delete({
            where: {
                ID_COSECHA: parseInt(req.params.id)
            }
        });

        if (!deleteResult) {
            return res.status(404).json({ error: "Cosechas not found" });
        }else{
            res.json({info:"Cosecha deleted succesfully"});
        }
    } catch (error) {
        console.error("Error deleting Cosechas:", error);
        res.status(400).json({ error: "Verify Historial Cosechas - can't delete this" });
    }
});





router.put('/cosechas/:id', async (req, res) => {
    try {
        const CosechasUpdate = await orm.cosechas.update({
            where: {
                ID_COSECHA: parseInt(req.params.id)
            },
            data: req.body
        });

        if (CosechasUpdate === null) {
            return res.status(404).json({ error: "Cosechas not found" });
        }else{
            return res.json({ info: "Cosechas updated successfully" });
        }

        
    } catch (error) {
        console.error("Error updating Cosechas:", error);
        return res.status(400).json({ error: "Verify data again - can't update this" });
    }
});

router.post('/cosechas', async (req, res) => {
    try {
       
        const newConnection = await orm.cosechas.create({
            data: req.body
        });
        
        res.status(200).json({ info: "Cosechas created!" });
    } catch (error) {
        console.error("Error creating Cosechas:", error);
        return res.status(400).json({ error: "Cosechas could not be created or already exists." });
    }
});
export default router;