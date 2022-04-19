import back from 'games/memory-game/assets/images/backs/kid-icon.svg'
import { CardComponentType } from 'games/memory-game/types'

const Card: React.FunctionComponent<CardComponentType> = ({
  onClick,
  isVisibleItem,
  isFinishedItem,
  card,
}): JSX.Element => {
  return (
    <div
      onClick={onClick}
      className={`card ${isVisibleItem ? 'flip' : ''} ${
        isFinishedItem ? 'flip finished' : ''
      }`}
    >
      <img className="front" src={card.image} alt={card.type} />
      <img className="back" src={back} alt="Memory Card" />
    </div>
  )
}

export default Card
