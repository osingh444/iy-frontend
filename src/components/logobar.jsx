import React from 'react'
import './css/navbar.scss'
import logo from '../data/logov4.png'

const LogoBar = () => {

	let content = (
		<div className='page-header'>
    	<div className='logobar-container'>
      		<img src={logo}/>
    	</div>
		</div>
	)
	return content
}

export default LogoBar
