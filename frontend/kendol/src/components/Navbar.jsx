import React, { Component } from "react";
import { Link, NavLink  } from "react-router-dom";
import axios from "axios";


export default class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: null,
			messageType: null
		};
		this.getCurrentUser = this.getCurrentUser.bind(this);
	}


	getCurrentUser = () => {
		console.log(this.state);
		let formData = new FormData();
		formData.set("username", this.state.username);
		formData.append("password", this.state.password);
		console.log(formData);
		axios.post(
			'http://localhost:8080/registration',
			formData,
			{withCredentials: true}
		).then(response => {
			if (response.data === "User already exists") {
				this.setState({
					message: "User already exists",
					messageType: "danger"
				});
			}
			else if (response.data === "Success. You can login now") {
				this.setState({
					message: "Success. You can login now",
					messageType: "success"
				});
			}
		})
	};

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
              <NavLink activeClassName="active" className="nav-link" to="/books">
                Library
              </NavLink >
            </li>
            <li className="nav-item">
	            <NavLink activeClassName="active" className="nav-link" to="/addBook">
                    Add book
                </NavLink >
            </li>
            <li className="nav-item">
	            <NavLink activeClassName="active" className="nav-link" to="/signUp">
		            Sign Up
	            </NavLink >
            </li>
	          <li className="nav-item">
		          <NavLink activeClassName="active" className="nav-link" to="/signIn">
			          Sign In
		          </NavLink >
	          </li>
	          <li className="nav-item">
		          <NavLink activeClassName="active" className="nav-link" to="/validate-books">
			          Validate books
		          </NavLink >
	          </li>
          </ul>
        </div>
      </nav>
    );
  }
}
