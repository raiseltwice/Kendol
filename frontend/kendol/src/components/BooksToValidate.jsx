import React, { Component } from "react";
import BookPreview from "./BookPreview";
import axios from "axios";


export default class BooksToValidate extends Component {
	constructor(props) {
		super(props);

		this.state = {
			books : [],
			username: null,
			authority: null
		};
		this.getBooks = this.getBooks.bind(this);
		this.updateBooks = this.updateBooks.bind(this);
		this.renderBooks = this.renderBooks.bind(this);
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

	getBooks = () => {
		fetch('http://localhost:8080/api/book/to-validate', {
			credentials: 'include'
		})
			.then(response => response.json())
			.then(responseJSON => {console.log(responseJSON); this.setState({books : responseJSON})})
			.catch(error => console.log(error));
	};

	componentDidMount() {
		this.getBooks();
		this.getCurrentUser();
	};

	updateBooks = bookId => {
		const books = this.state.books.filter(book => book.id !== bookId);
		this.setState({books});
	};


	renderBooks = () => {
		if(this.state.username != null && this.state.authority === "ADMIN") {
			return <div className="container">
				<div className="row">
					{
						this.state.books.map((book =>
								<BookPreview key={book.id} title={book.title} id={book.id} parent={"validation"} rerender={this.updateBooks}/>
						))
					}
				</div>
			</div>
		} else {
			return <div className={"alert alert-danger"}>
				Please sign in as an admin
			</div>
		}
	};


	render() {
		return (
			<div>
				{this.renderBooks()}
			</div>
		);
	}
}
