/**
 * Join valid class names.
 *
 * @param {...string} args - The class names.
 * @returns {string} - The string of class names.
 */
export function classNames(...args) {
	return args.filter(Boolean).join(' ')
}

/**
 * Get the type of the object.
 *
 * @param {*} obj - The object to check.
 * @returns {string} - The type of the object.
 */
export const getType = (obj) => {
	return {}.toString.call(obj).slice(8, -1).toLowerCase()
}

/**
 * Replaces all occurrences of {{key}} in a string
 * with the value of the key in the pattern object.
 *
 * @param {string} text - The string to replace the keys in.
 * @param {object} pattern - The object containing the keys and values to replace.
 * @returns {string} The string with the keys replaced.
 */
export function replacer(text, pattern = {}) {
	if (!text) {
		return ''
	}
	if (!pattern || getType(pattern) !== 'object') {
		return text
	}
	return text.replace(/{{(\w+)}}/g, (_, key) => pattern[key])
}

/**
 * Get nested property from object.
 *
 * @param {object} obj - The object to access.
 * @param {string} property - The path to the property.
 * @param {*} defaultValue - The default value to return if property does not exist.
 * @returns {*} - The value of the property or the default value.
 */
export function deepAccess(obj, property = '', defaultValue = null) {
	if (!property) {
		return obj
	}
	if (getType(obj) !== 'object') {
		return defaultValue
	}

	const properties = property.split('.')
	const result = properties.reduce((acc, key) => {
		if (acc && getType(acc) === 'object' && key in acc) {
			return acc[key]
		}
		return undefined
	}, obj)

	return result !== undefined ? result : defaultValue
}
