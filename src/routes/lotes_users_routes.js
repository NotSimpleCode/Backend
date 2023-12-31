import { Router } from "express";
import { orm } from "../db.js";

const router = Router();

//busca todos los lotes y personas asignadas
router.get('/userlotes', async (req, res) => {
    try {
        // Realiza la consulta a la base de datos para obtener los elementos 
        const userlotes = await orm.lotes_personas.findMany({
            include: {
                lotes: true,
                personas:true
            }
        });


        // Envía la respuesta con los elementos 
        res.json(userlotes);
    } catch (error) {
        console.error("Error fetching userlotes:", error);
        res.status(500).json({ error: "Internal server error not have connection" });
    }
});
//busca todos los registros de lotes que coincidan con un ID persona
router.get('/userlotes/pers/:idpersona', async (req, res) => {
    try {
        const userlotesFound = await orm.lotes_personas.findMany({
            where: {
                ID_PERSONA: req.params.idpersona
            },
            include: {
                lotes: true,
                personas:true
            }
        });

        if (!userlotesFound) {
            return res.status(404).json({ error: "userlotes not found" });
        }else{
            res.json(userlotesFound);
        }

        
    } catch (error) {
        console.error("Error fetching userlotes:", error);
        res.status(500).json({ error: "Internal server error not have connection" });
    }
});


//busca todos los registros de personas que coincidan asignadas a un lote por separado
router.get('/userlotes/lot/:idlote', async (req, res) => {
    try {
        const userlotesFound = await orm.lotes_personas.findMany({
            where: {
                ID_LOTE: parseInt(req.params.idlote)
            },
            include: {
                lotes: true,
                personas:true
            }
        });

        if (!userlotesFound) {
            return res.status(404).json({ error: "userlotes not found" });
        }else{
            res.json(userlotesFound);
        }

        
    } catch (error) {
        console.error("Error fetching userlotes:", error);
        res.status(500).json({ error: "Internal server error not have connection" });
    }
});



//elimina la persona lote asignada
router.delete('/userlotes/:idlote/:idperson', async (req, res) => {
    try {
        const loteID = parseInt(req.params.idlote);
        const personID = req.params.idperson;

        // Elimina la userlotesa por su ID_userlotesA 
        const deleteResult = await orm.lotes_personas.delete({

            where: {
                ID_PERSONA_ID_LOTE: {
                    ID_LOTE: loteID,
                    ID_PERSONA: personID
                }
            }

        });

        if (deleteResult) {
            res.json({ info: "userlotes deleted successfully" });
        } else {
            res.status(404).json({ error: "userlotes not found" });
        }
    } catch (error) {
        console.error("Error deleting userlotes:", error);
        res.status(500).json({ error: "Internal server error not have connection" });
    }
});

//metodo que modifica todos los datos de una persona asignada
router.put('/userlotes/:idlote/:idpersona', async (req, res) => {
    try {
        const userlotesUpdate = await orm.lotes_personas.update({
            where: {
                ID_PERSONA_ID_LOTE: {
                    ID_LOTE: parseInt(req.params.idlote),
                    ID_PERSONA: req.params.idpersona
                }
            },
            data: req.body
        });

        if (userlotesUpdate === null) {
            return res.status(404).json({ error: "userlotes not found" });
        }else{
            return res.json({ info: "userlotes updated successfully" });
        }

        
    } catch (error) {
        console.error("Error updating userlotes:", error);
        return res.status(500).json({ error: "Internal server error not have connection" });
    }
});

//parche al estado de una persona en un lote
router.patch('/userlotes/:idlote/:idpersona', async (req, res) => {
    try {
        const { ESTADO_ASIGNACION } = req.body;
        const userlotesUpdate = await orm.lotes_personas.update({
            where: {
                ID_PERSONA_ID_LOTE: {
                    ID_LOTE: parseInt(req.params.idlote),
                    ID_PERSONA: req.params.idpersona
                }
            },
            data: {
                ESTADO_ASIGNACION: ESTADO_ASIGNACION
            }
        });

        if (userlotesUpdate === null) {
            return res.status(404).json({ error: "userlotes not found" });
        }else{
            return res.json({ info: "userlotes asignation status updated successfully" });
        }

        
    } catch (error) {
        console.error("Error updating userlotes:", error);
        return res.status(500).json({ error: "Internal server error not have connection" });
    }
});




router.post('/userlotes', async (req, res) => {
    try {
        const newuserlotes = await orm.lotes_personas.create({
            data: req.body
        });

        res.status(200).json({ info: "userlotes created!" });

    } catch (code) {
        console.error("Error creating userlotes:", code);

        return res.status(400).json({ error: "Error creating, userlotes already exists or not have connection" });
    }
});

export default router;
