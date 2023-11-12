import { Router } from "express";
import { orm } from "../db.js"
import bcrypt from 'bcrypt';
import * as auth from '../authToken.js'

const router = Router();


router.get('/connection/count', async (req, res) => {
    try {
        const number = await orm.usuarios.count({})
        if (number != 0) {
            res.status(200).json(number)
        } else {
            res.status(204).json({ info: "Not content" })
        }
    } catch (error) {
        console.error("Error counting connections:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


router.get('/connection', async (req, res) => {
    try {

        // Realiza la consulta a la base de datos para obtener los elementos de la página actual
        const connections = await orm.usuarios.findMany({
            include: {
                roles: true
            }
        });

        // Envía la respuesta con los elementos de la página actual
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
                ID_PERSONA: req.params.id
            },
            include: {
                roles: true
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

router.delete('/connection/:id/:id_rol', async (req, res) => {
    try {
        const usuarioID = req.params.id;

        const idRol = parseInt(req.params.id_rol);

        // Elimina el usuario por su ID_PERSONA y el ID_ROL proporcionado en la ruta
        const deleteResult = await orm.usuarios.delete({
            where: {
                ID_PERSONA_ID_ROL: {
                    ID_PERSONA: usuarioID,
                    ID_ROL: idRol,
                }
            }
        });

        if (deleteResult) {
            res.json({ info: "Connection deleted successfully" });
        } else {
            res.status(404).json({ error: "Connection not found" });
        }
    } catch (error) {
        console.error("Error deleting connection:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});





router.put('/connection/:id', async (req, res) => {
    try {
        const connectionUpdate = await orm.usuarios.update({
            where: {
                ID_PERSONA: req.params.id
            },
            data: req.body
        });

        if (connectionUpdate === null) {
            return res.status(404).json({ error: "Connection not found" });
        } else {
            return res.json({ info: "Connection updated successfully" });
        }


    } catch (error) {
        console.error("Error updating connection:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});



router.post('/connection', async (req, res) => {
    try {
        const { NOMBRE_USUARIO, PASSWORD_USUARIO, ID_PERSONA, ID_ROL, CORREO_USUARIO } = req.body;

        // Genera un hash de la contraseña
        const hashedPassword = await bcrypt.hash(PASSWORD_USUARIO, 10); // "10" es el costo de la encriptación

        // Crea un nuevo usuario con la contraseña encriptada
        const newConnection = await orm.usuarios.create({
            data: {
                ID_PERSONA,
                ID_ROL,
                NOMBRE_USUARIO,
                PASSWORD_USUARIO: hashedPassword, // Almacena el hash en la base de datos
                CORREO_USUARIO
            }
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
            },
            include:{
                roles:true
            }
        });

        if (!logueo) {
            res.status(404).json({ error: "Username not found" });
        } else {
            const passwordMatch = await bcrypt.compare(password_usuario, logueo.PASSWORD_USUARIO);

            if (passwordMatch) {
                //aqui token
                const token = auth.generateToken({
                    nombre_usuario: logueo.NOMBRE_USUARIO,
                    password_usuario: logueo.PASSWORD_USUARIO
                })
                res.status(200).json({ status: true, info: "Login Successfully", token: token, rol: logueo.roles.NOMBRE_ROL });
            } else {
                res.status(401).json({ status: false, error: "Incorrect password" });
            }

        }
    } catch (error) {
        console.error("Error en el bloque catch:", error);
        res.status(500).json({ error: "Internal server error not connection" });
    }
});




export default router;