import { CreateVenue } from './venues/create'
import { OutlineBtn } from './venues/ui/buttons'

const css = {
	wrapper: 'w-full mx-auto px-4 py-20',
	btn: 'absolute top-6 left-1/2 -translate-x-1/2',
}

export default function CreateLayout() {
	const changeDirection = () => {
		const doc = document.documentElement
		const dir = doc.getAttribute('dir')
		const newDir = dir === 'ltr' || !dir ? 'rtl' : 'ltr'
		doc.setAttribute('dir', newDir)
	}

	return (
		<div className={css.wrapper}>
			<OutlineBtn onClick={changeDirection} className={css.btn}>
				<span className='rtl:hidden'>Change to RTL</span>
				<span className='hidden rtl:block'>Change to LTR</span>
			</OutlineBtn>
			<CreateVenue />
		</div>
	)
}
