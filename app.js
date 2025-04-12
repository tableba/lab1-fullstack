import express from "express"
import { connectDB } from "./src/config/database.js"
import { router } from "./src/routes/router.js"
import path from "path"
import { fileURLToPath } from "url";

connectDB()

export const app = express()
app.use(express.json())
app.use(router)

// Compute __filename and __dirname
const FILENAME = fileURLToPath(import.meta.url);
const DIRNAME =  path.dirname(FILENAME);
app.get("/", (req, res) => {
  res.sendFile(path.join(DIRNAME , 'src', 'public', 'index.html'))
})

const port = process.env.PORT || 5000
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

async function shutdown () {
  server.close()
  process.exit(0)
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)

