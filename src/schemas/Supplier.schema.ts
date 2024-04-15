import { DataTypes } from "sequelize"
import sequelize from "../database"

const Supplier = sequelize.define("Supplier", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    geolocalization: {
        type: DataTypes.GEOGRAPHY,
        allowNull: true
    },
    image: {
        type: DataTypes.BLOB("long"),
        allowNull: true
    }
})

export default Supplier