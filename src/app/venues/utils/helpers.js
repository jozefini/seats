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
 * Check if the object has the key.
 * @param {*} obj - The object to check.
 * @param {string} key - The key to check.
 * @returns {boolean} - True if the object has the key, false otherwise.
 */
export const hasOwnKey = (obj, key) => {
	return getType(obj) === 'object' && Object.prototype.hasOwnProperty.call(obj, key)
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
 * Get the offset of the curve.
 * @param {number} maxOffset - The maximum offset.
 * @param {number} current - The current index.
 * @param {number} total - The total number of items.
 * @returns {number} - The offset of the curve.
 */
export function getCurveOffset(current, total, maxOffset = 20) {
	const middle = total / 2
	const ratio = Math.pow(Math.abs(middle - current) / middle, 1.25)
	const offset = maxOffset * Math.cos((ratio * Math.PI) / 2)
	return Math.round(offset * 100) / 100
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
