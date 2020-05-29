import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import './App.css';
import ImageComponent from './components/ImageComponent';
import Menu from './components/Menu';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App container">
    <Router>
        <header className="App-header">
          <Menu />
        </header>
        <main id="main-content">
          <Switch>
            <Route path="/getimage">
              <ImageComponent />
            </Route>
            <Route path="/">
              <Redirect status={301} from="/" to="/getimage" /> 
            </Route>
          </Switch>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
