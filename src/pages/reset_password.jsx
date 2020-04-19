import React, { useState } from 'react'
import Popup from '../components/popup'
import { Link, Redirect } from 'react-router-dom'
import './account.scss'
const queryString = require('query-string')

const PassReset = (props) => {
	const [password, setPassword] = useState('')
	const [cPassword, setCPassword] = useState('')
	const [classs, setClass] = useState('row')
	const [err, setErr] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [popup, setPopup] = useState(null)

	const handleChange = e => {
		switch(e.target.name) {
			case 'password':
				setPassword(e.target.value)
				break
			case 'ccpassword':
				setCPassword(e.target.value)
				break
		}
	}

	const handleSubmit = e => {
		setPopup(null)
		e.preventDefault()
		setErr('')
		setClass('row')
		if(password !== cPassword) {
			setErr(' - Passwords must match')
			setClass('row-err')
			return
		}

		if(password.length < 6) {
			setErr(' - Password must have a length of at least 6')
			setClass('row-err')
			return
		}

		//add password strength check and indicator
		const parsed = queryString.parse(props.location.search)
		setIsSubmitting(true)
		fetch(process.env.REACT_APP_API_BASE + 'reset', {
			method: 'POST',
			body: JSON.stringify({token: parsed.token}),
			headers: {
        	'Content-Type': 'application/json'
      		}
		})
		.then(res => res.json)
		.then(data => {
			setPopup(<Popup body={data.msg}/>)
		})
		.catch(err => console.log(err))
		setIsSubmitting(false)
	}

	let content = (
		<React.Fragment>
		<div className='reset-container'>
			<p name='title'> Reset Password </p>
			<form
				onSubmit={handleSubmit}>
				<span className='label'> New Password </span>
				<span className='err'> {err} </span>
				<input
					type='password'
					name='password'
					className={classs}
					onChange={handleChange}/>
				<span className='label'> Confirm Password </span>
				<span className='err'> {err} </span>
				<input
					type='password'
					name='ccpassword'
					className={classs}
					onChange={handleChange}/>
				<button disabled={isSubmitting}> Submit </button>
				<Link to='/register'>
					<p className='link'> Login Here </p>
				</Link>
			</form>
		</div>
		{popup}
		</React.Fragment>
	)

	return content
}

export default PassReset
