import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    ForeignKey
} from "sequelize-typescript"
import Supplier from "./Supplier"

@Table({
    timestamps: true,
    tableName: "products",
    modelName: "Product"
})
class Product extends Model {
    
    @Column({
        primaryKey: true,
        type: DataType.STRING,
        defaultValue: DataType.UUIDV4
    })
    declare barcode: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare name: string

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    declare description: string

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare ammount: number

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare type: false

    @Column({
        type: DataType.STRING,
        allowNull: false
    })

    @Column({
        type: DataType.FLOAT,
        allowNull: false
    })
    declare price: number

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare batch: string

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    declare manufacturing_date: Date

    @Column({
        type: DataType.DATE,
        allowNull: true
    })
    declare expiration_date: Date

    @Column({
        type: DataType.BLOB,
        allowNull: true
    })
    declare image: Blob

    @CreatedAt
    declare createdAt: Date

    @UpdatedAt
    declare updatedAt: Date

    @ForeignKey(() => Supplier)
    @Column({
        type: DataType.UUID,
        allowNull: false
    })
    declare supplier_id: string
}

export default Product