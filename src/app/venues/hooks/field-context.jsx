import { useContext } from 'react'
import { FieldContext } from '../context/field'

export function useFieldContext() {
	return useContext(FieldContext)
}
