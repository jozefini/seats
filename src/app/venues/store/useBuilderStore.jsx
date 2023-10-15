import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { shallow } from 'zustand/shallow'
import { CURSOR_TYPES, GRID_LAYOUT } from '../utils/contants'
import { getType } from '../utils/helpers'

const createTestSeats = (rowId, seatsCount) => {
	let seats = []
	let number = 1
	for (let i = 0; i < seatsCount; i++) {
		const isEmpty = [].includes(i)
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
	// Editor.
	cursor: CURSOR_TYPES.DEFAULT,
	isFocused: false,
	editorY: 0,
	editorX: 0,
	editorWidth: 0,
	editorHeight: 0,
	gridSize: 20, // in pixels
	gridLayout: GRID_LAYOUT.NONE,
	gridOpacity: 0.2,

	// Seats.
	seatSize: 20, // in pixels
	spaceBetweenSeats: 2, // in pixels

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

	// Dragging.
	isDragging: false,

	// Rows data.
	rows: [
		{
			id: 'a-1',
			label: 'Row 1',
			price: 0,
			defaultPrice: 0,
			editor: { x: 10, y: 10, curve: 0 },
			reversed: false,
			beginWithSeatNumber: 1,
			seats: createTestSeats('a-1', 40),
		},
		{
			id: 'b-1',
			label: 'Row 2',
			price: 0,
			defaultPrice: 0,
			editor: { x: 10, y: 50, curve: 20 },
			reversed: false,
			beginWithSeatNumber: 1,
			seats: createTestSeats('b-1', 40),
		},
	],

	// History.
	history: [],
	historyIndex: -1,
}

const builderStore = create(
	immer((set) => ({
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
					const rowSeatIds = draft.rows.find((row) => row.id === rowId).seats.map((seat) => seat.id)

					if (!newSelectedSeats.some((_id) => rowSeatIds.includes(_id))) {
						draft.selectedRows = draft.selectedRows.filter(
							(selectedRowId) => selectedRowId !== rowId,
						)
					}
				}
			})
		},
		addToHistory: () => {
			set((draft) => {
				// We add the action to the history.
				const time = new Date().getTime()
				const snapshot = JSON.stringify(draft.rows)
				draft.history.push({ snapshot, time })

				// If history index is not at the end, we remove all the snapshots after the current index but keep the last one.
				const historyEndIndex = draft.history.length - 1
				if (draft.historyIndex < historyEndIndex) {
					draft.history.splice(draft.historyIndex + 1, historyEndIndex - draft.historyIndex)
				}

				// Also keep the history length to 10.
				if (draft.history.length > 10) {
					draft.history.splice(0, draft.history.length - 10)
				}

				// We set the history index to the end.
				draft.historyIndex = historyEndIndex
			})
		},
		undoChanges: () => {
			// Todo: Undo the changes.
		},
		redoChanges: () => {
			// Todo: Redo the changes.
		},
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
