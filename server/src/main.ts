import dotenv from "dotenv"
dotenv.config()
import cors from "cors"
import express from "express"
import router from "./modules/translator/translator.route.js"



const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/translator", router)

const port = process.env.PORT || 4000

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})


const gracefulShutdown = async (signal: string) => {

  server.on(signal, async () => {
    console.log(`Received ${signal}, shutting down gracefully...`)
    
    server.close(() => {
      console.log("Server closed")
      process.exit(0)
    })
  })
}

const signals: string[] = ["SIGINT", "SIGTERM"]
for (const signal of signals) {
  gracefulShutdown(signal)
}

