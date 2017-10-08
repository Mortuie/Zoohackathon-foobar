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
		};
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

	render() {

		if (this.state.files) {
			console.log(this.state.files);
			this.sendPostRequest(this.state.files);
		} console.log(this.state.data);



		return (
			<div className={css(styles.background)}>
				<NavBar />
				<FileBase64 onDone={this.getFiles.bind(this)} />
			</div>
		);
	}
}


const styles = StyleSheet.create({
	background: {
		backgroundColor: '#ea2323',
		width: '100%',
		height: '100vh',
	}
});
  

