import React, { Component } from "react";
import "../../static/Book.css";
import "../../static/EditBook.css"
import { Link } from "react-router-dom";
import axios from "axios";

export default class BookPreview extends Component {
    constructor(props) {
        super(props);
	    this.deleteBook = this.deleteBook.bind(this);
    }

    deleteBook = () => {
	    axios.get(
		    'http://localhost:8080/api/deleteBook',{
			    params: {
				    id: this.props.id
			    }
		    }
	    ).then(response => console.log(response));
		this.props.rerender(this.props.id);
    };


      render() {
        return (
          <div className="book text-center col m-3">
	          <Link className="" to={`/books/` + this.props.id}>

		          <img className="border" src={require("../../static/pdf_image.png")} />
		          <Link className="" to={`/update/` + this.props.id}>
			          <img className='update-book-control shadow-on-hover rounded-circle'  src={require("../../static/editbook.png")} width="25px" height="25px" />
		          </Link>
		          <div className="caption">
				          {this.props.title}
			          </div>
              </Link>

	          <img className='delete-book-control look-like-link shadow-on-hover rounded-circle' onClick={this.deleteBook} src={require("../../static/deletebook.png")} width="25px" height="25px" />

          </div>
        );
      }
}
