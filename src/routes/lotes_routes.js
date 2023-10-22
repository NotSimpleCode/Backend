import { Router } from "express";
import {orm} from "../db.js";

const router = Router();


router.get('/lotes', async (req, res) => {
    try {
        // Realiza la consulta a la base de datos para obtener los elementos 
        const lotes = await orm.lotes.findMany({
          include:
          {
            sectores:true
          }
        });

        if(lotes!=0){
            // Envía la respuesta con los elementos 
            res.json(lotes);
        }else{
            res.status(204).json({ info: "Not Content" });
        }

        
    } catch (error) {
        console.error("Error fetching lotes:", error);
        res.status(500).json({ error: "Internal server error not have connection" });
    }
});

router.get('/lotes/:id', async (req, res) => {
    try {
        const lotesFound = await orm.lotes.findMany({
            where: {
                ID_LOTE: parseInt(req.params.id)
            },
            include:{
                sectores:true
            }
        });

        if (!lotesFound) {
            return res.status(404).json({ error: "lotes not found" });
        }

        res.json(lotesFound);
    } catch (error) {
        console.error("Error fetching lotes:", error);
        res.status(500).json({ error: "Internal server error not have connection" });
    }
});

router.delete('/lotes/:id', async (req, res) => {
    try {
        const loteID = parseInt(req.params.id);
    

        // Elimina la lotesa por su ID_lotesA 
        const deleteResult = await orm.lotes.delete({
            where: {
                ID_LOTE: loteID
            }
        });

        if (deleteResult) {
            res.json({ info: "lotes deleted successfully" });
        } else {
            res.status(404).json({ error: "lotes not found" });
        }
    } catch (error) {
        console.error("Error deleting lotes:", error);
        res.status(500).json({ error: "Internal server error not have connection" });
    }
});

router.put('/lotes/:id', async (req, res) => {
    try {
        const lotesUpdate = await orm.lotes.update({
            where: {
                ID_LOTE: parseInt(req.params.id)
            },
            data: req.body
        });

        if (lotesUpdate === null) {
            return res.status(404).json({ error: "lotes not found" });
        }

        return res.json({ info: "lotes updated successfully" });
    } catch (error) {
        console.error("Error updating lotes:", error);
        return res.status(500).json({ error: "Internal server error not have connection" });
    }
});

router.post('/lotes', async (req, res) => {
    try {
        const newlotes = await orm.lotes.create({
            data: req.body
        });
        
        res.status(200).json({ info: "lotes created!" });
       
    } catch (code) {
        console.error("Error creating lotes:", code);
        
        return res.status(400).json({ error: "Error creating, lotes already exists or not have connection" });
    } 
});

export default router;
