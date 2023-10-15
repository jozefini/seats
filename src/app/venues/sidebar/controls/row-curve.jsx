import { useDictionary } from '../../hooks/dictionary'
import { useBuilderStore } from '../../store/useBuilderStore'
import { RangeSlider } from '../../ui/range-slider'
import { Field } from '../../ui/field'

const css = {
	notice: 'w-full py-1 px-2 text-sm text-orange-900 font-medium bg-orange-500/5 rounded-md',
}

export function RowCurve() {
	const { __ } = useDictionary()
	const updateRowCurve = useBuilderStore((s) => (value) => {
		const newRows = s.rows.map((row) => {
			if (!s.selectedRows.includes(row.id)) {
				return row
			}
			return { ...row, editor: { ...row.editor, curve: value[0] } }
		})
		s.updateStates({ rows: newRows })
	})
	const { isHidden, hasDiffValues, curveSize, allValues } = useBuilderStore((s) => {
		if (!s.selectedRows.length) {
			return { isHidden: true }
		}

		const sizes = new Set()
		for (const row of s.rows) {
			if (s.selectedRows.includes(row.id)) {
				sizes.add(row.editor.curve)
			}
		}

		if (sizes.size > 1) {
			return { hasDiffValues: true, allValues: [...sizes] }
		}

		return { curveSize: [sizes.values().next().value] }
	})

	if (isHidden) {
		return null
	}

	return (
		<Field label={__('settings.rowCurve')}>
			{hasDiffValues ? (
				<div className={css.notice}>
					{__('settings.rowCurveDiffValues')}
					<div>
						{allValues.map((value) => (
							<button key={value} className='px-1' onClick={() => updateRowCurve([value])}>
								{value}
							</button>
						))}
					</div>
				</div>
			) : (
				<RangeSlider
					defaultValue={curveSize}
					value={curveSize}
					min={0}
					step={1}
					max={100}
					onChange={updateRowCurve}
				/>
			)}
		</Field>
	)
}
