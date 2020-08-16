import React from 'react'
import Review from './review'

const ReviewSection = props => {
	let content = (
    	<React.Fragment>
      		{props.reviews.map((r) =>
        		<Review
          			key={r.Review.ReviewID}
								id={r.Review.ReviewID}
          			body={r.Review.ReviewText}
          			user={r.Review.Reviewer}
								numStars={r.Review.NumStars}
								date={r.Review.CreatedAt}
								vendor={props.vendor}
								reviewerID={r.Review.ReviewerID}
								setShowPopup={props.setShowPopup}
								setReportID={props.setReportID}
								setReviewerID={props.setReviewerID}
          		/>)
      		}
    	</React.Fragment>
	)

	return content
}

export default ReviewSection
