import { Router } from "express";
import {orm} from "../db.js";

const router = Router();


router.get('/lotes', async (req, res) => {
    try {
        // Realiza la consulta a la base de datos para obtener los elementos 
        const lotes = await orm.lotes.findMany({
            //select *from lotes
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

router.get('/lotes/all', async (req, res) => {
    try {
        // Realiza la consulta a la base de datos para obtener los elementos 
        const lotes = await orm.lotes.findMany({
          include:
          {
            sectores:true,
            lotes_personas:true,
            historial_cosechas:true,
            historial_plagas:true
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

router.get('/lotes/all/data', async (req, res) => {
    try {
        // Realiza la consulta a la base de datos para obtener los elementos 
        const lotes = await orm.lotes.findMany({
          include:
          {
            sectores: {
                include: {
                    tipo_plantas: true
                }
            },
            historial_plagas: {
                include: {
                    plagas: true
                }
            },
            historial_cosechas: {
                include: {
                    cosechas: true
                }
            },
            lotes_personas:{
                include:{
                    personas:true
                }
            }
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

router.get('/lotes/sec_plag', async (req, res) => {
    try {
        // Realiza la consulta a la base de datos para obtener los elementos 
        const lotes = await orm.lotes.findMany({
          include:
          {
            sectores:true,
            historial_plagas:true
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

router.get('/lotes/cos_pers', async (req, res) => {
    try {
        // Realiza la consulta a la base de datos para obtener los elementos 
        const lotes = await orm.lotes.findMany({
          include:
          {
            historial_cosechas:true,
            lotes_personas:true
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


router.get('/lotes/Splag/:id', async (req, res) => {
    try {
        const lotesFound = await orm.lotes.findFirst({
            where: {
                ID_LOTE: parseInt(req.params.id)
            },
            include: {
                sectores: {
                    include: {
                        tipo_plantas: true
                    }
                },
                historial_plagas: {
                    include: {
                        plagas: true
                    }
                }
            }
        });

        if (!lotesFound) {
            return res.status(404).json({ error: "lotes not found" });
        }else{
            res.json(lotesFound);
        }

        
    } catch (error) {
        console.error("Error fetching lotes:", error);
        res.status(500).json({ error: "Internal server error not have connection" });
    }
});

router.get('/lotes/Scos/:id', async (req, res) => {
    try {
        const lotesFound = await orm.lotes.findFirst({
            where: {
                ID_LOTE: parseInt(req.params.id)
            },
            include: {
                sectores: {
                    include: {
                        tipo_plantas: true
                    }
                },
                historial_cosechas: {
                    include: {
                        cosechas: true
                    }
                }
            }
        });

        if (!lotesFound) {
            return res.status(404).json({ error: "lotes not found" });
        }else{
            res.json(lotesFound);
        }

        
    } catch (error) {
        console.error("Error fetching lotes:", error);
        res.status(500).json({ error: "Internal server error not have connection" });
    }
});

router.get('/lotes/Spers/:id', async (req, res) => {
    try {
        const lotesFound = await orm.lotes.findFirst({
            where: {
                ID_LOTE: parseInt(req.params.id)
            },
            include: {
                sectores: {
                    include: {
                        tipo_plantas: true
                    }
                },
                lotes_personas: {
                    include: {
                        personas: true
                    }
                }
            }
        });

        if (!lotesFound) {
            return res.status(404).json({ error: "lotes not found" });
        }else{
            res.json(lotesFound);
        }

        
    } catch (error) {
        console.error("Error fetching lotes:", error);
        res.status(500).json({ error: "Internal server error not have connection" });
    }
});


router.get('/lotes/sect/:id', async (req, res) => {
    try {
        const lotesFound = await orm.lotes.findFirst({
            where: {
                ID_LOTE: parseInt(req.params.id)
            },
            include: {
                sectores: {
                    include: {
                        tipo_plantas: true
                    }
                }
            }
        });

        if (!lotesFound) {
            return res.status(404).json({ error: "lotes not found" });
        }else{
            res.json(lotesFound);
        }

        
    } catch (error) {
        console.error("Error fetching lotes:", error);
        res.status(500).json({ error: "Internal server error not have connection" });
    }
});



router.get('/lotes/plag/:id', async (req, res) => {
    try {
        const lotesFound = await orm.lotes.findFirst({
            where: {
                ID_LOTE: parseInt(req.params.id)
            },
            include: {
                historial_plagas: {
                    include: {
                        plagas: true
                    }
                }
            }
        });

        if (!lotesFound) {
            return res.status(404).json({ error: "lotes not found" });
        }else{
            res.json(lotesFound);
        }

        
    } catch (error) {
        console.error("Error fetching lotes:", error);
        res.status(500).json({ error: "Internal server error not have connection" });
    }
});

router.get('/lotes/cos/:id', async (req, res) => {
    try {
        const lotesFound = await orm.lotes.findFirst({
            where: {
                ID_LOTE: parseInt(req.params.id)
            },
            include: {
                historial_cosechas: {
                    include: {
                        cosechas: true
                    }
                }
            }
        });

        if (!lotesFound) {
            return res.status(404).json({ error: "lotes not found" });
        }else{
            res.json(lotesFound);
        }

        
    } catch (error) {
        console.error("Error fetching lotes:", error);
        res.status(500).json({ error: "Internal server error not have connection" });
    }
});

router.get('/lotes/pers/:id', async (req, res) => {
    try {
        const lotesFound = await orm.lotes.findFirst({
            where: {
                ID_LOTE: parseInt(req.params.id)
            },
            include: {
                lotes_personas: {
                    include: {
                        personas: true
                    }
                }
            }
        });

        if (!lotesFound) {
            return res.status(404).json({ error: "lotes not found" });
        }else{
            res.json(lotesFound);
        }

        
    } catch (error) {
        console.error("Error fetching lotes:", error);
        res.status(500).json({ error: "Internal server error not have connection" });
    }
});

//elimina un lote por ID
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

//cambia todos los valores de un lote (evitar cambiar el total de plantas a menos que sea muy necesario)
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
        }else{
            return res.json({ info: "lotes name updated successfully" });
        }

        
    } catch (error) {
        console.error("Error updating lotes:", error);
        return res.status(500).json({ error: "Internal server error not have connection" });
    }
});
//cambia solo el nombre de un lote
router.patch('/lotes/:id', async (req, res) => {
    try {
        const {NOMBRE_LOTE} = req.body
        const lotesUpdate = await orm.lotes.update({
            where: {
                ID_LOTE: parseInt(req.params.id)
            },
            data: {
                NOMBRE_LOTE: NOMBRE_LOTE
            }
        });

        if (lotesUpdate === null) {
            return res.status(404).json({ error: "lotes not found" });
        }else{
            return res.json({ info: "lotes name updated successfully" });
        }

        
    } catch (error) {
        console.error("Error updating lotes:", error);
        return res.status(400).json({ error: "Verify lote ID - can't patch this ID name" });
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
