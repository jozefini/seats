import { useEffect } from 'react'
import { getBuilderStore } from '../store/useBuilderStore'
import { useDictionary } from './dictionary'

export function useEditorShortcuts(ref) {
	const { __ } = useDictionary()

	/**
	 * Detect editor focus
	 *
	 * When the editor is focused, the user can use keyboard shortcuts.
	 */
	useEffect(() => {
		const node = ref.current
		if (!node) return // If the node is not available, do nothing.
		const updateStates = getBuilderStore((s) => s.updateStates)

		const enableFocus = (e) => {
			if (e.target === node || node.contains(e.target)) {
				updateStates({ isFocused: true })
			}
		}
		const disableFocus = (e) => {
			if (e.target === node || node.contains(e.target)) {
				updateStates({ isFocused: false })
			}
		}

		window.addEventListener('focusin', enableFocus)
		window.addEventListener('focusout', disableFocus)

		return () => {
			window.removeEventListener('focusin', enableFocus)
			window.removeEventListener('focusout', disableFocus)
		}
	}, [ref, getBuilderStore])

	/**
	 * Delete selected rows
	 *
	 * Pressing Delete or Backspace will delete all selected rows.
	 */
	useEffect(() => {
		const deleteRows = (e) => {
			const { isFocused, selectedRows, updateStates } = getBuilderStore((s) => ({
				isFocused: s.isFocused,
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
	}, [__, getBuilderStore])

	/**
	 * Select all rows
	 *
	 * Pressing Ctrl+A or Cmd+A will select all rows.
	 */
	useEffect(() => {
		const selectAllRows = (e) => {
			const { isFocused, rows, updateStates } = getBuilderStore((s) => ({
				isFocused: s.isFocused,
				rows: s.rows,
				updateStates: s.updateStates,
			}))

			const isSelectAll = (e.ctrlKey || e.metaKey) && e.key === 'a'
			if (!isSelectAll || !isFocused) {
				return // Do nothing.
			}

			e.preventDefault()

			// Select all rows
			updateStates({ selectedRows: rows.map((row) => row.id) })
		}

		window.addEventListener('keydown', selectAllRows)
		return () => {
			window.removeEventListener('keydown', selectAllRows)
		}
	}, [getBuilderStore])
}
