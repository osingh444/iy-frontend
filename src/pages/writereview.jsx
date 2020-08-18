import React, { useState, useEffect } from 'react'
import DynamicRating from '../components/rating_dynamic'
import RatingContext from '../contexts/ratingcontext'
import Popup from 'reactjs-popup'
import { containsBadWords } from '../utils/filter'
const queryString = require('query-string')

const MAX_FILE_SIZE = 5000000

const WriteReview = ({location}) => {
	const [numStars, setNumStars] = useState(null)
	const [tempStars, setTempStars] = useState(0)
	const [review, setReview] = useState('')
	const [photos, setPhotos] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [showPopup, setShowPopup] = useState(false)
	const [popupMessage, setPopupMessage] = useState('')

	useEffect(() => {
		if(location.state && location.state.text) {
			setReview(location.state.text)
		}
		if(location.state && location.state.numStars) {
			setNumStars(location.state.numStars)
		}
	}, [])

	const handleChange = (e) => {
		switch (e.target.name) {
			case 'review':
				setReview(e.target.value)
				break
			case 'photo':
				if(e.target.files.length > 3) {
					setPopupMessage('cannot upload more than 3 files')
					setShowPopup(true)
					return
				}
				setPhotos(e.target.files)
				break
		}
  }
	const uploadPhotos = (rID, vendor) => {
		let formData = new FormData()
		for (var i = 0; i < photos.length; i++) {
			formData.append('files[]', photos[i])
		}

		fetch(process.env.REACT_APP_API_BASE + 'addreviewphoto?rid=' + rID + '&v=' + vendor, {
			method: 'POST',
			body: formData,
			credentials: 'include',
		})
		.then(res => res.json())
		.then(data => console.log(data))
		.catch(err => console.log(err))
	}

	const handleSubmit = (e) => {
  	e.preventDefault()
		setIsSubmitting(true)

		if(!validate()) {
			setIsSubmitting(false)
			return
		}

		const parsed = queryString.parse(location.search)
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
			if(data.status === 201) {
				uploadPhotos(data.rID, String(parsed.v))
			} else {
				setPopupMessage(data.message)
				setShowPopup(true)
				setIsSubmitting(false)
			}
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
		for (let i = 0; i < photos.length; i++) {
			if (photos[i].size > MAX_FILE_SIZE) {
				setShowPopup(true)
				setPopupMessage(photos[i].name + ' exceeds maximum size of 5mb')
				return false
			}
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
				<label htmlFor="photo">Related Photos</label>
				<br/>
        <input
          id="photo"
          name="photo"
          type="file"
          accept="image/*"
					onChange={handleChange}
					multiple/>
    		<br/>
      	<button className='post_button' disabled={isSubmitting} onClick={handleSubmit}> Post Review </button>
			</div>
		</React.Fragment>
	)

	return content
}

export default WriteReview
