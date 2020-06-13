import React, { useState, useEffect } from 'react'
import Search from './search'
import { Link, Redirect } from 'react-router-dom'
import { getCookie } from '../utils'
import './css/navbar.css'

const NavBar = props => {

	const [isAuth, setIsAuth] = useState(false)

	useEffect(() => {
		let token_set = getCookie('token_set')
		if(token_set === 'true') {
			setIsAuth(true)
		}
	}, [])

	const handleLogout = () => {
		document.cookie = "token2=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
		document.cookie = "token_set=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
	}

	let content
	if(isAuth) {
		content = (
			<div className='navbar-container'>
      			<img src='../../public/favicon.icon'/>
      			<Search/>
				<div className='button-container'>
					<Link to='/'>
      					<button onClick={handleLogout}> Logout </button>
					</Link>
				</div>
    		</div>
		)
	} else {
		content = (
	    	<div className='navbar-container'>
      			<img src='../../public/favicon.icon'/>
      			<Search/>
				<div className='button-container'>
					<Link to="/login">
      					<button> Login </button>
					</Link>
					<Link to="/register">
      					<button> Sign Up </button>
					</Link>
				</div>
    		</div>
		)
	}

	return content
}

export default NavBar
