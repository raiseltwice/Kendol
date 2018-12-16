import React, {Component} from 'react';
import axios from "axios";

export default class SignIn extends Component {
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
		let formData = new FormData();
		formData.set("username", this.state.username);
		formData.append("password", this.state.password);
		axios.post(
			'http://localhost:8080/login',
			formData,
			{withCredentials: true}
		);
		axios.post(
			'http://localhost:8080/user/get',
			formData
		).then(response => {
			if(response.data === "success") {
				this.setState({messageType: "success", message: "Success"});
			} else if (response.data === "password is incorrect") {
				this.setState({messageType: "danger", message: "Password is incorrect"});
			} else if (response.data === "such user doesn't exist") {
				this.setState({messageType: "danger", message: "Such user doesn't exist"});
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
							<h1>Sign In</h1>
							<br/>
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
							</div>
							<br/>
							<button type="submit" className="btn btn-outline-secondary">Sign In</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}
