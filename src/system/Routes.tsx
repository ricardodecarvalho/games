import { Routes, Route } from 'react-router-dom'

import GamesRoutes from 'games/Routes'
import Games from 'games'

const SystemRoutes: React.FunctionComponent = (): JSX.Element => {
  return (
    <Routes>
      <Route path="games" element={<Games />} />
      <Route path="games/*" element={<GamesRoutes />} />
    </Routes>
  )
}

export default SystemRoutes
