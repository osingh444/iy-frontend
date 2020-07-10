import React from 'react'
import './css/search.scss'

const Search = () => {

	let content = (
    <div className='search-container'>
      <div className='input-wrapper'>
        <input
					name='search'
					placeholder='Search'
					type='text'
					className='search'/>
      </div>
      <button
        onClick={() => alert('searched')}> &#x1F50E; </button>
		</div>
	)

	return content
}


export default Search
