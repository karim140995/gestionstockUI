import React from 'react';
import './App.css';
import NavBar from './NavBar.js';
import {BrowserRouter as Router} from 'react-router-dom';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import ProductPage from './ProductPage.js';
import Home from './Home.js';
import CategoryPage from './CategoryPage.js';

function App() {
  return (
    <div className="App">
      <Router>
      <div>
          <NavBar/>
             <Switch>
                <Route path="/home" exact strict component={Home}/>
                <Route path="/product" exact strict component={ProductPage}/>
                <Route path="/category" exact strict component={CategoryPage}/>
                <Route path="/" component={Home}/>
             </Switch>
      </div>
     </Router>
    </div>
  );
}

export default App;
