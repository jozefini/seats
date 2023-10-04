import { useDictionary } from '../context/venue'
import { deepAccess, getType, replacer } from './helpers'

/**
 * Get i18n text.
 *
 * @param {string} textId - The text ID.
 * @param {object} variables - The variables to replace in the text.
 * @returns {string} - The translated text.
 */
export function __(textId, variables = {}) {
	const dictionary = useDictionary()
	const text = deepAccess(dictionary, textId, '(NaN)')

	if (getType(variables) === 'object' && Object.keys(variables).length) {
		return replacer(text, variables)
	}
	return text
}
