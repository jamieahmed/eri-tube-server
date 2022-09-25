import 'dotenv/config.js'
import express from 'express'
import logger from 'morgan'
import cors from 'cors'
import formData from 'express-form-data'
import cookieParser from 'cookie-parser'

import { router as authRouter } from './routes/auth.js'
import { router as usersRouter } from './routes/users.js'
import { router as videosRouter } from './routes/videos.js'
import { router as commentsRouter } from './routes/comments.js'

import './config/database.js'

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(cookieParser())
app.use(formData.parse())

app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/videos', videosRouter)
app.use('/api/comments', commentsRouter)


app.use(function (req, res, next) {
  res.status(404).json({ err: 'Not found' })
})


app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({ err: err.message })
})

export { app }