import React, { useContext } from 'react'
import RatingContext from '../contexts/ratingcontext'
import './css/writereview.css'

const DynamicRating = props => {

  const { numStars, setNumStars, tempStars, setTempStars } = useContext(RatingContext)

  let stars = []

  const rate = (rating) => {
    setNumStars(rating)
    setTempStars(rating)
  }

  const setTemp = (rating) => {
    setTempStars(numStars)
    setNumStars(rating)
  }

  const undoTemp = () => {
    setNumStars(tempStars)
  }

  for(let i = 0; i < 5; i++) {
    let styles = i < numStars ? { color: 'gold' } : { color: 'grey' }
    styles.fontSize = '50px'

    stars.push(
      <label
        key={i}
        style={styles}
        onMouseOver={() => setTemp(i + 1)}
        onMouseOut={undoTemp}
        onClick={() => rate(i + 1)}
        className={"dyn_star"}
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

export default DynamicRating
