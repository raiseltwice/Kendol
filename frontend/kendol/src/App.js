import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "./components/Navbar";
import Library from "./components/library/Library";
import BookPdf from "./components/BookPdf";


import { Route } from "react-router-dom";
import AddBook from "./components/AddBook";
import UpdateBook from "./components/UpdateBook";

class App extends Component {
  render() {
    return (

      <div className="App">
	      <Navbar/>
	      <Route exact path="/" component={Library} />
		  <Route path="/addBook" component={AddBook}/>
		  <Route exact path="/books/" component={Library}/>
	      <Route path="/books/:id" exact component={BookPdf}/>
	      <Route path="/update/:id/" exact component={UpdateBook}/>
      </div>
    );
  }
}

export default App;
