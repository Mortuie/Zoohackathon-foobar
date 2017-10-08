import React from 'react';
import {css, StyleSheet} from 'aphrodite';


export default class NavBar extends React.Component {


	render() {
		return (

			<div className={css(styles.navbarProperties)}>
				

			</div>

		);
	}
}

const styles = StyleSheet.create({
	navbarProperties: {
		width: '100%',
		height: '6vh',
		fontSize: '28px',
		backgroundColor: 'black',
		color: 'white',
	}
});