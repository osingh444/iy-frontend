import React, { useState } from 'react'
import Popup from 'reactjs-popup'
import popupStyles from '../styles/popup'
import { isValidIG } from '../utils'
import '../components/css/vendor.scss'

const AddVendor = props => {

	const [vendorName, setVendorName] = useState('')
	//the row and row err classes being used here are actually located in login-register.css
	const [ipclass, setIpClass] = useState('row')
	const [err, setErr] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [body, setBody] = useState(null)
	const [showPopup, setShowPopup] = useState(false)
	const [popupMessage, setPopupMessage] = useState(null)

	const handleSubmit = (e) => {
		setIsSubmitting(true)
    e.preventDefault()
		if(!validate()) {
			setIsSubmitting(false)
			return
		}
		let igbase = "https://www.instagram.com/"

		fetch(igbase + vendorName)
		.then(res => {
			if(res.status !== 200) {
				if(res.status === 404) {
					setErr(' - no account found')
					setIpClass('row-err')
					setBody('f')
					setIsSubmitting(false)
				}
				throw 'finish'
			}
			return res.text()
		})
		.then(data => {
			fetch(process.env.REACT_APP_API_BASE + 'addvendor', {
				method: 'POST',
				body: JSON.stringify({IGName: vendorName, Page: data}),
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
		})
		.catch(err => console.log(err))
	}

	const validate = () => {
		setErr('')
		setIpClass('row')

		if(!isValidIG(vendorName)) {
			setErr(' - invalid instagram username')
			setIpClass('row-err')
			return false
		}

		return true
	}

	let content = (
		<React.Fragment>
			<Popup
				contentStyle={popupStyles}
				open={showPopup}
				onClose={() => setShowPopup(false)}>
				<div className='popup'>
					<p className='close-button' onClick={() => setShowPopup(false)}> &times; </p>
					<p> {popupMessage} </p>
				</div>
			</Popup>
    	<div className='addvendor-container'>
			<p name='title'> Add Vendor </p>
				<form
					onSubmit={handleSubmit}>
				<span className='label'> Instagram Name </span>
				<span className='err'> {err} </span>
    			<input
					type='text'
					className={ipclass}
					onChange={(e) => setVendorName(e.target.value)}/>
      			<button disabled={isSubmitting}> Add Vendor </button>
			</form>
    	</div>
		</React.Fragment>
	)

	return content
}

export default AddVendor
