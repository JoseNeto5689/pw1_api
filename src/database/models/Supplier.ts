import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    HasMany,
    //HasOne
} from "sequelize-typescript"
import Product from "./Product"

@Table({
    timestamps: true,
    tableName: "suppliers",
    modelName: "Supplier"
})
class Supplier extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare name: string

    @Column({
        type: DataType.GEOGRAPHY,
        allowNull: true
    })
    declare geolocalization: string

    @Column({
        type: DataType.BLOB,
        allowNull: true
    })
    declare image: Blob

    @CreatedAt
    declare createdAt: Date

    @UpdatedAt
    declare updatedAt: Date

    @HasMany(() => Product)
    declare products: Product[]
}

export default Supplier