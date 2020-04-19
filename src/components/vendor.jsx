import React, { useEffect, useState } from 'react'
import ReviewSection from './review_sec'
import VendorSummary from './vendorsummary'
import { Link } from 'react-router-dom'
import './css/vendor.css'

const Vendor = ({match, location}) => {

	//handle the 0 review case
	const [isLoaded, setIsLoaded] = useState(false)
	const [exists, setExists] = useState(true)
	const [reviews, setReviews] = useState([])

	useEffect(() => {
		fetch(process.env.REACT_APP_API_BASE + 'vendor/' + match.params.vendorID)
		.then(res => res.json())
		.then(data => {
			//case where the vendor does not exist, want to display vendor not exist page
			if(!data.exists) {
				setExists(false)
			}
			let newrevs = []
			for (let i = 0; i < data.reviews.length; i++) {
				newrevs.push(data.reviews[i])
			}
			setReviews(newrevs)
		})
		.then(setIsLoaded(true))
		.catch(err => console.log(err))
	}, [])

	let revlink = "/writereview?v=" + match.params.vendorID

	let content

	if(isLoaded) {
		content = (
	    	<div className='vendor-container'>
				<div className='summary-container'>
	        		<VendorSummary vname={match.params.vendorID}/>
	      		</div>
				<div className='vendor-button-container'>
					<Link to={revlink}>
						<button> Write a Review </button>
					</Link>
	          		<button> Add Photo </button>
	      			<button> Share </button>
	      			<button> Save </button>
				</div>
	      		<div className='review-section-container'>
	        		<ReviewSection reviews={reviews}/>
	      		</div>
			</div>
		)
	} else if(!isLoaded) {
		content = (
			<p> loading... </p>
		)
	}

	if(!exists) {
		content = (
			<div className='dne-container'>
				<h3> Vendor not found </h3>
				<p> The vendor you are looking for either has not been added to our site or does not exist</p>
				<Link to='/addvendor'>
					<span> Add vendor to the site </span>
				</Link>
			</div>
		)
	}

	return content
}

export default Vendor
