import { Sequelize } from "sequelize"

const sequelize = new Sequelize("postgres://admin:123@localhost:5432/main")

export default sequelize