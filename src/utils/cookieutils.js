export function getCookie(name) {
	let cstr = '; ' + document.cookie
	let parts = cstr.split('; ' + name + '=')
	if (parts.length === 2) {
		let p2 = parts[1].split(';')
		return p2[0]
	}
	return null
}
