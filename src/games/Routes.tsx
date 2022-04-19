import { Routes, Route } from 'react-router-dom'

import MemoryGame from 'games/memory-game'

const GamesRoutes: React.FunctionComponent = (): JSX.Element => {
  return (
    <Routes>
      <Route path="memory-game" element={<MemoryGame />} />
    </Routes>
  )
}

export default GamesRoutes
