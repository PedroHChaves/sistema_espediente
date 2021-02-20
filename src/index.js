const express = require("express")
const app = express()

app.get("/", (req, res) => {
    return res.send("Iniciando")
})

app.listen(3333)