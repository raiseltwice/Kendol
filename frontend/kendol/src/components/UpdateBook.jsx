import React, {Component} from 'react';
import axios from "axios";
import {withRouter} from "react-router-dom";

class UpdateBook extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: null,
			author: null,
			authors: [],
			genres: [],
			genre: null,
			message: null,
			messageType: null
		};

		this.onFieldChange= this.onFieldChange.bind(this);
		this.loadAuthorOptions = this.loadAuthorOptions.bind(this);
		this.loadCurrentBook = this.loadCurrentBook.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.formUpload = this.formUpload.bind(this);
		this.loadGenreOptions = this.loadGenreOptions.bind(this);
	}


	onFieldChange = e => {
		this.setState( {[e.target.name]: e.target.value })
		console.log(this.state);
	};

	componentDidMount() {
		this.loadCurrentBook();
		this.loadAuthorOptions();
	};
	loadAuthorOptions = () => {
		axios.get('http://localhost:8080/api/author')
			.then(response => this.setState({authors : response.data}))
	};

	loadGenreOptions = () => {
		axios.get('http://localhost:8080/api/genre')
			.then(response => this.setState({genres : response.data}))
	};

	onFormSubmit = e => {
		e.preventDefault();
		this.formUpload();
	};

	formUpload = () => {
		let formData = new FormData();
		formData.append("id", String(this.props.match.params.id));
		formData.append("title", this.state.title);
		formData.append("author", this.state.author);
		formData.append("genre", this.state.genre);
		axios.post(
			'http://localhost:8080/api/book/update',
			formData,
			{headers: {"Content-Type": "multipart/form-data"}}
		).then(response => { this.setState({
					message: "Success", messageType:"success"
				});
				this.props.history.push('/books');
			}).catch(err => console.log(err));
	};


	loadCurrentBook = () => {
		axios.get(
			'http://localhost:8080/api/book/' + String(this.props.match.params.id)
		).then(response => {
			this.setState({
				title: response.data.title,
				author: response.data.author.fullName,
				genre: response.data.genre.title
			});
		}).catch(err => console.log(err))
	};

	render() {
		return (
			<div className="w-100 d-flex justify-content-center p-5 ">
				<div className="form-group">
					<form onSubmit={this.onFormSubmit}>
						<h1>Book Upload</h1>
						<div className={"alert alert-" + this.state.messageType}>
							{this.state.message}
						</div>
						<div className="row">
							<div className="col">
								<input type="text" name="title" className="form-control"
								       onChange={e => this.onFieldChange(e)} value={this.state.title} />
							</div>
							<div className="col">
								<input list="data" name="author" className="form-control"
								       onChange={e => this.onFieldChange(e)} value={this.state.author} />
								<datalist id="data">
									{this.state.authors.map(author =>
										<option value={author.fullName} />
									)}
								</datalist>
							</div>
							<div className="col">
								<input list="data" name="genre" className="form-control"
								       onChange={e => this.onFieldChange(e)} value={this.state.genre} />
								<datalist id="data">
									{this.state.genres.map(genre =>
										<option value={genre.title} />
									)}
								</datalist>
							</div>
						</div><br/>
						<button type="submit" className="btn btn-outline-secondary">Update</button>
					</form>
				</div>
			</div>
		);
	}
}

export default withRouter(UpdateBook);