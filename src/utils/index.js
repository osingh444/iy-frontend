//not going to exhaustively check what determines a valid email
//because it is hard and there are a lot of potential email addresses
//just going to check for basic pattern of stuff@stuff.stuff
export function isValidEmail(str) {
	let arr = str.split('@')
	if(arr.length !== 2) {
		return false
	}

	if(arr[0].length === 0) {
		return false
	}

	//split the second part again
	let arr2 = str.split('.')

	if(arr2.length !== 2) {
		return false
	}

	if(arr2[0].length === 0 || arr2[1].length === 0) {
		return false
	}

	return true
}

export function getCookie(name) {
	let cstr = '; ' + document.cookie
	let parts = cstr.split('; ' + name + '=')
	if (parts.length === 2) {
		let p2 = parts[1].split(';')
		return p2[0]
	}
	return null
}

export function isValidIG(str) {
	if(str.length > 30 || str.length === 0) {
		return false
	}

	if(str[0] === '.'|| str[str.length - 1] === '.') {
			return false
	}

	let re = new RegExp('^[a-z0-9_.]+$')

	for(let i = 0; i < str.length; i++) {
		if(!re.test(str[i])) {
			return false
		}

		if(i < str.length) {
			if(str[i] === '.' && str[i + 1] === '.') {
				return false
			}
		}
	}

	return true
}

export function unixTimeToMMDDYYYY(unixTime) {
	let date = new Date(unixTime * 1000)
	return date.toISOString().slice(0, 10)
}
