import 'dotenv/config'

import express from 'express'
import { router } from './views'

const app = express()

app.use(express.json(), router)

app.listen(process.env.PORT, () =>
  console.log(`serveur run on port ${process.env.PORT}`)
)
