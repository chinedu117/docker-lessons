import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Link, Route } from "react-router-dom"
import Fib from './fibs';
import OtherPage from "./otherPages"
import { Component } from "react"

class App extends Component {

  render(h) {
    return (
      <Router>

        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>

            <Link to="/">Home</Link>
            <Link to="/otherpage"> Other Page</Link>
          </header>

          <div>
            <Route exact path="/" component={Fib} />
            <Route exact path="/otherpage" component={OtherPage} />
          </div>


        </div>
      </Router>

    );
  }
}


export default App;
