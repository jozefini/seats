import { useEffect, useState } from 'react'
import { useRowContext } from '../../context/row'
import { useVenueStore } from '../../store/use-venue-store'
import { TextInput } from '../controls/text-input'
import { Field } from '../field'

export function RowId() {
	const { id } = useRowContext()

	const [isTaken, setIsTaken] = useState(false)
	const [value, setValue] = useState(id)
	const { usedIds, updateRow, updateStates } = useVenueStore((s) => ({
		usedIds: s.rows.map((r) => r.id),
		updateRow: s.updateRow,
		updateStates: s.updateStates,
	}))

	const handleChange = (e) => {
		const { value } = e.target
		const isUsed = value !== id && usedIds.includes(value)
		setValue(value)
		setIsTaken(isUsed)

		if (!!value && !isUsed) {
			updateRow(id, { id: value })
			updateStates({ selectedRows: [value] })
		}
	}

	useEffect(() => {
		if (id !== value) {
			setValue(id)
		}
	}, [id])

	return (
		<Field label='Row ID'>
			<TextInput onChange={handleChange} value={value} />
			{isTaken && <div className='text-red-500'>Row ID is already taken</div>}
		</Field>
	)
}
