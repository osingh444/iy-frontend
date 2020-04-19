import React from 'react'
import ReviewSection from './review_sec'

const Vendor = () => {


  let content = (
    <div>
      <div>
        <React.Fragment>
          //
        </React.Fragment>
      </div>
      <div>
        <React.Fragment>
          //search bar + navbar here
        </React.Fragment>
        <br/>
        <React.Fragment>
          //embed ig here
        </React.Fragment>
        <br/>

        <React.Fragment>
          <button> Write a Review </button>
          <button> Add Photo </button>
          <button> Share </button>
          <button> Save </button>
        </React.Fragment>

        <React.Fragment>
          <ReviewSection/>
        </React.Fragment>
      </div>
    </div>
  )

  return content
}

export default Vendor
