
export default function reloader(server) {
    const SessionKey = Date.now().toString()
    if (process.env.MODE === "dev") {
        server.get('/getSessionKey', (req, res) => {
            res.send(SessionKey)
        })
    } else {
        server.get('/getSessionKey', (req, res) => {
            res.send('none')
        })
    }
}