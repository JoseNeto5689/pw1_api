import { Sequelize } from "sequelize-typescript"

const sequelize = new Sequelize({
    database: process.env.DB || "",
    password: process.env.DB_PASSWORD || "",
    username: process.env.DB_USER || "",
    host: process.env.DB_HOST || "",
    dialect: "postgres",
    models: [__dirname + "/models"]
})

export default sequelize