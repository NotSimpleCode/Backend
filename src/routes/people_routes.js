import { Router } from "express";
import {orm} from "../db.js"

const router = Router();


router.get('/person', async (req, res) => {
    try {
        const people = await orm.personas.findMany()
        if(people!=null)
            res.json(people)
        else
            res.status(201).json({info:"Not Content"})
    } catch (error) {
        res.status(400).json({error:"People not found by connection"})
    }
    
});

router.get('/person/:document', async (req, res) => {
    const foundPerson = null;
    try {
        foundPerson = await orm.personas.findFirst({
            where:{
                document: parseInt(req.params.document)
            }
        })
    } catch (error) {
        return res.status(400).json({error:"Person not found"})
    }
    res.json(foundPerson)
});

router.delete('/person/:document', async (req, res) => {
    try {
        const deletePerson = await orm.personas.delete({
            where:{
                document: parseInt(req.params.document)
            }
        })
    } catch (error) {
        return res.status(400).json({error:"Person not deleted, dont exists or dont have connection!"})
    }

    return res.json({info:"Person succesfully deleted"})
});

router.put('/person/:document', async (req, res) => {
    try {
        const updatePerson = await orm.personas.update({
            where:{
                document: parseInt(req.params.document)
            },
            data: req.body
        })
        return res.status(200).json({info:"person succesfully updated "})
    } catch (error) {
        return res.status(400).json({error:"person dont updated"})
    }
    
});


router.post('/person', async (req, res) => {
    try {
        const newPerson = await orm.personas.create({
            data: req.body
        })
        res.json(newPerson);
    } catch (error) {
        res.status(400).json({error:"Person already exists!"})
    }
    
});

export default router;