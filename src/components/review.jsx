import React from 'react'
import StaticRating from './rating_static'
import './css/vendor.css'

const Review = props => {

	let content = (
    	<div className='review'>
	    	<React.Fragment>
        		<p className='review-user'> {props.user} </p>
				<span className='review-date'> {props.date} </span>
      		</React.Fragment>
      		<React.Fragment>
        		<StaticRating
          			numStars={props.numStars}/>
      		</React.Fragment>
      		<React.Fragment>
        		<p className='review-text'> {props.body} </p>
      		</React.Fragment>
      		<div>
        		<button> Useful </button>
        		<button> Not Useful </button>
      		</div>
		</div>
	)

	return content
}
export default Review
