import { Router } from "express";
import {orm} from "../db.js"

const router = Router();


router.get('/detalle_facturas', async (req, res) => {
    try {

        // Realiza la consulta a la base de datos para obtener los elementos de la página actual
        const detalle_facturas = await orm.detalle_facturas.findMany({
            include:{
                productos:true,
                ventas:{
                    include:{
                        personas:true
                    }
                }
            }
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

router.get('/detalle_facturas/productos/:idproducto', async (req, res) => {
    try {
        const Found = await orm.detalle_facturas.findMany({
            where: {
                ID_PRODUCTO:parseInt(req.params.idproducto),
            },
            include:{
                productos:true,
                ventas:{
                    include:{
                        personas:true
                    }
                }
            },
        });

        if (!Found) {
            return res.status(404).json({ error: "Detalle productos Not Found" });
        }else{
            res.status(200).json(Found);
        }

        
    } catch (error) {
        console.error("Error fetching Detalle:", error);
        res.status(500).json({ error: "Internal server error Detalle" });
    }
});

router.get('/detalle_facturas/ventas/:idventa', async (req, res) => {
    try {
        const Found = await orm.detalle_facturas.findMany({
            where: {
                ID_VENTA:parseInt(req.params.idventa),
            },
            include:{
                productos:true,
                ventas:{
                    include:{
                        personas:true
                    }
                }
            },
        });

        if (!Found) {
            return res.status(404).json({ error: "Detalle ventas Not Found" });
        }else{
            res.status(200).json(Found);
        }

        
    } catch (error) {
        console.error("Error fetching Detalle:", error);
        res.status(500).json({ error: "Internal server error Detalle" });
    }
});

router.get('/detalle_facturas/:idventa/:idproducto', async (req, res) => {
    try {
        const Found = await orm.detalle_facturas.findFirst({
            where: {
                AND: {
                    ID_VENTA:parseInt(req.params.idventa),
                    ID_PRODUCTO:parseInt(req.params.idproducto)
                }
            },
            include:{
                productos:true,
                ventas:{
                    include:{
                        personas:true
                    }
                }
            },
        });

        if (!Found) {
            return res.status(404).json({ error: "Detalle Not Found" });
        }else{
            res.status(200).json(Found);
        }

        
    } catch (error) {
        console.error("Error fetching Detalle:", error);
        res.status(500).json({ error: "Internal server error Detalle" });
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
            res.json({ info: "Detalle deleted successfully" });
        } else {
            res.status(404).json({ error: "Detalle Not Found" });
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
            return res.status(404).json({ error: "Detalle Not Found" });
        }else{
            return res.json({ info: "Detalle updated successfully" });
        }

        
    } catch (error) {
        console.error("Error updating Detalle:", error);
        return res.status(500).json({ error: "Internal server error Detalle" });
    }
});


router.post('/detalle_facturas', async (req, res) => {
    try {
        const newVenta = await orm.detalle_facturas.create({
            data: req.body
        });

        

        res.status(200).json({ info: "Detalle created!" });
    } catch (error) {
        console.error("Error creating Detalle :", error);
        return res.status(400).json({ error: "Detalle could not be created." });
    }
});





export default router;