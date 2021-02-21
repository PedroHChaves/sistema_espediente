import "./global.css"
import "./sidebar.css"

function App() {
  return (
    <div>

      <main>
        <aside>

          <strong>Sistema Espediente</strong>
          <br />
          <form>

            <div className="input-block">

              <label htmlFor="title">Insira o horário de início do espediente</label>
              <br />
              <input type="time"></input>
              <br /><br />
              <label htmlFor="title">Insira o horário de fim do espediente</label>
              <br />
              <input type="time"></input>
              <br /><br />
              <button type="submit">Confirmar</button>

            </div>

          </form>

        </aside>
      </main>

    </div>
  );
}

export default App;
