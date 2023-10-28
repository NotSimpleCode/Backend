import { Router } from "express";
import {orm} from "../db.js"

const router = Router();


router.get('/historial/cosechas', async (req, res) => {
    try {

        //ubica las cosechas echas en que fechas y lotes se hicieron
        const historials = await orm.historial_cosechas.findMany({
            include:{
                lotes:true,
                cosechas:true
            }
        });

        if(historials != 0){
            res.json(historials);
        }else{
            res.status(204).json({ info: "Not Content" });
        }

    } catch (error) {
        console.error("Error fetching historials:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});




router.get('/historial/cosechas/cos/:idcosecha', async (req, res) => {
    try {
        const historialFound = await orm.historial_cosechas.findMany({
            where: {
                ID_COSECHA:parseInt(req.params.idcosecha)
            },
            include:{
                lotes:true,
                cosechas:true
            }
        });

        if (!historialFound) {
            return res.status(404).json({ error: "historial not found" });
        }else{
            res.status(200).json(historialFound);
        }

        
    } catch (error) {
        console.error("Error fetching historial:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/historial/cosechas/lot/:idlote', async (req, res) => {
    try {
        const historialFound = await orm.historial_cosechas.findMany({
            where: {
                ID_LOTE:parseInt(req.params.idlote)
            },
            include:{
                lotes:true,
                cosechas:true
            }
        });

        if (!historialFound) {
            return res.status(404).json({ error: "historial not found" });
        }else{
            res.status(200).json(historialFound);
        }

        
    } catch (error) {
        console.error("Error fetching historial:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.delete('/historial/cosechas/:idlote/:idcosecha', async (req, res) => {
    try {

        // Elimina el usuario por su ID_PERSONA y el ID_ROL proporcionado en la ruta
        const deleteResult = await orm.historial_cosechas.delete({
            where: {
                ID_LOTE_ID_COSECHA: {
                    ID_LOTE:parseInt(req.params.idlote),
                    ID_COSECHA:parseInt(req.params.idcosecha)
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





router.put('/historial/cosechas/:idlote/:idcosecha', async (req, res) => {
    try {
        const historialUpdate = await orm.historial_cosechas.update({
            where: {
                ID_LOTE_ID_COSECHA: {
                    ID_LOTE:parseInt(req.params.idlote),
                    ID_COSECHA:parseInt(req.params.idcosecha)
                }
            },
            data: req.body
        });

        if (historialUpdate === null) {
            return res.status(404).json({ error: "historial not found" });
        }else{
            return res.json({ info: "historial updated successfully" });
        }

        
    } catch (error) {
        console.error("Error updating historial:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});


router.post('/historial/cosechas', async (req, res) => {
    try {
        const newHistorial = await orm.historial_cosechas.create({
            data: req.body
        });

        

        res.status(200).json({ info: "Plague historial created!" });
    } catch (error) {
        console.error("Error creating Plague historial:", error);
        return res.status(400).json({ error: "Plague historial could not be created." });
    }
});















export default router;