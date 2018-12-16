import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import Navbar from "./components/Navbar";
import Library from "./components/library/Library";
import BookPdf from "./components/BookPdf";


import { Route } from "react-router-dom";
import AddBook from "./components/AddBook";
import UpdateBook from "./components/UpdateBook";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import BooksToValidate from "./components/BooksToValidate";


class App extends Component {

  render() {
	  library.add(faCheckCircle);
    return (

      <div className="App">
	      <Navbar/>
	      <Route exact path="/" component={Library} />
		  <Route path="/addBook" component={AddBook}/>
		  <Route exact path="/books/" component={Library}/>
	      <Route exact path="/validate-books/" component={BooksToValidate}/>
	      <Route path="/books/:id" exact component={BookPdf}/>
	      <Route path="/update/:id/" exact component={UpdateBook}/>
	      <Route path="/signUp/" exact component={SignUp}/>
	      <Route path="/signIn/" exact component={SignIn}/>
      </div>
    );
  }
}

export default App;
