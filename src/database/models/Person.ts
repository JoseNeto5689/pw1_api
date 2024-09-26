import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt
} from "sequelize-typescript"

@Table({
    timestamps: true,
    tableName: "persons",
    modelName: "Person"
})
class Person extends Model {
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
        type: DataType.STRING,
        allowNull: false
    })
    declare email: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare password: string

    @Column({
        type: DataType.GEOGRAPHY,
        allowNull: true
    })
    declare address: object

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare type: string

    @Column({
        type: DataType.ARRAY(DataType.STRING),
        allowNull: true
    })
    declare contact: string[]

    @CreatedAt
    declare createdAt: Date

    @UpdatedAt
    declare updatedAt: Date
}

export default Person