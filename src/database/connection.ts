import { Sequelize } from "sequelize-typescript"

function sequelizeInit(database: string, password: string, username: string, host: string) {
    return new Sequelize({
        database,
        password,
        username,
        host,
        dialect: "postgres",
        models: [__dirname + "/models"] 
    })
}

function sequelizeInitURI(uri: string) {
    return new Sequelize(uri, {
        dialect: "postgres",
        models: [__dirname + "/models"]
    })
}

export default sequelizeInit
export {sequelizeInitURI}