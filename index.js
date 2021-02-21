const express = require("express")
const app = express()
const cors = require("cors")

var hrs_trabalhadas = 0

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    if(req.params.hr_inicio >= 5){
        if(req.params.hr_final <= 22){
            hrs_trabalhadas = req.params.hr_final - req.params.hr_inicio
            res.send("Horario diurno: " + hrs_trabalhadas)
        }
    }
})

app.listen(3333)