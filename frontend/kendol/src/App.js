import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "./components/Navbar";
import Library from "./components/Library";
import BookPdf from "./components/BookPdf";


import {Route} from "react-router-dom";
import AddBook from "./components/AddBook";
import UpdateBook from "./components/UpdateBook";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import BooksToValidate from "./components/BooksToValidate";
import Logout from "./components/Logout";
import axios from "axios";


class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: null,
			authority: null
		};

		this.getCurrentUser = this.getCurrentUser.bind(this);
		this.handleLogOut = this.handleLogOut.bind(this);
		this.handleSignIn = this.handleSignIn.bind(this);
	}

	getCurrentUser = () => {
		axios.get(
			'http://localhost:8080/api/user/username',
			{withCredentials: true}
		).then(response => {
			if(response.data !== "") {
				this.setState({username: response.data})
			}

		});

		axios.get(
			'http://localhost:8080/api/user/authority',
			{withCredentials: true}
		).then(response => this.setState({authority: response.data[0]}))
	};


	componentDidMount() {
		this.getCurrentUser();
	}

	handleLogOut = () => {
		this.setState({username:null, authority: null});
	};

	handleSignIn = () => {
		this.getCurrentUser();
	};



	render() {
		return (
	      <div className="App">
		      <Navbar username={this.state.username}/>
		      <Route exact path="/" component={() => <Library />} />
			  <Route path="/add-book" component={AddBook}/>
			  <Route exact path="/books/" component={Library}/>
		      <Route exact path="/validate-books/" component={BooksToValidate}/>
		      <Route path="/books/:id" exact component={BookPdf}/>
		      <Route path="/update/:id/" exact component={UpdateBook}/>
		      <Route path="/sign-up/" exact component={SignUp}/>
		      <Route path="/sign-in/" exact component={() => <SignIn handleSignIn={this.handleSignIn} /> }/>
		      <Route path="/logout/" exact component={() => <Logout handleLogOut={this.handleLogOut} /> } />
	      </div>
	    );
  }
}

export default App;
