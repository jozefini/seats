import { useEffect } from 'react'
import { getBuilderStore } from '../store/useBuilderStore'
import { useDictionary } from './dictionary'

export function useEditorShortcuts() {
	const { __ } = useDictionary()

	/**
	 * Delete selected rows
	 *
	 * Pressing Delete or Backspace will delete all selected rows.
	 */
	useEffect(() => {
		const deleteRows = (e) => {
			const { isFocused, selectedRows, updateStates } = getBuilderStore((s) => ({
				isFocused: s.isEditorFocused,
				selectedRows: s.selectedRows,
				updateStates: s.updateStates,
			}))

			const isDelete = e.key === 'Delete' || e.key === 'Backspace'
			if (!isDelete || !isFocused) {
				return // Do nothing.
			}

			e.preventDefault()

			// Prompt the user to confirm the deletion.
			if (!window.confirm(__('prompt.deleteRows'))) {
				return // Do nothing.
			}

			// Delete all selected rows
			const newRows = getBuilderStore().rows.filter((row) => !selectedRows.includes(row.id))
			updateStates({ rows: newRows, selectedRows: [] })
		}

		window.addEventListener('keydown', deleteRows)
		return () => {
			window.removeEventListener('keydown', deleteRows)
		}
	}, [getBuilderStore])

	/**
	 * Select all rows
	 *
	 * Pressing Ctrl+A or Cmd+A will select all rows.
	 */
	useEffect(() => {
		const selectAllRows = (e) => {
			const { isFocused, rows, updateStates } = getBuilderStore((s) => ({
				isFocused: s.isEditorFocused,
				rows: s.rows,
				updateStates: s.updateStates,
			}))
			l

			const isSelectAll = (e.ctrlKey || e.metaKey) && e.key === 'a'
			if (!isSelectAll || !isFocused) {
				return // Do nothing.
			}

			e.preventDefaut()

			// Select all rows
			updateStates({ selectedRows: rows.map((row) => row.id) })
		}

		window.addEventListener('keydown', selectAllRows)
		return () => {
			window.removeEventListener('keydown', selectAllRows)
		}
	}, [getBuilderStore])
}
