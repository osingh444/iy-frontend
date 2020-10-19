import React from 'react'
import { Link } from 'react-router-dom'
import './css/navbar.scss'
import logo from '../data/logov4.png'

const LogoBar = () => {

	let content = (
		<div className='page-header'>
    	<div className='logobar-container'>
				<div className='navbar-item'>
					<Link to={'/'}>
	      		<img src={logo}/>
					</Link>
				</div>
    	</div>
		</div>
	)
	return content
}

export default LogoBar
