import express, { Request, Response } from "express";
import { ProductRepository } from "../../product-adm/repository/product.repository";
import { AddProductInputDto } from "../../product-adm/usecase/add-product/add-product.dto";
import { AddProductUseCase } from "../../product-adm/usecase/add-product/add-product.usecase";



export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new AddProductUseCase(new ProductRepository());
  const body = req.body;

  try {
    const productDto: AddProductInputDto = {
      id: body.id,
      name: body.name,
      description: body.description,
      purchasePrice: body.purchasePrice,
      stock: body.stock,
    };
    const output = await usecase.execute(productDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});