import { Router } from "express";
import {orm} from "../db.js";

const router = Router();


router.get('/historial/plagas', async (req, res) => {
    try {

        // Realiza la consulta a la base de datos para obtener los elementos de la página actual
        const historials = await orm.historial_plagas.findMany({
            
        });

        // Envía la respuesta con los elementos de la página actual
        res.json(historials);
    } catch (error) {
        console.error("Error fetching historials:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});




router.get('/historial/plagas/:idlote/:idplaga', async (req, res) => {
    try {
        const historialFound = await orm.historial_plagas.findMany({
            where: {
                ID_LOTE_ID_PLAGA: {
                    ID_LOTE:parseInt(req.params.idlote),
                    ID_PLAGA:parseInt(req.params.idplaga)
                }
            }
        });

        if (!historialFound) {
            return res.status(404).json({ error: "historial not found" });
        }else if(historialFound != 0){
            res.json(historialFound);
        }else{
            res.status(204).json({ info: "Not Content" });
        }

        
    } catch (error) {
        console.error("Error fetching historial:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.delete('/historial/plagas/:idlote/:idplaga', async (req, res) => {
    try {

        // Elimina el usuario por su ID_PERSONA y el ID_ROL proporcionado en la ruta
        const deleteResult = await orm.historial_plagas.delete({
            where: {
                ID_LOTE_ID_PLAGA: {
                    ID_LOTE:parseInt(req.params.idlote),
                    ID_PLAGA:parseInt(req.params.idplaga)
                }
            }
        });

        if (deleteResult) {
            res.json({ info: "historial deleted successfully" });
        } else {
            res.status(404).json({ error: "historial not found" });
        }
    } catch (error) {
        console.error("Error deleting historial:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});





router.put('/historial/plagas/:idlote/:idplaga', async (req, res) => {
    try {
        const historialUpdate = await orm.historial_plagas.update({
            where: {
                ID_LOTE_ID_PLAGA: {
                    ID_LOTE:parseInt(req.params.idlote),
                    ID_PLAGA:parseInt(req.params.idplaga)
                }
            },
            data: req.body
        });

        if (historialUpdate === null) {
            return res.status(404).json({ error: "historial not found" });
        }

        return res.json({ info: "historial updated successfully" });
    } catch (error) {
        console.error("Error updating historial:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});


router.post('/historial/plagas', async (req, res) => {
    try {
        const newHistorial = await orm.historial_plagas.create({
            data: req.body
        });

        

        res.status(200).json({ info: "Plague historial created!" });
    } catch (error) {
        console.error("Error creating Plague historial:", error);
        return res.status(400).json({ error: "Plague historial could not be created." });
    }
});












export default router;