import { Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { ProductModel } from "./product.model";

@Table({
  tableName: "invoices",
  timestamps: false
})
export class InvoiceModel extends Model {
  @PrimaryKey
  @Column({allowNull: false})
  id: string

  @Column({allowNull: false})
  name: string

  @Column({allowNull: false})
  document: string

  @Column({ allowNull: false })
  street: string;

  @Column({ allowNull: false })
  number: string;

  @Column({ allowNull: false })
  zipcode: string;

  @Column({ allowNull: false })
  city: string;

  @Column({ allowNull: false })
  complement: string;

  @Column({ allowNull: false })
  state: string;

  @HasMany(() => ProductModel, { foreignKey: "invoice_id" })
  items: ProductModel[];

  @Column({ allowNull: false })
  createdAt: Date 

  @Column({ allowNull: false })
  updatedAt: Date 
}