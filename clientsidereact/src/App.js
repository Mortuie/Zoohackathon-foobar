import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import FileBase64 from 'react-file-base64';
import NavBar from './NavBar';

export default class App extends React.Component {

	constructor() {
		super();
		this.state = {
			data: null,
			files: null,
			showUpload: true,
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
				<div>
					<div className={css(styles.text)}>Upload a picture that you would like translated and highlighted!</div>
					<FileBase64 onDone={this.getFiles.bind(this)} />
				</div>
			);
		} else {
			return <div>HI</div>
		}
	}

	render() {

		if (this.state.files) {
			console.log(this.state.files);
			this.sendPostRequest(this.state.files);
		} console.log(this.state.data);
		console.log(this.state.showUpload);


		return (
			<div className={css(styles.background)}>
				<NavBar contents={this.contents} turnOff={this.turnOffUpload} turnOn={this.turnOnUpload} />
				{this.renderBackground()}
			</div>
		);
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
	nav: {
		position: 'fixed',
		top: '0',
	},
	text: {
		padding: '10px',
		width: '100px',
	}
});
  

