import React from 'react'
import './css/writereview.scss'

const StaticRating = props => {

  let stars = []

  for(let i = 0; i < 5; i++) {
    let styles = i < props.numStars ? { color: 'gold' } : { color: 'grey' }
    styles.fontSize = '18px'
    stars.push(
      <label
        className ={'static_star'}
        style={ styles }
        key={i}
        >
        ★
      </label>
    )
  }

  let content = (
    <div>
      {stars}
    </div>
  )

  return content
}

export default StaticRating
