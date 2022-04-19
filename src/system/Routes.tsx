import { Routes, Route } from 'react-router-dom'

import GamesRoutes from 'games/Routes'

const SystemRoutes: React.FunctionComponent = (): JSX.Element => {
	return (
		<Routes>
			<Route index element={<Home />} />
			<Route path="games/*" element={<GamesRoutes />} />
		</Routes>
	)
}

export default SystemRoutes


const Home: React.FunctionComponent = (): JSX.Element => {
	return <div>Home</div>
}