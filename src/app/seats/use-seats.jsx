import { createContext, useContext, useMemo, useState } from 'react'

const SeatsContext = createContext()

export function SeatsProvider({ children }) {
	const [selected, setSelected] = useState({})

	return <SeatsContext.Provider value={{ selected, setSelected }}>{children}</SeatsContext.Provider>
}

export function useSeats(options) {
	const { id = 0, row = null, name = '', price = 0 } = options || {}
	const { selected, setSelected } = useContext(SeatsContext)

	const seat = { id, name, price }
	const isSelected = useMemo(() => {
		if (!row || !id) {
			return false
		}
		const selectedRow = selected[row] || []
		return selectedRow.some((s) => s.id === id)
	}, [selected, id])

	const selectSeat = () => {
		setSelected((selected) => {
			const selectedRow = selected[row] || []
			const isSelected = selectedRow.some((s) => s.id === id)
			const newSelectedRow = isSelected
				? selectedRow.filter((s) => s.id !== id)
				: [...selectedRow, seat]
			const newSelected = { ...selected, [row]: newSelectedRow }
			return newSelected
		})
	}

	return { selected, isSelected, selectSeat }
}
