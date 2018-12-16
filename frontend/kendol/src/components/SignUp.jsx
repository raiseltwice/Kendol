import React, {Component} from 'react';
import axios from "axios";

export default class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: null,
			password: null,
			message: null,
			messageType: null
		};
		this.formUpload = this.formUpload.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.onFieldChange= this.onFieldChange.bind(this);
	}

	onFormSubmit = e => {
		e.preventDefault();
		this.formUpload();
	};

	formUpload = () => {
		console.log(this.state);
		let formData = new FormData();
		formData.set("username", this.state.username);
		formData.append("password", this.state.password);
		console.log(formData);
		axios.post(
			'http://localhost:8080/registration',
			formData,
			{withCredentials: true}
		).then(response => {
			if (response.data === "User already exists") {
				this.setState({
					message: "User already exists",
					messageType: "danger"
				});
			}
			 else if (response.data === "Success. You can login now") {
				this.setState({
					message: "Success. You can login now",
					messageType: "success"
				});
			}
		})
	};

	onFieldChange = e => {
		this.setState( {[e.target.name]: e.target.value })
	};


	render() {
		return (
			<div>
				<div className="w-100 d-flex justify-content-center p-5 ">
					<div className="form-group">
						<form onSubmit={this.onFormSubmit}>
							<h1>Sign Up</h1>
							<div className={"alert alert-" + this.state.messageType}>
								{this.state.message}
							</div>
							<br/>
							<div className="row">
								<div className="col">
									<input type="text" name="username" className="form-control"
									       onChange={e => this.onFieldChange(e)} placeholder="Username" />
									<br/>
									<input type="password" name="password" className="form-control"
									       onChange={e => this.onFieldChange(e)} placeholder="Password" />
								</div>


							</div><br/>
							<button type="submit" className="btn btn-outline-secondary">Sign Up</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}
