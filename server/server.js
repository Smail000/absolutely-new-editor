import express from "express"
import path from "path"
import reloader from "./reloader.js"
import ip from "ip"

const server = express()
const PORT = process.env.PORT || 3000
const MODE = process.env.MODE || 'dev'

server.use(express.static('./build'))
server.use(express.json())
reloader(server)

server.get('/api/info', (req, res) => {
    res.json({
        mode: MODE,
    })
})

server.get('/*', (req, res) => {
    res.sendFile(path.resolve('build', 'index.html'))
})

server.listen(PORT, (err) => {
    if (err) throw err
    console.log(`Server setting mode "${MODE}"`)
    console.log(`React-base custom server avaliable on`)
    console.log(`Localhost => http://localhost:${PORT}`)
    console.log(`Onlinehost => http://${ip.address()}:${PORT}`)
})