import { app } from "./src/express.js"
import { connectDB } from "./src/database.js"

connectDB()

const server = app.listen(process.env.PORT || 3000, () => {
  console.log("Listenning on port 3000")
})
async function shutdown () {
  server.close()
  db.exit()
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)

