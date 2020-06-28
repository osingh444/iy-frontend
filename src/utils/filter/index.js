import words from '../../data/bad_words.json'

export function containsBadWords(content) {
	return words.censor.some(word => content.includes(word))
}
