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
		dragSelectedRows: (x, y) => {
			const { draggedRows } = get()
			if (!draggedRows.length) return false

			set((draft) => {
				draggedRows.forEach(({ x: initX, y: initY, rowIndex }) => {
					draft.rows[rowIndex].editor.x = initX + x
					draft.rows[rowIndex].editor.y = initY + y
				})
			})
		},
		moveSelectedRows: (x, y) => {
			if (!get().selectedRows.length) return false

			set((draft) => {
				draft.selectedRows.forEach((rowId) => {
					const row = draft.rows.find((row) => row.id === rowId)
					row.editor.x += x
					row.editor.y += y
				})
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
