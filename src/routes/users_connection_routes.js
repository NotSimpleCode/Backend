import { Router } from "express";
import {orm} from "../db.js"

const router = Router();

router.get('/connection', async (req, res) => {
    try {
        const connections = await orm.usuarios.findMany();
        res.json(connections);
    } catch (error) {
        console.error("Error fetching connections:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/connection/:id', async (req, res) => {
    try {
        const connectionFound = await orm.usuarios.findFirst({
            where: {
                id_persona: parseInt(req.params.id)
            }
        });

        if (!connectionFound) {
            return res.status(404).json({ error: "Connection not found" });
        }

        res.json(connectionFound);
    } catch (error) {
        console.error("Error fetching connection:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.delete('/connection/:id', async (req, res) => {
    try {
        const connectionDelete = await orm.usuarios.delete({
            where: {
                id_persona: parseInt(req.params.id)
            }
        });

        if (!connectionDelete) {
            return res.status(404).json({ error: "Connection not found" });
        }

        res.json({ info: "Connection deleted successfully" });
    } catch (error) {
        console.error("Error deleting connection:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


router.put('/connection/:id', async (req, res) => {
    try {
        const connectionUpdate = await orm.usuarios.update({
            where: {
                id_persona: parseInt(req.params.id)
            },
            data: req.body
        });

        if (connectionUpdate === null) {
            return res.status(404).json({ error: "Connection not found" });
        }

        return res.json({ info: "Connection updated successfully" });
    } catch (error) {
        console.error("Error updating connection:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
   

router.post('/connection', async (req, res) => {
    try {
        const newConnection = await orm.usuarios.create({
            data: req.body
        });
        
        res.status(200).json({ info: "User created!" });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(400).json({ error: "User connection could not be created." });
    }
    
});

//LOGIN
router.post('/login', async (req, res) => {
    try {
        const { nombre_usuario, password_usuario } = req.body;

        const logueo = await orm.usuarios.findFirst({
            where: {
                NOMBRE_USUARIO: nombre_usuario
            }
        });
        

        if (!logueo) {
            res.status(404).json({ error: "Username not found" });
        } else if (password_usuario !== logueo.PASSWORD_USUARIO) {
            res.status(401).json({ error: "Incorrect password" });
        } else {
            res.status(200).json({ message: "Login successful" });
        }
    } catch (error) {
        console.error("Error en el bloque catch:", error);
        res.status(500).json({ error: "Internal server error not connection" });
    }
});


//http://localhost:3000/api/connection (registro de roles y usuarios)
//http://localhost:3000/api/login (preguntar login)




export default router;