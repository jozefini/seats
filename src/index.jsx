import '@assets/styles/boot.scss'
import '@assets/styles/tailwind.css'
import '@assets/styles/main.scss'

import { HelmetProvider } from 'react-helmet-async'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'

// Styles.

// Query client.

// Render.

ReactDOM.createRoot(document.getElementById('rgbc')).render(
	<React.StrictMode>
		<HelmetProvider>
			<RouterProvider router={router} />
		</HelmetProvider>
	</React.StrictMode>,
)
