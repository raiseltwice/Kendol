import React, {Component} from "react";
import {Document, Page} from "react-pdf";
import "./ddd.css";
import axios from "axios";
import "../App.css";
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';

import { pdfjs } from 'react-pdf';
import Typography from "@material-ui/core/Typography/Typography";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


export default  class BookPdf extends Component {
	constructor(props) {
		super(props);

		this.state = {
			numPages: null,
			pageNumber: 2,
			selectedText: null,
			fileName: null,
			file: null,
			anchorEl:null,
			open: false,
			translatedText: ""
		};

		this.handleClick = this.handleClick.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.translate = this.translate.bind(this);
		this.loadPdf = this.loadPdf.bind(this);
		this.onDocumentLoadSuccess = this.onDocumentLoadSuccess.bind(this);
		this.onDocumentLoadError = this.onDocumentLoadError.bind(this);
	};

	handleClick = event => {
		const { currentTarget } = event;
		this.translate();
		this.setState(state => ({
			anchorEl: currentTarget,
			open: !state.open,
		}));
	};

	handleClose = () => {
		if (window.getSelection().toString() == "") {
			this.setState({ open: false });
		}
	};

	onDocumentLoadSuccess = ({ numPages }) => {
		this.setState({ numPages });
	};

	onDocumentLoadError = (e) => {
		console.log(e.message);
	};

	translate = () => {
		const url =
		  "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20180904T135742Z.4112b40df508737c.845b910f63d9931ca640737903f1dca7946bcf9b&text=" +
		  window.getSelection().toString() +
		  "&lang=en-ru";
		console.log(url);
		if (!window.getSelection().toString() == "") {
		  axios.post(url).then(res => this.setState({ translatedText: res.data.text[0] }));
		}
		console.log(this.state);
	};

	loadPdf = () => {
		axios.get('http://localhost:8080/api/book/file', {
			params: {
				id: String(this.props.match.params.id)
			},
			responseType: 'blob',
			withCredentials: true

		}).then(response => {
				this.setState({file: URL.createObjectURL(new Blob(
						[response.data],
						{type: 'application/pdf'}))});
			});

	};

	componentDidMount() {
		this.loadPdf();
	}

	render() {
		const { pageNumber, numPages } = this.state;
		const id = this.state.open ? 'no-transition-popper' : null;

		return (
			<div className="d-flex justify-content-center pdf-content">
				<Popper className="popper-styles" id={id} open={this.state.open} anchorEl={this.state.anchorEl} placement={"top"}>
					<Paper>
						<Typography>{this.state.translatedText}</Typography>
					</Paper>
				</Popper>
				<Document onClick={this.handleClick}
					file={this.state.file}
					onLoadSuccess={this.onDocumentLoadSuccess}
		            onLoadError={this.onDocumentLoadError}
				>
					<Page pageNumber={pageNumber} height={window.innerHeight}
					/>
				</Document>

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


