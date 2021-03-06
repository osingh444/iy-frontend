import React, { useState, useEffect, useContext } from 'react'
import { Link, Redirect } from 'react-router-dom'
import './account.scss'
import { getCookie, isValidEmail } from '../utils'

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [emailErr, setemailErr] = useState('')
	const [passwordErr, setpasswordErr] = useState('')
	const [emailClass, setEmailClass] = useState('row')
	const [passwordClass, setPasswordClass] = useState('row')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [shouldRedirect, setShouldRedirect] = useState(false)

	useEffect(() => {
		if(getCookie('token_set') === 'true') {
			setShouldRedirect(true)
		}
	}, [])

	const handleChange = (e) => {
    switch(e.target.name) {
      case 'email':
        setEmail(e.target.value)
      	break
      case 'password':
        setPassword(e.target.value)
        break
			default:
    	}
	}

	const handleSubmit = (e) => {
    e.preventDefault()
		let submit = validate()
		if(!submit) {
			return
		}

		//make api call
		setIsSubmitting(true)
		fetch(process.env.REACT_APP_API_BASE + 'login', {
			method: 'POST',
			body: JSON.stringify({Email: email, Password: password}),
			credentials: 'include',
			headers: {
        	'Content-Type': 'application/json'
      		}
		})
		.then(res => {
			if(res.status === 200) {
				setShouldRedirect(true)
			} else if(res.status === 401) {
				setemailErr(' - username or password incorrect')
				setEmailClass('row-err')
				setPasswordClass('row-err')
			} else if(res.status === 404) {
				setemailErr(' - user does not exist')
				setEmailClass('row-err')
				setPasswordClass('row-err')
			}else {
				setemailErr(' - server error')
				setEmailClass('row-err')
				setPasswordClass('row-err')
			}
			setIsSubmitting(false)
		})
		.catch(err => {
			console.log(err)
			setIsSubmitting(false)
		})
	}

	const validate = () => {
		setemailErr('')
		setpasswordErr('')
		setEmailClass('row')
		setPasswordClass('row')
		let submit = true

		if(!email.includes('@')) {
			setemailErr(' - Email should include @')
			setEmailClass('row-err')
			submit = false
		}
		if(!isValidEmail(email)) {
			setemailErr(' - Malformed email')
			setEmailClass('row-err')
			submit = false
		}
		if(email === '') {
			setemailErr(' - This field is required')
			setEmailClass('row-err')
			submit = false
		}
		if(password == '') {
			setpasswordErr(' - This field is required')
			setPasswordClass('row-err')
			submit = false
		}
		return submit
	}

	let	content = (
		<div className='account-wrapper'>
		  <div className='login-container'>
			  <p name='title'> Sign-In </p>
		    <form onSubmit={handleSubmit}>
				  <span className='label'> Email </span>
				  <span className='err'>{emailErr} </span>
		      <input
		        type='text'
		        name='email'
		        onChange={handleChange}
		        className={emailClass}/>
				  <span className='label'> Password </span>
				  <span className='err'> {passwordErr} </span>
		      <input
		        type='password'
		        name='password'
		        onChange={handleChange}
		        className={passwordClass}/>
					<Link to='reqreset'>
						<p className='link'> Forgot Password? </p>
					</Link>
		      <button disabled={isSubmitting}> Login </button>
					<Link to='/register'>
					  <p className='link'> Not Registered? </p>
					</Link>
		    </form>
		 </div>
	 </div>
	)

	if(shouldRedirect) {
		content = <Redirect to='/'/>
	}

	return content
}

export default Login
