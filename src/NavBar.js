import React, {Component} from "react";
import {NavLink} from 'react-router-dom'

class NavBar extends Component {
  render(){
    return(
      <div>
          <nav className="navbar navbar-expand-lg  navbar-dark bg-primary">*
                  <NavLink  className="navbar-brand" to="/home">Home</NavLink>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                  <NavLink className="nav-item nav-link" to="/product">Product Mangement</NavLink>
                  <NavLink className="nav-item nav-link" to="/category">Category Mangement</NavLink>
                </div>
                </div>
            </nav>
      </div>
    );
  }
}
export default NavBar;
