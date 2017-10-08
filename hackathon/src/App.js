import React from 'react';
import './App.css';
import testpic from './media/testpic.jpg';
import Dropzone from 'react-dropzone';

import FileBase64 from 'react-file-base64';

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
			<div className="App">
				<FileBase64 onDone={this.getFiles.bind(this)} />
			</div>
		);
	}
}



  

