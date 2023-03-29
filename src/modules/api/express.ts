import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../client-adm/repository/client.model";
import { InvoiceModel } from "../invoice/repository/invoice.model";
import { ProductModel } from "../invoice/repository/product.model";
import { TransactionModel } from "../payment/repository/transaction.model";
import { ProductAdmModel } from "../product-adm/repository/product.model";
import { ProductCatalogModel } from "../store-catalog/repository/product.model";
import { checkoutRoute } from "./routes/checkout.route";
import { clientsRoute } from "./routes/client.route";
import { invoiceRoute } from "./routes/invoice.route";
import { productRoute } from "./routes/product.route";

export const app: Express = express();
app.use(express.json());
app.use("/products", productRoute);
app.use("/clients", clientsRoute);
app.use("/checkout", checkoutRoute);
app.use("/invoice", invoiceRoute);

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });
  await sequelize.addModels([ClientModel, ProductAdmModel, ProductModel, InvoiceModel, ProductCatalogModel, TransactionModel]);
  await sequelize.sync();
}
setupDb();