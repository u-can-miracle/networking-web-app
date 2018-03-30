export function isValidEmail(email){
	const spec = '[!|#|\\$|%|&|\'|\\*|\\+|-|/|=|\\?|\\^|_|\{|\\||\}|~]'
	const wordsNumbers = '[a-z0-9]'
	const wordsNumbersAndSpec = wordsNumbers + '|' + spec
	// eslint-disable-next-line
	const regExp = '(' + wordsNumbersAndSpec + '){2,}@{0,}' + '(' + wordsNumbersAndSpec + '){0,}@(' + wordsNumbers + '){1,6}\\.[a-z]{2,6}'
	const re = new RegExp('^' + regExp + '$', 'i')

	const result = re.test(email)
	return Boolean(result)
}


export function isEmpty(string){
	return string.length === 0
}
