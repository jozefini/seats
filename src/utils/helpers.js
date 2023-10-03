/**
 * Returns a string of class names.
 *
 * @param {...string} args - The class names.
 * @returns {string} - The string of class names.
 */
export function cn(...args) {
	return args.filter(Boolean).join(' ')
}

/**
 * Creates an array with a range of numbers.
 *
 * @param {number} min - The minimum number.
 * @param {number} max - The maximum number.
 * @returns {number[]} - The array of numbers.
 */
export function createNumericArray(min = 0, max = 10) {
	const length = max - min + 1

	return Array.from({ length }, (_, i) => i + min)
}
