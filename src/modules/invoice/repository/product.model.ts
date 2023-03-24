import { BelongsTo, Column, Model, PrimaryKey, Table } from "sequelize-typescript";
import { InvoiceModel } from "./invoice.model";

@Table({
  tableName: 'products',
  timestamps: false
})
export class ProductModel extends Model {
  @PrimaryKey
  @Column({allowNull: false})
  id: string

  @Column({allowNull: false})
  name: string

  @Column({allowNull: false})
  price: number

  @BelongsTo(() => InvoiceModel, { foreignKey: "invoice_id" })
  Invoice: InvoiceModel[];
} 