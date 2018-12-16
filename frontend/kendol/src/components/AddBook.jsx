import React, { Component } from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";

export default class AddNewImage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			file: null,
			fileName: "Choose book (.pdf)",
			title: null,
			author: null,
			authors: [],
			genres: [],
			genre: null,
			message: null,
			messageType: null,
			username: null,
			authority: null
		};
		this.onFileChange = this.onFileChange.bind(this);
		this.formUpload = this.formUpload.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.onFieldChange= this.onFieldChange.bind(this);
		this.loadAuthorOptions = this.loadAuthorOptions.bind(this);
		this.getCurrentUser = this.getCurrentUser.bind(this);
		this.loadGenreOptions = this.loadGenreOptions.bind(this);
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
		).then(response => this.setState({authority: response.data}))
	};

	onFormSubmit = e => {
		e.preventDefault();
		this.formUpload();
	};

	formUpload = () => {
		let formData = new FormData();
		formData.append("file", this.state.file);
		formData.append("title", this.state.title);
		formData.append("author", this.state.author);
		formData.append("genre", this.state.genre)
		axios.post(
			'http://localhost:8080/api/book',
			formData,
			{withCredentials: true}
		).then(response => {
			console.log(response);
			if(response.status === 200) {
				this.setState({
					message: "Success",
					messageType: "success"
				})
			}
		 })
	};

	onFileChange = e => {
		e.preventDefault();
		if (e.target.files) {
			this.setState({
				file: e.target.files[0],
				fileName: e.target.files[0].name
			});
		}
	};

	onFieldChange = e => {
		this.setState( {[e.target.name]: e.target.value });
	};

	componentDidMount() {
		this.loadAuthorOptions();
		this.loadGenreOptions();
		this.getCurrentUser();
	};

	loadAuthorOptions = () => {
		axios.get('http://localhost:8080/api/author')
			.then(response => this.setState({authors : response.data}))
	};

	loadGenreOptions = () => {
		axios.get('http://localhost:8080/api/genre')
			.then(response => this.setState({genres : response.data}))
	};

	renderForm = () => {
		if(this.state.username != null) {
			return <div className="w-100 d-flex justify-content-center p-5 ">
				<div className="form-group">
					<form onSubmit={this.onFormSubmit}>
						<h1>Book Upload</h1>
						<div className={"alert alert-" + this.state.messageType}>
							{this.state.message}
						</div>
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

						</div><br/>
						<div className="custom-file">
							<input type="file" className="" onChange={this.onFileChange} />
						</div>
						<button type="submit" className="btn btn-outline-secondary">Upload</button>
					</form>
				</div>
			</div>
		} else {
			return <div className={"alert alert-danger"}>
				Please sign in
			</div>
		}
	};



	render() {
		return (
			<div>
				{this.renderForm()}
			</div>
		);
	}
}