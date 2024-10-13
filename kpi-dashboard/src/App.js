import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; // Importa los componentes necesarios
import logo from './logo.svg';
import './App.css';
import ServicioDashboard from './components/servicedashboard'; // Ajusta la ruta según tu estructura
import TigoDashboard from './components/TigoDashboard'; // Importa el componente TigoDashboard
import CwDashboard from './components/CwDashboard'; // Importa el componente CwDashboard

function App() {
  return (
    <Router> {/* Agrega el Router alrededor de tu aplicación */}
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>

        {/* Rutas para los diferentes dashboards */}
        <Switch>
          <Route path="/tigo" component={TigoDashboard} />
          <Route path="/cable-and-wireless" component={CwDashboard} />
          <Route path="/" component={ServicioDashboard} /> {/* Ruta por defecto */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
