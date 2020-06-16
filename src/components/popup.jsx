import React, { useState, useRef, useEffect } from 'react'
import OutsideAlerter from './popup_inner'
import PopupContext from '../contexts/popupcontext'
import './css/popup.scss'

const Popup = (props) => {
	let [show, setShow] = useState(true)

	const innerWapper = () => {
		setShow(false)
		if(props.func && typeof props.func === 'function') {
			props.func()
		}
	}

	let innercontent = (
		<React.Fragment>
			{props.title}
			{props.body}
			<button name='inner' onClick={innerWapper}> Okay </button>
		</React.Fragment>
	)

	let component = (
		<div className='popup-outer'>
			<PopupContext.Provider value={{ show, setShow }}>
				<OutsideAlerter children={innercontent}/>
			</PopupContext.Provider>
		</div>
	)

	if(!show) {
		component = null
	}

	return component
}

export default Popup
