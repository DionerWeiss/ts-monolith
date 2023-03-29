import express, { Request, Response } from "express";
import { ClientRepository } from "../../client-adm/repository/client.repository";
import { AddClientUseCase } from "../../client-adm/usecase/add-client/add-client.usecase";


export const clientsRoute = express.Router();

clientsRoute.post("/", async(req: Request, res: Response) => {
    const usecase = new AddClientUseCase(new ClientRepository());

    try {
        const clientDto = {
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            document: req.body.document,
            street: req.body.street, 
            complement: req.body.complement,
            number: req.body.number,
            city: req.body.city,
            state: req.body.state,
            zipCode: req.body.zipCode,     
            
        }
        const output = await usecase.execute(clientDto);
        res.send(output);
    } catch (err) {
        res.status(500).send(err)
    }
})