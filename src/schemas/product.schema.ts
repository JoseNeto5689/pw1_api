import { DataTypes } from "sequelize"
import sequelize from "../database"

const Product = sequelize.define("Product", {

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    }
})

export default Product