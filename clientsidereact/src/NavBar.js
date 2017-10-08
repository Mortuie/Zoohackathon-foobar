import React from 'react';
import {css, StyleSheet} from 'aphrodite';


export default class NavBar extends React.Component {


	render() {

		var p = this.props.contents;

		return (

			<div className={css(styles.navbarProperties)}>

				{
					Object.keys(this.props.contents).map(i => {
						return <div onClick={() => p[i].onClick()} className={css(styles.item)} key={i}>{p[i].title}</div>
					})
				}

			</div>

		);
	}
}

const styles = StyleSheet.create({
	navbarProperties: {
		width: '100%',
		height: '6vh',
		fontSize: '20px',
		backgroundColor: 'black',
		color: 'white',
		display: 'flex',
		justifyContent: 'flex-end',
		alignItems: 'center',
		position: 'fixed',
		top: '0',
	},
	item: {
		color: 'white',
		marginRight: '7px',
		marginLeft: '7px',
	}
});