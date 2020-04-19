import React from 'react'
import Review from './review'

const ReviewSection = props => {
	let content = (
    	<React.Fragment>
      		{props.reviews.map((review) =>
        		<Review
          			key={review.reviewerEmail + review.date}
          			body={review.reviewText}
          			user={review.reviewerName}
					numStars={review.numStars}
					date={review.date}
          		/>)
      		}
    	</React.Fragment>
	)

	return content
}

export default ReviewSection
