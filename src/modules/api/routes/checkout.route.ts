import express, { Request, Response } from "express";
import { PlaceOrderUseCase } from "../../checkout/usecase/place-order/place-order.usecase";
import ClientAdmFacadeFactory from "../../client-adm/factory/client-adm.facade.factory";
import { InvoiceFacadeFactory } from "../../invoice/factory/invoice.facade.factory";
import { PaymentFacadeFactory } from "../../payment/factory/payment.facade.factory";
import { ProductAdmFacadeFactory } from "../../product-adm/factory/facade.factory";
import { StoreCatalogFacadeFactory } from "../../store-catalog/factory/facade.factory";


export const checkoutRoute = express.Router();

checkoutRoute.post("/", async(req: Request, res: Response) => {
    const clientFacade = ClientAdmFacadeFactory.create();
    const productFacade = ProductAdmFacadeFactory.create();
    const catalogFacade = StoreCatalogFacadeFactory.create();
    const invoiceFacade = InvoiceFacadeFactory.create();
    const paymentFacade = PaymentFacadeFactory.create();
    const mockCheckoutRepository = {
        addOrder: jest.fn(),
        findOrder: jest.fn(),
    };   

    const usecase = new PlaceOrderUseCase(clientFacade, productFacade, catalogFacade, mockCheckoutRepository , invoiceFacade, paymentFacade);
    
    try {
        const productDto = {
            clientId: req.body.clientId,
            products: req.body.products,
        }
        
        const output = await usecase.execute(productDto);
        res.send(output);
    } catch (err) {
        res.status(500).send(err)
    }
})