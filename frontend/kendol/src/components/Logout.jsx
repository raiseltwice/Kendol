import React, {Component} from 'react';
import axios from "axios";

class Logout extends Component {
	constructor(props) {
		super(props);
		this.logout = this.logout.bind(this);
	}

	logout = () => {
		axios.get(
			'http://localhost:8080/logout',
			{withCredentials: true}
		).then(this.props.history.push('/books'));
	};

	render() {
		return (
			<div>
				<br/>
				<button type="button" className="btn btn-secondary" onClick={this.logout}>Logout</button>
			</div>
		);
	}
}

export default Logout;