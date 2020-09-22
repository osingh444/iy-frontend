import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import './css/search.scss'

const Search = () => {
	const [vendor, setVendor] = useState('')

	let content = (
    <div className='search-container'>
      <div className='input-wrapper'>
        <input
					name='search'
					placeholder='Search'
					type='text'
					className='search'
					onChange={(e) => setVendor(e.target.value)}/>
      </div>
			<Link to={'/vendor/' + vendor}>
      	<button style={{'height': '30px'}}> &#x1F50E; </button>
			</Link>
		</div>
	)

	return content
}


export default Search
