import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { shallow } from 'zustand/shallow'
import { CURSOR_TYPES, GRID_LAYOUT } from '../utils/contants'
import { getType } from '../utils/helpers'

const ACTIONS = {
	ADD_ROW: 'ADD_ROW',
	ADD_SEAT: 'ADD_SEAT',
	REMOVE_ROW: 'REMOVE_ROW',
	REMOVE_SEAT: 'REMOVE_SEAT',
	DRAG_ROW: 'DRAG_ROW',
}

const createTestSeats = (rowId, seatsCount) => {
	let seats = []
	let number = 1
	for (let i = 0; i < seatsCount; i++) {
		const isEmpty = [21, 22, 23, 24, 5, 6, 7].includes(i)
		seats.push({
			id: `${rowId}-${i + 1}`,
			reserved: false,
			number: isEmpty ? '' : number,
			type: isEmpty ? 'empty' : 'default',
		})
		if (!isEmpty) {
			number++
		}
	}
	return seats
}

const initialStates = {
	// Cursor.
	cursor: CURSOR_TYPES.DEFAULT,

	// Grid.
	gridSize: 10, // in pixels
	gridLayout: GRID_LAYOUT.DOT,
	gridOpacity: 0.2,
	editorY: 0,
	editorX: 0,
	editorWidth: 0,
	editorHeight: 0,

	// Seats.
	seatSize: 2, // in width percentage
	spaceBetweenSeats: 0.1, // in em

	// Tracking.
	mouseY: 0,
	mouseX: 0,

	// Selection.
	isSelecting: false,
	selectedSeats: [],
	selectedRows: [],
	startMouseY: 0,
	startMouseX: 0,
	endMouseY: 0,
	endMouseX: 0,

	// Rows data.
	rows: [
		{
			id: 'a-1',
			label: 'Row 1',
			price: 0,
			defaultPrice: 0,
			editor: { x: 10, y: 20 },
			reversed: false,
			beginWithSeatNumber: 1,
			seats: createTestSeats('a-1', 40),
		},
	],

	// History.
	history: [],
	historyIndex: -1,
}

const builderStore = create(
	immer((set, get) => ({
		...initialStates,
		select: (rowId, seatId) => {
			if (!rowId) return false

			set((draft) => {
				if (!draft.selectedRows.includes(rowId)) {
					draft.selectedRows.push(rowId)
				}
				if (seatId && !draft.selectedSeats.includes(seatId)) {
					draft.selectedSeats.push(seatId)
				}
			})
		},
		unselect: (rowId, seatId) => {
			if (!rowId) return false

			set((draft) => {
				if (!seatId) {
					draft.selectedRows = draft.selectedRows.filter((selectedRowId) => selectedRowId !== rowId)
				} else {
					const newSelectedSeats = draft.selectedSeats.filter(
						(selectedSeatId) => selectedSeatId !== seatId,
					)
					draft.selectedSeats = newSelectedSeats

					// After all seats are unselected, we remove the row from the selected rows.
					if (!newSelectedSeats.length) {
						draft.selectedRows = draft.selectedRows.filter(
							(selectedRowId) => selectedRowId !== rowId,
						)
					}
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
		updateStates: (states) =>
			set((draft) => {
				// If the states are not an object, do nothing.
				if (getType(states) !== 'object') {
					return false
				}

				// Filter all the states that are not in the initial states.
				const filteredStates = Object.keys(states).filter((key) =>
					initialStates.hasOwnProperty(key),
				)

				// Update the states.
				filteredStates.forEach((key) => {
					draft[key] = states[key]
				})
			}),
		resetStore: () => set({ ...initialStates }),
	})),
)

export const getBuilderStore = (select) => {
	const states = builderStore.getState()
	return select ? select(states) : states
}
export const useBuilderStore = (select) => builderStore(select, shallow)
