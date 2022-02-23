const express = require("express")
const redis = require("redis")
const cors = require("cors")
const bodyParser = require("body-parser")




const app = express()

app.use(bodyParser.json())
app.use(cors())



const { Pool } = require("pg");
const keys = require("./keys")

const pgClient = new Pool({
    user: keys.pgUser,
    password: keys.pgPassword,
    database: keys.pgDatabase,
    port: keys.pgPort,
    host: keys.pgHost
})


pgClient.on("error", () => console.log("connection to postgres lost"))

pgClient
    .query("CREATE TABLE IF NOT EXISTS values (number int) ")
    .catch(console.log)

const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisHost,
    retry_strategy: () => 1000
})

const redisPublisher = redisClient.duplicate()

app.get("/", async (req, res) => {
     res.send("Hi")
})

app.get("/values/all", async (req, res) => {
     
    const values = await pgClient.query("SELECT * FROM value");

    res.send(values.rows())
})

app.get("/values/current", async (req, res) => {
     redisClient.hgetall("values", (err,values) => {
          res.send(values)
     })
})

app.post("/value", async (req, res) => {
     
    const index = req.body.index;
    
    if (parseInt(index) > 40){
         res.status(422).send("Too high index")
    }

    redisClient("values",index, "Nothing yet")
    redisPublisher("insert", index)

    pgClient.query("INSERT INTO values(number) VALUES($1)", [ index ])

    res.send({workiing: true})
})

app.listen(6000, () => {
    console.log("Listening on port 3000")
})