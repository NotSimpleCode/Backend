import { Router } from "express";
import {orm} from "../db.js";

const router = Router();

router.get('/tipo_plantas', async (req, res) => {
    try {
        

        // Realiza la consulta a la base de datos para obtener los elementos
        const tipo_plantas = await orm.tipo_plantas.findMany({

        });

        if (tipo_plantas.length !=0) {
            res.json(tipo_plantas);
        }else{

            // Envía la respuesta con los elementos
            res.status(204).json({ info: "Not content" });
        }
    } catch (error) {
        console.error("Error fetching tipo_plantas:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});




router.get('/tipo_plantas/:id', async (req, res) => {
    try {
        const foundPlanta = await orm.tipo_plantas.findFirst({
            where: {
                ID_TIPO_PLANTA: parseInt(req.params.id)
            }
        });

        if (!foundPlanta) {
            return res.status(404).json({ error: "Planta not found" });
        }else{
            res.json(foundPlanta);
        }

        
    } catch (error) {
        console.error("Error fetching Planta:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.delete('/tipo_plantas/:id',async (req, res) => {
    try {

        // Elimina el Planta por su el ID_Planta proporcionado en la ruta
        const deleteResult = await orm.tipo_plantas.delete({
            where: {
                ID_TIPO_PLANTA: parseInt(req.params.id)
            }
        });

        if (deleteResult) {
            res.json({ info: "Planta deleted successfully" });
        } else {
            res.status(404).json({ error: "Planta not found" });
        }
    } catch (error) {
        console.error("Error deleting Planta:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});





router.put('/tipo_plantas/:id', async (req, res) => {
    try {
        const plantaUpdate = await orm.tipo_plantas.update({
            where: {
                ID_TIPO_PLANTA: parseInt(req.params.id)
            },
            data: req.body
        });

        if (plantaUpdate === null) {
            return res.status(404).json({ error: "Planta not found" });
        }else{
            return res.json({ info: "Planta updated successfully" });
        }

        
    } catch (error) {
        console.error("Error updating Planta:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/tipo_plantas', async (req, res) => {
    try {
       
        const newPlant = await orm.tipo_plantas.create({
            data: req.body
        });
        
        res.status(200).json({ info: "Planta created!" });
    } catch (error) {
        console.error("Error creating Planta:", error);
        return res.status(400).json({ error: "Planta could not be created." });
    }
});
export default router;