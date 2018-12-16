import React, {Component} from "react";
import "../../static/Book.css";
import "../../static/EditBook.css"

import {Link} from "react-router-dom";
import axios from "axios";

export default class BookPreview extends Component {
    constructor(props) {
        super(props);

	    this.state = {
		    username: null,
		    authority: null
	    };

	    this.deleteBook = this.deleteBook.bind(this);
	    this.approveBook = this.approveBook.bind(this);
	    this.getCurrentUser = this.getCurrentUser.bind(this);
    }

	getCurrentUser = () => {
		axios.get(
			'http://localhost:8080/api/user/username',
			{withCredentials: true}
		).then(response => {
			if(response.data !== "") {
				this.setState({username: response.data, linkTo: "/logout"});
			}

		});

		axios.get(
			'http://localhost:8080/api/user/authority',
			{withCredentials: true}
		).then(response => {
			console.log(response);
			this.setState({authority: response.data[0]})
		})
	};

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

	componentDidMount() {
		this.getCurrentUser();
	}


      render() {
        return (

          <div className="book-content text-center col m-3">

	          <Link className="" to={`/books/` + this.props.id}>
		          <img className="border" src={require("../../static/pdf_image.png")} />

		          <div className="caption">
				          {this.props.title}
		          </div>
              </Link>
	          {this.state.authority === "ADMIN" ? <div>
		          <Link className="" to={`/update/` + this.props.id}>
			          <img className='update-book-control shadow-on-hover rounded-circle'
			               src={require("../../static/editbook.png")} width="25px" height="25px" />
		          </Link>
		          {this.props.parent === "validation" ? <img className='approve-book-control shadow-on-hover rounded-circle' onClick={this.approveBook}
		                                                     src={require("../../static/approvedbook.png")} width="25px" height="25px" /> : null}

		          <img className='delete-book-control look-like-link shadow-on-hover rounded-circle' onClick={this.deleteBook}
		               src={require("../../static/deletebook.png")} width="25px" height="25px" />
	          </div> : null}



          </div>
        );
      }
}
