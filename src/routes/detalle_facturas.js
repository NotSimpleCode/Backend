import { Router } from "express";
import {orm} from "../db.js"

const router = Router();


router.get('/detalle_facturas', async (req, res) => {
    try {

        // Realiza la consulta a la base de datos para obtener los elementos de la página actual
        const detalle_facturas = await orm.detalle_facturas.findMany({
            
        });

        if(detalle_facturas != 0){
            res.json(detalle_facturas);
        }else{
            res.status(204).json({ info: "Not Content" });
        }

    } catch (error) {
        console.error("Error fetching detalle_facturas:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});




router.get('/detalle_facturas/:idventa/:idproducto', async (req, res) => {
    try {
        const Found = await orm.detalle_facturas.findFirst({
            where: {
                ID_VENTA_ID_PRODUCTO: {
                    ID_VENTA:parseInt(req.params.idventa),
                    ID_PRODUCTO:parseInt(req.params.idproducto)
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

router.delete('/detalle_facturas/:idventa/:idproducto', async (req, res) => {
    try {

        // Elimina el usuario por su ID_PERSONA y el ID_ROL proporcionado en la ruta
        const deleteResult = await orm.detalle_facturas.delete({
            where: {
                ID_VENTA_ID_PRODUCTO: {
                    ID_VENTA:parseInt(req.params.idventa),
                    ID_PRODUCTO:parseInt(req.params.idproducto)
                }
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





router.put('/detalle_facturas/:idventa/:idproducto', async (req, res) => {
    try {
        const Update = await orm.detalle_facturas.update({
            where: {
                ID_VENTA_ID_PRODUCTO: {
                    ID_VENTA:parseInt(req.params.idventa),
                    ID_PRODUCTO:parseInt(req.params.idproducto)
                }
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


router.post('/detalle_facturas', async (req, res) => {
    try {
        const newVenta = await orm.detalle_facturas.create({
            data: req.body
        });

        

        res.status(200).json({ info: "Venta created!" });
    } catch (error) {
        console.error("Error creating Venta :", error);
        return res.status(400).json({ error: "Venta could not be created." });
    }
});





export default router;