import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { shallow } from 'zustand/shallow'
import { CURSOR_TYPES, SELECTION_TYPES } from '../utils/contants'

const ACTIONS = {
	ADD_ROW: 'ADD_ROW',
	ADD_SEAT: 'ADD_SEAT',
	REMOVE_ROW: 'REMOVE_ROW',
	REMOVE_SEAT: 'REMOVE_SEAT',
	DRAG_ROW: 'DRAG_ROW',
}

const initialStates = {
	// Cursor.
	cursor: CURSOR_TYPES.DEFAULT,

	// Selection.
	isSelecting: false,
	selectionType: SELECTION_TYPES.SEAT,
	selectedSeat: null,
	selectedSeats: [],
	selectedRow: null,
	selectedRows: [],

	// History.
	history: [],
	historyIndex: -1,
}

const builderStore = create(
	immer((set, get) => ({
		...initialStates,
		selectElement: (id) => {
			set((draft) => {
				if (get().selectionType === SELECTION_TYPES.ROW) {
					draft.selectedRow = id
					if (!draft.selectedRows.includes(id)) {
						draft.selectedRows.push(id)
					}
				} else {
					draft.selectedSeat = id
					if (!draft.selectedSeats.includes(id)) {
						draft.selectedSeats.push(id)
					}
				}
			})
		},
		changeSelectionType: (type) => {
			// If the type is not valid or is the same as the current one, do nothing.
			if (!SELECTION_TYPES.hasOwnProperty(type) || type === get().selectionType) {
				return false
			}

			set((draft) => {
				draft.selectionType = type

				// Reset any existing selection.
				if (type === SELECTION_TYPES.ROW) {
					draft.selectedSeat = null
					draft.selectedSeats = []
				} else {
					draft.selectedRow = null
					draft.selectedRows = []
				}
			})
		},
		addToHistory: (action, data) => {
			set((draft) => {
				// We add the action to the history.
				const time = new Date().getTime()
				draft.history.push({ action, data, time })

				// If history index is not at the end, we remove all the actions after the current index but keep the last one.
				const historyEndIndex = draft.history.length - 1
				if (draft.historyIndex < historyEndIndex) {
					draft.history.splice(draft.historyIndex + 1, historyEndIndex - draft.historyIndex)
				}

				// We set the history index to the end.
				draft.historyIndex = historyEndIndex
			})
		},
		undoChanges: () => {
			set((draft) => {
				if (draft.historyIndex > -1) {
					const { action, data } = draft.history[draft.historyIndex]

					// Based on the action, we undo the changes.
					switch (action) {
						case ACTIONS.ADD_ROW:
							draft.rows = draft.rows.filter((row) => row.id !== data.id)
							break
						default:
							break
					}
					draft.historyIndex--
				}
			})
		},
		redoChanges: () => {},
		resetStore: () => set({ ...initialStates }),
	})),
)

export const useBuilderStore = (select) => builderStore(select, shallow)
