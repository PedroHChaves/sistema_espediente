import React, {useState} from "react"
import axios from "axios"
import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css";


import "./global.css"
import "./sidebar.css"

function App() {

    const [inicio, setInicio] = useState("")
    const [fim, setFim] = useState("")

    function componentDidMount() {
        // Auto initialize all the things!
        M.AutoInit();
    }

    function enviaBack(e){
        e.preventDefault()
        let request = {
            inicio: inicio,
            fim: fim
        }

        axios.post("http://localhost:3333/", request).then(resp => {
            alert(resp.data.message)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div>

            <main>
                <div className = "form">
                    <aside>

                        <strong><i className="material-icons center">access_time</i>Sistema Espediente</strong>
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
                                <button className="btn waves-effect waves-light" type="submit" name="action">
                                    Confirmar
                                    <i className="material-icons right">send</i>
                                </button>
                            </div>
                        </form>
                    </aside>
                </div>
            </main>

        </div>
    );
}

export default App;
