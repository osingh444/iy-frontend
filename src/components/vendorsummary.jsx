import React from 'react'
import { Link } from 'react-router-dom'
import './css/vendor.scss'

const VendorSummary = props => {

	let handle = '@' + props.vname
	let ig = 'https://www.instagram.com/' + props.vname + '/'

	let content = (
    	<React.Fragment>
      	<a target='_blank'
					href={ig}
					rel="noopener noreferrer"> {handle} </a>
    	</React.Fragment>
	)

	return content
}

export default VendorSummary
