import { CardsType } from 'games/memory-game/types'

export const chooseCards = (array: CardsType[], n: number) => {
  const list = array
    .slice()
    .sort(() => 0.5 - Math.random())
    .slice(0, n)
  return list.concat(list).sort(() => 0.5 - Math.random())
}
