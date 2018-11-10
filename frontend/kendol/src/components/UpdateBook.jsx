import React, {Component} from 'react';
import axios from "axios";

class UpdateBook extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: null,
			author: null,
			authors: [],
			genre: null,
		};

		this.onFormSubmit1 = this.onFormSubmit1.bind(this);
		this.onFieldChange= this.onFieldChange.bind(this);
		this.loadAuthorOptions = this.loadAuthorOptions.bind(this);
		this.loadCurrentBook = this.loadCurrentBook.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.formUpload = this.formUpload.bind(this);
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
		axios.get('http://localhost:8080/api/allAuthors')
			.then(response => this.setState({authors : response.data}))
	};

	onFormSubmit1 = () => {
		let formData = new FormData();
		formData.append("id", String(this.props.match.params.id));
		formData.append("title", this.state.title);
		formData.append("fullName", this.state.author);
		formData.append("genreTitle", this.state.genre);
		axios.post(
			'http://localhost:8080/api/updateBook',
			formData
		).then(response => console.log(response))
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
			'http://localhost:8080/api/updateBook',
			formData
		).catch(err => console.log(err))
	};


	loadCurrentBook = () => {
		axios.get(
			'http://localhost:8080/api/getBook',{
				params: {
					id: String(this.props.match.params.id)
				}
			}
		).then(response => {
			this.setState({
				title: response.data.title,
				author: response.data.author.fullName,
				genre: response.data.genre.title
			});
			console.log(this.state);

		}).catch(err => console.log(err))
	}






	render() {
		return (
			<div className="w-100 d-flex justify-content-center p-5 ">
				<div className="form-group">
					<form onSubmit={this.onFormSubmit}>
						<h1>Book Upload</h1>
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
								<input type="text" name="genre" className="form-control"
								       onChange={e => this.onFieldChange(e)} value={this.state.genre} />
							</div>
						</div><br/>
						<button type="submit" className="btn btn-outline-secondary">Add</button>
					</form>
				</div>
			</div>
		);
	}
}

export default UpdateBook;
//
// <div>
// 	<div className="w-100 d-flex justify-content-center p-5 ">
// 		<div className="form-group">
// 			<form onSubmit={this.onFormSubmit1}>
				{/*<h1>Book Upload</h1>*/}
				{/*<div className="row">*/}
					{/*<div className="col">*/}
						{/*<input type="text" name="title" className="form-control"*/}
						       {/*onChange={e => this.onFieldChange(e)} value={this.state.title} />*/}
					{/*</div>*/}
					{/*<div className="col">*/}
						{/*<input list="data" name="author" className="form-control"*/}
						       {/*onChange={e => this.onFieldChange(e)} value={this.state.author} />*/}
						{/*<datalist id="data">*/}
							{/*{this.state.authors.map(author =>*/}
								{/*<option value={author.fullName} />*/}
							{/*)}*/}
						{/*</datalist>*/}
					{/*</div>*/}
					{/*<div className="col">*/}
						{/*<input type="text" name="genre" className="form-control"*/}
						       {/*onChange={e => this.onFieldChange(e)} value={this.state.genre} />*/}
					{/*</div>*/}
				{/*</div><br/>*/}
// 				<button type="submit" className="btn btn-outline-secondary">Update</button>
// 			</form>
// 		</div>
// 	</div>
// </div>