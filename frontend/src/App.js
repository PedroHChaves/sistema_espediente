//Import modulos necessários
import React, {useState} from "react"
import axios from "axios"
import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css";

//Import do arquivos css
import "./global.css"
import "./sidebar.css"

function App() {

    //Cria as variáveis para obter o valor no input
    const [inicio, setInicio] = useState("")
    const [fim, setFim] = useState("")

    //Inicializa os componentes do materialize
    function componentDidMount() {
        M.AutoInit();
    }

    //Envia os dados obtidos para o backend
    function enviaBack(e){
        e.preventDefault()
        let request = {
            inicio: inicio,
            fim: fim
        }

        axios.post(process.env.REACT_APP_API_URL, request).then(resp => {
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
