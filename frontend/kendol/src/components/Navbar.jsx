import React, { Component } from "react";
import { Link, NavLink  } from "react-router-dom";


export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
	      <Link className="" to="/books">
		      <img className="" src={require("../static/2.png")} />
	      </Link >

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse d-flex justify-content-center"
          id="navbarNav"
        >
          <ul className="navbar-nav ">
            <li className="nav-item">
              {/*<a className="nav-link" href="#">*/}
              <NavLink activeClassName="active" className="nav-link" to="/books">
                Library
              </NavLink >
              {/*</a>*/}
            </li>
            <li className="nav-item">
	            <NavLink activeClassName="active" className="nav-link" to="/addBook">
                    Add book
                </NavLink >
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Sign in
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
