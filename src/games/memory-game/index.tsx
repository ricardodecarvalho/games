import { useState, useEffect, ChangeEvent } from 'react'

import 'games/memory-game/assets/css/style.css'
import back from 'games/memory-game/assets/images/backs/kid-icon.svg'
import { abc } from 'games/memory-game/assets/images/abc'
import { chooseCards } from 'games/memory-game/utils'
import { useInterval } from 'games/hooks'

type CardType = {
	type: any,
	image: any
}

const levels = [
	{ id: 1, label: 'Very Easy', value: 6 },
	{ id: 2, label: 'Easy', value: 8 },
	{ id: 3, label: 'Medium', value: 12 },
	{ id: 4, label: 'Hard', value: 16 }
]

const MemoryGame = () => {
	const [level, setLevel] = useState<number>(levels[1].value)
	const [cards, setCards] = useState<CardType[]>([])
	const [visibleItems, setVisibleItems] = useState<number[]>([])
	const [finishedItems, setFinishedItems] = useState<number[]>([])
	const [duration, setDuration] = useState(0);
	const [delay] = useState<number>(1000)
	const [isPlaying, setIsPlaying] = useState<boolean>(false)
	const [winner, setWinner] = useState<boolean>(false)

	useEffect(() => {
		setCards(() => chooseCards(abc, level))
	}, [level])

	const checkItems = (firstIndex: number, secondIndex: number) => {
		if (
			firstIndex !== secondIndex &&
			cards[firstIndex].type === cards[secondIndex].type
		) {
			setFinishedItems([...finishedItems, firstIndex, secondIndex]);
		} else {
			setTimeout(() => {
				setVisibleItems([]);
			}, 600);
		}
	}

	const handleFlipCard = (index: number) => {
		if (!isPlaying) setIsPlaying(!isPlaying)
		if (!finishedItems.includes(index)) {
			switch (visibleItems.length) {
				case 0:
				case 2:
					setVisibleItems([index]);
					break;
				case 1:
					if (visibleItems[0] !== index) {
						setVisibleItems(visibleItems.concat(index));
						checkItems(visibleItems[0], index);
					}
					break;
				default:
					setVisibleItems([]);
			}
		}
	}

	const handleRestart = () => {
		setVisibleItems([])
		setFinishedItems([])
		setTimeout(() => setCards(() => chooseCards(abc, level)), 350)
		setWinner(false)
		setDuration(0)
		setIsPlaying(false)
	}

	useInterval(
		() => {
			// Your custom logic here
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
	  }

	return (
		<div className='container'>
			<section className="game">
				{cards.map((card: CardType, index) => {
					return (
						<div
							key={index}
							onClick={() => handleFlipCard(index)}
							className={`card ${visibleItems.includes(index) ? "flip" : ""
								} ${finishedItems.includes(index)
									? "flip finished"
									: ""
								}`}
						>
							<img className="front" src={card.image} alt={card.type} />
							<img className="back" src={back} alt="Memory Card" />
						</div>
					)
				})}
			</section>
			<section className='controls'>
				<div className='levels-form'>
					<label>Level</label>
					<select value={level} onChange={handleLevels} disabled={isPlaying}>
						{levels.map((item) => (
							<option key={item.id} value={item.value}>{item.label}</option>
						))}
					</select>
				</div>

				<button className='btn-restart' onClick={handleRestart}>
					Restart
				</button>

				{isPlaying && (
					<div className='show-seconds'>
						{duration} seconds
					</div>
				)}

				{winner && (
					<div className='win-text'>
						You Win!
						<br />
						Finished in {duration} seconds
					</div>
				)}
			</section>
		</div>
	)
}

export default MemoryGame
