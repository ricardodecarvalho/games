import { Link } from 'react-router-dom'

const MemoryGameIndex: React.FunctionComponent = (): JSX.Element => {
  return (
    <div>
      <h1>Memory Game</h1>
      <ul>
        <li>
          <Link to={`abc`}>ABC</Link>
        </li>
      </ul>
    </div>
  )
}

export default MemoryGameIndex
