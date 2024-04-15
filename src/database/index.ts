import { Sequelize } from "sequelize"

const db_url: string = process.env.DATABASE_URL || "" 

const sequelize = new Sequelize(db_url)

export default sequelize