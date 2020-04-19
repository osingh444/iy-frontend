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
