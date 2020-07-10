import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Popup from 'reactjs-popup'
import { isValidEmail } from '../utils'
import { containsBadWords } from '../utils/filter'
import './account.scss'

const Register = () => {
	const [displayName, setDisplayName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [cPassword, setCPassword] = useState('')
	const [dispErr, setDispErr] = useState('')
	const [dispClass, setDispClass] = useState('row')
	const [emailErr, setEmailErr] = useState('')
	const [emailClass, setEmailClass] = useState('row')
	const [passwordErr, setPasswordErr] = useState('')
	const [passwordClass, setPasswordClass] = useState('row')
	const [cpassErr, setcPassErr] = useState('')
	const [cpassClass, setCpassClass] = useState('row')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [showPopup, setShowPopup] = useState(false)
	const [popupMessage, setPopupMessage] = useState('')

	const handleChange = (e) => {
    switch(e.target.name) {
    	case 'displayname':
			  if(e.target.value.length > 30) {
				  break
			  }
      	setDisplayName(e.target.value)
        break
      case 'email':
        setEmail(e.target.value)
        break
      case 'password':
        setPassword(e.target.value)
        break
      case 'ccpassword':
        setCPassword(e.target.value)
        break
      default:
    	}
	}

	const handleSubmit = (e) => {
    	e.preventDefault()
    	if(!validate()) {
      		return
    	} else {
			  setIsSubmitting(true)
      	fetch(process.env.REACT_APP_API_BASE + 'register', {
        	method: 'POST',
        	body: JSON.stringify({DisplayName: displayName, Email: email, Password: password}),
        	headers: {
        		'Content-Type': 'application/json'
      		}
      	})
      	.then(res => res.json())
      	.then(data => {
					console.log(data)
					setShowPopup(true)
					setPopupMessage(data.message)
					setIsSubmitting(false)
      		})
      	.catch(err => {
					console.log(err)
					setIsSubmitting(false)
				})
    	}
	}

	const validate = () => {
		setDispErr('')
		setEmailErr('')
		setPasswordErr('')
		setcPassErr('')
		setEmailClass('row')
		setDispClass('row')
		setPasswordClass('row')
		setCpassClass('row')

		let submit = true

		//check the email first
		if(!email.includes('@')) {
			setEmailErr(' - Email should include @')
			setEmailClass('row-err')
			submit = false
		}
		if(!isValidEmail(email)) {
			setEmailErr(' - Malformed email')
			setEmailClass('row-err')
			submit = false
		}
		if(email === '') {
			setEmailErr(' - This field is required')
			setEmailClass('row-err')
			submit = false
		}

		//check the display name
		if(displayName.length > 30) {
			setDispErr(' - Display name must be 30 characters or less')
			setDispClass('row-err')
			submit = false
		}

		let re = new RegExp('^[a-zA-Z0-9_ ]+$')
		if(!re.test(displayName)) {
			setDispErr(' - Display name invalid')
			setDispClass('row-err')
			submit = false
		}

		if(displayName.replace(/\s+/g, '') === '') {
			setDispErr(' - Display name cannot be empty')
			setDispClass('row-err')
			submit = false
		}

		if(containsBadWords(displayName)) {
			setDispErr(' - inappropriate display name')
			setDispClass('row-err')
			submit = false
		}

		//check the password and password confirmation
		//only going to check for length for now, maybe check for difficulty later
		if(password.length < 6) {
			setPasswordErr(' - Password must have a length of at least 6')
			setPasswordClass('row-err')
			submit = false
		}

		if(password !== cPassword) {
			setPasswordErr(' - Passwords must match')
			setcPassErr(' - Passwords must match')
			setCpassClass('row-err')
			setPasswordClass('row-err')
			submit = false
		}

		return submit
	}

	let content = (
		<div className='account-wrapper'>
			<React.Fragment>
				<Popup
					open={showPopup}
					onClose={() => setShowPopup(false)}>
					<div className='popup'>
						<p className='close-button' onClick={() => setShowPopup(false)}> &times; </p>
						<p> {popupMessage} </p>
					</div>
				</Popup>
	  		<div className='register-container'>
				<p name='title'> Register </p>
	    		<form
	      		onSubmit={handleSubmit}>
					  <span className='label'> Display Name </span>
					  <span className='err'> {dispErr} </span>
	      	  <input
						  type='text'
	        	  onChange={handleChange}
	        	  name='displayname'
						  value={displayName}
						  className={dispClass}/>
					  <span className='label'> Email </span>
					  <span className='err'> {emailErr} </span>
	      	  <input
						  type='text'
	        	  onChange={handleChange}
	        	  name='email'
						  className={emailClass}/>
					  <span className='label'> Password </span>
					  <span className='err'> {passwordErr} </span>
	      	  <input
	        	  onChange={handleChange}
						  type='password'
	        	  name='password'
						  className={passwordClass}/>
					  <span className='label'> Confirm Password </span>
					  <span className='err'> {cpassErr}</span>
	      	  <input
	        	  onChange={handleChange}
						  type='password'
	        	  name='ccpassword'
						  className={cpassClass}/>
	      	  <button disabled={isSubmitting}> Register </button>
					  <Link to='/login'>
						  <p className='link'> Have an account? </p>
					  </Link>
	    		</form>
	  		</div>
			</React.Fragment>
		</div>
	)
	return content
}

export default Register
