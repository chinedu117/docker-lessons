const express = require("express")
const redis = require("redis")

const app = express()

const client = redis.createClient({
    host: "redis-server",
    port: 6379
})

client.set("visits",0)

app.get("/", (req,res) => {
    
    visits = client.get("visits")
    client.set("visits",parseInt(visits) + 1)
    res.send(`Number of visits  ${visits}`)
})

app.listen(3000,() => {
    console.log("Listening on port 3000")
})