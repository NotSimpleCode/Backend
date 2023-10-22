import { Router } from "express";
import {orm} from "../db.js";

const router = Router();

router.get('/sectores', async (req, res) => {
    try {
        // Realiza la consulta a la base de datos para obtener los elementos 
        const sectores = await orm.sectores.findMany({
            include: {
                lotes: true,
                tipo_plantas:true,
            }
        });

        if(sectores!=0){
            // Envía la respuesta con los elementos 
            res.json(sectores);
        }else{
            res.status(204).json({ info: "Not content" });
        }

        
    } catch (error) {
        console.error("Error fetching sectores:", error);
        res.status(500).json({ error: "Internal server error not have connection" });
    }
});

router.get('/sectores/:id', async (req, res) => {
    try {
        const sectoresFound = await orm.sectores.findFirst({
            where: {
                ID_SECTOR: parseInt(req.params.id)
            },
            include: {
                lotes: true,
                tipo_plantas:true,
            }
        });

        if (!sectoresFound) {
            return res.status(404).json({ error: "sectores not found" });
        }else{
            res.json(sectoresFound);
        }

        
    } catch (error) {
        console.error("Error fetching sectores:", error);
        res.status(500).json({ error: "Internal server error not have connection" });
    }
});

//elimina un sector asociado a un lote
router.delete('/sectores/:idsector', async (req, res) => {
    try {
        const sectorID = parseInt(req.params.idsector);

        // Elimina la sectoresa por su ID_sectoresA 
        const deleteResult = await orm.sectores.delete({

            where: {
                ID_SECTOR:sectorID
            }

        });

        if (deleteResult) {
            res.json({ info: "sectores deleted successfully" });
        } else {
            res.status(404).json({ error: "sectores not found" });
        }
    } catch (error) {
        console.error("Error deleting sectores:", error);
        res.status(500).json({ error: "Internal server error not have connection" });
    }
});

//metodo que modifica todos los datos de un sector
router.put('/sectores/:idsector', async (req, res) => {
    try {
        const sectoresUpdate = await orm.sectores.update({
            where: {
                ID_SECTOR: parseInt(req.params.idsector)
            },
            data: req.body
        });

        if (sectoresUpdate === null) {
            return res.status(404).json({ error: "sectores not found" });
        }else{
            return res.json({ info: "sectores updated successfully" });
        }

        
    } catch (error) {
        console.error("Error updating sectores:", error);
        return res.status(500).json({ error: "Internal server error not have connection" });
    }
});



router.post('/sectores', async (req, res) => {
    try {
        const newsectores = await orm.sectores.create({
            data: req.body
        });

        res.status(200).json({ info: "sectores created!" });

    } catch (code) {
        console.error("Error creating sectores:", code);

        return res.status(400).json({ error: "Error creating, sectores already exists or not have connection" });
    }
});

export default router;
