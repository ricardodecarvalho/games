import { useState, useEffect, useCallback } from 'react'

import 'games/memory-game/assets/css/style.css'
import { abc } from 'games/memory-game/assets/images/abc'
import { chooseCards } from 'games/memory-game/utils'
import { useInterval } from 'games/hooks'
import Card from 'games/memory-game/components/Card'
import Controls from 'games/memory-game/components/Controls'
import { CardsType, LevelsType } from 'games/memory-game/types'

const levels: LevelsType[] = [
  { id: 1, label: 'Very Easy', value: 6 },
  { id: 2, label: 'Easy', value: 8 },
  { id: 3, label: 'Medium', value: 12 },
  { id: 4, label: 'Hard', value: 16 },
]

const MemoryGame: React.FunctionComponent = (): JSX.Element => {
  const [level, setLevel] = useState<number>(Number(levels[1].value))
  const [cards, setCards] = useState<CardsType[]>([])
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const [finishedItems, setFinishedItems] = useState<number[]>([])
  const [duration, setDuration] = useState<number>(0)
  const [delay] = useState<number>(1000)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [winner, setWinner] = useState<boolean>(false)

  const handleCards = useCallback(() => {
    setCards(() => chooseCards(abc, level))
  }, [level])

  useEffect(handleCards, [level, handleCards])

  const checkItems = (firstIndex: number, secondIndex: number) => {
    if (
      firstIndex !== secondIndex &&
      cards[firstIndex].type === cards[secondIndex].type
    ) {
      setFinishedItems([...finishedItems, firstIndex, secondIndex])
    } else {
      setTimeout(() => {
        setVisibleItems([])
      }, 600)
    }
  }

  const handleFlipCard = (index: number) => {
    if (!isPlaying) setIsPlaying(!isPlaying)
    if (!finishedItems.includes(index)) {
      switch (visibleItems.length) {
        case 0:
        case 2:
          setVisibleItems([index])
          break
        case 1:
          if (visibleItems[0] !== index) {
            setVisibleItems(visibleItems.concat(index))
            checkItems(visibleItems[0], index)
          }
          break
        default:
          setVisibleItems([])
      }
    }
  }

  const handleRestart = () => {
    setVisibleItems([])
    setFinishedItems([])
    setTimeout(() => handleCards, 350)
    setWinner(false)
    setDuration(0)
    setIsPlaying(false)
  }

  useInterval(
    () => {
      setDuration(duration + 1)
    },
    isPlaying ? delay : null
  )

  useEffect(() => {
    if (finishedItems.length > 0 && finishedItems.length === cards.length) {
      setWinner(true)
      setIsPlaying(false)
    }
  }, [finishedItems, cards])

  const handleLevels = (event: any) => {
    event.preventDefault()
    setLevel(Number(event.target.value))
    handleRestart()
  }

  return (
    <div className="container">
      <section className="game">
        {cards.map((card: CardsType, index) => {
          return (
            <Card
              key={index}
              onClick={() => handleFlipCard(index)}
              isVisibleItem={visibleItems.includes(index)}
              isFinishedItem={finishedItems.includes(index)}
              card={card}
            />
          )
        })}
      </section>

      <section className="controls">
        <Controls
          currentLevel={level}
          levels={levels}
          onChangeLevels={handleLevels}
          onRestart={handleRestart}
          isPlaying={isPlaying}
          duration={duration}
          winner={winner}
        />
      </section>
    </div>
  )
}

export default MemoryGame
