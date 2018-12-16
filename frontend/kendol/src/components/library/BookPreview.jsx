import React, { Component } from "react";
import "../../static/Book.css";
import "../../static/EditBook.css"

import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

export default class BookPreview extends Component {
    constructor(props) {
        super(props);
	    this.deleteBook = this.deleteBook.bind(this);
	    this.approveBook = this.approveBook.bind(this);
    }

    deleteBook = () => {
	    axios.post(
		    'http://localhost:8080/api/book/delete',{
			    params: {
				    id: this.props.id
			    }
		    }
	    ).then(response => console.log(response));
		this.props.rerender(this.props.id);
    };

	approveBook = () => {
		axios.get(
			'http://localhost:8080/api/validate-book/' + String(this.props.id),
			{withCredentials: true}
		).then(response => console.log(response));
		this.props.rerender(this.props.id);
	};


      render() {
        return (

          <div className="book-content text-center col m-3">

	          <Link className="" to={`/books/` + this.props.id}>
		          <img className="border" src={require("../../static/pdf_image.png")} />
		          <Link className="" to={`/update/` + this.props.id}>
			          <img className='update-book-control shadow-on-hover rounded-circle'
			               src={require("../../static/editbook.png")} width="25px" height="25px" />
		          </Link>
		          <div className="caption">
				          {this.props.title}
		          </div>
              </Link>
	          <img className='approve-book-control shadow-on-hover rounded-circle' onClick={this.approveBook}
	               src={require("../../static/approvedbook.png")} width="25px" height="25px" />
	          <img className='delete-book-control look-like-link shadow-on-hover rounded-circle' onClick={this.deleteBook}
	               src={require("../../static/deletebook.png")} width="25px" height="25px" />

          </div>
        );
      }
}
