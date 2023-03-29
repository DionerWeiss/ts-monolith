import request from "supertest";
import { ProductCatalogModel } from "../../store-catalog/repository/product.model";
import { app, sequelize } from "../express";


const mockDate = new Date(2000,1,1);
describe("E2E test for checkout", () => { 
  beforeAll(() => {
      jest.useFakeTimers();
      jest.setSystemTime(mockDate)
  }) 

  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
    jest.useRealTimers();
  });

  it("should create a checkout", async () => {
    
    const client = await request(app)
      .post("/clients")
      .send({        
        name: "client 1",
        email: "Email client 1",
        document: "Document client 1",
        street: "Street client 1",
        complement: "Complement client 1",
        number: "Number client 1",
        city: "City client 1",
        state: "State client 1",
        zipCode: "ZipCode client 1",
      });  
      
      const product1 = await request(app)
      .post("/products")
      .send({
        id: "1",
        name: "Product 1",
        description: "Description product 1",
        purchasePrice: 30,
        stock: 1,
      });

      const product2 = await request(app)
      .post("/products")
      .send({
        id: "2",
        name: "Product 2",
        description: "Description product 2",
        purchasePrice: 40,
        stock: 1,
      });

      await ProductCatalogModel.create({
        id: "1",
        name: "Product 1",
        description: "Description product 1",
        salesPrice: 100,
      });
  
      await ProductCatalogModel.create({
        id: "2",
        name: "Product 2",
        description: "Description product 2",
        salesPrice: 200,
      });

      const checkout = await request(app)
      .post("/checkout")
      .send({
        clientId: client.body.id,
        products: [
          {
            productId: product1.body.id,
          },
          {
            productId: product2.body.id,
          }
        ]
      });

      expect(checkout.body.total).toBe(300);
      expect(checkout.body.products).toStrictEqual([{productId: "1"}, {productId: "2"}])
  });

  it("should not create a checkout", async () => {
    const response = await request(app).
    post("/checkout").send({
      clientId: "1",
    });
    expect(response.status).toBe(500);
  });  
});