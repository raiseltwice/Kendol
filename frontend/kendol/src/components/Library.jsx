import React, { Component } from "react";
import BookPreview from "./BookPreview";
import axios from "axios";

export default class Library extends Component {
  constructor(props) {
    super(props);

    this.state = {
	    title: null,
	    author: null,
	    genre: null,
        books : [],
	    authors : [],
	    genres : []
    };
	this.getBooks = this.getBooks.bind(this);
	this.updateBooks = this.updateBooks.bind(this);
	this.loadAuthorOptions = this.loadAuthorOptions.bind(this);
	this.loadGenreOptions = this.loadGenreOptions.bind(this);
	this.onFieldChange = this.onFieldChange.bind(this);
	this.formUpload = this.formUpload.bind(this);
  }

	getBooks = () => {
	  fetch('http://localhost:8080/api/book/validated', {
	      credentials: 'include'
	  })
	      .then(response => response.json())
	      .then(responseJSON => {
	      	console.log(responseJSON); this.setState({books : responseJSON})})
	      .catch(error => console.log(error));
	};

	componentDidMount() {
	  this.getBooks();
	  this.loadAuthorOptions();
	  this.loadGenreOptions();
	};

	updateBooks = bookId => {
	  const books = this.state.books.filter(book => book.id !== bookId);
	  this.setState({books});
	};

	onFieldChange = e => {
		this.setState( {[e.target.name]: e.target.value });
	};

	loadAuthorOptions = () => {
		axios.get('http://localhost:8080/api/author')
			.then(response => {
				this.setState({authors : response.data})
			})
	};

	loadGenreOptions = () => {
		axios.get('http://localhost:8080/api/genre')
			.then(response => {
				this.setState({genres : response.data})
			});
	};

	onFormSubmit = e => {
		e.preventDefault();
		this.formUpload();
	};
	
	formUpload = () => {
		let formData = new FormData();
		formData.append("title", this.state.title);
		formData.append("author", this.state.author);
		formData.append("genre", this.state.genre);
		axios.post(
			'http://localhost:8080/api/book/search',
			formData
		).then(response => {
			this.setState({books : response.data});
		})
	};
  
	render() {
		return (
		  <div>
		    <div className="container">
		        <br/>
		        <form onSubmit={this.onFormSubmit}>
			        <div className="row">
				        <div className="col">
					        <input type="text" name="title" className="form-control"
					               onChange={e => this.onFieldChange(e)} placeholder="Title" />
				        </div>
				        <div className="col">
					        <input list="author" name="author" className="form-control"
					               onChange={e => this.onFieldChange(e)} placeholder="Author" />
					        <datalist id="author">
						        {this.state.authors.map(author =>
							        <option value={author.fullName} />
						        )}
					        </datalist>

				        </div>
				        <div className="col">
					        <input list="genre" name="genre" className="form-control"
					               onChange={e => this.onFieldChange(e)} placeholder="Genre" />
					        <datalist id="genre">
						        {this.state.genres.map(genre =>
							        <option value={genre.title} />
						        )}
					        </datalist>
				        </div>
				        <button type="submit" className="btn btn-outline-secondary">Search</button>
			        </div>
		        </form>
		        <div className="row">
		            {
		                this.state.books.map((book =>
		                        <BookPreview key={book.id} title={book.title} id={book.id} rerender={this.updateBooks}/>
		                ))
		            }
		        </div>
		    </div>
		  </div>
		);
	}
}
