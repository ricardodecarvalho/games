import { LevelsType } from 'games/memory-game/types'

type ControlsType = {
  currentLevel: number
  levels: LevelsType[]
  onChangeLevels: (event: any) => void
  onRestart: (event: any) => void
  isPlaying: boolean
  duration: number
  winner: boolean
}
const Controls: React.FunctionComponent<ControlsType> = ({
  currentLevel,
  levels,
  onChangeLevels,
  onRestart,
  isPlaying,
  duration,
  winner,
}): JSX.Element => {
  return (
    <>
      <div className="levels-form">
        <label>Level</label>
        <select
          value={currentLevel}
          onChange={onChangeLevels}
          disabled={isPlaying}
        >
          {levels.map((item: LevelsType) => (
            <option key={item.id} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      {(isPlaying || winner) && (
        <button className="btn-restart" onClick={onRestart}>
          Restart
        </button>
      )}

      {isPlaying && <div className="show-seconds">{duration} seconds</div>}

      {winner && (
        <div className="win-text">
          You Win!
          <br />
          Finished in {duration} seconds
        </div>
      )}
    </>
  )
}

export default Controls
