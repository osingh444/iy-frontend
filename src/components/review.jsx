import React, {useState} from 'react'
import {Redirect, Link} from 'react-router-dom'
import StaticRating from './rating_static'
import {getCookie} from '../utils'
import './css/vendor.scss'

const Review = props => {
	const [isEdit, setIsEdit] = useState(false)
	const [toUser, setToUser] = useState(null)

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

	let content = (
    <div className='review'>
	   	<React.Fragment>
      	<span onClick={() => setToUser(props.reviewerID)} className='review-user'> {props.user} </span>
				<span className='review-date'> {props.date} </span>
    	</React.Fragment>
    	<React.Fragment>
      	<StaticRating
        	numStars={props.numStars}/>
    	</React.Fragment>
    	<React.Fragment>
      	<p className='review-text'> {props.body} </p>
    	</React.Fragment>
    	<React.Fragment>
				{props.reviewerID === getCookie('id')?footer:report}
			</React.Fragment>
		</div>
	)

	return content
}
export default Review
