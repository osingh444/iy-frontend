import React, { useRef, useEffect, useContext } from "react"
import PopupContext from '../contexts/popupcontext'
import './css/popup.scss'

function useOutsideAlerter(ref, setShow) {
	function handleClickOutside(event) {
		if (ref.current && !ref.current.contains(event.target)) {
      		setShow(false)
		}
	}

	useEffect(() => {
    	document.addEventListener("mousedown", handleClickOutside);
    	return () => {
      		document.removeEventListener("mousedown", handleClickOutside);
    	}
  	})
}

export default function OutsideAlerter(props) {
	const wrapperRef = useRef(null)
	const { setShow } = useContext(PopupContext)
	useOutsideAlerter(wrapperRef, setShow)
	return <div className='innerp' style={props.style} ref={wrapperRef}>{props.children}</div>
}
