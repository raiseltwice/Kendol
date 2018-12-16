import React, { Component } from "react";
import { Link, NavLink  } from "react-router-dom";
import axios from "axios";


export default class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "Sign In",
			authority: null,
			message: null,
			messageType: null,
			linkTo: "/sign-in"
		};
		this.getCurrentUser = this.getCurrentUser.bind(this);
	}


	getCurrentUser = () => {
		axios.get(
			'http://localhost:8080/api/user/username',
			{withCredentials: true}
		).then(response => {
			if(response.data !== "") {
				this.setState({username: response.data, linkTo: "/logout"})
			}

		});

		axios.get(
			'http://localhost:8080/api/user/authority',
			{withCredentials: true}
		).then(response => this.setState({authority: response.data}))
	};

	componentDidMount() {
		this.getCurrentUser();
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
	            <NavLink activeClassName="active" className="nav-link" to="/add-book">
                    Add book
                </NavLink >
            </li>
            <li className="nav-item">
	            <NavLink activeClassName="active" className="nav-link" to="/sign-up">
		            Sign Up
	            </NavLink >
            </li>
	          <li className="nav-item">
		          <NavLink activeClassName="active" className="nav-link" to={this.state.linkTo}>
			          {this.state.username}
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
