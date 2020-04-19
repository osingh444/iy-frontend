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
