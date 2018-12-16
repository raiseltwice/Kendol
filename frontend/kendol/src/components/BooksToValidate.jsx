import React, { Component } from "react";
import BookPreview from "./library/BookPreview";


export default class BooksToValidate extends Component {
	constructor(props) {
		super(props);

		this.state = {
			books : [],
		};
		this.getBooks = this.getBooks.bind(this);
		this.updateBooks = this.updateBooks.bind(this);

	}

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
	}
	updateBooks = bookId => {
		const books = this.state.books.filter(book => book.id !== bookId);
		this.setState({books});
	};


	render() {

		return (
			<div>
				<div className="container">
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
