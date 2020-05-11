import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import './App.css';
import ImageComponent from './components/ImageComponent';
import Menu from './components/Menu';

function App() {
  return (
    <div className="App container">
    <Router>
        <header className="App-header">
          <Menu />
        </header>
        <section id="main-content">
          <Switch>
            <Route path="/getimage">
              <ImageComponent />
            </Route>
          </Switch>
        </section>
      </Router>
    </div>
  );
}

export default App;
