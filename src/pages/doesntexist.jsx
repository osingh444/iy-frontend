import React from 'react'
import { Link } from 'react-router-dom'

const DoesntExist = () => {

	let content = (
		<div className='dne-container'>
			<h3> Sorry, this page does not exist </h3>
			<Link to='/'>
				<p> Back to homepage </p>
			</Link>
		</div>
	)

	return content
}

export default DoesntExist
