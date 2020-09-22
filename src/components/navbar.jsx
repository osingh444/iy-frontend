import React, { useState, useEffect } from 'react'
import Search from './search'
import { Link, Redirect } from 'react-router-dom'
import { getCookie } from '../utils'
import logo from '../data/logov4.png'
import './css/navbar.scss'

const NavBar = props => {

	const [isAuth, setIsAuth] = useState(false)

	useEffect(() => {
		let token_set = getCookie('token_set')
		if(token_set === 'true') {
			setIsAuth(true)
		}
	}, [])

	const handleLogout = () => {
		document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
		document.cookie = "token_set=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
	}

	let content
	if(isAuth) {
		content = (
			<div className='page-header'>
				<div className='navbar-container'>
					<div className='navbar-item'>
	      		<img src={logo}/>
					</div>
				<div>
	      	<Search/>
				</div>
				<div className='navbar-item'>
					<div className='button-container'>
						<Link to='/'>
		      		<button onClick={handleLogout}> Logout </button>
						</Link>
					</div>
				</div>
	    	</div>
			</div>
		)
	} else {
		content = (
			<div className='page-header'>
	    	<div className='navbar-container'>
					<div className='navbar-item'>
						<Link to={'/'}>
      				<img src={logo}/>
						</Link>
					</div>
      	<Search/>
				<div className='navbar-item'>
					<div className='button-container'>
						<Link to="/login">
	      			<button> Login </button>
						</Link>
						<Link to="/register">
	      			<button> Sign Up </button>
						</Link>
					</div>
				</div>
    		</div>
			</div>
		)
	}

	return content
}

export default NavBar
