import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    ForeignKey,
    //HasOne
} from "sequelize-typescript"
import Product from "./Product"
import Person from "./Person"

@Table({
    timestamps: true,
    tableName: "supplies",
    modelName: "Supply"
})
class Supplier extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id: string

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

    @ForeignKey(() => Product)
    @Column({
        type: DataType.UUID,
        allowNull: false
    })
    declare product_id: string

    @ForeignKey(() => Person)
    @Column({
        type: DataType.UUID,
        allowNull: false
    })
    declare person_id: string
}

export default Supplier