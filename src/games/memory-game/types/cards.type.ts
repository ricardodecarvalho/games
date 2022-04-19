export type CardsType = {
  type: string
  image: any
}

export type CardComponentType = {
  onClick: () => void
  isVisibleItem: boolean
  isFinishedItem: boolean
  card: CardsType
}

export type LevelsType = {
  id: number
  label: string
  value: number
}
