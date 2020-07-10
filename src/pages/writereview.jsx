import React, { useState, useEffect } from 'react'
import DynamicRating from '../components/rating_dynamic'
import RatingContext from '../contexts/ratingcontext'
import Popup from 'reactjs-popup'
import { containsBadWords } from '../utils/filter'
const queryString = require('query-string')

const WriteReview = (props) => {
	const [numStars, setNumStars] = useState(null)
	const [tempStars, setTempStars] = useState(0)
	const [review, setReview] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [showPopup, setShowPopup] = useState(false)
	const [popupMessage, setPopupMessage] = useState('')

	useEffect(() => {
		if(props.location.state && props.location.state.text) {
			setReview(props.location.state.text)
		}
		if(props.location.state && props.location.state.numStars) {
			setNumStars(props.location.state.numStars)
		}
	}, [])

	const handleChange = (e) => {
    	setReview(e.target.value)
  	}

	const handleSubmit = (e) => {
    	e.preventDefault()
			setIsSubmitting(true)

		if(!validate()) {
			setIsSubmitting(false)
			return
		}

		const parsed = queryString.parse(props.location.search)
		fetch(process.env.REACT_APP_API_BASE + 'createreview', {
			method: 'POST',
			body: JSON.stringify({numStars: numStars, reviewText: review, vendorName: parsed.v}),
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(res => res.json())
		.then(data => {
			setPopupMessage(data.message)
			setShowPopup(true)
			setIsSubmitting(false)
		})
		.catch(err => {
			setIsSubmitting(false)
			console.log(err)})
  }

	const validate = () => {
		if(containsBadWords(review)) {
			setShowPopup(true)
			setPopupMessage('Review contains inappropriate language, please modify your review')
			return false
		}
		return true
	}

	let content = (
		<React.Fragment>
			<Popup
				open={showPopup}
				onClose={() => setShowPopup(false)}>
				<div className='popup'>
					<p className='close-button' onClick={() => setShowPopup(false)}> &times; </p>
					<p> {popupMessage} </p>
				</div>
			</Popup>
    	<div>
      	<React.Fragment>
        	<RatingContext.Provider value={{ numStars, setNumStars, tempStars, setTempStars }}>
          	<DynamicRating/>
        	</RatingContext.Provider>
      	</React.Fragment>
      	<React.Fragment>
        	<textarea
          	name='review'
          	className='review_box'
        		rows='15'
        		autoComplete='off'
        		placeholder='your review helps others make purchase decisions'
        		value={review}
        		onChange={handleChange}
        		style={{resize: 'none', width: '80%', height: '5%'}}>
        	</textarea>
      	</React.Fragment>
    		<br/>
      	<button className='post_button' disabled={isSubmitting} onClick={handleSubmit}> Post Review </button>
			</div>
		</React.Fragment>
	)

	return content
}

export default WriteReview
