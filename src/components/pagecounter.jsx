import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import './css/pagecounter.scss'

const PageCounter = ({count, size, vendor, setRedirect, page}) => {
	const PageItem = ({index, offset, setRedirect}) => {
		const handleOnClick = () => {
			setRedirect(<Redirect to={'/vendor/' + vendor + '/' + String(index)} push={true}/>)
		}

		return (
			<span
				className={page === index?'page-counter-curr-item':'page-counter-item'}
				onClick={page === index?null:handleOnClick}
			> {index + 1} </span>
		)
	}
	let links = []

	let i = 0
	let offset = 0

	while (count > 0) {

		links.push(
			<PageItem
				key={i}
				index={i}
				offset={offset}
				setRedirect={setRedirect}/>
		)
		offset = offset + size
		count = count - size
		i = i + 1
	}

	return (
		<div className='page-counter'>
			{links}
		</div>
	)
}

export default PageCounter
