import React from 'react';
import './App.css';
import testpic from './media/testpic.jpg';
import Dropzone from 'react-dropzone';


export default class App extends React.Component {

	constructor() {
		super();
		this.state = {
			data: null,
		};
	}


	getBase64 = () => {
		var res;


			var xhr = new XMLHttpRequest();       
	    	xhr.open("GET", testpic, true); 
	    	xhr.responseType = "blob";
	    	xhr.onload = function (e) {

	            var reader = new FileReader();
	            reader.onload = function(event) {
	               	res = event.target.result;
	               	this.sendPostRequest(res);
	            }
	            var file = this.response;
	            reader.readAsDataURL(file)
	    	};
	    	xhr.send();
    	
	}

	sendPostRequest(d) {
		console.log("BANTER");
		var http = new XMLHttpRequest();
		var url = "http://35.195.201.85/decode_test.php";
		var params = "img" + d;
		http.open("POST", url, true);

		//Send the proper header information along with the request
		http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

		http.onreadystatechange = function() {//Call a function when the state changes.
		    if(http.readyState === 4 && http.status === 200) {
		        alert(http.responseText);
		    }
		}
		http.send(params);
	}

	componentWillMount() {
		//var res = this.getBase64();
		//this.setState({data: res});
		// console.log(this.getBase642(testpic));
	}

	getKey = () => {
		this.getBase64();
	}

	
	onDrop(files) {
		if ( files.length === 0 ) {
        alert("upload img please")
        return;
    }
    var blobURL = files[0].preview
    var reader = new FileReader();
    reader.readAsDataURL(blobURL)


	}


	getBase642 = (file) => {
   		var reader = new FileReader();
   		reader.readAsDataURL(file);
   		reader.onload = function () {
     		return reader.result;
   		};
   		reader.onerror = function (error) {
     		return 'Error: ' + error;
   		};
	}


	render() {

		if (this.state.data) {
			this.sendPostRequest();
		} console.log(this.state.data);



		return (
			<div className="App">
				<button onClick={this.getKey}>Generate Key</button>
				<button onClick={this.sendPostRequest}>HIT ME</button>

				<Dropzone onClick={this.onDrop}>Drop your files here</Dropzone>
			</div>
		);
	}
}



  

