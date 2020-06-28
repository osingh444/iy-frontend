import React, { useState } from 'react'
import Popup from '../components/popup'
import { isValidIG } from '../utils'
import '../components/css/vendor.scss'

const AddVendor = props => {

	const [vendorName, setVendorName] = useState('')
	//the row and row err classes being used here are actually located in login-register.css
	const [ipclass, setIpClass] = useState('row')
	const [err, setErr] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [popup, setPopup] = useState(null)
	const [body, setBody] = useState(null)

	const handleSubmit = (e) => {
		setPopup(null)
		setIsSubmitting(true)
    e.preventDefault()

		let igbase = "https://www.instagram.com/"

		fetch(igbase + vendorName)
		.then(res => {
			if(res.status !== 200) {
				if(res.status === 404) {
					setErr(' - no account found')
					setIpClass('row-err')
					setBody('f')
				}
				throw 'finish'
			}
			return res.text()
		})
		.then(data => {
			setBody(data)
			if(!validate()) {
				setIsSubmitting(false)
				throw 'finish'
			}

			fetch(process.env.REACT_APP_API_BASE + 'addvendor', {
				method: 'POST',
				body: JSON.stringify({IGName: vendorName, Body: body}),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then(res => res.json())
			.then(data => {
				console.log(data)
				if(data.Add) {
					setPopup(<Popup title={'Success'} body={'Vendor added'}/>)
				} else {
					setPopup(<Popup body={data.Msg}/>)
				}
			})
			.catch(err => {console.log(err)})
		})
		.catch(err => console.log(err))


		setIsSubmitting(false)
	}

	const validate = () => {
		setErr('')
		setIpClass('row')

		if(!isValidIG(vendorName)) {
			setErr(' - invalid instagram username')
			setIpClass('row-err')
			return false
		}
		
		if(body === null) {
			setErr(' - connection error')
			setIpClass('row-err')
			return false
		}
		return true
	}

	let content = (
		<React.Fragment>
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
		{popup}
		</React.Fragment>
	)

	return content
}

export default AddVendor
