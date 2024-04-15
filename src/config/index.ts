import router from "../routes/index.routes"
import express from "express"
import cors from "cors"
import helmet from "helmet"

const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
}

const app = express()

app.use(express.json())
app.use(cors(corsOptions))
app.use(helmet())
app.use(router)

export default app