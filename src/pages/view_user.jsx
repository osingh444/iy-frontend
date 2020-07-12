import React, { useEffect, useState } from 'react'
import ReviewSection from '../components/review_sec'
import { Link } from 'react-router-dom'
import './user.scss'

const ViewUser = ({match, location}) => {

	const [isLoaded, setIsLoaded] = useState(false)
	const [reviews, setReviews] = useState([])

	useEffect(() => {
		fetch(process.env.REACT_APP_API_BASE + 'userreviews?u=' + String(match.params.userID))
		.then(res => res.json())
		.then(data => {
			let newrevs = []
			for (let i = 0; i < data.reviews.length; i++) {
				newrevs.push(data.reviews[i])
			}
			setReviews(newrevs)
		})
		.then(setIsLoaded(true))
		.catch(err => console.log(err))
	}, [])

	let content

	if(isLoaded) {
		content = (
			<div className='viewuser-container'>
				<div>
					<ReviewSection reviews={reviews}/>
				</div>
			</div>
		)
	} else if(!isLoaded) {
		content = (
			<p>loading...</p>
		)
	}

	return content
}

export default ViewUser
