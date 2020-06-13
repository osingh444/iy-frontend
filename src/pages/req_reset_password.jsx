import React, { useState } from 'react'
import './account.scss'
import { Link } from 'react-router-dom'
import Popup from '../components/popup'
import { isValidEmail } from '../utils'

const ReqReset = (location) => {
	const [email, setEmail] = useState('')
	const [emailErr, setEmailErr] = useState('')
	const [displayEmailErr, setDisplayEmailErr] = useState(false)
	const [emailClass, setEmailClass] = useState('row')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [popup, setPopup] = useState(null)

	const handleSubmit = e => {
		setPopup(null)
		e.preventDefault()
		if(!validate()) {
			return
		}
		//make api call
		setIsSubmitting(true)
		fetch(process.env.REACT_APP_API_BASE + 'reqreset', {
			method: 'POST',
			body: JSON.stringify({email: email}),
			headers: {
        	'Content-Type': 'application/json'
      		}
		})
		.then(res => res.json())
		.then(data => {
			if(data.success) {
				setPopup(<Popup title={'Success'} body={'Password reset email sent'}/>)
			} else {
				setPopup(<Popup title={'Failure'} body={data.msg}/>)
			}
		})
		.catch(err => console.log(err))
		setIsSubmitting(false)
	}

	const handleChange = e => {
		if(e.target.name === 'email') {
			setEmail(e.target.value)
		}
	}

	const validate = () => {
		if(email === '') {
			setEmailErr(' - This field is required')
			setEmailClass('row-err')
			setDisplayEmailErr(true)
			return false
		}
		if(!email.includes('@')) {
			setEmailErr(' - Email should include @')
			setEmailClass('row-err')
			setDisplayEmailErr(true)
			return false
		}
		if(!isValidEmail(email)) {
			setEmailErr(' - Malformed email')
			setEmailClass('row-err')
			setDisplayEmailErr(true)
			return false
		}
		return true
	}

	let content = (
		<React.Fragment>
		<div className='reqreset-container'>
			<p name='title'> Password Recovery </p>
			<form
				onSubmit={handleSubmit}>
				<span className='label'> Email </span>
				<span className='err'> {emailErr} </span>
				<input
					type='text'
          			name='email'
					className={emailClass}
          			onChange={(handleChange)}/>
				<button disabled={isSubmitting}> Submit </button>
				<Link to='/login'>
					<p className='link'> Have an Account? </p>
				</Link>
			</form>
		</div>
		{popup}
		</React.Fragment>
	)
	return content
}

export default ReqReset
