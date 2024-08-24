import sequelizeInit from "./connection"

const sequelize = {
    database: process.env.DB || "" as string,
    password: process.env.DB_PASSWORD || "" as string,
    username: process.env.DB_USER || "" as string,
    host: process.env.DB_HOST || "" as string,
}

export default sequelizeInit(sequelize.database, sequelize.password, sequelize.username, sequelize.host) 
