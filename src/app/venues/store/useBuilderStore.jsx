import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { shallow } from 'zustand/shallow'
import { CURSOR_TYPES } from '../utils/contants'
import { getType, hasOwnKey } from '../utils/helpers'

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
	newRowId: null,
	rows: [
		{
			id: 'a-1',
			label: 'Row 1',
			price: 0,
			defaultPrice: 0,
			editor: { x: 10, y: 10, curve: 0 },
			reversed: false,
			conflict: true,
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
			conflict: false,
			beginWithSeatNumber: 1,
			seats: createTestSeats('b-1', 32),
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
					const rowSeatIds = draft.rows.find((row) => row.id === rowId).seats.map((seat) => seat.id)

					if (!newSelectedSeats.some((_id) => rowSeatIds.includes(_id))) {
						draft.selectedRows = draft.selectedRows.filter(
							(selectedRowId) => selectedRowId !== rowId,
						)
					}
				}
			})
		},
		addSnapshot: () => {
			set((draft) => {
				// We add the action to the history.
				const time = new Date().getTime()
				const snapshot = JSON.stringify(draft.rows)

				// If the history index is not the last one, we remove all the snapshots after the current index.
				if (draft.historyIndex !== draft.history.length - 1) {
					draft.history = draft.history.slice(0, draft.historyIndex + 1)
				}

				// We add the new snapshot to the history.
				draft.history.push({ time, snapshot })

				// We update the history, but we only keep the last 10 snapshots.
				draft.history = draft.history.slice(-10)
				draft.historyIndex = draft.history.length - 1
			})
		},
		undoChanges: () => {
			const { historyIndex } = get()
			if (historyIndex < 1) {
				return false
			}
			set((draft) => {
				// We update the history index.
				draft.historyIndex = draft.historyIndex - 1
				// We update the rows.
				draft.rows = JSON.parse(draft.history[draft.historyIndex].snapshot)
			})
		},
		redoChanges: () => {
			const { historyIndex, history } = get()
			if (historyIndex >= history.length - 1) {
				return false
			}

			set((draft) => {
				// We update the history index.
				draft.historyIndex = draft.historyIndex + 1
				// We update the rows.
				draft.rows = JSON.parse(draft.history[draft.historyIndex].snapshot)
			})
		},
		updateRow: (index, states) => {
			const { rows } = get()
			const row = rows[index]
			if (!row) {
				return false
			}

			set((draft) => {
				// If the states are not an object, do nothing.
				if (getType(states) !== 'object') {
					return false
				}

				// Filter states that don't exist on row.
				const filteredStates = Object.keys(states).filter((key) => hasOwnKey(row, key))

				// Update the states.
				filteredStates.forEach((key) => {
					row[key] = states[key]
				})

				// Update the row.
				draft.rows[index] = row
			})
		},
		updateRowById: (rowId, states) => {
			const { rows, updateRow } = get()
			const rowIndex = rows.findIndex((row) => row.id === rowId)
			if (rowIndex === -1) {
				return false
			}

			updateRow(rowIndex, states)
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
