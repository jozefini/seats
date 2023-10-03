import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { shallow } from 'zustand/shallow'

const initialStates = {
	isRouting: false,
	isOffCanvas: false,
	socketConnection: null,
}

const globalStore = create(
	immer((set) => ({
		...initialStates,
		actions: {
			setIsRouting: () => set({ isRouting: true }),
			openOffCanvas: () =>
				set((draft) => {
					draft.isOffCanvas = true
				}),
			closeOffCanvas: () =>
				set((draft) => {
					draft.isOffCanvas = false
				}),
			toggleOffCanvas: () =>
				set((draft) => {
					draft.isOffCanvas = !draft.isOffCanvas
				}),
			setSocketConnection: (socket) =>
				set((draft) => {
					draft.socketConnection = socket
				}),
			resetStore: () => set({ ...initialStates }),
		},
	})),
)

export const useGlobalStore = (select) => globalStore(select, shallow)
