import request from "supertest";
import { app, sequelize } from "../express";

describe("E2E test for clients", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a client", async () => {
    const response = await request(app)
      .post("/clients")
      .send({
        id: "1",
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

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("client 1");
    expect(response.body.document).toBe("Document client 1");
    expect(response.body.street).toBe("Street client 1");
    expect(response.body.complement).toBe("Complement client 1");
    expect(response.body.number).toBe("Number client 1");
    expect(response.body.city).toBe("City client 1");
    expect(response.body.state).toBe("State client 1"); 
    expect(response.body.zipCode).toBe("ZipCode client 1");       
  });

  it("should not create a client", async () => {
    const response = await request(app).
    post("/clients").send({
      name: "Client 1",
    });
    expect(response.status).toBe(500);
  });  
});