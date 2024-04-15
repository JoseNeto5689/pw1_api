import { DataTypes } from "sequelize"
import sequelize from "../database"

const Product = sequelize.define("Product", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    },
    bar_code: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    ammount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    batch: {
        type: DataTypes.STRING,
        allowNull: false
    },
    manufacturing_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    expiration_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    image: {
        type: DataTypes.BLOB("long"),
        allowNull: true
    }
})

export default Product