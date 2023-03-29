import request from "supertest";
import { app, sequelize } from "../express";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app)
      .post("/products")
      .send({
        id: "1",
        name: "Product 1",
        description: "Description product 1",
        purchasePrice: 30,
        stock: 1,
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Product 1");
    expect(response.body.description).toBe("Description product 1");
    expect(response.body.purchasePrice).toBe(30); 
    expect(response.body.stock).toBe(1);       
  });

  it("should not create a product", async () => {
    const response = await request(app).
    post("/products").send({
      name: "Product 1",
    });
    expect(response.status).toBe(500);
  });  
});