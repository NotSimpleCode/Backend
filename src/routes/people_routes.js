import { Router } from "express";
import {orm} from "../db.js";

const router = Router();


router.get('/person', async (req, res) => {
    try {
       

        // Realiza la consulta a la base de datos para obtener los elementos de la página actual
        const people = await orm.personas.findMany({
        });

        // Envía la respuesta con los elementos de la página actual
        res.json(people);
    } catch (error) {
        console.error("Error fetching person:", error);
        res.status(500).json({ error: "Internal server error not have connection" });
    }
});

router.get('/person/:id', async (req, res) => {
    try {
        const personFound = await orm.personas.findFirst({
            where: {
                ID_PERSONA: req.params.id
            }
        });

        if (!personFound) {
            return res.status(404).json({ error: "Person not found" });
        }else{
            res.json(personFound);
        }

        
    } catch (error) {
        console.error("Error fetching person:", error);
        res.status(500).json({ error: "Internal server error not have connection" });
    }
});

router.delete('/person/:id', async (req, res) => {
    try {
        const usuarioID = req.params.id;
    

        // Elimina la persona por su ID_PERSONA 
        const deleteResult = await orm.personas.delete({
            where: {
                ID_PERSONA: usuarioID
            }
        });

        if (deleteResult) {
            res.json({ info: "Person deleted successfully" });
        } else {
            res.status(404).json({ error: "Person not found" });
        }
    } catch (error) {
        console.error("Error deleting person:", error);
        res.status(500).json({ error: "Internal server error not have connection" });
    }
});

router.put('/person/:id', async (req, res) => {
    try {
        const personUpdate = await orm.personas.update({
            where: {
                ID_PERSONA: req.params.id
            },
            data: req.body
        });

        if (personUpdate === null) {
            return res.status(404).json({ error: "Person not found" });
        }else{
            return res.json({ info: "Person updated successfully" });
        }

        
    } catch (error) {
        console.error("Error updating person:", error);
        return res.status(500).json({ error: "Internal server error not have connection" });
    }
});

router.post('/person', async (req, res) => {
    try {
        const newPerson = await orm.personas.create({
            data: req.body
        });
        
        res.status(200).json({ info: "Person created!" });
       
    } catch (code) {
        console.error("Error creating Person:", code);
        
        return res.status(400).json({ error: "Error creating, Person already exists or not have connection" });
    } 
});

export default router;