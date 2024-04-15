import { DataTypes } from "sequelize"
import sequelize from "../database"

const Supply = sequelize.define("Supply", {
    selled_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    ammount: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})



export default Supply