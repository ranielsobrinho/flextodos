import 'reflect-metadata'
import * as express from 'express'
import * as cors from 'cors'

import routes from './routes'
import './domain/connect'

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use('/api', routes)
app.listen(port, () => console.log(`Server running on port ${port}`))

export default app