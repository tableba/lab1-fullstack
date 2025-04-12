import { router } from "./router.js"
import express from "express"

export const app = express()

app.use(express.json())
app.use(router)
