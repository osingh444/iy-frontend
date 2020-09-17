import React, {useState, useEffect} from 'react'
import {Redirect, Link} from 'react-router-dom'
import StaticRating from './rating_static'
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import {getCookie, unixTimeToMMDDYYYY} from '../utils'
import './css/vendor.scss'

const Review = (props) => {
	const [isEdit, setIsEdit] = useState(false)
	const [toUser, setToUser] = useState(null)
	const [media, setMedia] = useState([])

	useEffect(() => {
		let newMedia = []
		if (props.media.S3URL1 !== '') {
			newMedia.push(props.media.S3URL1)

			if (props.media.S3URL2 !== '') {
				newMedia.push(props.media.S3URL2)

				if (props.media.S3URL3 !== '') {
					newMedia.push(props.media.S3URL3)
				}
			}
		}
		setMedia(newMedia)
	}, [])

	const handleDelete = () => {
		fetch(process.env.REACT_APP_API_BASE + 'deletereview?rid=' + String(props.id) + '&v=' + String(props.vendor), {
			method: 'DELETE',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(res => res.json())
		.then(data => console.log(data))
		.catch(err => console.log(err))
	}

	const handleReport = () => {
		props.setShowPopup(true)
		props.setReportID(String(props.id))
		props.setReviewerID(String(props.reviewerID))
	}

	if(isEdit) {
		return <Redirect
			to={{
				pathname: '/writereview',
				search: '?v=' + String(props.vendor),
				state: {text: props.body, numStars: props.numStars}
				}}
			push={true}
		/>
	}

	if(toUser) {
		return <Redirect
			to={'/user/' + String(toUser)}
			push={true}
		/>
	}

	let footer = (
		<div className='review-footer'>
			<span onClick={() => handleDelete()}> Delete </span>
			<span onClick={() => setIsEdit(true)}> Edit </span>
		</div>
	)

	let report = (
		<div className='review-footer-report'>
			<span onClick={() => handleReport()}> Report </span>
		</div>
	)
	console.log(props.media)

	let gallery = (
		media.length===0?null:
		<div className='slider-container'>
			<AwesomeSlider transitionDelay={0}>
				{media.map((url) =>
					<div className='image-container'>
						<img src={url}/>
					</div>)}
			</AwesomeSlider>
		</div>
	)

	let content = (
    <div className='review'>
	   	<div>
      	<span onClick={() => setToUser(props.reviewerID)} className='review-user'> {props.user} </span>
				<span className='review-date'> {String(props.date).slice(0, 10)} </span>
    	</div>
    	<div>
      	<StaticRating
        	numStars={props.numStars}/>
    	</div>
    	<div>
      	<p className='review-text'> {props.body} </p>
    	</div>
			<div>
				{gallery}
			</div>
    	<div>
				{props.reviewerID === getCookie('id')?footer:report}
			</div>
		</div>
	)

	return content
}
export default Review
