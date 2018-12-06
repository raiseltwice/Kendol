import React, { Component } from "react";
import axios from "axios";

export default class AddNewImage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			file: null,
			fileName: "Choose book (.pdf)",
			title: null,
			author: null,
			authors: [],
			genre: null
		};
		this.onFileChange = this.onFileChange.bind(this);
		this.formUpload = this.formUpload.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.onFieldChange= this.onFieldChange.bind(this);
		this.loadAuthorOptions = this.loadAuthorOptions.bind(this);
	}

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
			formData
		).catch(err => console.log(err))
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
		this.setState( {[e.target.name]: e.target.value })
		console.log(this.state);
	}
	componentDidMount() {
		this.loadAuthorOptions();
	}
	loadAuthorOptions = () => {
		axios.get('http://localhost:8080/api/author')
			.then(response => this.setState({authors : response.data}))
	};

	render() {
		return (
			<div>
				<div className="w-100 d-flex justify-content-center p-5 ">
					<div className="form-group">
						<form onSubmit={this.onFormSubmit}>
							<h1>Book Upload</h1>
								<div className="row">
									<div className="col">
									<input type="text" name="title" className="form-control"
									       onChange={e => this.onFieldChange(e)} placeholder="Title" />
								</div>
								<div className="col">
									<input list="data" name="author" className="form-control"
									       onChange={e => this.onFieldChange(e)} placeholder="Author" />
									<datalist id="data">
										{this.state.authors.map(author =>
											<option value={author.fullName} />
										)}
									</datalist>

								</div>
								<div className="col">
									<input type="text" name="genre" className="form-control"
									       onChange={e => this.onFieldChange(e)} placeholder="Genre" />
								</div>

								</div><br/>
							<div className="custom-file">
								<input type="file" className="" onChange={this.onFileChange} />
							</div>
							<button type="submit" className="btn btn-outline-secondary">Upload</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}