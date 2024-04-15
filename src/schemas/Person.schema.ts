import { DataTypes } from "sequelize"
import sequelize from "../database"

const Person = sequelize.define("Person", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.GEOGRAPHY,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contact: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    }
})


export default Person