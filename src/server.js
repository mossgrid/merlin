import express from 'express'
import { awakenMerlin } from './index.js'
const app = express()
const PORT = process.env.PORT || 3000

app.get('/merlin', (_req, res) => {
    awakenMerlin()
    res.send('Merlin is waking up...')
})

app.listen(PORT, () => {
    console.log(`Server is up!`)
})
