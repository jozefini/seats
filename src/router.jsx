import RootLayout from '@app/layout'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
	},
])
