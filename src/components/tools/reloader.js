
import axios from "axios";

export default function reloader(wait = 500) {
    var haveConnected = true
    var sessionKey
    var key
    const live = async (wait) => {
        try {
            key = await (await axios.get('/getSessionKey')).data
            if (!sessionKey) sessionKey = key
            if (key !== "none" && sessionKey !== key) document.location.reload()
            haveConnected = true

        } catch (e) {
            if (haveConnected) console.log("RELOADER: Connection lost")
            haveConnected = false
        }
        setTimeout(() => live(wait), wait)
    }
    live(wait)
}