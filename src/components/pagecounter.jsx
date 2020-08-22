import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

const PageCounter = ({count, size, vendor, setRedirect}) => {
	const PageItem = ({index, offset, setRedirect}) => {
		const handleOnClick = () => {
			setRedirect(<Redirect to={'/vendor/' + vendor + '/' + String(index)} push={true}/>)
		}

		return (
			<span
				onClick={handleOnClick}
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
		<div>
			{links}
		</div>
	)
}

export default PageCounter
