import React, {useState} from "react"
import axios from "axios"

import "./global.css"
import "./sidebar.css"

function App() {

    const [inicio, setInicio] = useState("")
    const [fim, setFim] = useState("")

    function enviaBack(e){
        e.preventDefault()
        let request = {
            inicio: inicio,
            fim: fim
        }

        //alert(request.inicio + " " + request.fim)

        axios.post("http://localhost:3333/", request).then(resp => {
            alert(resp.data.message)
            //console.log("Cheguei")
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div>

            <main>
                <aside>

                    <strong>Sistema Espediente</strong>
                    <br />
                    <form onSubmit={e => enviaBack(e)}>

                        <div className="input-block">

                            <label htmlFor="inicio">
                                Insira o horário de início do espediente
                            </label>
                            <br />
                            <input type="time" value={inicio} onChange={e => setInicio(e.target.value)} required>
                            </input>
                            <br /><br />
                            <label htmlFor="fim">
                                Insira o horário de fim do espediente
                            </label>
                            <br />
                            <input type="time" value={fim} onChange={e => setFim(e.target.value)} required>
                            </input>
                            <br /><br />
                            <button type="submit">
                                Confirmar
                            </button>

                        </div>

                    </form>

                </aside>
            </main>

        </div>
    );
}

export default App;
