import express from 'express'
import morgan from 'morgan'
import ViteExpress from 'vite-express'

const app = express()

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


