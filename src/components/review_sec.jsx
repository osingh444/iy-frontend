import React from 'react'
import Review from './review'

const ReviewSection = props => {
	let content = (
    	<React.Fragment>
      		{props.reviews.map((review) =>
        		<Review
          			key={review.ReviewID}
								id={review.ReviewID}
          			body={review.ReviewText}
          			user={review.Reviewer}
								numStars={review.NumStars}
								date={review.CreatedAt}
								vendor={props.vendor}
								reviewerID={review.ReviewerID}
								setShowPopup={props.setShowPopup}
          		/>)
      		}
    	</React.Fragment>
	)

	return content
}

export default ReviewSection
