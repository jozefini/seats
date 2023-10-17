import { useEffect, useState } from 'react'
import { CreateVenue } from './venues/create'
import { OutlineBtn } from './venues/ui/buttons'
import enDictionary from './venues/i18n/create.en.json'
import heDictionary from './venues/i18n/create.he.json'

const css = {
	wrapper: 'w-full mx-auto px-4 py-20',
	btn: 'absolute top-6 left-1/2 -translate-x-1/2',
}

export default function CreateLayout() {
	const [lang, setLang] = useState('en')
	const changeDirection = () => {
		setLang((lang) => (lang === 'en' ? 'he' : 'en'))
	}

	useEffect(() => {
		document.documentElement.setAttribute('dir', lang === 'en' ? 'ltr' : 'rtl')
	}, [lang])

	return (
		<div className={css.wrapper}>
			<OutlineBtn onClick={changeDirection} className={css.btn}>
				<span className='rtl:hidden'>Change to Hebrew</span>
				<span className='hidden rtl:block'>Change to English</span>
			</OutlineBtn>
			<CreateVenue dictionary={lang === 'en' ? enDictionary : heDictionary} />
		</div>
	)
}
