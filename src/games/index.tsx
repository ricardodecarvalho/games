import { Link } from 'react-router-dom'

const Games: React.FunctionComponent = (): JSX.Element => {
  return (
    <div>
      <ul>
        <li>
          <Link to={`memory-game`}>Memory Game</Link>
        </li>
      </ul>
    </div>
  )
}

export default Games
