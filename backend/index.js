//Import do express e cors
const express = require("express")
const app = express()
const cors = require("cors")

app.use(cors())
app.use(express.json())

//Chamando uma requisição post
app.post("/", (req, res) => {

    //Obtendo o valor dos horários informados pelo usuário
    var hr_inicio = parseInt(req.body.inicio.substring(0, 2))
    var min_inicio = parseInt(req.body.inicio.substring(3, 5))
    var hr_fim = parseInt(req.body.fim.substring(0, 2))
    var min_fim = parseInt(req.body.fim.substring(3, 5))

    //Varíaveis de auxílio
    var hrs_trabalhadas = 0, min_trabalhados = 0
    var verif_diurno = 0, verif_noturno = 0
    var hrs_diurnas = 0, hrs_noturnas = 0
    var min_diurnos = 0, min_noturnos = 0

    //Verifica se a hora de inicío é menor que a hora de finalização
    if (hr_inicio <= hr_fim) {

        //Verifica se iniciou o trabalho diurno (entre as 5hrs e 22hrs)
        if (hr_inicio >= 5 && hr_inicio < 22) {
            verif_diurno = 1

            //Verifica se realizou trabalho noturno
            if (hr_fim > 22) {
                verif_noturno = 1
            } else if (hr_fim == 22 && min_fim > 0) {
                verif_noturno = 1
            }
        } else if (hr_inicio >= 22) { //Caso tenha iniciado o trabalho noturno após as 22hrs
            verif_noturno = 1
        } else { //Caso tenha iniciado o trabalho noturno após as 0hrs
            verif_noturno = 1

            //Verifica se realizou trabalho diurno
            if (hr_fim > 5) {
                verif_diurno = 1
            } else if (hr_fim == 5 && min_fim > 0) {
                verif_diurno = 1
            }
        }
    } else { // Caso a hora de início não seja menor que o horário de finalização
        //Verifica se inicio o trabalho após as 22hrs
        if (hr_inicio >= 22) {
            verif_noturno = 1

            //Verifica se ele foi até depois das 5
            if (hr_fim >= 5) {
                verif_diurno = 1
            }
        } else {// Caso tenha iniciado durante o período diurno
            verif_diurno = 1
            verif_noturno = 1
        }
    }

    //Zerando as variáveis de verificação
    var diurno = verif_diurno
    var noturno = verif_noturno
    verif_diurno = 0
    verif_noturno = 0

    //Se tiver trabalhado durante a noite e não durante o dia
    if (noturno == 1 && diurno == 0) {
        //Verifica se a hora de finalização é menor que a hora de inicio
        if (hr_fim < hr_inicio) {
            //Obtem o valor das horas trabalhadas
            hrs_trabalhadas = 24 - hr_inicio + hr_fim

            //Se o minuto de finalização for menor que o de início
            if (min_fim < min_inicio) {
                //Subtrai 1 hora
                hrs_trabalhadas = hrs_trabalhadas - 1
                //Obtem o número de minutos trabalhados
                min_trabalhados = 60 - min_inicio + min_fim
            } else {//Caso o minuto de finalização nao seja menor que o de início
                //Obtem o número de minutos trabalhados
                min_trabalhados = min_fim - min_inicio
            }

            //Envia um JSon com a resposta para o frontend
            res.json({
                message: "Você trabalhou: " + hrs_trabalhadas.toString() + ":" +
                    min_trabalhados.toString() + " no período Noturno!"
            })
        } else {//Caso a hora de finalização não seja menor que a hora de inicio
            //Se o minuto de finalização for menor que o de início
            if (min_fim < min_inicio) {
                //Subtrai 1 hora
                hrs_trabalhadas = hr_fim - hr_inicio - 1
                //Obtem o número de minutos trabalhados
                min_trabalhados = 60 - min_inicio + min_fim
            } else {//Caso o minuto de finalização não seja menor que o de início
                //Obtem o valor das horas trabalhadas
                hrs_trabalhadas = hr_fim - hr_inicio
                //Obtem o número de minutos trabalhados
                min_trabalhados = min_fim - min_inicio
            }

            //Envia um JSon com a resposta para o frontend
            res.json({
                message: "Você trabalhou: " + hrs_trabalhadas.toString() + ":" +
                    min_trabalhados.toString() + " no período Noturno!"
            })
        }
    } else if (diurno == 1 && noturno == 0) {//Se tiver trabalhado durante o dia e não durante a noite
        if (min_fim < min_inicio) {//Se o minuto de finalização for menor que o de início
            //Subtrai 1 hora
            hrs_trabalhadas = hr_fim - hr_inicio - 1
            //Obtem o número de minutos trabalhados
            min_trabalhados = 60 - min_inicio + min_fim
        } else {
            //Obtem o número de horas trabalhados
            hrs_trabalhadas = hr_fim - hr_inicio
            //Obtem o número de minutos trabalhados
            min_trabalhados = min_fim - min_inicio
        }

        //Envia um JSon com a resposta para o frontend
        res.json({
            message: "Você trabalhou: " + hrs_trabalhadas.toString() + ":" +
                min_trabalhados.toString() + " no período Diurno!"
        })
    } else {//Caso tenha trabalhado no período diurno e noturno
        if (hr_fim < hr_inicio) {//Se a hora de finalização for menor que a de início
            if (hr_inicio >= 5 && hr_inicio < 22) {//Verifica se ele começou no período diurno
                if (hr_fim <= 5) {//Verifica se ele acabou no período noturno antes das 5
                    if (min_inicio == 0) {//Verifica se começou em hora exata
                        //Pega a quantidade de horas diurnas trabalhadas
                        hrs_diurnas = 22 - hr_inicio
                        //Pega a quantidade de horas noturnas trabalhadas
                        hrs_noturnas = hr_fim + 2
                        //Pega o total de horas trabalhadas
                        hrs_trabalhadas = hrs_diurnas + hrs_noturnas

                        //Se o minuto de finalização for menor que o de início
                        if (min_fim < min_inicio) {
                            //Subtrai 1 hora
                            hrs_trabalhadas = hrs_trabalhadas - 1
                            //Obtem o número de minutos trabalhados
                            min_trabalhados = 60 - min_inicio + min_fim
                        } else {//Caso o minuto de finalização não seja menor que o de início
                            //Obtem o número de minutos trabalhados
                            min_trabalhados = min_fim - min_inicio
                        }
                        //Pega a quantidade de minutos noturnos
                        min_noturnos = min_fim
                    } else {//Caso não tenha começado em hora exata
                        //Pega a quantidade de horas diurnas trabalhadas
                        hrs_diurnas = 22 - hr_inicio - 1
                        //Pega a quantidade de horas noturnas trabalhadas
                        hrs_noturnas = hr_fim + 2
                        //Pega o total de horas trabalhadas
                        hrs_trabalhadas = hrs_diurnas + hrs_noturnas + 1

                        //Se o minuto de finalização for menor que o de início
                        if (min_fim < min_inicio) {
                            //Subtrai 1 hora
                            hrs_trabalhadas = hrs_trabalhadas - 1
                            //Obtem o número de minutos trabalhados
                            min_trabalhados = 60 - min_inicio + min_fim
                        } else {//Caso o minuto de finalização não seja menor que o de início
                            //Obtem o número de minutos trabalhados
                            min_trabalhados = min_fim - min_inicio
                        }

                        //Pega a quantidade de minutos diurnos
                        min_diurnos = 60 - min_inicio
                        //Pega a quantidade de minutos noturnos
                        min_noturnos = min_fim
                    }
                } else {
                    if (min_inicio == 0) {//Verifica se começou em hora exata
                        //Pega a quantidade de horas diurnas trabalhadas
                        hrs_diurnas = 22 - hr_inicio
                        hrs_diurnas = hr_fim - 5 + hrs_diurnas
                        //Pega a quantidade de horas noturnas trabalhadas
                        hrs_noturnas = 7
                        //Pega o total de horas trabalhadas
                        hrs_trabalhadas = hrs_diurnas + hrs_noturnas

                        //Se o minuto de finalização for menor que o de início
                        if (min_fim < min_inicio) {
                            //Subtrai 1 hora
                            hrs_trabalhadas = hrs_trabalhadas - 1
                            //Obtem o número de minutos trabalhados
                            min_trabalhados = 60 - min_inicio + min_fim
                        } else {//Caso o minuto de finalização não seja menor que o de início
                            //Obtem o número de minutos trabalhados
                            min_trabalhados = min_fim - min_inicio
                        }
                        //Pega a quantidade de minutos noturnos
                        min_diurnos = min_trabalhados
                    } else {//Caso não tenha começado em hora exata
                        //Pega a quantidade de horas diurnas trabalhadas
                        hrs_diurnas = 22 - hr_inicio
                        hrs_diurnas = hr_fim - 5 + hrs_diurnas
                        //Pega a quantidade de horas noturnas trabalhadas
                        hrs_noturnas = 7
                        //Pega o total de horas trabalhadas
                        hrs_trabalhadas = hrs_diurnas + hrs_noturnas

                        //Se o minuto de finalização for menor que o de início
                        if (min_fim < min_inicio) {
                            //Subtrai 1 hora
                            hrs_trabalhadas = hrs_trabalhadas - 1
                            hrs_diurnas = hrs_trabalhadas - hrs_noturnas
                            //Obtem o número de minutos trabalhados
                            min_trabalhados = 60 - min_inicio + min_fim
                        } else {//Caso o minuto de finalização não seja menor que o de início
                            //Obtem o número de minutos trabalhados
                            min_trabalhados = min_fim - min_inicio
                        }

                        //Pega a quantidade de minutos diurnos
                        min_diurnos = min_trabalhados
                    }
                }
            } else if (hr_inicio >= 22) {

                //Pega a quantidade de hrs noturnas antes das 00:00
                hrs_noturnas = 24 - hr_inicio

                //Verifica se começou em hora exata
                if (min_inicio != 0) {
                    hrs_noturnas = hrs_noturnas - 1
                    min_noturnos = 60 - min_inicio
                }

                //Pega a quantidade de horas trabalhadas em cada período
                hrs_noturnas = hrs_noturnas + 5
                hrs_diurnas = hr_fim - 5
                min_diurnos = min_fim

                //Pega a quantidade de horas trabalhadas
                hrs_trabalhadas = hrs_diurnas + hrs_noturnas
                min_trabalhados = min_diurnos + min_noturnos

                //Transforma 60 min em 1hr caso necessário
                if (min_trabalhados > 60) {
                    min_trabalhados = min_trabalhados - 60
                    hrs_trabalhadas = hrs_trabalhadas + 1
                }
            } else {
                if (hr_fim < hr_inicio) {
                    //Pega a quantidade de horas diurnas trabalhadas
                    hrs_diurnas = 17
                    //Pega a quantidade de horas noturnas trabalhadas
                    hrs_noturnas = 5 - hr_inicio + 2
                    hrs_noturnas = hrs_noturnas + hr_fim
                    //Pega o total de horas trabalhadas
                    hrs_trabalhadas = hrs_diurnas + hrs_noturnas

                    //Se o minuto de finalização for menor que o de início
                    if (min_fim < min_inicio) {
                        //Subtrai 1 hora
                        hrs_trabalhadas = hrs_trabalhadas - 1
                        hrs_noturnas = hrs_noturnas - 1
                        //Obtem o número de minutos trabalhados
                        min_trabalhados = 60 - min_inicio + min_fim
                    } else {//Caso o minuto de finalização não seja menor que o de início
                        //Obtem o número de minutos trabalhados
                        min_trabalhados = min_fim - min_inicio
                    }

                    //Pega a quantidade de minutos diurnos
                    min_noturnos = min_trabalhados
                    res.json({
                        message: "Você trabalhou: " +
                            hrs_trabalhadas.toString() + ":" +
                            min_trabalhados.toString() + " horas.\nSendo " +
                            hrs_diurnas.toString() + ":" +
                            min_diurnos + " Diurnas e " +
                            hrs_noturnas.toString() + ":" +
                            min_noturnos + " Noturnas."
                    })
                }
                if (min_inicio == 0) {//Verifica se começou em hora exata
                    //Pega a quantidade de horas diurnas trabalhadas
                    hrs_diurnas = hr_fim - 5
                    //Pega a quantidade de horas noturnas trabalhadas
                    hrs_noturnas = 24 - hr_inicio + 5
                    //Pega o total de horas trabalhadas
                    hrs_trabalhadas = hrs_diurnas + hrs_noturnas

                    //Se o minuto de finalização for menor que o de início
                    if (min_fim < min_inicio) {
                        //Subtrai 1 hora
                        hrs_trabalhadas = hrs_trabalhadas - 1
                        //Obtem o número de minutos trabalhados
                        min_trabalhados = 60 - min_inicio + min_fim
                    } else {//Caso o minuto de finalização não seja menor que o de início
                        //Obtem o número de minutos trabalhados
                        min_trabalhados = min_fim - min_inicio
                    }
                    //Pega a quantidade de minutos diurnos
                    min_diurnos = min_fim
                } else {//Caso não tenha começado em hora exata
                    //Pega a quantidade de horas diurnas trabalhadas
                    hrs_diurnas = hr_fim - 5
                    //Pega a quantidade de horas noturnas trabalhadas
                    hrs_noturnas = 24 - hr_inicio + 4
                    //Pega o total de horas trabalhadas
                    hrs_trabalhadas = hrs_diurnas + hrs_noturnas + 1

                    //Se o minuto de finalização for menor que o de início
                    if (min_fim < min_inicio) {
                        //Subtrai 1 hora
                        hrs_trabalhadas = hrs_trabalhadas - 1
                        //Obtem o número de minutos trabalhados
                        min_trabalhados = 60 - min_inicio + min_fim
                    } else {//Caso o minuto de finalização não seja menor que o de início
                        //Obtem o número de minutos trabalhados
                        min_trabalhados = min_fim - min_inicio
                    }

                    //Pega a quantidade de minutos diurnos
                    min_noturnos = 60 - min_inicio
                    //Pega a quantidade de minutos noturnos
                    min_diurnos = min_fim
                }
            }
        } else {
            if (hr_inicio < 5) {//Verifica se o usuário começou no período noturno antes das 5
                if (hr_fim <= 22) {
                    if (hr_fim == 22) {
                        if (min_fim == 0) {//Verifica se começou em hora exata
                            //Pega a quantidade de horas diurnas trabalhadas
                            hrs_diurnas = 17
                            //Pega a quantidade de horas noturnas trabalhadas
                            hrs_noturnas = 5 - hr_inicio
                            //Pega o total de horas trabalhadas
                            hrs_trabalhadas = hrs_diurnas + hrs_noturnas

                            //Se o minuto de finalização for menor que o de início
                            if (min_fim < min_inicio) {
                                //Subtrai 1 hora
                                hrs_trabalhadas = hrs_trabalhadas - 1
                                //Obtem o número de minutos trabalhados
                                min_trabalhados = 60 - min_inicio + min_fim
                            } else {//Caso o minuto de finalização não seja menor que o de início
                                //Obtem o número de minutos trabalhados
                                min_trabalhados = min_fim - min_inicio
                            }
                            //Pega a quantidade de minutos diurnos
                            min_diurnos = min_fim

                            min_noturnos = min_trabalhados
                        } else {//Caso não tenha começado em hora exata
                            //Pega a quantidade de horas diurnas trabalhadas
                            hrs_diurnas = 17
                            //Pega a quantidade de horas noturnas trabalhadas
                            hrs_noturnas = 5 - hr_inicio
                            //Pega o total de horas trabalhadas
                            hrs_trabalhadas = hrs_diurnas + hrs_noturnas
                            //Se o minuto de finalização for menor que o de início
                            if (min_fim < min_inicio) {
                                //Subtrai 1 hora
                                hrs_trabalhadas = hrs_trabalhadas - 1
                                hrs_noturnas = hrs_noturnas - 1
                                //Obtem o número de minutos trabalhados
                                min_trabalhados = 60 - min_inicio + min_fim
                            } else {//Caso o minuto de finalização não seja menor que o de início
                                //Obtem o número de minutos trabalhados
                                min_trabalhados = min_fim - min_inicio
                            }

                            //Pega a quantidade de minutos diurnos
                            min_noturnos = min_trabalhados
                        }
                    } else {
                        if (min_inicio == 0) {//Verifica se começou em hora exata
                            //Pega a quantidade de horas diurnas trabalhadas
                            hrs_diurnas = hr_fim - 5
                            //Pega a quantidade de horas noturnas trabalhadas
                            hrs_noturnas = 5 - hr_inicio
                            //Pega o total de horas trabalhadas
                            hrs_trabalhadas = hrs_diurnas + hrs_noturnas

                            //Se o minuto de finalização for menor que o de início
                            if (min_fim < min_inicio) {
                                //Subtrai 1 hora
                                hrs_trabalhadas = hrs_trabalhadas - 1
                                //Obtem o número de minutos trabalhados
                                min_trabalhados = 60 - min_inicio + min_fim
                            } else {//Caso o minuto de finalização não seja menor que o de início
                                //Obtem o número de minutos trabalhados
                                min_trabalhados = min_fim - min_inicio
                            }
                            //Pega a quantidade de minutos diurnos
                            min_diurnos = min_fim
                        } else {//Caso não tenha começado em hora exata
                            //Pega a quantidade de horas diurnas trabalhadas
                            hrs_diurnas = hr_fim - 5
                            //Pega a quantidade de horas noturnas trabalhadas
                            hrs_noturnas = 4 - hr_inicio
                            //Pega o total de horas trabalhadas
                            hrs_trabalhadas = hrs_diurnas + hrs_noturnas + 1
                            //Se o minuto de finalização for menor que o de início
                            if (min_fim < min_inicio) {
                                //Subtrai 1 hora
                                hrs_trabalhadas = hrs_trabalhadas - 1
                                //Obtem o número de minutos trabalhados
                                min_trabalhados = 60 - min_inicio + min_fim
                            } else {//Caso o minuto de finalização não seja menor que o de início
                                //Obtem o número de minutos trabalhados
                                min_trabalhados = min_fim - min_inicio
                            }

                            //Pega a quantidade de minutos diurnos
                            min_noturnos = 60 - min_inicio
                            //Pega a quantidade de minutos noturnos
                            min_diurnos = min_fim
                        }
                    }
                } else {
                    //Pega a quantidade de horas diurnas trabalhadas
                    hrs_diurnas = 17
                    //Pega a quantidade de horas noturnas trabalhadas
                    hrs_noturnas = 5 - hr_inicio
                    hrs_noturnas = hrs_noturnas + (hr_fim - 22)
                    //Pega o total de horas trabalhadas
                    hrs_trabalhadas = hrs_diurnas + hrs_noturnas

                    //Se o minuto de finalização for menor que o de início
                    if (min_fim < min_inicio) {
                        //Subtrai 1 hora
                        hrs_trabalhadas = hrs_trabalhadas - 1
                        //Obtem o número de minutos trabalhados
                        min_trabalhados = 60 - min_inicio + min_fim
                    } else {//Caso o minuto de finalização não seja menor que o de início
                        //Obtem o número de minutos trabalhados
                        min_trabalhados = min_fim - min_inicio
                    }

                    //Pega a quantidade de minutos diurnos
                    min_noturnos = min_trabalhados
                }
            } else {
                if (min_inicio == 0) {//Verifica se começou em hora exata
                    //Pega a quantidade de horas diurnas trabalhadas
                    hrs_diurnas = 22 - hr_inicio
                    //Pega a quantidade de horas noturnas trabalhadas
                    hrs_noturnas = hr_fim - 22
                    //Pega o total de horas trabalhadas
                    hrs_trabalhadas = hrs_diurnas + hrs_noturnas

                    //Se o minuto de finalização for menor que o de início
                    if (min_fim < min_inicio) {
                        //Subtrai 1 hora
                        hrs_trabalhadas = hrs_trabalhadas - 1
                        //Obtem o número de minutos trabalhados
                        min_trabalhados = 60 - min_inicio + min_fim
                    } else {//Caso o minuto de finalização não seja menor que o de início
                        //Obtem o número de minutos trabalhados
                        min_trabalhados = min_fim - min_inicio
                    }
                    //Pega a quantidade de minutos diurnos
                    min_noturnos = min_fim
                } else {//Caso não tenha começado em hora exata
                    //Pega a quantidade de horas diurnas trabalhadas
                    hrs_diurnas = 22 - hr_inicio - 1
                    //Pega a quantidade de horas noturnas trabalhadas
                    hrs_noturnas = hr_fim - 22
                    //Pega o total de horas trabalhadas
                    hrs_trabalhadas = hrs_diurnas + hrs_noturnas
                    //Se o minuto de finalização for menor que o de início
                    if (min_fim < min_inicio) {
                        //Subtrai 1 hora
                        hrs_trabalhadas = hrs_trabalhadas
                        //Obtem o número de minutos trabalhados
                        min_trabalhados = 60 - min_inicio + min_fim
                    } else {//Caso o minuto de finalização não seja menor que o de início                
                        hrs_trabalhadas = hrs_trabalhadas + 1
                        //Obtem o número de minutos trabalhados
                        min_trabalhados = 60 - min_inicio - min_fim
                    }

                    //Pega a quantidade de minutos diurnos
                    min_noturnos = 60 - min_fim
                    //Pega a quantidade de minutos noturnos
                    min_diurnos = 60 - min_inicio
                }
            }
        }
        
        //Envia um JSon com a resposta para o frontend
        //Acrescenta um zero a esquerda de cada possibilidade de minutos
        if (min_trabalhados < 10 && min_diurnos < 10 && min_noturnos < 10) {
            res.json({
                message: "Você trabalhou: " +
                    hrs_trabalhadas.toString() + ":0" +
                    min_trabalhados.toString() + " horas.\nSendo " +
                    hrs_diurnas.toString() + ":0" +
                    min_diurnos + " Diurnas e " +
                    hrs_noturnas.toString() + ":0" +
                    min_noturnos + " Noturnas."
            })
        } else if (min_trabalhados < 10 && min_diurnos < 10) {
            res.json({
                message: "Você trabalhou: " +
                    hrs_trabalhadas.toString() + ":0" +
                    min_trabalhados.toString() + " horas.\nSendo " +
                    hrs_diurnas.toString() + ":0" +
                    min_diurnos + " Diurnas e " +
                    hrs_noturnas.toString() + ":" +
                    min_noturnos + " Noturnas."
            })
        } else if (min_trabalhados < 10 && min_noturnos < 10) {
            res.json({
                message: "Você trabalhou: " +
                    hrs_trabalhadas.toString() + ":0" +
                    min_trabalhados.toString() + " horas.\nSendo " +
                    hrs_diurnas.toString() + ":" +
                    min_diurnos + " Diurnas e " +
                    hrs_noturnas.toString() + ":0" +
                    min_noturnos + " Noturnas."
            })
        } else if (min_diurnos < 10 && min_noturnos < 10) {
            res.json({
                message: "Você trabalhou: " +
                    hrs_trabalhadas.toString() + ":" +
                    min_trabalhados.toString() + " horas.\nSendo " +
                    hrs_diurnas.toString() + ":0" +
                    min_diurnos + " Diurnas e " +
                    hrs_noturnas.toString() + ":0" +
                    min_noturnos + " Noturnas."
            })
        } else if (min_trabalhados < 10) {
            res.json({
                message: "Você trabalhou: " +
                    hrs_trabalhadas.toString() + ":0" +
                    min_trabalhados.toString() + " horas.\nSendo " +
                    hrs_diurnas.toString() + ":" +
                    min_diurnos + " Diurnas e " +
                    hrs_noturnas.toString() + ":" +
                    min_noturnos + " Noturnas."
            })
        } else if (min_diurnos < 10) {
            res.json({
                message: "Você trabalhou: " +
                    hrs_trabalhadas.toString() + ":" +
                    min_trabalhados.toString() + " horas.\nSendo " +
                    hrs_diurnas.toString() + ":0" +
                    min_diurnos + " Diurnas e " +
                    hrs_noturnas.toString() + ":" +
                    min_noturnos + " Noturnas."
            })
        } else if (min_noturnos < 10) {
            res.json({
                message: "Você trabalhou: " +
                    hrs_trabalhadas.toString() + ":" +
                    min_trabalhados.toString() + " horas.\nSendo " +
                    hrs_diurnas.toString() + ":" +
                    min_diurnos + " Diurnas e " +
                    hrs_noturnas.toString() + ":0" +
                    min_noturnos + " Noturnas."
            })
        }

        res.json({
            message: "Você trabalhou: " +
                hrs_trabalhadas.toString() + ":" +
                min_trabalhados.toString() + " horas.\nSendo " +
                hrs_diurnas.toString() + ":" +
                min_diurnos + " Diurnas e " +
                hrs_noturnas.toString() + ":" +
                min_noturnos + " Noturnas."
        })
    }
})

app.listen(3333)