import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import FileBase64 from 'react-file-base64';
import NavBar from './NavBar';
import Parser from 'html-react-parser';

export default class App extends React.Component {

	constructor() {
		super();
		this.state = {
			data: null,
			files: null,
			showUpload: false,
			wholeJSONStorage: null,
			interval: null,
		};
	}

	turnOffUpload = () => {
		this.setState({showUpload: false});
	}

	turnOnUpload = () => {
		this.setState({showUpload: true});
	}

	contents = {
		0: {
			title: 'View Images',
			onClick: this.turnOffUpload,

		},
		1: {
			title: 'Upload Image',
			onClick: this.turnOnUpload,
		},
	};

	componentWillUnmount() {
		clearInterval(this.state.interval);
	}

	componentWillMount() {
		// get request....

		// var interv = setInterval;
		// this.setState({}); // every 10 or so seconds...
		// call getResponse populating state...
	}


	getResponse(URL) {
		var xmlHttp = new XMLHttpRequest();
    	xmlHttp.open("GET", URL, false); // false for synchronous request
    	xmlHttp.send(null);
    	return xmlHttp.responseText;
	}


	sendPostRequest(file) {

		var xhr = new XMLHttpRequest();
		// console.log(file.base64);
		var data = "img=" + file.base64;

		xhr.addEventListener("readystatechange", function() {
			if (this.readyState === 4) {
				console.log(this.responseText);
			}
		});

		xhr.open("POST", "http://35.195.201.85/decode_test.php");
		xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

		xhr.send(data);

	}


	getFiles(file) {
		this.setState({files: file});
	}

	renderBackground() {

		if (this.state.showUpload) {
			return (
				<div className={css(styles.background)}>
					<NavBar contents={this.contents} turnOff={this.turnOffUpload} turnOn={this.turnOnUpload} />
					<div className={css(styles.text)}>Upload a picture that you would like translated and highlighted!</div>
					<FileBase64 onDone={this.getFiles.bind(this)} />
				</div>
				
			);
		} else { // show all the pictures...
			// convert base64 to picture
			// add html to the bottom of the picture...
			/*
			var element = new Image();
			element.src = ELEMENT STRING;

			{Parser(HTML)} -> OUTPUT

			*/

			

			return (
				<div className={css(styles.backgroundBox)}>
					<NavBar contents={this.contents} turnOff={this.turnOffUpload} turnOn={this.turnOnUpload} />

					
					<div className={css(styles.box)}></div>
					<div className={css(styles.box)}></div>
					<div className={css(styles.box)}></div>
					<div className={css(styles.box)}></div>
					<div className={css(styles.box)}></div>
					<div className={css(styles.box)}></div>
					<div className={css(styles.box)}></div>
					<div className={css(styles.box)}></div>
					<div className={css(styles.box)}></div>


				</div>			
			);

		}
	}

	render() {

		if (this.state.files) {
			console.log(this.state.files);
			this.sendPostRequest(this.state.files);
		} console.log(this.state.data);
		console.log(this.state.showUpload);


		return this.renderBackground();
	}
}


const styles = StyleSheet.create({
	background: {
		backgroundColor: '#ea2323',
		width: '100%',
		height: '100vh',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	backgroundBox: {
		backgroundColor: '#ea2323',
		width: '100%',
		height: '100vh',
		display: 'flex',
		overflow: 'scroll',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: '150px',

	},
	nav: {
		position: 'fixed',
		top: '0',
	},
	text: {
		padding: '10px',
		margin: '30px',
	},
	box: {
		minWidth: '200px',
		minHeight: '250px',
		backgroundColor: 'blue',
		margin: '15px',
	},
});
  

