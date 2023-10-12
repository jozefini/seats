import RootLayout from '@app/layout'
import CreatePage from '@app/create'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <CreatePage />,
	},
	{
		path: '/create',
		element: <RootLayout />,
	},
])
