import React from 'react'
import { Link } from 'react-router-dom'
import './css/navbar.scss'
import logo from '../data/logov4.png'

const LogoBar = () => {

	let content = (
		<div className='page-header'>
    	<div className='logobar-container'>
				<Link to={'/'}>
      		<img src={logo}/>
				</Link>
    	</div>
		</div>
	)
	return content
}

export default LogoBar
