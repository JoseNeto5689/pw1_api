import app from "./config"
import dotenv from "dotenv"
import sequelize  from "./database/connection"

dotenv.config()
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000


try {
    await sequelize.authenticate()
    //await sequelize.sync({ force: true })

    const Supplier = sequelize.models.Supplier
    const Product = sequelize.models.Product

    const supplier = await Supplier.create({
        name: "Dell",
    })

    
    await Product.create({
        name: "Notebook",
        description: "Notebook Dell",
        ammount: 10,
        type: "Eletronic",
        price: 5000,
        batch: "2021-10-10",
        manufacturing_date: new Date(),
        //@ts-ignore
        supplier_id: supplier.id
    })
    app.listen(port, () => {
        console.table({
            status: "Working",
            port: port,
            URL: `http://localhost:${port}`
        })
    })
} catch (error) {
    console.error("Unable to connect to the database:", error)
}

