import { Sequelize } from "sequelize-typescript";
import { InvoiceFacadeFactory } from "../factory/invoice.facade.factory";
import { InvoiceProductModel } from "../repository/invoice-product.model";
import { InvoiceModel } from "../repository/invoice.model";
import { ProductModel } from "../repository/product.model";
import { FindInvoiceFacadeInputDTO, GenerateInvoiceFacadeInputDTO } from "./invoice.facade.dto";

describe("InvoiceFacade test", () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: {force: true}
    })

    await sequelize.addModels([InvoiceModel,ProductModel,InvoiceProductModel ])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })


  describe("GenerateInvoiceUseCase", () => {
    it("creates an invoice", async () => {
      const facade = InvoiceFacadeFactory.create();

      const input: GenerateInvoiceFacadeInputDTO = {
        name: "name",
        document: "document",
        street: "street",
        number: 100,
        complement: "Complement",
        city: "city",
        state: "state",
        zipCode: "00001",
        items: [
          {
            id: "1",
            name: "Product 1",
            price: 100,
          },
          {
            id: "2",
            name: "Product 2",
            price: 200,
          },
        ],
      };

      const output = await facade.generate(input);

      expect(output.id).toBeDefined();
      expect(output.name).toBe(input.name);
      expect(output.document).toBe(input.document);
      expect(output.street).toBe(input.street);
      expect(output.number).toBe(input.number);
      expect(output.complement).toBe(input.complement);
      expect(output.city).toBe(input.city);
      expect(output.state).toBe(input.state);
      expect(output.zipCode).toBe(input.zipCode);
      expect(output.items.length).toBe(2);
      expect(output.items[0].id).toBeDefined();
      expect(output.items[0].name).toBe(input.items[0].name);
      expect(output.items[0].price).toBe(input.items[0].price);
      expect(output.items[1].id).toBeDefined();
      expect(output.items[1].name).toBe(input.items[1].name);
      expect(output.items[1].price).toBe(input.items[1].price);
      expect(output.total).toBe(300);
    });
  })

  describe("FindInvoiceUseCase", () => {
    it("finds an invoice", async () => {
      const facade = InvoiceFacadeFactory.create();

      const invoice = await InvoiceModel.create({
        id: "333",
        name: "invoice name",
        document: "invoice document",
        street: "street",
        number: 100,
        zipcode: "00001",
        city: "city",
        complement: "complement",
        state: "state",
        items: [
          {
            id: "1",
            name: "Product 1",
            price: 100,
          },
          {
            id: "2",
            name: "Product 2",
            price: 200,
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      }, {include: [ProductModel]})

      const input = { id: "333" };

      const output = await facade.find(input);

      expect(output.id).toBe(invoice.id);
      expect(output.name).toBe(invoice.name);
      expect(output.document).toBe(invoice.document);
      expect(output.address.street).toBe(invoice.street);
      expect(output.address.number).toBe(invoice.number);
      expect(output.address.complement).toBe(invoice.complement);
      expect(output.address.city).toBe(invoice.city);
      expect(output.address.state).toBe(invoice.state);
      expect(output.address.zipCode).toBe(invoice.zipcode);
    });

    it("throws an error when invoice not found", async () => {
      const facade = InvoiceFacadeFactory.create();

      const input: FindInvoiceFacadeInputDTO = { id: "1" };

      await expect(facade.find(input)).rejects.toThrow("Invoice not found");
    });
  })
});