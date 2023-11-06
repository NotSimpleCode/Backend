import { Router } from "express";
import {orm} from "../db.js"
import * as auth from '../authToken.js'

const router = Router();


router.get('/ventas', async (req, res) => {
    try {

        // Realiza la consulta a la base de datos para obtener los elementos de la página actual
        const ventas = await orm.ventas.findMany({
            include:{
                personas:true,
                cosechas:{
                    select:{
                        FECHA_COSECHA:true
                    }
                }
            }
        });

        if(ventas != 0){
            res.json(ventas);
        }else{
            res.status(204).json({ info: "Not Content" });
        }

    } catch (error) {
        console.error("Error fetching ventas:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});




router.get('/ventas/:idventa', async (req, res) => {
    try {
        const Found = await orm.ventas.findFirst({
            where: {
                ID_VENTA:parseInt(req.params.idventa)
            },
            include:{
                personas:true,
                cosechas:{
                    select:{
                        FECHA_COSECHA:true
                    }
                }
            }
        });

        if (!Found) {
            return res.status(404).json({ error: "Venta Not Found" });
        }else{
            res.status(200).json(Found);
        }

        
    } catch (error) {
        console.error("Error fetching venta:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.delete('/ventas/:idventa', async (req, res) => {
    try {

        // Elimina el usuario por su ID_PERSONA y el ID_ROL proporcionado en la ruta
        const deleteResult = await orm.ventas.delete({
            where: {
                ID_VENTA:parseInt(req.params.idventa)
            }
        });

        if (deleteResult) {
            res.json({ info: "venta deleted successfully" });
        } else {
            res.status(404).json({ error: "Venta Not Found" });
        }
    } catch (error) {
        console.error("Error deleting :", error);
        res.status(500).json({ error: "Internal server error" });
    }
});





router.put('/ventas/:idventa', async (req, res) => {
    try {
        const Update = await orm.ventas.update({
            where: {
                ID_VENTA:parseInt(req.params.idventa)
            },
            data: req.body
        });

        if (Update === null) {
            return res.status(404).json({ error: "Venta Not Found" });
        }else{
            return res.json({ info: "updated successfully" });
        }

        
    } catch (error) {
        console.error("Error updating :", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

router.patch('/ventas/:idventa', async (req, res) => {
    try {
        const {ESTADO_VENTA} = req.body;
        const Update = await orm.ventas.update({
            where: {
                ID_VENTA:parseInt(req.params.idventa)
            },
            data: {ESTADO_VENTA:ESTADO_VENTA}
        });

        if (Update === null) {
            return res.status(404).json({ error: "Venta Not Found" });
        }else{
            return res.json({ info: "Status updated successfully" });
        }

        
    } catch (error) {
        console.error("Error updating :", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});


router.post('/ventas', auth.authenticateToken, async (req, res) => { //requiere autenticacion para crear ventas
    try {
        const newVenta = await orm.ventas.create({
            data: req.body
        });

        res.status(200).json({ info: "Venta created!" });
    } catch (error) {
        console.error("Error creating Venta :", error);
        return res.status(400).json({ error: "Venta could not be created." });
    }
});















export default router;