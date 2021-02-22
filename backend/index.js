const express = require("express")
const app = express()
const cors = require("cors")

var hrs_trabalhadas = 0
var min_trabalhados = 0
var verif_diurno = 0
var verif_noturno = 0

app.use(cors())
app.use(express.json())

app.post("/", (req, res) => {
    console.log(req.body.inicio)

    var hr_inicio = parseInt(req.body.inicio.substring(0, 2))
    var min_inicio = parseInt(req.body.inicio.substring(3, 5))
    var hr_fim = parseInt(req.body.fim.substring(0, 2))
    var min_fim = parseInt(req.body.fim.substring(3, 5))

    /*console.log(hr_inicio)
    console.log(min_inicio)
    console.log(typeof hr_inicio)
    console.log(typeof min_inicio)    

    console.log(hr_fim)
    console.log(min_fim)
    console.log(typeof hr_fim)
    console.log(typeof min_fim)*/

    if(hr_inicio <= hr_fim){
        if(hr_inicio >= 5 && hr_inicio < 22){
            verif_diurno = 1
    
            if(hr_fim > 22){
                verif_noturno = 1
            }
        }else if(hr_inicio >= 22){
            verif_noturno = 1
        }else{
            verif_noturno = 1

            if(hr_fim > 5){
                verif_diurno = 1
            }
        }
    }else{
        if(hr_inicio >= 22){
            verif_noturno = 1

            if(hr_fim > 5){
                verif_diurno = 1
            }
        }
    }

    var diurno = verif_diurno
    var noturno = verif_noturno
    verif_diurno = 0
    verif_noturno = 0

    if(noturno == 1 && diurno == 0){
        if(hr_fim < hr_inicio){
            hrs_trabalhadas = 24 - hr_inicio + hr_fim
    
            if(min_fim < min_inicio){
                hrs_trabalhadas = hrs_trabalhadas -1
                min_trabalhados = 60 - min_inicio + min_fim
            }else{
                min_trabalhados = min_fim - min_inicio
            }
    
            res.json({
                message: "Você trabalhou: " + hrs_trabalhadas.toString() + ":" + 
                min_trabalhados.toString() + " no período Noturno!"
            })
        }
    }else if(diurno == 1 && noturno == 0){
        if(min_fim < min_inicio){
            hrs_trabalhadas = hr_fim - hr_inicio -1
            min_trabalhados = 60 - min_inicio + min_fim
        }else{
            hrs_trabalhadas = hr_fim - hr_inicio
            min_trabalhados = min_fim - min_inicio
        }

        res.json({
            message: "Você trabalhou: " + hrs_trabalhadas.toString() + ":" + 
            min_trabalhados.toString() + " no período Diurno!"
        })
    }else{
        res.json({
            message: "Manha e Noite"
        })
    }
})

app.listen(3333)