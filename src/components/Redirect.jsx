import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function Redirect({ to, state }) {
	const navigate = useNavigate()

	useEffect(() => {
		navigate(to, !!state ? { state } : {})
	}, [])

	return null
}
