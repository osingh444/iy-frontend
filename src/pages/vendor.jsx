import React, { useEffect, useState } from 'react'
import ReviewSection from '../components/review_sec'
import VendorSummary from '../components/vendorsummary'
import { Link } from 'react-router-dom'
import Popup from 'reactjs-popup'
import reportReasons from '../data/report_reasons.json'
import '../components/css/vendor.scss'

const Vendor = ({match, location}) => {

	//handle the 0 review case
	const [isLoaded, setIsLoaded] = useState(false)
	const [exists, setExists] = useState(true)
	const [reviews, setReviews] = useState([])
	const [showPopup, setShowPopup] = useState(false)
	const [reason, setReason] = useState(null)
	const [reportID, setReportID] = useState(null)
	const [reviewerID, setReviewerID] = useState(null)

	useEffect(() => {
		fetch(process.env.REACT_APP_API_BASE + 'vendor?v=' + String(match.params.vendorID))
		.then(res => res.json())
		.then(data => {
			console.log(data)
			//case where the vendor does not exist, want to display vendor not exist page
			if(data.status !== 200) {
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
	console.log(reviews)
	const sendReport = (e) => {
		e.preventDefault()

		fetch(process.env.REACT_APP_API_BASE + 'addreport', {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify({ReviewID: reportID, ReviewerID: reviewerID, VendorName: String(match.params.vendorID)} ),
			headers: {
        	'Content-Type': 'application/json'
      		}
		})
		.then(res => res.json())
		.then(data => console.log(data))
		.catch(err => console.log(err))
	}

	let revlink = "/writereview?v=" + match.params.vendorID

	let content

	if(isLoaded) {
		content = (
			<React.Fragment>
				<Popup
					open={showPopup}
					onClose={() => setShowPopup(false)}>
					<div className='popup'>
						<label htmlFor='reason'> Select reason for report </label>
						<select
							id='reason'
							onChange={(e) => setReason(e.target.value)}>
							{reportReasons.reasons.map(item => (
								<option
									key={item}
									value={item}>
									{item}
								</option>
							))}
						</select>
					  <p className='close-button' onClick={() => setShowPopup(false)}> &times; </p>
						<button onClick={(e) => sendReport(e)}> Submit </button>
					</div>
				</Popup>
	    	<div className='vendor-container'>
					<div>
						<div className='summary-container'>
			      	<VendorSummary vname={match.params.vendorID}/>
			      </div>
						<div className='vendor-button-container'>
							<Link to={revlink}>
								<button> Write a Review </button>
							</Link>
						</div>
	      		<div className='review-section-container'>
	        		<ReviewSection
								reviews={reviews}
								vendor={String(match.params.vendorID)}
								setShowPopup={setShowPopup}
								setReportID={setReportID}
								setReviewerID={setReviewerID}/>
	      		</div>
					</div>
				</div>
			</React.Fragment>
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
