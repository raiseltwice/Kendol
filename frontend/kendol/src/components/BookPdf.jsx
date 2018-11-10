import React, { Component } from "react";
import { Document, Page } from "react-pdf";
import "./ddd.css";
import axios from "axios";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
	typography: {
		padding: theme.spacing.unit * 2,
	},
});

export default  class BookPdf extends Component {
	constructor(props) {
		super(props);

		this.state = {
			numPages: null,
			pageNumber: 2,
			selectedText: null,
			fileName: null,
			file: null,
			anchorEl: null,
			open: false
		};

		this.kek = this.kek.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.translate = this.translate.bind(this);
		this.loadPdf = this.loadPdf.bind(this);
		this.toggle = this.toggle.bind(this);
	}

	// handleClick = (e) =>{
	// 	if (!window.getSelection().toString() == "") {
	// 		//this.setState({ open: true });
	// 		console.log("On click event");
	// 		this.setState({ selectedText: window.getSelection().toString() });
	// 	}
	// 	this.setState({ pageNumber: this.state.pageNumber + 1 });
	// 	console.log(this.state.pageNumber)
	// 	//this.kek();
	// }
	handleClick = event => {
		const { currentTarget } = event;
		this.setState(state => ({
			anchorEl: currentTarget,
			open: !state.open,
		}));
	};


	handleClose = (e) => {
		if (window.getSelection().toString() == "") {
			this.setState({ open: false });
		}
	};

	kek = () => {
		console.log(window.getSelection().toString());

		console.log(this.state.selectedText);
		//this.translate();
	}

	onDocumentLoad = ({ numPages }) => {
		this.setState({ numPages });
	};
	translate = () => {
		// let url =
		//   "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20180904T135742Z.4112b40df508737c.845b910f63d9931ca640737903f1dca7946bcf9b&text=" +
		//   window.getSelection().toString() +
		//   "&lang=ru-en";
		// console.log(url);
		// if (!window.getSelection().toString() == "") {
		//   post(url).then(res => this.setState({ selectedText: res.data.text[0] }));
		// }
		let url = "https://od-api.oxforddictionaries.com:443/api/v1/entries/en/ace";
		const config = {
			"app_id": "aa8710d2",
			"app_key": "c549d09fcb5a4727947ff59c09c00e4d",
			"Accept": "application/json"
		};
		// post(url, null, config).then(res => console.log(res));

	}
	loadPdf = () => {
		axios.get('http://localhost:8080/api/getBookFile', {
			params: {
				id: String(this.props.match.params.id)
			},
			responseType: 'blob'
		}).then(response => {
				this.setState({file: URL.createObjectURL(new Blob(
						[response.data],
						{type: 'application/pdf'}))})
			})

	}

	componentDidMount() {
		this.loadPdf();
	}
	//to write own popover

	toggle = () => {
		this.setState({
			popoverOpen: !this.state.popoverOpen
		});
	}


	render() {
		const { pageNumber, numPages } = this.state;

		const { classes } = this.props;
		const { anchorEl } = this.state;
		const open = Boolean(anchorEl);
		const id = open ? 'no-transition-popper' : null;


		return (
			<div>

				<Document onClick={this.handleClick}
					// getPdfFromServer
					//file={require("../../../../pdf_storage/ticket.pdf")}
					file={this.state.file}
					onLoadSuccess={this.onDocumentLoad}
				>
					<Page pageNumber={pageNumber} />
				</Document>
				<Popper id={id} open={open} anchorEl={anchorEl}>
					<Paper>
					The content of the Popper.
					</Paper>
				</Popper>
			</div>
		);
	}
}



//<p>{this.state.selectedText}</p>

{/*<div>*/}
{/*<Document onClick={this.handleClick}*/}
{/*// getPdfFromServer*/}
{/*//file={require("../../../../pdf_storage/ticket.pdf")}*/}
{/*file={require("./kek.pdf")}*/}
{/*onLoadSuccess={this.onDocumentLoad}*/}
{/*>*/}
{/*<Page pageNumber={pageNumber} />*/}
{/*</Document>*/}
{/*<Popper id={id} open={open} anchorEl={anchorEl} transition>*/}
{/*{({ TransitionProps }) => (*/}
{/*<Fade {...TransitionProps} timeout={350}>*/}
{/*<Paper>*/}
{/*<Typography className={classes.typography}>The content of the Popper.</Typography>*/}
{/*</Paper>*/}
{/*</Fade>*/}
{/*)}*/}
{/*</Popper>*/}


{/*</div>*/}


